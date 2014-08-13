// ************************************************************************ //
// WARNING                                                                    
// -------                                                                    
// The types declared in this file were generated from data read from a       
// Type Library. If this type library is explicitly or indirectly (via        
// another type library referring to this type library) re-imported, or the   
// 'Refresh' command of the Type Library Editor activated while editing the   
// Type Library, the contents of this file will be regenerated and all        
// manual modifications will be lost.                                         
// ************************************************************************ //

// C++ TLBWRTR : $Revision: 1.1 $
// File generated on 2008-4-11 16:45:22 from Type Library described below.

// ************************************************************************ //
// Type Lib: D:\Work\bss_dev\crm\j2ee\BSSWEB\common\webtools\ActiveX\WebTools.tlb (1)
// IID\LCID: {FA337896-8457-4EBF-A069-39963DDF3EE8}\0
// Helpfile: 
// DepndLst: 
//   (1) v2.0 stdole, (C:\WINDOWS\system32\STDOLE2.TLB)
//   (2) v4.0 StdVCL, (C:\WINDOWS\system32\STDVCL40.DLL)
// ************************************************************************ //
#ifndef   __WebTools_TLB_h__
#define   __WebTools_TLB_h__

#pragma option push -b -w-inl

#include <utilcls.h>
#if !defined(__UTILCLS_H_VERSION) || (__UTILCLS_H_VERSION < 0x0500)
//
// The code generated by the TLIBIMP utility or the Import|TypeLibrary 
// and Import|ActiveX feature of C++Builder rely on specific versions of
// the header file UTILCLS.H found in the INCLUDE\VCL directory. If an 
// older version of the file is detected, you probably need an update/patch.
//
#error "This file requires a newer version of the header UTILCLS.H" \
       "You need to apply an update/patch to your copy of C++Builder"
#endif
#include <olectl.h>
#include <ocidl.h>
#if defined(USING_ATLVCL) || defined(USING_ATL)
#if !defined(__TLB_NO_EVENT_WRAPPERS)
#include <atl/atlmod.h>
#endif
#endif


// *********************************************************************//
// Forward reference of some VCL types (to avoid including STDVCL.HPP)    
// *********************************************************************//
namespace Stdvcl {class IStrings; class IStringsDisp;}
using namespace Stdvcl;
typedef TComInterface<IStrings> IStringsPtr;
typedef TComInterface<IStringsDisp> IStringsDispPtr;

