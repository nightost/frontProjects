/*
$(function(){
        var _imgs=document.images;
		var _imgNums=_imgs.length;
		if(_imgNums<0) return;
        for(var i=0;i<_imgNums;i++){
            _imgs[i].onload=function(){
//                alert("loaded");
                if(!_imgNums--){
                    console.log(_imgNums);
                    imagesLoadedHandle();
                };
            };
        }
});*/
window.onload=function(){
    imagesLoadedHandle();
};
