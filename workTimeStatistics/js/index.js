$(function(){
	/*如果后台给的per
  	计算一下*/
  	var _dePer=$("#per").val();
  	var _dePre=parseInt(_dePer);
  	var _deLast=100-_dePre;

	$("#doughtnutChart").drawDoughnutChart([
		    { title: "already",value : _dePre,  color: "#aabf4f" },
		    { title: "last", value:_deLast,   color: "#dee6ea" }
		  ],{
		  	per:_dePre,
		  	innerContent:1
	});

	/*如果后台给的per 
  	计算一下*/
  	var _totalNum=45;
  	// var _tiPer=$("#hours").val();
  	var _tiPer=40;
  	var _tiPre=Math.ceil(parseInt(_tiPer)*100/_totalNum);
  	var _tiLast=100-_tiPre;
  	if(_tiPer>=_totalNum){
  		_tiPre=100;
  		_tiLast=0;
  	}
    $("#workTimeChart").drawDoughnutChart([
	    { title: "already",value : _tiPre,  color: "#d1538d" },
	    { title: "last", value:_tiLast,   color: "#e9e9e9" }
	  ],{
	  	per:_tiPre,
	  	innerContent:2,
	  	startRadius : -3.14,// -Math.PI/2

        segmentAngle : 3.14,// 1 * ((99.9999/100) * (PI*2)),
        //结束弧度
        endRadius : 0,// startRadius + segmentAngle

       	hours:_tiPer,

        percentageInnerCutout:35,

        baseColor:"rgba(233,230,233,1)",

        curRotateDeg:-.89012,

        half:true
	});

	$(".lists-1 .list-1 .progress").createProgress({
		topNum:45,
		leftNum:44.5,
		unit:"h",
	},{

	});

	$(".lists-1 .list-2 .progress").createProgress({
		topNum:45,
		leftNum:27,
		unit:"h",
	},{
		rightColor:"rgba(0, 0, 0, 0)",
		leftColor:"#a0dfed",
	});

	$(".lists-1 .list-3 .progress").createProgress({
		topNum:45,
		leftNum:57,
		unit:"h",
	},{
		rightColor:"#6bcbe0",
		leftColor:"#bee6ef",
		rightTextColor:"#fff"
	});

	$(".lists-2 .list-1 .progress").createProgress({
		topNum:45,
		leftNum:25,
		unit:"h",
	},{
		rightColor:"rgba(0, 0, 0, 0)",
		leftColor:"#f6cf4f",
		rightTextColor:"#eeb724",
		triangerColor:"#f6cf4f"
	});

	$(".lists-2 .list-2 .progress").createProgress({
		topNum:45,
		leftNum:27,
		unit:"h",
	},{
		rightColor:"rgba(0, 0, 0, 0)",
		leftColor:"#fbe28e",
		rightTextColor:"#eeb724",
		triangerColor:"#f6cf4f"
	});

	$(".lists-2 .list-3 .progress").createProgress({
		topNum:45,
		leftNum:53,
		unit:"h",
	},{
		rightColor:"#f6cf4f",
		leftColor:"#f9eaba",
		rightTextColor:"#fff",
		triangerColor:"#f6cf4f"
	});
});