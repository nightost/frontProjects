/**
 * Created by faye wong on 2014/8/25.
 */
var _opearateItems;
$(function(){
    //
    _opearateItems=new addItems();
    var data={};
    data.ops=_opearateItems.getAllType();
});
function addItems(){
    var _addBtn;
//    var _items=$(".spec-item");
    //哪些item被操作过
    var _actionArray=[];

    var _ops={

    };
    var _pTypes=[];

    var _contents={};

    var _maxType=0;

    var _closeBtns;
    //init()
    init();

    function init(){
        getObj();
        setEvents();
    }

    function getObj(){
        _addBtn=$(".addBtn");
        _closeBtns=$(".addBtn i");
    }

    function setEvents(){
        //添加
        _addBtn.on("click",function(){
            var _this=$(this);
            _maxType=_maxType+1;
            var _curType=new String(_maxType);
            var _tempObj=createSpan(_curType);
            //插入dom
            _tempObj.insertBefore(_this);
            _tempObj.find("input").show();
            _tempObj.find("input").width(_tempObj.find(".spec-item").width());
            _tempObj.find("input").height(_tempObj.find(".spec-item").height()+2);
            _tempObj.find("input").bind("blur",tempBlur);
            _tempObj.find("input").focus();
            //添加对应值
            var  _realType="p"+_curType;
            _contents[_realType]={};
            _contents[_realType].content="";
            _contents[_realType].ptype=_realType;
            _ops[_realType]={};
            _ops[_realType].ptype=_realType;
            _ops[_realType].op="add";
            _this.hide();
        });
        //添加按钮失去焦点确认
        _addBtn.on("blur",function(){
            var _this=$(this);
            _this.addClass("edit-add-item");
        });
        //点击
        $(document).on("click",".p-box",function(){
            var _span=$(this).find(".spec-item");
            var _input=$(this).find("input");
            var _w=_span.width();
            var _h=_span.height();
            _input.show();
            _input.focus();
            _input.width(_w);
            _input.height(_h+2);
        });
        //原内容失去焦点确认
        $(document).on("blur",".p-box input",function(){
            var _this=$(this);
            var _item=_this.siblings(".spec-item");
            var _oriData=_item.attr("ori-content");
            var _curData= $.trim(_this.val());
            if(_curData.length==0){
                _this.hide();
                //如果是添加的元素，切内容为空
                if(_item.text()=="范例"){
                    _this.parents(".p-box").hide();
                }
                return;
            };
            if(_oriData!=_curData){
                if(isLeagal(_curData)){
                    //修改了数据
                    var _type=_item.attr("p-type");
                    if(_ops[_type]){
                        _ops[_type].content=_curData;
                    }
                    else{
                        _ops[_type]={};
                        _ops[_type].ptype=_type;
                        _ops[_type].op="modify";
                        _ops[_type].content=_curData;
                    }
                    _contents[_type].content=_curData;
                    _item.width("auto");
                    _item.text(_curData);
                    _addBtn.focus();
                }
                else{
                    console.log("名字重复");
                }
            }
            _this.hide();
        });
        //mouseover
        $(document).on("mouseover",".p-box",function(){
            $(this).find("i").show();
        });
        //mouseout
        $(document).on("mouseout",".p-box",function(){
            $(this).find("i").hide();
        });
        //close btn
        $(document).on("click",".p-box i",function(){
            var _parent=$(this).parent(".p-box");
            _parent.hide();
            var _type=_parent.find(".spec-item").attr("p-type");
            if(_ops[_type]){
                //如果是添加的
                if(_ops[_type].op=="add"){
                    delete _ops[_type];
                }
                else{
                    _ops[_type].op="del";
                }
            }
            else{
                _ops[_type]={};
                _ops[_type].ptype=_type;
                _ops[_type].op="del";
            }
            delete _contents[_type];
        });
    }
    //添加的目录失去焦点
    function tempBlur(e){
        $(this).unbind("blur",arguments.callee);
        var _currentContent= $.trim($(this).text());
        if(_currentContent.length>0){

        }
        _addBtn.show().focus();
    }
    //获取所有p-type
     this.getAllType=function(){
        $(".spec-item").each(function(){
            //获取所有p-type
            var _ptype=$.trim($(this).attr("p-type"));
            var _tempType=parseInt(_ptype.substr(1));
            _maxType=_tempType>_maxType?_tempType:_maxType;
            _pTypes.push(_tempType);
            //获取所有content
            var _content=$.trim($(this).text());
            _contents[_ptype]={
                ptype:_ptype,
                content:_content
            };
        });
    }
    //创建带product-type的模板
    function createSpan(type){
//        var _temp='<span class="spec-item" p-type="p'+type+'" ori-content=""  contenteditable><i>X</i></span>';
        var _temp='<div class="p-box"><span style="width: 80px" p-type="p'+type+'" class="spec-item" ori-content="">范例</span><input  type="text"/><i>X</i></div>';
        return $(_temp);
    }

   //取操作列表
    this.getOp=function(){
        return _ops;
    }

    //修改的名字或者添加的名字是否重复
    //return boolean
    function isLeagal(str){
        //虽然没效率
        for(var i in _contents){
            if(str==_contents[i].content)return false;
        }
        return true;
    }

}