/**
 * Created by Nightost on 2014/8/12.
 */
$(function(){
    var _sgProduct=new sgProduct();
    var _bottomBar=new bottomBar(_sgProduct);
    _sgProduct.bottomBar=_bottomBar;
    var _siderBar=new setSiderBar();
    _sgProduct.siderBar=_siderBar;
});
/**
 *
 * @param settings
 */
function sgProduct(settings){
    var _settings=settings||{};
    //首页3s后缩小
    var _indexTime=_settings.indexTime||3000;
    //cover page
    var _indexPage;
    //catelog page
    var _catelog;
    //pagesBox
    var _pagesBox;
    //swipe pages obj
    var _pagesSwipe;
    //pages
    var _pages;
    //
    var _curentPage=0;
    var _sns;

    //this
    var _this=this;
    //cup
    var _cup;

    var _favPage;

    var _totalPagesNum;

    /**
     * 页面初始化
     */
    (function init(){
        getObj();
        setEvent();
    })();
    /**
     * 获取元素
     */
    function getObj(){
        _indexPage=$(".cover");
        _catelog=$(".catelog");
        _pagesBox=$(".pageBox");
        _pages=$(".pages .page");
        _sns=$(".catelog .list li .sn");
        _cup=$(".cup");
        _favPage=$(".favPage");
        _totalPagesNum=_pages.length;
    }
    /**
     * 设置初始时间
     */
    function setEvent(){
        setTimeout(function(){
//            _indexPage.addClass("scaleHidden");
            var _left=_indexPage.width()*(-1);
            _indexPage.css({
                "-webkit-transform":"translateX("+_left+"px)",
                "-moz-transform":"translateX("+_left+"px)",
                "-o-transform":"translateX("+_left+"px)",
                "transform":"translateX("+_left+"px)"
            });
            //初始化catelog
            cateInit();
        },_indexTime);
        //pages box swipe _pages
       /* _pagesSwipe = new Hammer.Manager(_pagesBox[0]);

        _pagesSwipe.add(new Hammer.Swipe({ threshold: 1, pointers: 0 }));

        _pagesSwipe.on("swipeleft", onSwipeLeft);
        _pagesSwipe.on("swiperight", onSwipeRight);*/
        _pagesBox.on("swipeLeft", onSwipeLeft);
        _pagesBox.on("swipeRight", onSwipeRight);
        _sns.each(function(item,index,array){
            var _index=item;
            $(this).bind("click",function(){
                var _isGo=showPage(_index,true);
                if(_isGo) toggleCateLog(false);
            });
        });

        _pagesBox.bind("touchstart",function(e){
            if(e.target.className!="go-detail"){
                if(_this.bottomBar){
                    _this.bottomBar.setProgress(true);
                }
            }
        });
        _pagesBox.bind("touchend",function(e){
            if(_this.bottomBar){
                _this.bottomBar.setTime();
            }
        });
        _catelog.on("swipeLeft", onCatelogSwipeLeft);
    }

    function onCatelogSwipeLeft(){
        var _isGo=showPage(0,true);
        if(_isGo) toggleCateLog(false);
    }

    function onSwipeLeft(){
        if(_curentPage==3){
            setCupText(false);
        }
        var _nextPage=_curentPage+1;
        showPage(_nextPage,true);
    }

    function onSwipeRight(){
        switch(_curentPage){
            case 0:
                setScale(_catelog,4,1);
                showcateLogEffect();
                return;
            case 3:
                setCupText(false);
                var _pre=_curentPage-1;
                showPage(_pre,true);
                break;
            default:
                var _pre=_curentPage-1;
                showPage(_pre,true);
        }
    }

    /**
     * cate init
     */
    function cateInit(){
        var _titleCotent=_catelog.find(".title-content");
        _titleCotent.addClass("c-rotate");
        showcateLogEffect();
    }
    function showcateLogEffect(){
        var _img1=$(".item-img1");//Active
        var _img2=$(".item-img2");
        _img1.addClass("item-img1Active");
        _img2.addClass("item-img2Active");
    }
    this.showcEffect=function(){
        showcateLogEffect();
    }
    function hideCateLogEffect(){
        var _img1=$(".item-img1");//Active
        var _img2=$(".item-img2");
        _img1.removeClass("item-img1Active");
        _img2.removeClass("item-img2Active");
    }
    /**
     * set scale
     */
    function setScale(obj,flag,rate){
        setOrigen(obj,flag);
        obj.css({
            "-webkit-transform":"scale("+rate+")",
            "-moz-transform":"scale("+rate+")",
            "-o-transform":"scale("+rate+")",
            "transform":"scale("+rate+")"
        });
    }
    /**
     * set scale
     */
    function setOrigen(obj,flag){
        //默认边界的4个点
        var oStr="bottom center";
        switch(flag){
            case 1:
                oStr="top center";
                break;
            case 2:
                oStr="center right";
                break;
            case 3:
                oStr="bottom center";
                break;
            case 4:
                oStr="center left";
                break;
        }
        obj.css({
            "-webkit-transform-origen":flag,
            "-moz-transform-origen":flag,
            "-o-transform-origen":flag,
            "transform-origen":flag
        });
    }

    /**
     * show by opacity
     */
    function showPage(index,isP){
        var issetP=isP;
        var _targetPage=$(_pages.get(index));
        if(_targetPage.length==0)return false;
        $(_pages.get(_curentPage)).css("display","none");
       if(issetP)setBottomProgress(index);
        //cup页特效
        if(index==3){
            setCupText(true);
        }
        _targetPage.css("display","block");
        setTimeout(function(){
            $(_pages.get(_curentPage)).css("opacity",0);
            _targetPage.css("opacity",1);
            _curentPage=index;
        },0);
        return true;
    }
    /**
     * show by opacity
     */
    function hidePage(index){
        var _targetPage=$(_pages.get(index));
        if(_targetPage.length==0)return false;
        _targetPage.css("display","none");
        setTimeout(function(){
            _targetPage.css("opacity",0);
            _curentPage=0;
        },0);
    }

    /**
     * show catelog
     */
    function toggleCateLog(flag){
        var _rate=flag?1:0;
        setScale(_catelog,4,_rate);
        if(!flag){hideCateLogEffect();}
        else{showcateLogEffect();}
    }
    this.showCatelog=function(){
       setScale(_catelog,4,1);
       hideCurrentPage();
    }
    function hideCurrentPage(){
        $(_pages.get(_curentPage)).css("opacity",0);
    }

    function setCupText(flag){
        setTimeout(function(){
            if(flag){
                _cup.find(".text p").each(function(){
                    $(this).css("opacity",1);
                });
            }
            else{
                _cup.find(".text p").each(function(){
                    $(this).css("opacity",0);
                });
            }
        },600);
    }
    this.setFavBox=function(flag){
        if(flag){
            setScale(_favPage,2,1);
            if(_this.bottomBar){
                _this.bottomBar.setFavBtn(false);
            }
        }
        else{
            setScale(_favPage,2,0);
            if(_this.bottomBar){
                _this.bottomBar.setFavBtn(true);
            }
        }
    }
    this.slidePage=function(per){
        var _targetPage=Math.ceil(per*(_totalPagesNum-1));
        if(_targetPage!=_curentPage){
            showPage(_targetPage,false);
        }
    }
    function setBottomProgress(index){
        var per=index/(_totalPagesNum-1);
        if(_this.bottomBar){
            _this.bottomBar.setProgressBtn(per);
        }
    }

}
/**
 * bottomBar
 */
