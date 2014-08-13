#include "PrinterMgr.h"

//���캯��
TPrinterMgr::TPrinterMgr()
{
}

//��������
TPrinterMgr::~TPrinterMgr()
{
}

//���ϵͳ�Ƿ�ΪWindows NT/2000/XP����Win9X(winows me)
bool TPrinterMgr::IsWindowsNT(void)
{
    TOSVersionInfo VerInfo;
    VerInfo.dwOSVersionInfoSize = sizeof(VerInfo);
    GetVersionEx(&VerInfo);
    return (VerInfo.dwPlatformId == VER_PLATFORM_WIN32_NT);
}

//��ȡ��ӡ�����
HANDLE TPrinterMgr::GetPrinterHandle(LPTSTR szPrinterName)
{
    PRINTER_DEFAULTS pds;
    HANDLE hPrinter = NULL;
    ZeroMemory(&pds, sizeof(PRINTER_DEFAULTS));
    pds.DesiredAccess = PRINTER_ALL_ACCESS;
    OpenPrinter(szPrinterName, &hPrinter, &pds);
    return hPrinter;
}

//���ӹ���Զ���ֽ��
//szPaperName: �Զ���ֽ�����ƣ�iWidth��iHeight: ֽ�ŵĴ�С����0.1mmΪ��λ
//rcPrintableMargin: ��ӡ���ı߾࣬��0.1mmΪ��λ
bool TPrinterMgr::AddCustomPaper(LPTSTR szPrinterName, PAPERNAME szPaperName, int iWidth,int iHeight, RECT rcPrintableMargin)
{
    bool bOk = FALSE;
    if (IsWindowsNT()) //Windows NT4/2000/XP��֧��
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
            bOk = (SetForm(hPrinter, (LPSTR)szPaperName, 1, (LPBYTE)&fi1) || //�Ѵ��ڸ�����ֽ�������
                   AddForm(hPrinter, 1, (LPBYTE)&fi1)); //������Ӵ��Զ���ֽ��
            ClosePrinter(hPrinter);
        }
    }
    return bOk;
}

//��ȡ��ӡ����ϸ��Ϣ�����ص�ָ���ú������GlobalFree�ͷ�
//szPrinterName: ��ӡ������
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

//��ӡ������
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

//��ֽ�����Ƶõ���Ӧ��DEVMODE�е��Ǹ�dmPaperSizeֵ
//szPrinterName ��ӡ�����ơ�szPortName �˿ںš�szPaperName: �Զ���ֽ������
//����-1��ʾ�д���
short TPrinterMgr::GetPaperSize(LPTSTR szPrinterName, LPTSTR szPortName, PAPERNAME szPaperName)
{
    short nPaperSize = -1;
    //��ÿ��ô�ӡ��ֽ��������Ŀ
    int nNeeded = DeviceCapabilities(szPrinterName, szPortName, DC_PAPERNAMES, NULL, NULL);

    if (nNeeded)
    {
        PAPERNAME *pszPaperNames = new PAPERNAME[nNeeded]; //����ֽ����������
        //��ÿ��ô�ӡ��ֽ����������
        if (DeviceCapabilities(szPrinterName, szPortName, DC_PAPERNAMES, (LPTSTR)pszPaperNames, NULL) != -1)
        {
            int i=0;
            //����ֽ������szPaperName�������е�����
            //for (i = 0; i < nNeeded && _tcscmp(pszPaperNames[i], szPaperName); i++);
            for (i = 0; i < nNeeded; i++)
            {
              if (strcmp(pszPaperNames[i],szPaperName) == 0)
                break;
            }
            if (i < nNeeded)
            {
                //��ÿ��ô�ӡ��ֽ�ųߴ����Ŀ(Ӧ�õ��ڴ�ӡ��ֽ��������Ŀ)
                nNeeded = DeviceCapabilities(szPrinterName, szPortName, DC_PAPERS, NULL, NULL);
                if (nNeeded)
                {
                    LPWORD pPapers = new WORD[nNeeded]; //����ֽ�ųߴ������
                    //��ÿ��ô�ӡ��ֽ�ųߴ������
                    if (DeviceCapabilities(szPrinterName, szPortName, DC_PAPERS, (LPSTR)pPapers, NULL) != -1)
                        nPaperSize = pPapers[i]; //���ֽ������szPaperName��Ӧ�ĳߴ��
                    delete []pPapers;
                }
            }
        }
        delete []pszPaperNames;
    }
    return nPaperSize;
}

//���ô�ӡ����Ĭ��ֽ�źͷ���
//szPrinterName ��ӡ�����ơ�szPaperName: �Զ���ֽ������
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

//��ȡĬ�ϴ�ӡ������
String TPrinterMgr::GetDefaultPrinter(void)
{
    String strPrinterName;
    strPrinterName = Printer()->Printers->Strings[Printer()->PrinterIndex];

    return strPrinterName;
}

