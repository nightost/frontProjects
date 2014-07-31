$(function(){
	//first write
	// $(".pump-up")
	
});
/**
 * 
 */
function imagesLoadedHandle(){
	$(".pump-up").css({
		"top":$(".pump-up").height()*0.35+"%"
	});
	console.log("all images loaded~");
}
//验证手机号码
function checkMobile(select){
   var cellphone = /^1[3|4|5|8][0-9]\d{8}$/;
   if(!cellphone.test($.trim($(select).val()))){
        return false;
    }
    return true;
}
//匹配数字
function checkNum(str){
	var _reg=/\d*/;
	return _reg.test(str)?true:false;
}
$(function(){
	!function(){
		var _imgNums=$("img").length;
		var _temp=0;
		if(_imgNums<0) return;
		$("img").load(function(){
			if(!_temp--){
				imagesLoadedHandle();
			};
		});
	}(); 
});


function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
}