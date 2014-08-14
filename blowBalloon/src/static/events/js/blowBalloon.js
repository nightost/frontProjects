$(function(){
	//first write
	// $(".pump-up")
    $(document).bind("touchmove",function(e){
        e.preventDefault();
    });
});
window.onload=function(){
    imagesLoadedHandle();
    var _blowBalloon=new blowBalloon();
    _blowBalloon.addPumpEvents();
}

var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
/**
 *
 */
var blowBalloon=function(){
    var _pumpup=$(".pump-up");
    var _balloon=$(".tile-ballow");
    var _flatBalloon=$(".flatBalloon");
    var _gasPort=$(".gas-port");
    var _totallTimes=10;
    var _state=true;
    var _pumpUpObj;
    var _ticking=false;
    var _times=10;
    var _scale=0.1;
    var _lastDirection="";
    var _shivering=$(".shivering");
    var args={
        currentX:0,
        currentY:0,
        lastDeltaY:0
    };
    /**
     * add pump event
     */
    this.addPumpEvents=function(){
        var mc = new Hammer.Manager(_pumpup[0]);

        mc.add(new Hammer.Pan({ threshold: 2, pointers: 0 }));

        mc.on("panstart panmove", onPan);
        mc.on("hammer.input", function(ev) {
            if(ev.isFinal) {
                resetElement();
                if(_lastDirection=="down"){
                    setBalloon();
                }
            }
        });
        $(".temp-again").bind("click",function(){
            resetBalloon();
        });
    };
    function setBalloon(){
        _times--;
        if(_times==9){
            setVisibility(_flatBalloon,false);
            setVisibility(_balloon,true);
            setVisibility(_gasPort,true);
        }
        else if(_times<9&&_times>0){
            scaleBalloon();
        }
        else if(_times==0){
            _balloon.css({
                visibility:"hidden"
            });
            showShiVering();
        }
    }


    function resetElement(){
        args.lastDeltaY=0;
    }

    function onPan(ev){
        if(_times<=0){return;}
        var _targetY=args.currentY+ev.deltaY-args.lastDeltaY;
        var _direction=ev.deltaY-args.lastDeltaY;
        if(_targetY<0||_targetY>(_pumpup.height()*0.8))return;
        args.lastDeltaY=ev.deltaY;
        //下压
        if(_direction<0){
            if(_lastDirection=="down"){
                setBalloon();
            }
            _lastDirection="up";
        }
        else{
            _lastDirection="down";
        }
        args.currentY=_targetY;
        if(!_ticking){
            reqAnimationFrame(setPosition);
            _ticking=true;
        }
    }
    function setVisibility(zObj,flag){
        if(flag){
            zObj.css({
                visibility:"visible"
            });
        }
        else{
            zObj.css({
                visibility:"hidden"
            });
        }
    }

    function showShiVering(){
        _shivering.css({
            display:"block"
        });
        setTimeout(function(){
            _shivering.css({
                opacity:1
            });
            _shivering.find("span").each(function(){
                $(this).addClass(function(index,old){
                    return old+"T";
                });
            });
        },0);
    }

    function scaleBalloon(){
        _scale=_scale+.1;
        setScaleBalloon(_scale);
    }

    function setScaleBalloon(scale){
        _balloon[0].style.Transform="scale("+_scale+")";
        _balloon[0].style.webkitTransform="scale("+_scale+")";
        _balloon[0].style.mozTransform="scale("+_scale+")";
    }

    function setPosition(y){
        var _translate="translate3d(0,"+args.currentY+"px,0)";
        _pumpup[0].style.webkitTransform=_translate;
        _pumpup[0].style.mozTransform=_translate;
        _pumpup[0].style.Transform=_translate;
        _ticking=false;
    }
    function resetBalloon(){
        setVisibility(_flatBalloon,true);
        setVisibility(_balloon,false);
        setVisibility(_gasPort,false);
        _shivering.css({
            display:"none"
        });
        _times=10;
        _scale=.1;
        setScaleBalloon(0);
        _shivering.find("span").each(function(){
            $(this).removeClass(function(index,old){
                console.log(old);
                return old.substring(5);
            });
        });
    }
}
