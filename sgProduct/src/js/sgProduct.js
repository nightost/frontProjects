/**
 * Created by Nightost on 2014/8/12.
 */
$(function(){
    var SgProduct=new sgProduct();
});
function sgProduct(settings){
    var _settings=settings||{};
    //首页3s后缩小
    var _indexTime=_settings.indexTime||3000;
    //cover page
    var _indexPage;
    //catelog page
    var _catelog;
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
    }

    /**
     * cate init
     */
    function cateInit(){
        var _titleCotent=_catelog.find(".title-content");
        _titleCotent.addClass("c-rotate");
    }
}