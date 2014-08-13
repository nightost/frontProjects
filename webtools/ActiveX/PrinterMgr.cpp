#include "PrinterMgr.h"

//构造函数
TPrinterMgr::TPrinterMgr()
{
}

//析构函数
TPrinterMgr::~TPrinterMgr()
{
}

//检测系统是否为Windows NT/2000/XP还是Win9X(winows me)
bool TPrinterMgr::IsWindowsNT(void)
{
    TOSVersionInfo VerInfo;
    VerInfo.dwOSVersionInfoSize = sizeof(VerInfo);
    GetVersionEx(&VerInfo);
    return (VerInfo.dwPlatformId == VER_PLATFORM_WIN32_NT);
}

//获取打印机句柄
HANDLE TPrinterMgr::GetPrinterHandle(LPTSTR szPrinterName)
{
    PRINTER_DEFAULTS pds;
    HANDLE hPrinter = NULL;
    ZeroMemory(&pds, sizeof(PRINTER_DEFAULTS));
    pds.DesiredAccess = PRINTER_ALL_ACCESS;
    OpenPrinter(szPrinterName, &hPrinter, &pds);
    return hPrinter;
}

//增加规格自定义纸张
//szPaperName: 自定义纸张名称，iWidth、iHeight: 纸张的大小，以0.1mm为单位
//rcPrintableMargin: 打印机的边距，以0.1mm为单位
bool TPrinterMgr::AddCustomPaper(LPTSTR szPrinterName, PAPERNAME szPaperName, int iWidth,int iHeight, RECT rcPrintableMargin)
{
    bool bOk = FALSE;
    if (IsWindowsNT()) //Windows NT4/2000/XP才支持
    {
        FORM_INFO_1 fi1;
        fi1.Flags = FORM_USER;
        fi1.pName = (LPTSTR)szPaperName;
        fi1.Size.cx = iWidth * 100;
        fi1.Size.cy = iHeight * 100;
        fi1.ImageableArea.left = rcPrintableMargin.left * 100;
        fi1.ImageableArea.top = rcPrintableMargin.top * 100;
        fi1.ImageableArea.right = fi1.Size.cx - rcPrintableMargin.right * 100;
        fi1.ImageableArea.bottom = fi1.Size.cy - rcPrintableMargin.bottom * 100;
        HANDLE hPrinter = GetPrinterHandle(szPrinterName);
        if (hPrinter)
        {
            bOk = (SetForm(hPrinter, (LPSTR)szPaperName, 1, (LPBYTE)&fi1) || //已存在该类型纸张则更改
                   AddForm(hPrinter, 1, (LPBYTE)&fi1)); //否则添加此自定义纸张
            ClosePrinter(hPrinter);
        }
    }
    return bOk;
}

//获取打印机详细信息，返回的指针用后必须以GlobalFree释放
//szPrinterName: 打印机名称
PRINTER_INFO_2 * TPrinterMgr::GetPrinterInfo(LPTSTR szPrinterName)
{
    HANDLE hPrinter = GetPrinterHandle(szPrinterName);
    PRINTER_INFO_2 *ppi2 = NULL;
    DWORD cbNeeded = 0;
    if (hPrinter)
    {
        GetPrinter(hPrinter, 2, 0, 0, &cbNeeded);
        if (cbNeeded)
        {
            ppi2 = (PRINTER_INFO_2 *)GlobalAlloc(GPTR, cbNeeded);
            if (ppi2)
            {
                if (!GetPrinter(hPrinter, 2, (LPBYTE)ppi2, cbNeeded, &cbNeeded))
                {
                    GlobalFree((HGLOBAL)ppi2);
                    ppi2 = NULL;
                }
            }
        }
        ClosePrinter(hPrinter);
    }
    return ppi2;
}

