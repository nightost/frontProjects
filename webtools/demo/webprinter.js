//Webֱ�Ӵ�ӡ��
var WebPrinter = Class.create();

WebPrinter.prototype = {
    //printMode:0-ֱ�Ӵ�ӡ 1-IE��ӡ
    initialize: function(printWindowName, printMode) {
        this.printWindowName = printWindowName || top.printframe;
		
        if(printMode == '1') {
            this.printMode = printMode;
        }
        else {
            this.printMode = '0';
        }		
    },
    
    //Ԥ��
    preview: function(pageName) {    	
        this.prePrint(pageName);
        
		var param = {};
		param.preview = '1'
		param.content = this.printWindowName.document.getElementById('paper').innerHTML;
		
        var result = window.showModalDialog(pageName, param, 'dialogWidth: 1000px; dialogHeight: 600px; resizable: no; help: no; status: no; scroll: yes;');        
        
        if(result == '1') {
        	this.print(pageName);
        }
		
		return result;
    },
    
    
    //��ӡ���ݸ�����Frame
    prePrint: function(pageName) {
        var webPrinter = this;
		
        var printAjax = new Ajax.Request(
        pageName,
        {
            method: 'get',
			asynchronous: false,
            onComplete: function(result) {
                webPrinter.printWindowName.document.write(result.responseText);
                webPrinter.printWindowName.document.close();

			if(typeof Cs.ctrl.Print.beforePrintContent != 'undefined' && Cs.ctrl.Print.beforePrintContent instanceof Function)
				Cs.ctrl.Print.beforePrintContent();
            }
        });
    },
    
    //��ӡ���ݸ�����Frame�����֮�����printContent����ֱ�Ӵ�ӡ
    print: function(pageName) {
        var webPrinter = this;
		
        var printAjax = new Ajax.Request(
        pageName,
        {
            method: 'get',
			asynchronous: false,
            onComplete: function(result) {
                webPrinter.printWindowName.document.write(result.responseText);
                webPrinter.printWindowName.document.close();
				webPrinter.printContent();
				
            }
        });
    },
		
    printContent: function() {	
		
		if(typeof Cs.ctrl.Print.beforePrintContent != 'undefined' && Cs.ctrl.Print.beforePrintContent instanceof Function)
			Cs.ctrl.Print.beforePrintContent();

        try
        {
			DirectPrinter.BackupPaper();
			//debugger
            //���ô�ӡֽ��
            var paper = this.printWindowName.document.getElementById('paper');
            if(paper == null)
            	return;

			var divCount = paper.getElementsByTagName('div');

            var paperWidth = parseInt(paper.currentStyle.width) * 10;
            var paperHeight = parseInt(paper.currentStyle.height) * 10;
            
            DirectPrinter.SetCustomPaper(paper.name, paperWidth, paperHeight, 0, 0, 0,0);
			
			//���û��зָ���
			var separator = '';
			if(this.printWindowName.document.getElementById('separator'))
				separator = this.printWindowName.document.getElementById('separator').innerHTML;
			DirectPrinter.SetSeparator(separator);

	    	//IE��ʽ��ӡ������ֽ�Ŵ�С֮�����
	    	if(this.printMode != '0') {
	    		this.printWindowName.document.execCommand("Print");
	    		return;
	    	}
	
            //��ʼ��ӡ
            DirectPrinter.PrintOpen(paper.name);
           
			//����ƫ����
			var offsetX = 0;
			if(this.printWindowName.document.getElementById('offsetX'))
				offsetX = parseInt(this.printWindowName.document.getElementById('offsetX').innerHTML);
				
			var offsetY = 0;
			if(this.printWindowName.document.getElementById('offsetY'))
				offsetY = parseInt(this.printWindowName.document.getElementById('offsetY').innerHTML);
				
			DirectPrinter.SetPrintOffset(offsetX, offsetY);
           
            var i, printWordWrap;
            var printX, printY, printFontName, printFontSize, printText;
            var textInterval, lineInterval;
            var printBold,printItalic,printUnderline,printStrikeOut;
			
            
            for(i = 0; i < divCount.length; i++) {
                if(divCount[i].currentStyle.display == 'none' || divCount[i].currentStyle.previewOnly == 'yes')
                    continue;
                if(paper == divCount[i] || divCount[i].innerHTML == '')
                    continue;

				//�ı���ӡģʽ
                //Mode��0-Խ�߽�ʱʡ�ԣ�1���Զ�����
                printWordWrap = divCount[i].currentStyle.wordWrap == 'break-word' ?1:0;
                DirectPrinter.SetTextPrintMode(printWordWrap);
                
                //printX = divCount[i].offsetLeft;
				//printY = divCount[i].offsetTop;
                printX = parseInt(divCount[i].currentStyle.left);
                printY = parseInt(divCount[i].currentStyle.top);
				
                printFontName = divCount[i].currentStyle.fontFamily;
                printFontSize = parseInt(divCount[i].currentStyle.fontSize);
                
                //�ּ��
                textInterval = divCount[i].currentStyle.letterSpacing;
                if(textInterval == "normal")
                    textInterval = 0;
                else
                    textInterval = parseInt(textInterval);
                DirectPrinter.SetTextInterval(textInterval);
                    
                //�м��
                lineInterval = divCount[i].currentStyle.lineHeight;
                if(lineInterval != "normal")
                    lineInterval = parseInt(lineInterval);
                DirectPrinter.SetLineInterval(lineInterval);
                
                //������
                printBold = divCount[i].currentStyle.fontWeight == 700?1:0;
                printItalic = divCount[i].currentStyle.fontStyle == 'italic' ||
                    divCount[i].currentStyle.fontStyle == 'oblique' ?1:0;
                printUnderline = divCount[i].style.textDecoration.indexOf('underline') != -1 ?1:0;
                printStrikeOut = divCount[i].style.textDecoration.indexOf('line-through') != -1 ?1:0;
                DirectPrinter.SetFontStyle(printBold, printItalic, printUnderline, printStrikeOut);

                printText = divCount[i].innerHTML;
                DirectPrinter.PrintTextFormat(printX, printY, printFontName, printFontSize, printText);
            }
            
            //������ӡ
            DirectPrinter.PrintClose();
            DirectPrinter.RestorePaper();
        }
        catch(e) {
            alert('��ӡ�쳣��' + e.message);
        }
    },
    
    //��JSON��ʽ��������
    /*var divPaper =     
    {     
        "div1":"111",
        "div2":"222",
        "div3":"333",
        "div4":"444",
        "div5":"555"
    };*/
    updatePaper: function(divPaper) {		
		for(var c in divPaper) {
			if(c == "toJSONString")
	    		;
			else
				this.printWindowName.document.getElementById(c).innerHTML = divPaper[c];
		}
    },
	
	insertOne: function(id,style,content) {
		_s = '<div id="' + id + '" style="' + style + '">' + content + '</div>';
		new Insertion.Bottom(this.printWindowName.document.getElementById('paper'), _s);
    }
}

WebPrinter.loadActiveX = function() {
	new Insertion.Top(document.getElementsByTagName('body')[0], '<object id="DirectPrinter" classid="CLSID:A3C5160E-FD3C-4474-A879-2BF3397F2CD8"	CODEBASE="' + codeBase + '" style="display:none;"></object>');
	//DirectPrinter.SetBaudRate(_baudRate);
}

var WebTool = Class.create();

WebTool.prototype = {
    
    initialize:function(){
        if ($("DirectPrinter")==null){
            new Insertion.Top(document.getElementsByTagName('body')[0], '<object id="DirectPrinter" classid="CLSID:A3C5160E-FD3C-4474-A879-2BF3397F2CD8"	CODEBASE="' + codeBase + '" style="display:none;"></object>');
	        DirectPrinter.SetBaudRate(_baudRate);
        }
    },
    
    setBaudRate:function(rate){
        DirectPrinter.SetBaudRate(rate);
    },
    
    readFirstPwd:function(){
        return DirectPrinter.ReadCom(0,"COM1");
    },
    
    readSecondPwd:function(){
        return DirectPrinter.ReadCom(1,"COM1");
    }
}
