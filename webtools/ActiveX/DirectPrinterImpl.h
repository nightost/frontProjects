// DIRECTPRINTERIMPL.H : Declaration of the TDirectPrinterImpl

#ifndef DirectPrinterImplH
#define DirectPrinterImplH

#include "WebTools_TLB.h"
#include "PrinterMgr.h"

/////////////////////////////////////////////////////////////////////////////
// TDirectPrinterImpl     Implements IDirectPrinter, default interface of DirectPrinter
// ThreadingModel : Apartment
// Dual Interface : TRUE
// Event Support  : FALSE
// Default ProgID : WebTools.DirectPrinter
// Description    : 
/////////////////////////////////////////////////////////////////////////////
class ATL_NO_VTABLE TDirectPrinterImpl :
  public CComObjectRootEx<CComSingleThreadModel>,
  public CComCoClass<TDirectPrinterImpl, &CLSID_DirectPrinter>,
  public IDispatchImpl<IDirectPrinter, &IID_IDirectPrinter, &LIBID_WebTools>
{
public:
  TDirectPrinterImpl()
  {
    hPrinter = Printer();
    FontName = WideString("宋体").c_bstr();
    FontSize = 10;
    OffsetX = 0;
    OffsetY = 0;
    LineInterval = 0;
    iLineInterval = 0;
    bNormalLine = false;
    TextPrintMode = 0;
    Separator = "";

    pv_info_ppi2 = NULL;
  }

  // Data used when registering Object
  //
  DECLARE_THREADING_MODEL(otApartment);
  DECLARE_PROGID("WebTools.DirectPrinter");
  DECLARE_DESCRIPTION("");

  // Function invoked to (un)register object
  //
  static HRESULT WINAPI UpdateRegistry(BOOL bRegister)
  {
    TTypedComServerRegistrarT<TDirectPrinterImpl>
    regObj(GetObjectCLSID(), GetProgID(), GetDescription());
    return regObj.UpdateRegistry(bRegister);
  }


BEGIN_COM_MAP(TDirectPrinterImpl)
  COM_INTERFACE_ENTRY(IDirectPrinter)
  COM_INTERFACE_ENTRY2(IDispatch, IDirectPrinter)
END_COM_MAP()

BEGIN_CATEGORY_MAP(TCoClassCPrintImpl)
  IMPLEMENTED_CATEGORY(CATID_SafeForScripting)
  IMPLEMENTED_CATEGORY(CATID_SafeForInitializing)
END_CATEGORY_MAP()

// IDirectPrinter
private:
    TPrinter *hPrinter;
    BSTR FontName;      //字体名称
    long FontSize;      //字体大小
    PRINTER_INFO_2 *pv_info_ppi2;   //字体信息
    int OffsetX;        //水平偏移量
    int OffsetY;        //垂直偏移量
    int LineInterval;   //行间距
    int iLineInterval;  //计算分辨率后行间距
    bool bNormalLine;   //默认行间距
    int TextPrintMode;  //文本打印模式：0-越边界时省略，1：自动换行
    AnsiString Separator;     //自动换行分隔符

    bool __fastcall IsHalfChar(AnsiString str);
    void __fastcall ComputeLineInterval();
    void __fastcall PrintMultiText(long &PrintX, long &PrintY, AnsiString PrintText);
public:
 
  STDMETHOD(PrintClose());
  STDMETHOD(PrintOpen(BSTR PrintTitle));
  STDMETHOD(PrintTextFormat(long PrintX, long PrintY, BSTR FontName,
      long FontSize, BSTR PrintText));
  STDMETHOD(SetCustomPaper(BSTR PaperName, int Width, int Height,
      int LeftInterval, int TopInterval, int RighttInterval,
      int BottomInterval));
  STDMETHOD(SetPaper(BSTR PaperName));
  STDMETHOD(SetFont(BSTR FontName));
  STDMETHOD(PrintText(long PrintX, long PrintY, BSTR PrintText));
  STDMETHOD(SetFontSize(long FontSize));
  STDMETHOD(BackupPaper());
  STDMETHOD(RestorePaper());
  STDMETHOD(SetFontStyle(int bBold, int bItalic, int bUnderline,
      int bStrikeOut));
  STDMETHOD(SetOrientation(int Orientation));
  STDMETHOD(SetPrintOffset(int OffsetX, int OffsetY));
  STDMETHOD(SetTextInterval(int TextInterval));
  STDMETHOD(SetLineInterval(BSTR LineInterval));
  STDMETHOD(SetTextPrintMode(int Mode));
  STDMETHOD(SetSeparator(BSTR Separator));
};

#endif //DirectPrinterImplH
