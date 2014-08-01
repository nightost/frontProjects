$(function(){
	//first write
	// $(".pump-up")
    $(document).bind("touchmove",function(e){
        e.preventDefault();
    });
    var _blowBalloon=new blowBalloon();
    _blowBalloon.addPumpEvents();
});
/**
 *
 */
var blowBalloon=function(){
    /**
     * add pump event
     */
    this.addPumpEvents=function(){
        var _pumpup=$(".pump-up");
        var _totallTimes=10;
        var _state=true;
        _pumpup.bind("swipeUp",function(){
            if(!_state&&_totallTimes){
                pumpUpHandle();
            }
            _state=true;
        });
        _pumpup.bind("swipeDown",function(){
            if(_state&&_totallTimes){
                _totallTimes--;
                pumpDownHandle();
            }
            _state=false;
        });
        function pumpDownHandle(){
            console.log("swipeDown");
//            alert("swipeDown");
            _pumpup.css({
                "top":0
            });

        };
        function pumpUpHandle(){
            console.log("swipeUp");
//            alert("swipeUp");
            _pumpup.css({
                "top":_pumpup.height()*(-0.8)+"%"
            });
        };
    };

}
/**
 * do when images loaded
 */
function imagesLoadedHandle(){
    $(".game-wait").css({
        "-webkit-transform":"scale(0)"
    });
    $(".pump-up").css({
        "top":$(".pump-up").height()*(-0.8)+"%"
    });
    console.log("all images loaded~");
};