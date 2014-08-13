//---------------------------------------------------------------------------
#ifndef PrinterMgrH
#define	PrinterMgrH

#include <vcl\Controls.hpp>
#include <vcl\Forms.hpp>
#include <vcl\Graphics.hpp>
#include <vcl\Classes.hpp>
#include <vcl\Windows.hpp>
#include <vcl\System.hpp>
#include <vcl\Printers.hpp>
#include <StdCtrls.hpp>
#include <math.h>
#include <ExtCtrls.hpp>
#include <Buttons.hpp>
#include "Dialogs.hpp"
#include <Grids.hpp>
#include <winspool.h>
#include <Registry.hpp>
#include <excpt.h>

class TqprPrint;

class TPrinterMgr {
private:
    TqprPrint *myselfprint;
    typedef TCHAR PAPERNAME[64]; //打印机纸张名称类型
public:
    TPrinterMgr();
    ~TPrinterMgr();
    
    bool IsWindowsNT(void);

    bool AddCustomPaper(LPTSTR szPrinterName, PAPERNAME szPaperName,
        int iWidth,int iHeight, RECT rcPrintableMargin);
        HANDLE GetPrinterHandle(LPTSTR szPrinterName);

    short GetPaperSize(LPTSTR szPrinterName, LPTSTR szPortName, PAPERNAME szPaperName);

    bool SetPaper(LPTSTR szPrinterName, PAPERNAME szPaperName, short nOrientation);

    PRINTER_INFO_2* GetPrinterInfo(LPTSTR szPrinterName);

    bool SetPrinterInfo(PRINTER_INFO_2 *ppi2);

    String GetDefaultPrinter(void);
};
#endif

