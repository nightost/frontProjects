// DIRECTPRINTERIMPL : Implementation of TDirectPrinterImpl (CoClass: DirectPrinter, Interface: IDirectPrinter)

#include <vcl.h>
#pragma hdrstop
#include "DirectPrinterImpl.h"

/////////////////////////////////////////////////////////////////////////////
// TDirectPrinterImpl

//开始打印
STDMETHODIMP TDirectPrinterImpl::PrintOpen(BSTR PrintTitle)
{
    hPrinter->Title = PrintTitle;
    hPrinter->BeginDoc();
    return S_OK;
}

//结束打印
STDMETHODIMP TDirectPrinterImpl::PrintClose()
{
    hPrinter->EndDoc();
    return S_OK;
}

//设置字体类型
STDMETHODIMP TDirectPrinterImpl::SetFont(BSTR FontName)
{
    this->FontName = FontName;
    return S_OK;
}

//设置字体大小
STDMETHODIMP TDirectPrinterImpl::SetFontSize(long FontSize)
{
    this->FontSize = FontSize*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;
    return S_OK;
}

//打印文本
STDMETHODIMP TDirectPrinterImpl::PrintText(long PrintX, long PrintY,
  BSTR PrintText)
{
    hPrinter->Canvas->Font->Name = this->FontName;
    //hPrinter->Canvas->Font->Size = this->FontSize;
    hPrinter->Canvas->Font->Height = this->FontSize;
    hPrinter->Canvas->Brush->Style = bsClear;

    PrintX = PrintX*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;
    PrintY = PrintY*GetDeviceCaps(hPrinter->Handle,LOGPIXELSY)/Screen->PixelsPerInch;
    
    AnsiString strPrintText = PrintText;
    int iPosition = 0;
    int iSepLength = Separator.Length();

    TStringList *stPrintText = new TStringList();

    if(iSepLength > 0)
    {
        while(strPrintText.Length() > 0)
        {
            iPosition = strPrintText.AnsiPos(Separator);
            if(iPosition > 0)
            {
                stPrintText->Add(strPrintText.SubString(1,iPosition-1));
                strPrintText = strPrintText.SubString(iPosition+iSepLength,strPrintText.Length()-iPosition-iSepLength+1);
            }
            else
            {
                stPrintText->Add(strPrintText);
                strPrintText = "";
            }
        }
    }
    else
    {
        stPrintText->Add(strPrintText);
    }

    //计算行间距
    ComputeLineInterval();

    int iCount = stPrintText->Count;
    for(int i = 0; i < iCount; i++)
    {
        if(i > 0)
            PrintY += hPrinter->Canvas->TextHeight("1") + iLineInterval;

        if(TextPrintMode == 0)
            hPrinter->Canvas->TextOut(PrintX + OffsetX,PrintY + OffsetY, stPrintText->Strings[i]);
        else
            PrintMultiText(PrintX, PrintY,  stPrintText->Strings[i]);
    }

    delete stPrintText;

    return S_OK;
}

//格式化打印文本
STDMETHODIMP TDirectPrinterImpl::PrintTextFormat(long PrintX, long PrintY,
  BSTR FontName, long FontSize, BSTR PrintText)
{
    hPrinter->Canvas->Font->Name = FontName;
    //hPrinter->Canvas->Font->Size = FontSize;
    hPrinter->Canvas->Font->Height =
        FontSize*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;
    hPrinter->Canvas->Brush->Style = bsClear;

    PrintX = PrintX*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;
    PrintY = PrintY*GetDeviceCaps(hPrinter->Handle,LOGPIXELSY)/Screen->PixelsPerInch;

    AnsiString strPrintText = PrintText;
    int iPosition = 0;
    int iSepLength = Separator.Length();

    TStringList *stPrintText = new TStringList();

    if(iSepLength > 0)
    {
        while(strPrintText.Length() > 0)
        {
            iPosition = strPrintText.AnsiPos(Separator);
            if(iPosition > 0)
            {
                stPrintText->Add(strPrintText.SubString(1,iPosition-1));
                strPrintText = strPrintText.SubString(iPosition+iSepLength,strPrintText.Length()-iPosition-iSepLength+1);
            }
            else
            {
                stPrintText->Add(strPrintText);
                strPrintText = "";
            }
        }
    }
    else
    {
        stPrintText->Add(strPrintText);
    }

    //计算行间距
    ComputeLineInterval();

    int iCount = stPrintText->Count;
    for(int i = 0; i < iCount; i++)
    {
        if(i > 0)
            PrintY += hPrinter->Canvas->TextHeight("1") + iLineInterval;

        if(TextPrintMode == 0)
            hPrinter->Canvas->TextOut(PrintX + OffsetX,PrintY + OffsetY, stPrintText->Strings[i]);
        else
            PrintMultiText(PrintX, PrintY,  stPrintText->Strings[i]);
    }

    delete stPrintText;

    return S_OK;
}

