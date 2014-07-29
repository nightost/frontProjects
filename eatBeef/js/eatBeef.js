//参数配置
var _eatBeef;
$(function(){
	_eatBeef=new eatBeef({maxTime:15});
	// _eatBeef.getNum();
});
/**
 * [eatBeff description]
 * @return {[obj]}
 */
function eatBeef(obj){
	var shareStr="";
	this.chatStr="";
	var _startFlag=false;
	var _arg=obj||{};
	var _eatNum=0;
	var _eatBtn=$(".start-eat");
	var _this=this;
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
			$(this).addClass("start-eat-hover");
		});
		_eatBtn.bind("touchend mouseup",function(){
			$(this).removeClass("start-eat-hover");
		});
		//吃牛肉的循环逻辑
		_eatBtn.data("step",1);
		_eatBtn.bind("touchstart click",function(){
			//开始计时
			if(!_startFlag){
				_startFlag=true;
				startTimer();
			}
			var _step=_eatBtn.data("step");
			switch(_step){
				case 1:
					showHands(5,1);
					showheads(2);
					_eatBtn.data("step",2);
					break;
				case 2:
					showHands(_step-1,2);
					showheads(3);
					_eatBtn.data("step",3);
					break;
				case 3:
					showHands(_step-1,3);
					showheads(2);
					_eatBtn.data("step",4);
					break;
				case 4:
					showHands(_step-1,4);
					//showheads(4);
					_eatBtn.data("step",5);
					break;
				case 5:
					showHands(_step-1,5);
					showheads(4);
					_eatBtn.data("step",1);
					break;
			}
			//计数
			_eatNum++;
			if(_eatNum>15){
				$(".steamer").attr("src",$(".steamer").attr("data-src1"));
			}
			$(".pro-num").text(_eatNum);
		});
	}
	/**
	 * [startTimer description]
	 * @return {[type]}
	 */
	function startTimer(){
		//定时器
		$("img.progress").animate({width:"0px"},_maxTime*1000,"linear",function(){
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
		},2000);
	}
	/**
	 * [showResultInfo description]
	 * @return {[type]}
	 */
	function showResultInfo(thisObj){
		// result-box
		// result-box
		if(_eatNum<=20){
			thisObj.chatStr = _eatNum + "块牛肉不过瘾，咋们必须得牛逼！！";
			showMotion(1);
		}
		else if(20<_eatNum&&_eatNum<=35){
			thisObj.chatStr = "我勒个去，你只吃了" + _eatNum + "个牛肉，太慢了吧！";
			showMotion(1);
		}
		else if(35<_eatNum&&_eatNum<=50){
			thisObj.chatStr = "胃口不错，一口气吃" + _eatNum + "个，吃完牛肉记来碗汤";
			showMotion(2);
		}
		else if(50<_eatNum&&_eatNum<=65){
			thisObj.chatStr = "万万没有想到！你吃了" + _eatNum + "个牛肉！放开吃，吃完哥请你喝牛肉汤！";
			showMotion(2);
		}
		else if(65<_eatNum&&_eatNum<=80){
			thisObj.chatStr = "你吃了" + _eatNum + "个牛肉，看样子你根本停不下来，加油，再来一次更牛的！！";
			showMotion(2);
		}
		else if(80<_eatNum&&_eatNum<=95){
			thisObj.chatStr = "你吃了" + _eatNum + "个牛肉，这样的速度，标准的一吃货啊！！ ！";
			showMotion(3);
		}
		else if(95<_eatNum&&_eatNum<=110){
			thisObj.chatStr = "你吃了" + _eatNum + "个牛肉，我看你天赋异禀、骨骼惊奇，想来是百年难得一见的吃货奇才！";
			showMotion(3);
		}
		else if(110<_eatNum&&_eatNum<=125){
			thisObj.chatStr = "我勒个去，你吃了" + _eatNum + "个牛肉…说点什么好？记得吃药…。";
			showMotion(3);
		}
		else if(125<_eatNum&&_eatNum<=140){
			thisObj.chatStr = "你吃了" + _eatNum + "个牛肉。你这么吊，你爸妈知道么？";
			showMotion(3);
		}
		else if(140<_eatNum&&_eatNum<=170){
			thisObj.chatStr = _eatNum +"个？？人类已经无法阻止你吃牛肉了！！";
			showMotion(3);
		}
		else if(170<_eatNum){
			thisObj.chatStr = _eatNum +"个？？你确定你没作弊？？？";
			showMotion(3);
		}
		shareStr = "我在《吃牛肉大赛》中吃掉了" + _eatNum + "个牛肉，求打败求刺激~";
		$(".start-eat").hide();
		$(".result-box .result-info").text(thisObj.chatStr);
		$(".result-box").show();
	}
	function showMotion(state){
		$(".head").hide();
		$(".hands").hide();
		switch(state){
			case 1:
				$(".state-1").show();
				break;
			case 2:
				$(".state-2").show();
				break;
			case 3:
				$(".state-3").show();
				break;
		}
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
}
function showheads(index){
	var heads={
		head1:"images/eating/c25.png",
		head2:"images/eating/c27.png",
		head3:"images/eating/c26.png",
		head4:"images/eating/c28.png"
	};
	$(".head").attr("src",heads["head"+index]);
}
//初始化分享内容的函数