// DIRECTPRINTERIMPL : Implementation of TDirectPrinterImpl (CoClass: DirectPrinter, Interface: IDirectPrinter)

#include <vcl.h>
#pragma hdrstop
#include "DirectPrinterImpl.h"

/////////////////////////////////////////////////////////////////////////////
// TDirectPrinterImpl

//��ʼ��ӡ
STDMETHODIMP TDirectPrinterImpl::PrintOpen(BSTR PrintTitle)
{
    hPrinter->Title = PrintTitle;
    hPrinter->BeginDoc();
    return S_OK;
}

//������ӡ
STDMETHODIMP TDirectPrinterImpl::PrintClose()
{
    hPrinter->EndDoc();
    return S_OK;
}

//������������
STDMETHODIMP TDirectPrinterImpl::SetFont(BSTR FontName)
{
    this->FontName = FontName;
    return S_OK;
}

//���������С
STDMETHODIMP TDirectPrinterImpl::SetFontSize(long FontSize)
{
    this->FontSize = FontSize*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;
    return S_OK;
}

//��ӡ�ı�
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

    //�����м��
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

//��ʽ����ӡ�ı�
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

    //�����м��
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

//����ֽ������
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
            ShowMessage("��ȡ��ӡ������ʧ�ܣ�");
            delete PrinterMgr;
            return S_FALSE;
        }

        if(strPrinterName == "")
        {
            ShowMessage("��ȡ��ӡ������ʧ�ܣ�");
            return S_FALSE;
        }

        try
        {
            PrinterMgr->SetPaper(strPrinterName.c_str(), strPaperName.c_str(), DMORIENT_PORTRAIT);
        }
        catch(Exception &ex)
        {
            ShowMessage("���ô�ӡֽ������ʧ�ܣ�");
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

//�����Զ���ֽ��
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
            ShowMessage("��ȡ��ӡ������ʧ�ܣ�" + ex.Message);
            delete PrinterMgr;
            return S_FALSE;
        }

        if(strPrinterName == "")
        {
            ShowMessage("��ȡ��ӡ������ʧ�ܣ�");
            delete PrinterMgr;
            return S_FALSE;
        }

        try
        {
            //���ô�ӡ��
            if (PrinterMgr->IsWindowsNT())
            {
                PrinterMgr->AddCustomPaper(strPrinterName.c_str(), strPaperName.c_str(), Width,Height,
                TRect (LeftInterval,TopInterval,RighttInterval,BottomInterval));
                PrinterMgr->SetPaper(strPrinterName.c_str(), strPaperName.c_str(), DMORIENT_PORTRAIT);
            }
        }
        catch(Exception &ex)
        {
            ShowMessage("���ô�ӡֽ������ʧ�ܣ�" + ex.Message);
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

//����ֽ����Ϣ
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
            ShowMessage("��ȡ��ӡ������ʧ�ܣ�");
            delete PrinterMgr;
            return S_FALSE;
        }

        if(strPrinterName == "")
        {
            ShowMessage("��ȡ��ӡ������ʧ�ܣ�");
            return S_FALSE;
        }

        try
        {
            pv_info_ppi2 = PrinterMgr->GetPrinterInfo(strPrinterName.c_str());
        }
        catch(Exception &ex)
        {
            ShowMessage("����ֽ����Ϣʧ�ܣ�" + ex.Message);
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

//�ָ�ֽ����Ϣ
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
            ShowMessage("�ָ�ֽ����Ϣʧ�ܣ�" + ex.Message);
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

//����������
//bBold�����壬bItalic��б�壬bUnderline���»��ߣ�bStrikeOut��ɾ����
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
        ShowMessage("����������ʧ�ܣ�" + ex.Message);
        return S_FALSE;
    }

    return S_OK;
}

//���ô�ӡ����
//0�����1���ݴ�Ĭ�ϣ��ݴ�
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
        ShowMessage("���ô�ӡ����ʧ�ܣ�" + ex.Message);
        return S_FALSE;
    }

    return S_OK;
}

//���ô�ӡƫ����
//OffsetX��ˮƽƫ������OffsetY����ֱƫ����
STDMETHODIMP TDirectPrinterImpl::SetPrintOffset(int OffsetX, int OffsetY)
{
    this->OffsetX = OffsetX*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;;
    this->OffsetY = OffsetY*GetDeviceCaps(hPrinter->Handle,LOGPIXELSY)/Screen->PixelsPerInch;;
    
    return S_OK;
}

//�����ּ��
STDMETHODIMP TDirectPrinterImpl::SetTextInterval(int TextInterval)
{
    TextInterval = TextInterval*GetDeviceCaps(hPrinter->Handle,LOGPIXELSX)/Screen->PixelsPerInch;;
    int iOldTextInterval = SetTextCharacterExtra(hPrinter->Canvas->Handle, TextInterval);

    if(iOldTextInterval == 0x80000000)
        return S_FALSE;

    return S_OK;
}

//�����м��
//LineInterval:normal-Ĭ���м�࣬������ֵ���м�࣬��λ������
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

//�ı���ӡģʽ
//Mode��0-Խ�߽�ʱʡ�ԣ�1���Զ�����
STDMETHODIMP TDirectPrinterImpl::SetTextPrintMode(int Mode)
{
    this->TextPrintMode = Mode;
    return S_OK;
}

//���ô�ӡ�ָ���
STDMETHODIMP TDirectPrinterImpl::SetSeparator(BSTR Separator)
{
    this->Separator = Separator;
    return S_OK;
}


/*******************************************************************************
 *˽�з�����ʼ
*******************************************************************************/
//����ַ������һ���ַ��Ƿ�Ϊ�������
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

//�����м��
void __fastcall TDirectPrinterImpl::ComputeLineInterval()
{
    //Ĭ���м��
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

//�����ı���ӡ
void __fastcall TDirectPrinterImpl::PrintMultiText(long &PrintX, long &PrintY, AnsiString PrintText)
{
    AnsiString strPrintText = PrintText;

    //һ�пɴ�ӡ���ַ���
    int iColCount = (hPrinter->PageWidth - PrintX) / hPrinter->Canvas->TextWidth("1");

    //��ǰ�д�ӡ���ַ���
    AnsiString strCurPrintText = strPrintText.SubString(1, iColCount);
    if(IsHalfChar(strCurPrintText))
        strCurPrintText = strPrintText.SubString(1, iColCount-1);

    hPrinter->Canvas->TextOut(PrintX + OffsetX,PrintY + OffsetY,strCurPrintText);

    //�ݹ��ӡ
    if(strCurPrintText.Length() >= strPrintText.Length())
        return;

    PrintY += hPrinter->Canvas->TextHeight("1") + iLineInterval;
    PrintMultiText(PrintX, PrintY,
        strPrintText.SubString(strCurPrintText.Length()+1,
            strPrintText.Length()-strCurPrintText.Length()));
}
/*******************************************************************************
 *˽�з�������
*******************************************************************************/