//设置纸张类型
STDMETHODIMP TDirectPrinterImpl::SetPaper(BSTR PaperName)
{
    TPrinterMgr *PrinterMgr = new TPrinterMgr();
    AnsiString strPrinterName = "";
    AnsiString strPaperName = PaperName;

    __try
    {
        try
        {
            strPrinterName = PrinterMgr->GetDefaultPrinter();
        }
        catch (Exception &ex)
        {
            ShowMessage("获取打印机名称失败！");
            delete PrinterMgr;
            return S_FALSE;
        }

        if(strPrinterName == "")
        {
            ShowMessage("获取打印机名称失败！");
            return S_FALSE;
        }

        try
        {
            PrinterMgr->SetPaper(strPrinterName.c_str(), strPaperName.c_str(), DMORIENT_PORTRAIT);
        }
        catch(Exception &ex)
        {
            ShowMessage("设置打印纸张类型失败！");
            delete PrinterMgr;
            return S_FALSE;
        }

    }
    __finally
    {
        if(PrinterMgr)
        {
            delete PrinterMgr;
        }
    }

    return S_OK;
}

//设置自定义纸张
STDMETHODIMP TDirectPrinterImpl::SetCustomPaper(BSTR PaperName, int Width,
  int Height, int LeftInterval, int TopInterval, int RighttInterval,
  int BottomInterval)
{
    AnsiString strPrinterName = "";
    AnsiString strPaperName = PaperName;
    TPrinterMgr *PrinterMgr = new TPrinterMgr();

    __try
    {
        try
        {
            strPrinterName = PrinterMgr->GetDefaultPrinter();
        }
        catch (Exception &ex)
        {
            ShowMessage("获取打印机名称失败：" + ex.Message);
            delete PrinterMgr;
            return S_FALSE;
        }

        if(strPrinterName == "")
        {
            ShowMessage("获取打印机名称失败！");
            delete PrinterMgr;
            return S_FALSE;
        }

        try
        {
            //设置打印机
            if (PrinterMgr->IsWindowsNT())
            {
                PrinterMgr->AddCustomPaper(strPrinterName.c_str(), strPaperName.c_str(), Width,Height,
                TRect (LeftInterval,TopInterval,RighttInterval,BottomInterval));
                PrinterMgr->SetPaper(strPrinterName.c_str(), strPaperName.c_str(), DMORIENT_PORTRAIT);
            }
        }
        catch(Exception &ex)
        {
            ShowMessage("设置打印纸张类型失败：" + ex.Message);
            delete PrinterMgr;
            return S_FALSE;
        }
    }
    __finally
    {
        if(PrinterMgr)
        {
            delete PrinterMgr;
        }
    }

    return S_OK;
}

//备份纸张信息
STDMETHODIMP TDirectPrinterImpl::BackupPaper()
{
    TPrinterMgr *PrinterMgr = new TPrinterMgr();
    AnsiString strPrinterName = "";

    __try
    {
        try
        {
            strPrinterName = PrinterMgr->GetDefaultPrinter();
        }
        catch (Exception &ex)
        {
            ShowMessage("获取打印机名称失败！");
            delete PrinterMgr;
            return S_FALSE;
        }

        if(strPrinterName == "")
        {
            ShowMessage("获取打印机名称失败！");
            return S_FALSE;
        }

        try
        {
            pv_info_ppi2 = PrinterMgr->GetPrinterInfo(strPrinterName.c_str());
        }
        catch(Exception &ex)
        {
            ShowMessage("备份纸张信息失败：" + ex.Message);
            delete PrinterMgr;
            return S_FALSE;
        }

    }
    __finally
    {
        if(PrinterMgr)
        {
            delete PrinterMgr;
        }
    }

    return S_OK;
}

//恢复纸张信息
STDMETHODIMP TDirectPrinterImpl::RestorePaper()
{
    if(pv_info_ppi2 == NULL)
        return S_FALSE;
        
    TPrinterMgr *PrinterMgr = new TPrinterMgr();
    bool bSuccess = false;

    __try
    {
        try
        {
            bSuccess = PrinterMgr->SetPrinterInfo(pv_info_ppi2);
        }
        catch(Exception &ex)
        {
            ShowMessage("恢复纸张信息失败：" + ex.Message);
            delete PrinterMgr;
            return S_FALSE;
        }

    }
    __finally
    {
        if(PrinterMgr)
        {
            delete PrinterMgr;
        }
    }

    if(bSuccess)
        return S_OK;
    else
        return S_FALSE;
}

