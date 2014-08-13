/**
 * Created by Nightost on 2014/8/12.
 */
$(function(){
    var SgProduct=new sgProduct();
});
function sgProduct(settings){
    var _settings=settings||{};
    //首页3s后缩小
    var _indexTime=_settings.indexTime||500;
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
        _pagesBox=$(".pages");
        _pages=$(".pages .page");
        _sns=$(".catelog .list li .sn");
    }
    /**
     * 设置初始时间
     */
    function setEvent(){
        setTimeout(function(){
            _indexPage.addClass("scaleHidden");
            //初始化catelog
            cateInit();
        },_indexTime);
        //pages box swipe _pages
        _pagesSwipe = new Hammer.Manager(_pagesBox[0]);

        _pagesSwipe.add(new Hammer.Swipe({ threshold: 1, pointers: 0 }));

        _pagesSwipe.on("swipeleft", onSwipeLeft);
        _pagesSwipe.on("swiperight", onSwipeRight);

        _sns.each(function(){
            $(this).bind("click",function(){
                var _index=$(this).index();
                showPage(_index);
                toggleCateLog(false);
            });
        });
    }

    function onSwipeLeft(){
        switch(_curentPage){
            case 1:
                console.log("The ");
                break;
        }
    }

    function onSwipeRight(){
        switch(_curentPage){
            case 1:
                setScale(_catelog,4,1);
                break;
        }
    }

    /**
     * cate init
     */
    function cateInit(){
        var _titleCotent=_catelog.find(".title-content");
        var _img1=$(".item-img1");//Active
        var _img2=$(".item-img2");
        _titleCotent.addClass("c-rotate");
        _img1.addClass("item-img1Active");
        _img2.addClass("item-img2Active");
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
    function showPage(index){
        $(_pages.get(index)).css("opacity",1);
    }

    /**
     * show catelog
     */
    function toggleCateLog(flag){
        var _rate=flag?1:0;
        setScale(_catelog,4,_rate);
    }
}