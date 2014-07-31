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