//设置字体风格
//bBold：粗体，bItalic：斜体，bUnderline：下划线，bStrikeOut：删除线
STDMETHODIMP TDirectPrinterImpl::SetFontStyle(int bBold, int bItalic,
  int bUnderline, int bStrikeOut)
{
    try
    {
        TFontStyles fontStyles;
        fontStyles.Clear();

        if(bBold)
            fontStyles << fsBold;
        if(bItalic)
            fontStyles << fsItalic;
        if(bUnderline)
            fontStyles << fsUnderline;
        if(bStrikeOut)
            fontStyles << fsStrikeOut;

        hPrinter->Canvas->Font->Style = fontStyles;
    }
    catch(Exception &ex)
    {
        ShowMessage("设置字体风格失败：" + ex.Message);
        return S_FALSE;
    }

    return S_OK;
}

//设置打印方向
//0：横打，1：纵打，默认：纵打
STDMETHODIMP TDirectPrinterImpl::SetOrientation(int Orientation)
{
    try
    {
        if(Orientation == 0)
            hPrinter->Orientation = poLandscape;
        else
            hPrinter->Orientation = poPortrait;
    }
    catch(Exception &ex)
    {
        ShowMessage("设置打印方向失败：" + ex.Message);
        return S_FALSE;
    }

    return S_OK;
}

//设置打印偏移量
//OffsetX：水平偏移量，OffsetY：垂直偏移量
STDMETHODIMP TDirectPrinterImpl::SetPrintOffset(int OffsetX, int OffsetY)
{
    this->OffsetX = OffsetX*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;;
    this->OffsetY = OffsetY*GetDeviceCaps(hPrinter->Handle,LOGPIXELSY)/Screen->PixelsPerInch;;
    
    return S_OK;
}

//设置字间距
STDMETHODIMP TDirectPrinterImpl::SetTextInterval(int TextInterval)
{
    TextInterval = TextInterval*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;;
    int iOldTextInterval = SetTextCharacterExtra(hPrinter->Canvas->Handle, TextInterval);

    if(iOldTextInterval == 0x80000000)
        return S_FALSE;

    return S_OK;
}

//设置行间距
//LineInterval:normal-默认行间距，其他数值：行间距，单位：像素
STDMETHODIMP TDirectPrinterImpl::SetLineInterval(BSTR LineInterval)
{
    AnsiString str = LineInterval;

    if(str == "normal")
        bNormalLine = true;
    else
    {
        if(StrToIntDef(str, 88888) == 88888)
            bNormalLine = true;
        else
        {
            bNormalLine = false;
            this->LineInterval = StrToIntDef(str, 88888);
        }
    }
    
    return S_OK;
}

//文本打印模式
//Mode：0-越边界时省略，1：自动换行
STDMETHODIMP TDirectPrinterImpl::SetTextPrintMode(int Mode)
{
    this->TextPrintMode = Mode;
    return S_OK;
}

//设置打印分隔符
STDMETHODIMP TDirectPrinterImpl::SetSeparator(BSTR Separator)
{
    this->Separator = Separator;
    return S_OK;
}


/*******************************************************************************
 *私有方法开始
*******************************************************************************/
//检测字符串最后一个字符是否为半个汉字
bool __fastcall TDirectPrinterImpl::IsHalfChar(AnsiString str)
{
    bool bLeadByte = false;

    int iLength = str.Length();

    for(int i = 1; i <= iLength; i++)
    {
        if(bLeadByte)
            bLeadByte = false;
        else
        {
            if(str.ByteType(i) == mbLeadByte)
                bLeadByte = true;
        }
    }

    return bLeadByte;
}

//计算行间距
void __fastcall TDirectPrinterImpl::ComputeLineInterval()
{
    //默认行间距
    if(bNormalLine)
    {
        iLineInterval = hPrinter->Canvas->Font->Height * 0.14 + 0.5;
    }
    else
    {
        iLineInterval =
            LineInterval*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch -
            hPrinter->Canvas->Font->Height + 0.5;
    }
}

//多行文本打印
void __fastcall TDirectPrinterImpl::PrintMultiText(long &PrintX, long &PrintY, AnsiString PrintText)
{
    AnsiString strPrintText = PrintText;

    //一行可打印的字符数
    int iColCount = (hPrinter->PageWidth - PrintX) / hPrinter->Canvas->TextWidth("1");

    //当前行打印的字符串
    AnsiString strCurPrintText = strPrintText.SubString(1, iColCount);
    if(IsHalfChar(strCurPrintText))
        strCurPrintText = strPrintText.SubString(1, iColCount-1);

    hPrinter->Canvas->TextOut(PrintX + OffsetX,PrintY + OffsetY,strCurPrintText);

    //递归打印
    if(strCurPrintText.Length() >= strPrintText.Length())
        return;

    PrintY += hPrinter->Canvas->TextHeight("1") + iLineInterval;
    PrintMultiText(PrintX, PrintY,
        strPrintText.SubString(strCurPrintText.Length()+1,
            strPrintText.Length()-strCurPrintText.Length()));
}
/*******************************************************************************
 *私有方法结束
*******************************************************************************/

