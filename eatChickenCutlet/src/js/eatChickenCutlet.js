//参数配置
var _eatBeef;
var _winxinid="";
$(function(){
	_winxinid=$.trim($("#wixinId").val());
	$(document).bind("touchmove",function(e){
		e.preventDefault();
	});
	_eatBeef=new eatBeef({maxTime:3});
	// _eatBeef.getNum();
});
//loaded
window.onload=function(){
    $(".cover").hide();
    //
    $(".steamer").addClass("steamerNormal");
    $(".desk").addClass("deskNormal");
}
/**
 * [eatBeff description]
 * @return {[obj]}
 */
function eatBeef(obj){
	var isShowResult=false;
	var shareStr="";
	this.chatStr="";
	var _startFlag=false;
	var _scoreCom="0";
	var _arg=obj||{};
	var _eatNum=0;
	var _eatBtn=$(".eat-btn");
	var _this=this;
    var _steamState=0;
	this.getStr=function(){
		return shareStr;
	};
	this.getRecord=function(){
		return _scoreCom;
	};
	this.getNum=function(){
		return _eatNum;
	};
	try{
		var _maxTime=_arg.maxTime;
	}
	catch(e){
		console.log("Error:"+e);
	}
	
	this.init=function(){
		//点击我吃
		_eatBtn.bind("touchstart mousedown",function(){
			$(this).find(".start-eat-active").show();
			$(this).find(".start-eat").hide();
		});
		_eatBtn.bind("touchend mouseup",function(){
            $(this).find(".start-eat-active").hide();
            $(this).find(".start-eat").show();
		});
		//吃牛肉的循环逻辑
		_eatBtn.data("step",0);
		_eatBtn.bind("touchstart",function(e){
			//开始计时
			if(!_startFlag){
				_startFlag=true;
				startTimer();
			}
			var _step=parseInt(_eatBtn.data("step"));
			switch(_step){
				case 0:
					showHands(0,1);
					showheads(1,0);
					_eatBtn.data("step",1);
					break;
				case 1:
					showHands(_step,2);
					showheads(2,1);
					_eatBtn.data("step",2);
					break;
				case 2:
					showHands(_step,3);
					showheads(3,2);
					_eatBtn.data("step",3);
					break;
				case 3:
					showHands(_step,4);
					showheads(1,3);
					_eatBtn.data("step",4);
					break;
				case 4:
					showHands(_step,5);
					showheads(2,1);
					_eatBtn.data("step",5);
					break;
                case 5:
                    showHands(_step,6);
                    showheads(3,2);
                    _eatBtn.data("step",6);
                    break;
                case 6:
                    showHands(_step,1);
                    showheads(1,3);
                    _eatBtn.data("step",1);
                    break;
			}
			//计数
			_eatNum++;
			if(_eatNum>30&&_eatNum<105){
                if(_steamState==0){
                    $(".steamer").attr("src",$(".steamer").attr("data-src1"));
                }
                _steamState=1;
			}
            else if(_eatNum>95&&_eatNum<205){
                if(_steamState==1){
                    $(".steamer").attr("src",$(".steamer").attr("data-src2"));
                }
                _steamState=2;
            }
            else if(_eatNum>205){
                if(_steamState==2){
                    $(".steamer").attr("src",$(".steamer").attr("data-src3"));
                }
                _steamState=3;
            }
			$(".pro-num span").text(_eatNum);
		});
	}
	/**
	 * [startTimer description]
	 * @return {[type]}
	 */
	function startTimer(){
		//定时器
		$(".progress").animate({width:"0px"},_maxTime*1000,"linear",function(){
			countResult(_this);
		});
	}
	/**
	 * [countResult description]
	 * @return {[type]}
	 */
	function countResult(obj){
		//unbind fns
		$(".steamer").attr("src",$(".steamer").attr("data-src2"));
		_eatBtn.unbind("click touchstart touchend mouseup mousedown");
		$(".time-up").show();
		//显示time up
		setTimeout(function(){
			showResultInfo(obj);
			sendScore();
		},1500);
	}
	/**
	 * upload user score
	 */
	function sendScore(){
		var _url="./insertGameScore";
		var _ip=$.trim($("#reqIp").val());
		var _data={
				"wixinId":_winxinid,
				"scoreValue":_eatNum
			};
		var _data1="inparam="
			+ encodeURIComponent(JSON.stringify(_data));
		var _ajax=$.ajax({
			url:_url,
			dataType:"json",
			type:"POST",
			data:_data1,
			timeout:5000,
			success:function(response){
				if(response.record){
					_scoreCom=response.record;
					if(parseInt(_scoreCom)>90){
						var _uniRecord=0;
						if(response.globalRecord){
							_uniRecord=response.globalRecord;
						}
						$("#uni-text #uni-record").text(_uniRecord);
						$("#uni-text").show();
					}
				}
				console.log("分数提交成功");
				$("#score i").text(_scoreCom);
				$("#score").show();
				$("#spinner").hide();
			},
			error:function(xhr,status){
				console.log("分数提交失败");
				showResultInfo(obj);
				if(status=='timeout'){
					_ajax.abort();
					console.log("超时");
					
				}
			},
			complete:function(xhr,status){
				if(status=='timeout'){
					//_ajax.abort();
					console.log("超时");
					
				}
			}
		   });
	}
	/**
	 * [showResultInfo description]
	 * @return {[type]}
	 */
	function showResultInfo(thisObj){
		isShowResult=true;
		// result-box
		// result-box
		$("#detail_link").bind("click",function(e){
			readLog();
			e.preventDefault();
			window.location.href="http://mp.weixin.qq.com/s?__biz=MzA4NzgwMTQyNw==&mid=201124496&idx=1&sn=f9f8ba913851b6f93bd6c5f1d6e74f6a#rd";
		});
		if(_eatNum<=20){
			thisObj.chatStr = _eatNum + "块牛肉不过瘾，打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 咋们得牛逼啊！！";
			showMotion(1);
		}
		else if(20<_eatNum&&_eatNum<=35){
			thisObj.chatStr = "我勒个去，你只吃了" + _eatNum + "个牛肉，打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 太慢了吧。。";
			showMotion(1);
		}
		else if(35<_eatNum&&_eatNum<=50){
			thisObj.chatStr = "胃口不错，一口气吃" + _eatNum + "个，打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 吃完牛肉记来碗汤";
			showMotion(2);
		}
		else if(50<_eatNum&&_eatNum<=65){
			thisObj.chatStr = "万万没有想到！你吃了" + _eatNum + "个牛肉！打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 放开吃，吃完哥请你喝牛肉汤！";
			showMotion(2);
		}
		else if(65<_eatNum&&_eatNum<=80){
			thisObj.chatStr = "你吃了" + _eatNum + "个牛肉，打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 看样子你根本停不下来，加油，再来一次更牛的！！";
			showMotion(2);
		}
		else if(80<_eatNum&&_eatNum<=95){
			thisObj.chatStr = "你吃了" + _eatNum + "个牛肉，打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 这样的速度，标准的一吃货啊！！ ！";
			showMotion(3);
		}
		else if(95<_eatNum&&_eatNum<=110){
			thisObj.chatStr = "你吃了" + _eatNum + "个牛肉，打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 我看你天赋异禀、骨骼惊奇，想来是百年难得一见的吃货奇才！";
			showMotion(3);
		}
		else if(110<_eatNum&&_eatNum<=125){
			thisObj.chatStr = "我勒个去，你吃了" + _eatNum + "个牛肉…打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! …说点什么好？记得吃药…。";
			showMotion(3);
		}
		else if(125<_eatNum&&_eatNum<=140){
			thisObj.chatStr = "你吃了" + _eatNum + "个牛肉。打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 你这么吊，你爸妈知道么？";
			showMotion(3);
		}
		else if(140<_eatNum&&_eatNum<=170){
			thisObj.chatStr = _eatNum +"个牛肉？？不敢相信！！打败了 "+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 人类已经无法阻止你吃牛肉了！！";
			showMotion(3);
		}
		else if(170<_eatNum){
			thisObj.chatStr = _eatNum +"个牛肉？？不敢相信！！打败了"+"<span id='score' style='display:none'>"+"<i>"+_scoreCom+"</i>"+"%"+"</span> <span id='spinner'></span> "+"的玩家 ! 你确定你没作弊？？？";
			showMotion(3);
		}
		shareStr = "我在《吃牛肉大赛》中吃掉了" + _eatNum + "个牛肉，打败了";//
		$(".start-eat").hide();
		$(".result-box .result-info .result-text").html(thisObj.chatStr);
		$(".result-box").show();
	}
	function showMotion(state){
        $(".heads img").hide();
		$(".hands div").hide();
        $(".steamer").hide();
        $(".eat-btn").hide();
        $(".desk").hide();
		switch(state){
            case 1:
				$(".low-score").show();
                showResultText(1);
				break;
			case 2:
				$(".middle-score").show();
                showResultText(2);
				break;
			case 3:
				$(".high-score").show();
                showResultText(3);
				break;
		}
	}
    function showResultText(index){
        $(".re-info").show();
        var _index=index-1;
        $(".result-title img").eq(_index).show();
    }
	/**
	 * [showResultInfo description]
	 * @return {[type]}
	 */
	function hideResultInfo(){
		// result-box
	}
	
	this.init();
}
/**
*show hands
*/
function showHands(laststep,index){
	var _lastClass="#step-"+laststep;
	var _class="#step-"+index;
	$(_lastClass).css("display","none");
	$(_class).css("display","block");
    $(".hands").data("curIndex",index);
}
function showheads(index,last){
	var _heads=$(".heads");
    _heads.find("img").eq(last).hide();
    _heads.find("img").eq(index).show();
    $(".heads").data("curIndex",index);
}
//初始化分享内容的函数
function sendMessage(){
	var _str=_eatBeef.getStr();
    WeixinJSBridge.on('menu:share:timeline', function(argv){
         WeixinJSBridge.invoke('shareTimeline',{
            "appid":"",                                              //appid 设置为空
            "img_url":"http://115.29.35.199/images/eatBeef/eatBeef.jpg",//分享图片路径
            "img_width":    "120",                            //图片宽度
            "img_height":    "120",                            //图片高度
            "link":"http://115.29.35.199/gamecenter/eatBeef?share=true",//源链接地址
            "desc":"吃牛肉啦，看看大侠什么水平~",//分享内容介绍
            "title":_eatBeef.getStr()+_eatBeef.getRecord()+"%的玩家 !!!"
       	 }, function(res){sendIp();});
	    });    

    WeixinJSBridge.on('menu:share:appmessage', function(argv){
         WeixinJSBridge.invoke('sendAppMessage',{
            "appid":"",                                              //appid 设置为空
            "img_url":"http://115.29.35.199/images/eatBeef/eatBeef.jpg",//分享图片路径
            "img_width":"120",                            //图片宽度
            "img_height":"120",                            //图片高度
            "link":"http://115.29.35.199/gamecenter/eatBeef?share=true",//源链接地址
            "desc":"吃牛肉啦，看看大侠什么水平~",//分享内容介绍
            "title":_eatBeef.getStr()+_eatBeef.getRecord()+"%的玩家 !!!"
       	 }, function(res){sendIp();});
	    }); 

     WeixinJSBridge.on('menu:share:weibo', function(argv){
         WeixinJSBridge.invoke('shareWeibo',{
         	"content":_eatBeef.getStr()+_eatBeef.getRecord()+"%的玩家 !!!",
			"url":"http://115.29.35.199/gamecenter/eatBeef?share=true"
       	 }, function(res){sendIp();});
	    }); 
} 
//WeixinJSBridgeReady
if(is_weixin()){
	 document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		 sendMessage();
	 });
}
//send ip 
function sendIp(){
	var _url="./gameLog";
	var _ip=$.trim($("#reqIp").val());
	var _data={
			"wixinId":_winxinid,
			"toId":$.trim($("#toId").val()),
			"reqIp":_ip
		};
	var _data1="inparam="
		+ encodeURIComponent(JSON.stringify(_data));
	$.ajax({
		url:_url,
		dataType:"json",
		type:"POST",
		data:_data1,
		success:function(response){
			console.log("提交成功");
		},
		error:function(){
			console.log("提交失败");
		}
	   });
}

function readLog(){
	var _url="./readLog";
	var _ip=$.trim($("#reqIp").val());
	var _data={
			"wixinId":_winxinid,
			"toId":$.trim($("#toId").val()),
			"reqIp":_ip
		};
	var _data1="inparam="
		+ encodeURIComponent(JSON.stringify(_data));
	$.ajax({
		url:_url,
		dataType:"json",
		type:"POST",
		data:_data1,
		success:function(response){
			console.log("提交成功");
		},
		error:function(){
			console.log("提交失败");
		}
	   });
}