namespace Webtools_tlb
{

// *********************************************************************//
// HelpString: WebPrinter Library
// Version:    1.0
// *********************************************************************//


// *********************************************************************//
// GUIDS declared in the TypeLibrary. Following prefixes are used:        
//   Type Libraries     : LIBID_xxxx                                      
//   CoClasses          : CLSID_xxxx                                      
//   DISPInterfaces     : DIID_xxxx                                       
//   Non-DISP interfaces: IID_xxxx                                        
// *********************************************************************//
extern __declspec (package) const GUID LIBID_WebTools;
extern __declspec (package) const GUID IID_IDirectPrinter;
extern __declspec (package) const GUID CLSID_DirectPrinter;

// *********************************************************************//
// Forward declaration of types defined in TypeLibrary                    
// *********************************************************************//
interface DECLSPEC_UUID("{62342262-E038-4349-B719-EEC4B462948C}") IDirectPrinter;
typedef TComInterface<IDirectPrinter, &IID_IDirectPrinter> IDirectPrinterPtr;

// *********************************************************************//
// Declaration of CoClasses defined in Type Library                       
// (NOTE: Here we map each CoClass to its Default Interface)              
//                                                                        
// The LIBID_OF_ macro(s) map a LIBID_OF_CoClassName to the GUID of this  
// TypeLibrary. It simplifies the updating of macros when CoClass name    
// change.                                                                
// *********************************************************************//
typedef IDirectPrinter DirectPrinter;
typedef IDirectPrinterPtr DirectPrinterPtr;

#define LIBID_OF_DirectPrinter (&LIBID_WebTools)
// *********************************************************************//
// Interface: IDirectPrinter
// Flags:     (4416) Dual OleAutomation Dispatchable
// GUID:      {62342262-E038-4349-B719-EEC4B462948C}
// *********************************************************************//
interface IDirectPrinter  : public IDispatch
{
public:
  virtual HRESULT STDMETHODCALLTYPE PrintOpen(BSTR PrintTitle/*[in]*/) = 0; // [1]
  virtual HRESULT STDMETHODCALLTYPE PrintTextFormat(long PrintX/*[in]*/, long PrintY/*[in]*/, 
                                                    BSTR FontName/*[in]*/, long FontSize/*[in]*/, 
                                                    BSTR PrintText/*[in]*/) = 0; // [2]
  virtual HRESULT STDMETHODCALLTYPE PrintClose(void) = 0; // [3]
  virtual HRESULT STDMETHODCALLTYPE SetCustomPaper(BSTR PaperName/*[in]*/, int Width/*[in]*/, 
                                                   int Height/*[in]*/, int LeftInterval/*[in]*/, 
                                                   int TopInterval/*[in]*/, 
                                                   int RighttInterval/*[in]*/, 
                                                   int BottomInterval/*[in]*/) = 0; // [4]
  virtual HRESULT STDMETHODCALLTYPE SetPaper(BSTR PaperName/*[in]*/) = 0; // [5]
  virtual HRESULT STDMETHODCALLTYPE SetFont(BSTR FontName/*[in]*/) = 0; // [6]
  virtual HRESULT STDMETHODCALLTYPE PrintText(long PrintX/*[in]*/, long PrintY/*[in]*/, 
                                              BSTR PrintText/*[in]*/) = 0; // [7]
  virtual HRESULT STDMETHODCALLTYPE SetFontSize(long FontSize/*[in]*/) = 0; // [8]
  virtual HRESULT STDMETHODCALLTYPE BackupPaper(void) = 0; // [9]
  virtual HRESULT STDMETHODCALLTYPE RestorePaper(void) = 0; // [10]
  virtual HRESULT STDMETHODCALLTYPE SetFontStyle(int bBold/*[in]*/, int bItalic/*[in]*/, 
                                                 int bUnderline/*[in]*/, int bStrikeOut/*[in]*/) = 0; // [11]
  virtual HRESULT STDMETHODCALLTYPE SetOrientation(int Orientation/*[in]*/) = 0; // [12]
  virtual HRESULT STDMETHODCALLTYPE SetPrintOffset(int OffsetX/*[in]*/, int OffsetY/*[in]*/) = 0; // [13]
  virtual HRESULT STDMETHODCALLTYPE SetTextInterval(int TextInterval/*[in]*/) = 0; // [14]
  virtual HRESULT STDMETHODCALLTYPE SetLineInterval(BSTR LineInterval/*[in]*/) = 0; // [15]
  virtual HRESULT STDMETHODCALLTYPE SetTextPrintMode(int Mode/*[in]*/) = 0; // [16]
  virtual HRESULT STDMETHODCALLTYPE SetSeparator(BSTR Separator/*[in]*/) = 0; // [17]

#if !defined(__TLB_NO_INTERFACE_WRAPPERS)



#endif //   __TLB_NO_INTERFACE_WRAPPERS

};

#if !defined(__TLB_NO_INTERFACE_WRAPPERS)
// *********************************************************************//
// SmartIntf: TCOMIDirectPrinter
// Interface: IDirectPrinter
// *********************************************************************//
template <class T /* IDirectPrinter */ >
class TCOMIDirectPrinterT : public TComInterface<IDirectPrinter>, public TComInterfaceBase<IUnknown>
{
public:
  TCOMIDirectPrinterT() {}
  TCOMIDirectPrinterT(IDirectPrinter *intf, bool addRef = false) : TComInterface<IDirectPrinter>(intf, addRef) {}
  TCOMIDirectPrinterT(const TCOMIDirectPrinterT& src) : TComInterface<IDirectPrinter>(src) {}
  TCOMIDirectPrinterT& operator=(const TCOMIDirectPrinterT& src) { Bind(src, true); return *this;}

