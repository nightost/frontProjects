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
    FontName = WideString("����").c_bstr();
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
    BSTR FontName;      //��������
    long FontSize;      //�����С
    PRINTER_INFO_2 *pv_info_ppi2;   //������Ϣ
    int OffsetX;        //ˮƽƫ����
    int OffsetY;        //��ֱƫ����
    int LineInterval;   //�м��
    int iLineInterval;  //����ֱ��ʺ��м��
    bool bNormalLine;   //Ĭ���м��
    int TextPrintMode;  //�ı���ӡģʽ��0-Խ�߽�ʱʡ�ԣ�1���Զ�����
    AnsiString Separator;     //�Զ����зָ���

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