//打印机设置
bool TPrinterMgr::SetPrinterInfo(PRINTER_INFO_2 *ppi2)
{
    HANDLE hPrinter = GetPrinterHandle(ppi2->pPrinterName);
    BOOL bOk = FALSE;
    DWORD fMode;
    if (hPrinter)
    {
        fMode = DM_IN_BUFFER | DM_OUT_BUFFER;
        bOk = (DocumentProperties(NULL, hPrinter,
                                  ppi2->pPrinterName,
                                  ppi2->pDevMode,
                                  ppi2->pDevMode,
                                  fMode) == IDOK &&
              ::SetPrinter(hPrinter, 2, (LPBYTE)ppi2, 0));
        ClosePrinter(hPrinter);
    }
    return bOk;
}

//由纸张名称得到对应的DEVMODE中的那个dmPaperSize值
//szPrinterName 打印机名称、szPortName 端口号、szPaperName: 自定义纸张名称
//返回-1表示有错误
short TPrinterMgr::GetPaperSize(LPTSTR szPrinterName, LPTSTR szPortName, PAPERNAME szPaperName)
{
    short nPaperSize = -1;
    //获得可用打印机纸张类型数目
    int nNeeded = DeviceCapabilities(szPrinterName, szPortName, DC_PAPERNAMES, NULL, NULL);

    if (nNeeded)
    {
        PAPERNAME *pszPaperNames = new PAPERNAME[nNeeded]; //分配纸张名称数组
        //获得可用打印机纸张名称数组
        if (DeviceCapabilities(szPrinterName, szPortName, DC_PAPERNAMES, (LPTSTR)pszPaperNames, NULL) != -1)
        {
            int i=0;
            //查找纸张类型szPaperName在数组中的索引
            //for (i = 0; i < nNeeded && _tcscmp(pszPaperNames[i], szPaperName); i++);
            for (i = 0; i < nNeeded; i++)
            {
              if (strcmp(pszPaperNames[i],szPaperName) == 0)
                break;
            }
            if (i < nNeeded)
            {
                //获得可用打印机纸张尺寸号数目(应该等于打印机纸张类型数目)
                nNeeded = DeviceCapabilities(szPrinterName, szPortName, DC_PAPERS, NULL, NULL);
                if (nNeeded)
                {
                    LPWORD pPapers = new WORD[nNeeded]; //分配纸张尺寸号数组
                    //获得可用打印机纸张尺寸号数组
                    if (DeviceCapabilities(szPrinterName, szPortName, DC_PAPERS, (LPSTR)pPapers, NULL) != -1)
                        nPaperSize = pPapers[i]; //获得纸张类型szPaperName对应的尺寸号
                    delete []pPapers;
                }
            }
        }
        delete []pszPaperNames;
    }
    return nPaperSize;
}

//设置打印机的默认纸张和方向
//szPrinterName 打印机名称、szPaperName: 自定义纸张名称
bool TPrinterMgr::SetPaper(LPTSTR szPrinterName, PAPERNAME szPaperName, short nOrientation)
{
    BOOL bOk = FALSE;
    PRINTER_INFO_2 *ppi2 = GetPrinterInfo(szPrinterName);
    if (ppi2)
    {
        short nPaperSize = GetPaperSize(szPrinterName, ppi2->pPortName, szPaperName);
        if (nPaperSize != -1)
        {
            ppi2->pDevMode->dmFields = DM_PAPERSIZE|DM_PAPERWIDTH|DM_PAPERLENGTH|DM_ORIENTATION;
            ppi2->pDevMode->dmPaperSize = nPaperSize;
            ppi2->pDevMode->dmPaperWidth = 0;
            ppi2->pDevMode->dmPaperLength = 0;
            ppi2->pDevMode->dmOrientation = nOrientation;
            bOk = SetPrinterInfo(ppi2);
        }
        GlobalFree((HGLOBAL)ppi2);
    }
    return bOk;
}

//获取默认打印机名称
String TPrinterMgr::GetDefaultPrinter(void)
{
    String strPrinterName;
    strPrinterName = Printer()->Printers->Strings[Printer()->PrinterIndex];

    return strPrinterName;
}