  HRESULT         __fastcall PrintOpen(BSTR PrintTitle/*[in]*/);
  HRESULT         __fastcall PrintTextFormat(long PrintX/*[in]*/, long PrintY/*[in]*/, 
                                             BSTR FontName/*[in]*/, long FontSize/*[in]*/, 
                                             BSTR PrintText/*[in]*/);
  HRESULT         __fastcall PrintClose(void);
  HRESULT         __fastcall SetCustomPaper(BSTR PaperName/*[in]*/, int Width/*[in]*/, 
                                            int Height/*[in]*/, int LeftInterval/*[in]*/, 
                                            int TopInterval/*[in]*/, int RighttInterval/*[in]*/, 
                                            int BottomInterval/*[in]*/);
  HRESULT         __fastcall SetPaper(BSTR PaperName/*[in]*/);
  HRESULT         __fastcall SetFont(BSTR FontName/*[in]*/);
  HRESULT         __fastcall PrintText(long PrintX/*[in]*/, long PrintY/*[in]*/, 
                                       BSTR PrintText/*[in]*/);
  HRESULT         __fastcall SetFontSize(long FontSize/*[in]*/);
  HRESULT         __fastcall BackupPaper(void);
  HRESULT         __fastcall RestorePaper(void);
  HRESULT         __fastcall SetFontStyle(int bBold/*[in]*/, int bItalic/*[in]*/, 
                                          int bUnderline/*[in]*/, int bStrikeOut/*[in]*/);
  HRESULT         __fastcall SetOrientation(int Orientation/*[in]*/);
  HRESULT         __fastcall SetPrintOffset(int OffsetX/*[in]*/, int OffsetY/*[in]*/);
  HRESULT         __fastcall SetTextInterval(int TextInterval/*[in]*/);
  HRESULT         __fastcall SetLineInterval(BSTR LineInterval/*[in]*/);
  HRESULT         __fastcall SetTextPrintMode(int Mode/*[in]*/);
  HRESULT         __fastcall SetSeparator(BSTR Separator/*[in]*/);

};
typedef TCOMIDirectPrinterT<IDirectPrinter> TCOMIDirectPrinter;

// *********************************************************************//
// DispIntf:  IDirectPrinter
// Flags:     (4416) Dual OleAutomation Dispatchable
// GUID:      {62342262-E038-4349-B719-EEC4B462948C}
// *********************************************************************//
template<class T>
class IDirectPrinterDispT : public TAutoDriver<IDirectPrinter>
{
public:
  IDirectPrinterDispT(){}

  IDirectPrinterDispT(IDirectPrinter *pintf)
  {
    TAutoDriver<IDirectPrinter>::Bind(pintf, false);
  }

  IDirectPrinterDispT(IDirectPrinterPtr pintf)
  {
    TAutoDriver<IDirectPrinter>::Bind(pintf, true);
  }

  IDirectPrinterDispT& operator=(IDirectPrinter *pintf)
  {
    TAutoDriver<IDirectPrinter>::Bind(pintf, false);
    return *this;
  }

  IDirectPrinterDispT& operator=(IDirectPrinterPtr pintf)
  {
    TAutoDriver<IDirectPrinter>::Bind(pintf, true);
    return *this;
  }

  HRESULT BindDefault()
  {
    return OLECHECK(Bind(CLSID_DirectPrinter));
  }

  HRESULT BindRunning()
  {
    return BindToActive(CLSID_DirectPrinter);
  }