function bottomBar(sgObj){
    var _sgProduct=sgObj;
    var _homeBtn;
    var _favBtn;
    var _progressBtn;
    var _panBtnObj;
    var _progressLine;
    var _maxLeft;
    var _minLeft;
    var _progressW;
    var _lastX=0;
    var _progress;
    var _bottomBar;
    var _currentState=false;
    var _timeOut;
    var _this=this;
    var _favBoolean=false;
    var _currentPer=0;
    (function init(){
        getObj();
        setEvents();
    })();
    function getObj(){
        _homeBtn=$(".bottomBar .homeBtn");
        _favBtn=$(".bottomBar .fav");
        _progressBtn=$(".bottomBar .progress .btn");
        _progressLine=$(".bottomBar .progress");

        _progress=$(".bottomBar .middle");
        _bottomBar=$(".bottomBar");
    }
    function setArgs(){
        _progressW=_progressLine.offset().width;
        var _progressBtnW=_progressBtn.offset().width;
        var _halfBtnW=Math.floor((_progressBtnW)/2);
        _maxLeft=_progressW-_halfBtnW;
        _minLeft=-_halfBtnW;
        setPosition();
    }
    function setPosition(){
        var _currentLeft=_currentPer*_maxLeft
        if(_currentLeft==0){_currentLeft=_minLeft;}
        _progressBtn.css("left",_currentLeft);
    }
    function setEvents(){
        //pages box swipe _pages
        _panBtnObj = new Hammer.Manager(_progressBtn[0]);

        _panBtnObj.add(new Hammer.Pan({ threshold: 2, pointers: 0 }));

        _panBtnObj.on("pan", onPan);

        _panBtnObj.on("hammer.input", function(ev) {
            if(ev.isFinal) {
                _lastX=0;
                _this.setTime();
            }
        });

        _homeBtn.bind("click",function(){
            if(_favBoolean){
                _sgProduct.setFavBox(false);
                _favBoolean=false;
                return;
            }
            _sgProduct.showCatelog();
            _sgProduct.showcEffect();
        });

        _bottomBar.on("touchstart",function(){
            if(_timeOut!=null){
                clearTimeout(_timeOut);
            }
        });
        _bottomBar.on("touchend",function(){
            _this.setTime();
        });
        _favBtn.on("click",function(){
            _sgProduct.setFavBox(true);
            _this.setFavBtn(false);
            _favBoolean=true;
            _this.setProgress(false);
        });
    }

    this.setFavBtn=function(flag){
        if(flag){
            _favBtn.show();
        }
        else{
            _favBtn.hide();
        }
    }

    function onPan(obj){
        if(_timeOut!=null){
            clearTimeout(_timeOut);
        }
        var _currentX=parseInt(_progressBtn.css("left"));
//
        var _deltaX=obj.deltaX-_lastX;
        console.log("当前deltax="+obj.deltaX+"~~~~上次detalX="+_lastX+"~~~~~~移动量="+_deltaX);
        console.log(_currentX);
        var _targetX=_currentX+_deltaX;
        if(_targetX<_minLeft||_targetX>_maxLeft){
            return;
        }
        var _targetLeft=_currentX+_deltaX;
        console.log("上次"+_currentX+"~~~去_targetLeft");
        _progressBtn.css("left",_targetX);
        _lastX=obj.deltaX;
        //判断是否翻页
        var _pageIndex=_targetLeft/_maxLeft;
        _sgProduct.slidePage(_pageIndex);
    }
    this.setProgress=function(flag){
        if(flag)clearTimeout(_timeOut);
        if(flag&&!_currentState){
            _progress.show();
            _bottomBar.css("background","rgba(0,0,0,.6)");
            _currentState=true;
            setArgs();
        }
        else if(!flag&&_currentState){
            _progress.hide();
            _bottomBar.css("background","none");
            _currentState=false;
        }
    }
    this.setTime=function(){
        if(!_currentState)return;
        _timeOut=setTimeout(function(){
            _progress.hide();
            _bottomBar.css("background","none");
            _currentState=false;
        },4000);
    }
    this.setProgressBtn=function(per){
        _currentPer=per;
        if(_maxLeft) setPosition();
    }
}
function setSiderBar(){
    //slider bar
    var _sliderBar;
    //silider bar content
    var _sliderBarContent;
    //
    var _goDetail;
    var _closeBtn;
    var _state;

    (function init(){
        getObj();
        setEvents();
    })();
    function updataData(datakey){
        _sliderBar.find(".pimg img").attr("src",data[datakey].imgSrc);
        _sliderBar.find(".ptitle").text(data[datakey].title);
        _sliderBar.find(".pprice i").text(data[datakey].price);
        _sliderBar.find(".ptext .dis").html(data[datakey].activity);
        _sliderBar.find(".ptext .feature").html(data[datakey].detail);
    }
    function getObj(){
        _sliderBar=$(".rightSlider");
        _sliderBarContent=$(".rightSlider .detailConent");
        _goDetail=$(".go-detail");
        _closeBtn=$(".rightSlider .closeBtn");
    }
    function setEvents(){
        _goDetail.bind("click",function(){
            //放入数据
            var _dataKey=$(this).attr("data-key");
            updataData(_dataKey);
            setSlideBar(true);
            _state=true;
        });
        _closeBtn.bind("click",function(){
            setSlideBar(false);
            _state=false;
        });
        _sliderBar.bind("click",function(){
            if(_state){
                setSlideBar(false);
                _state=false;
            }
        });
    }
    function setSlideBar(flag){
        if(flag){
            _sliderBar.css("display","block");
            setTimeout(function(){
                _sliderBarContent.css("right",0);
            },0);
        }
        else{
            var _right=_sliderBarContent.offset().width*(-1);
            _sliderBarContent.css("right",_right);
            setTimeout(function(){
                _sliderBar.css("display","none");
            },500);
        }
    }
}