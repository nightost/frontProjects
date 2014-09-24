$(function(){
    //选择内容滚动
    $(".options").perfectScrollbar({
        wheelSpeed: 20,
        wheelPropagation: true,
        minScrollbarLength: 20
    });
    //选择框
    $(".select").each(function(){
        var $this =$(this),
            _options =  $this.find(".options"),
            _ipt = $this.find("input");

        $this.find(".select-dropdown").on("click", function(){
            _options.toggle();
            $(".options").perfectScrollbar('update');
        });
        $this.find(".options li a").on("click", function(){
            _options.hide();
            _ipt.val($(this).html());
        });
    });
    //选择内容滚动
    $(".options").perfectScrollbar({
        wheelSpeed: 20,
        wheelPropagation: true,
        minScrollbarLength: 20
    });
    //添加规则
    $(document).on("click",".add-text",function(){
        var _this=$(this);
        var _inputBox=_this.parent(".all-specs").siblings(".edit-area");
        var _per=(659/896)*100+"%";
        _inputBox.css("display","block").animate({
             width: _per
            },"1000","swing",function(){
                //内部inp-box over-flow:auto
                _inputBox.find(".inp-box").css({
                    overflow:"auto",
                    height:"auto"
                });
        });
    });
});
//规格对象
function singleSpect(){
    var _temp=<div class="spec">
        <div class="select">
            <input type="text" class="filter-select"  value="所有会员" /><a href="javascript:;" class="select-dropdown">&nbsp;</a>
            <div class="options">
                <ul class="">
                    <li><a href="javascript:;">白金会员</a></li>
                    <li><a href="javascript:;">预定</a></li>
                    <li><a href="javascript:;">外卖</a></li>
                    <li><a href="javascript:;">点餐</a></li>
                </ul>
            </div>
        </div>
        <div class="all-specs">
            <span class="sp">S</span><span class="sp">M</span><span class="add-text">+添加规格值</span>
        </div>
        <div class="edit-area">
            <div class="left-corner"></div>
            <div class="bg">&nbsp;</div>
            <div class="re-c">
                <div class="opBtns">
                    <div class="confirm btn">确定</div>
                    <div class="cancel btn">取消</div>
                </div>
                <div class="inp-box">
                    <span>L<i></i></span>
                    <span>XL<i></i></span>
                    <span>L<i></i></span>
                    <span>XL<i></i></span>
                    <span>L<i></i></span>

                </div>
            </div>
        </div>
    </div>
    function insertDoc(){

    }
}