  HRESULT         __fastcall PrintOpen(BSTR PrintTitle/*[in]*/);
  HRESULT         __fastcall PrintTextFormat(long PrintX/*[in]*/, long PrintY/*[in]*/, 
                                             BSTR FontName/*[in]*/, long FontSize/*[in]*/, 
                                             BSTR PrintText/*[in]*/);
  HRESULT         __fastcall PrintClose();
  HRESULT         __fastcall SetCustomPaper(BSTR PaperName/*[in]*/, int Width/*[in]*/, 
                                            int Height/*[in]*/, int LeftInterval/*[in]*/, 
                                            int TopInterval/*[in]*/, int RighttInterval/*[in]*/, 
                                            int BottomInterval/*[in]*/);
  HRESULT         __fastcall SetPaper(BSTR PaperName/*[in]*/);
  HRESULT         __fastcall SetFont(BSTR FontName/*[in]*/);
  HRESULT         __fastcall PrintText(long PrintX/*[in]*/, long PrintY/*[in]*/, 
                                       BSTR PrintText/*[in]*/);
  HRESULT         __fastcall SetFontSize(long FontSize/*[in]*/);
  HRESULT         __fastcall BackupPaper();
  HRESULT         __fastcall RestorePaper();
  HRESULT         __fastcall SetFontStyle(int bBold/*[in]*/, int bItalic/*[in]*/, 
                                          int bUnderline/*[in]*/, int bStrikeOut/*[in]*/);
  HRESULT         __fastcall SetOrientation(int Orientation/*[in]*/);
  HRESULT         __fastcall SetPrintOffset(int OffsetX/*[in]*/, int OffsetY/*[in]*/);
  HRESULT         __fastcall SetTextInterval(int TextInterval/*[in]*/);
  HRESULT         __fastcall SetLineInterval(BSTR LineInterval/*[in]*/);
  HRESULT         __fastcall SetTextPrintMode(int Mode/*[in]*/);
  HRESULT         __fastcall SetSeparator(BSTR Separator/*[in]*/);

};
typedef IDirectPrinterDispT<IDirectPrinter> IDirectPrinterDisp;

// *********************************************************************//
// SmartIntf: TCOMIDirectPrinter
// Interface: IDirectPrinter
// *********************************************************************//
template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::PrintOpen(BSTR PrintTitle/*[in]*/)
{
  return (*this)->PrintOpen(PrintTitle);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::PrintTextFormat(long PrintX/*[in]*/, long PrintY/*[in]*/, 
                                        BSTR FontName/*[in]*/, long FontSize/*[in]*/, 
                                        BSTR PrintText/*[in]*/)
{
  return (*this)->PrintTextFormat(PrintX, PrintY, FontName, FontSize, PrintText);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::PrintClose(void)
{
  return (*this)->PrintClose();
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetCustomPaper(BSTR PaperName/*[in]*/, int Width/*[in]*/, int Height/*[in]*/, 
                                       int LeftInterval/*[in]*/, int TopInterval/*[in]*/, 
                                       int RighttInterval/*[in]*/, int BottomInterval/*[in]*/)
{
  return (*this)->SetCustomPaper(PaperName, Width, Height, LeftInterval, TopInterval, RighttInterval, 
                                 BottomInterval);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetPaper(BSTR PaperName/*[in]*/)
{
  return (*this)->SetPaper(PaperName);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetFont(BSTR FontName/*[in]*/)
{
  return (*this)->SetFont(FontName);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::PrintText(long PrintX/*[in]*/, long PrintY/*[in]*/, BSTR PrintText/*[in]*/)
{
  return (*this)->PrintText(PrintX, PrintY, PrintText);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetFontSize(long FontSize/*[in]*/)
{
  return (*this)->SetFontSize(FontSize);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::BackupPaper(void)
{
  return (*this)->BackupPaper();
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::RestorePaper(void)
{
  return (*this)->RestorePaper();
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetFontStyle(int bBold/*[in]*/, int bItalic/*[in]*/, int bUnderline/*[in]*/, 
                                     int bStrikeOut/*[in]*/)
{
  return (*this)->SetFontStyle(bBold, bItalic, bUnderline, bStrikeOut);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetOrientation(int Orientation/*[in]*/)
{
  return (*this)->SetOrientation(Orientation);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetPrintOffset(int OffsetX/*[in]*/, int OffsetY/*[in]*/)
{
  return (*this)->SetPrintOffset(OffsetX, OffsetY);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetTextInterval(int TextInterval/*[in]*/)
{
  return (*this)->SetTextInterval(TextInterval);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetLineInterval(BSTR LineInterval/*[in]*/)
{
  return (*this)->SetLineInterval(LineInterval);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetTextPrintMode(int Mode/*[in]*/)
{
  return (*this)->SetTextPrintMode(Mode);
}

template <class T> HRESULT __fastcall
TCOMIDirectPrinterT<T>::SetSeparator(BSTR Separator/*[in]*/)
{
  return (*this)->SetSeparator(Separator);
}

// *********************************************************************//
// DispIntf:  IDirectPrinter
// Flags:     (4416) Dual OleAutomation Dispatchable
// GUID:      {62342262-E038-4349-B719-EEC4B462948C}
// *********************************************************************//
template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::PrintOpen(BSTR PrintTitle/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("PrintOpen"), DISPID(1));
  TAutoArgs<1> _args;
  _args[1] = PrintTitle /*[VT_BSTR:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::PrintTextFormat(long PrintX/*[in]*/, long PrintY/*[in]*/, 
                                        BSTR FontName/*[in]*/, long FontSize/*[in]*/, 
                                        BSTR PrintText/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("PrintTextFormat"), DISPID(2));
  TAutoArgs<5> _args;
  _args[1] = PrintX /*[VT_I4:0]*/;
  _args[2] = PrintY /*[VT_I4:0]*/;
  _args[3] = FontName /*[VT_BSTR:0]*/;
  _args[4] = FontSize /*[VT_I4:0]*/;
  _args[5] = PrintText /*[VT_BSTR:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::PrintClose()
{
  _TDispID _dispid(*this, OLETEXT("PrintClose"), DISPID(3));
  return OleFunction(_dispid);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetCustomPaper(BSTR PaperName/*[in]*/, int Width/*[in]*/, int Height/*[in]*/
                                       , int LeftInterval/*[in]*/, int TopInterval/*[in]*/, 
                                       int RighttInterval/*[in]*/, int BottomInterval/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetCustomPaper"), DISPID(4));
  TAutoArgs<7> _args;
  _args[1] = PaperName /*[VT_BSTR:0]*/;
  _args[2] = Width /*[VT_INT:0]*/;
  _args[3] = Height /*[VT_INT:0]*/;
  _args[4] = LeftInterval /*[VT_INT:0]*/;
  _args[5] = TopInterval /*[VT_INT:0]*/;
  _args[6] = RighttInterval /*[VT_INT:0]*/;
  _args[7] = BottomInterval /*[VT_INT:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetPaper(BSTR PaperName/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetPaper"), DISPID(5));
  TAutoArgs<1> _args;
  _args[1] = PaperName /*[VT_BSTR:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetFont(BSTR FontName/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetFont"), DISPID(6));
  TAutoArgs<1> _args;
  _args[1] = FontName /*[VT_BSTR:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::PrintText(long PrintX/*[in]*/, long PrintY/*[in]*/, BSTR PrintText/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("PrintText"), DISPID(7));
  TAutoArgs<3> _args;
  _args[1] = PrintX /*[VT_I4:0]*/;
  _args[2] = PrintY /*[VT_I4:0]*/;
  _args[3] = PrintText /*[VT_BSTR:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetFontSize(long FontSize/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetFontSize"), DISPID(8));
  TAutoArgs<1> _args;
  _args[1] = FontSize /*[VT_I4:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::BackupPaper()
{
  _TDispID _dispid(*this, OLETEXT("BackupPaper"), DISPID(9));
  return OleFunction(_dispid);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::RestorePaper()
{
  _TDispID _dispid(*this, OLETEXT("RestorePaper"), DISPID(10));
  return OleFunction(_dispid);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetFontStyle(int bBold/*[in]*/, int bItalic/*[in]*/, int bUnderline/*[in]*/
                                     , int bStrikeOut/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetFontStyle"), DISPID(11));
  TAutoArgs<4> _args;
  _args[1] = bBold /*[VT_INT:0]*/;
  _args[2] = bItalic /*[VT_INT:0]*/;
  _args[3] = bUnderline /*[VT_INT:0]*/;
  _args[4] = bStrikeOut /*[VT_INT:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetOrientation(int Orientation/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetOrientation"), DISPID(12));
  TAutoArgs<1> _args;
  _args[1] = Orientation /*[VT_INT:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetPrintOffset(int OffsetX/*[in]*/, int OffsetY/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetPrintOffset"), DISPID(13));
  TAutoArgs<2> _args;
  _args[1] = OffsetX /*[VT_INT:0]*/;
  _args[2] = OffsetY /*[VT_INT:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetTextInterval(int TextInterval/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetTextInterval"), DISPID(14));
  TAutoArgs<1> _args;
  _args[1] = TextInterval /*[VT_INT:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetLineInterval(BSTR LineInterval/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetLineInterval"), DISPID(15));
  TAutoArgs<1> _args;
  _args[1] = LineInterval /*[VT_BSTR:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetTextPrintMode(int Mode/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetTextPrintMode"), DISPID(16));
  TAutoArgs<1> _args;
  _args[1] = Mode /*[VT_INT:0]*/;
  return OleFunction(_dispid, _args);
}

template <class T> HRESULT __fastcall
IDirectPrinterDispT<T>::SetSeparator(BSTR Separator/*[in]*/)
{
  _TDispID _dispid(*this, OLETEXT("SetSeparator"), DISPID(17));
  TAutoArgs<1> _args;
  _args[1] = Separator /*[VT_BSTR:0]*/;
  return OleFunction(_dispid, _args);
}

// *********************************************************************//
// The following typedefs expose classes (named CoCoClassName) that       
// provide static Create() and CreateRemote(LPWSTR machineName) methods   
// for creating an instance of an exposed object. These functions can     
// be used by client wishing to automate CoClasses exposed by this        
// typelibrary.                                                           
// *********************************************************************//

// *********************************************************************//
// COCLASS DEFAULT INTERFACE CREATOR
// CoClass  : DirectPrinter
// Interface: TCOMIDirectPrinter
// *********************************************************************//
typedef TCoClassCreatorT<TCOMIDirectPrinter, IDirectPrinter, &CLSID_DirectPrinter, &IID_IDirectPrinter> CoDirectPrinter;
#endif  //   __TLB_NO_INTERFACE_WRAPPERS


};     // namespace Webtools_tlb

#if !defined(NO_IMPLICIT_NAMESPACE_USE)
using  namespace Webtools_tlb;
#endif

#pragma option pop

#endif // __WebTools_TLB_h__
