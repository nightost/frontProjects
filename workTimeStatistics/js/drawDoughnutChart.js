/*!
 * jquery.drawDoughnutChart.js
 * Version: 0.3(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2013 hiro
 * https://github.com/githiro/drawDoughnutChart
 * Released under the MIT license.
 * 
 */
;(function($, undefined) {
  $.fn.drawDoughnutChart = function(data, options) {
    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W/2,
      centerY = H/2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      flowerNum=10,

      settings = $.extend({
        segmentShowStroke : false,
        segmentStrokeColor : "#0C1013",
        segmentStrokeWidth : 0,
        baseColor: "rgba(222,230,234,1)",
        //边框大小
        baseOffset: 0,
        edgeOffset : 0,//offset from edge of $this
        // 内圆半径比例
        percentageInnerCutout : 82,
        //缓动
        animation : true,
        animationSteps : 90,
        animationEasing : "easeInOutExpo",
        animateRotate : true,
        //每个小块的位置
        tipOffsetX: -8,
        tipOffsetY: -45,
        tipClass: "doughnutTip",

        //开始弧度
        startRadius : -1.570,// -Math.PI/2

        segmentAngle : 6.2831,// 1 * ((99.9999/100) * (PI*2)),
        //结束弧度
        endRadius : 4.7131,// startRadius + segmentAngle
       

        summaryClass: "doughnutSummary",
        summaryTitle: "同类",
        summaryTitleClass: "doughnutSummaryTitle",
        summaryNumberClass: "doughnutSummaryNumber",

        beforeDraw: function() {  },
        afterDrawed : function() {  },
        onPathEnter : function(e,data) {  },
        onPathLeave : function(e,data) {  }
      }, options),//end settings

      animationOptions = {
        linear : function (t) {
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
          return (v>1) ? 1 : v;
        }
      },

      requestAnimFrame = function() {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      }();

    settings.beforeDraw.call($this);

    if(settings.half==true){
    	centerY = H;
    }

    var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
        $paths = [],
        easingFunction = animationOptions[settings.animationEasing],
        //半径
        doughnutRadius = Max([H / 2,W / 2]) - settings.edgeOffset,
        //内圆半径
        cutoutRadius = doughnutRadius * (settings.percentageInnerCutout / 100),
        segmentTotal = 0;


    //Draw base doughnut
    var baseDoughnutRadius = doughnutRadius + settings.baseOffset,
        baseCutoutRadius = cutoutRadius - settings.baseOffset;

    //底部圆弧
    var drawBaseDoughnut = function() {
        //Calculate values for the path.
        //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.
        var startRadius = settings.startRadius,
            segmentAngle = settings.segmentAngle,
            endRadius = settings.endRadius,

            startX = centerX + cos(startRadius) * baseDoughnutRadius,
            startY = centerY + sin(startRadius) * baseDoughnutRadius,
            endX2 = centerX + cos(startRadius) * baseCutoutRadius,
            endY2 = centerY + sin(startRadius) * baseCutoutRadius,
            endX = centerX + cos(endRadius) * baseDoughnutRadius,
            endY = centerY + sin(endRadius) * baseDoughnutRadius,
            startX2 = centerX + cos(endRadius) * baseCutoutRadius,
            startY2 = centerY + sin(endRadius) * baseCutoutRadius;
        var cmd = [
          'M', startX, startY,
          'A', baseDoughnutRadius, baseDoughnutRadius, 0, 1, 1, endX, endY,
          'M', startX2, startY2,//此处如果换成L,会出现直线
          'A', baseCutoutRadius, baseCutoutRadius, 0, 1, 0, endX2, endY2,//reverse
          'Z'
        ];
        $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
          .attr({
            "d": cmd.join(' '),
            //底色
            "fill": settings.baseColor
          })
          .appendTo($svg);
    }();

    //Set up pie segments wrapper
    var $pathGroup = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
    $pathGroup.attr({opacity: 0}).appendTo($svg);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
        tipW = $tip.width(),
        tipH = $tip.height();

    if(settings.innerContent==1){
    	insertInnerContent();
    }
    else{
    	insertInnerNeedle();
    }

   	function insertInnerContent(){

   		//Set up center text area
    //  var summarySize = (cutoutRadius - (doughnutRadius - cutoutRadius)) * 2,//算法不明
    	var summarySize = Math.ceil(Math.sqrt(cutoutRadius*cutoutRadius/2)*2)+11,//新算法，根据设计补足字体一行的误差
        $summary = $('<div class="' + settings.summaryClass + '" />')
                   .appendTo($this)
                   .css({ 
                   	 position:"absolute",
                     width: summarySize + "px",
                     height: summarySize + "px",
                     "left": (doughnutRadius-summarySize / 2) + "px",//补个误差咩
                     "top": (doughnutRadius-summarySize / 2) + "px"
                   });
   		 var _flowStr=createFlowersStr();
   		 var $summaryTitle = $('<p class="' + settings.summaryTitleClass + '">'+'<strong>'+settings.per+'%</strong>' + '<i>'+settings.summaryTitle+'</i>' + '</p>').appendTo($summary);
   		 var $summaryNumber = $('<div class="' + settings.summaryNumberClass + '">'+_flowStr+'</div>').appendTo($summary);
   	}
   	//插入指针
   	var $needle;
   	var $hours;
   	function insertInnerNeedle(){
   		$needle=$('<div class="needle"><img src="css/images/needle.png" alt="" /></div>');
   		$hours=$('<div class="hours-text"><span class="h-num">'+settings.hours+'</span><span class="unit">h</span></div>');
   		$needle.appendTo($this);
   		$hours.appendTo($this);
   		updateNeedle(-30);
   	}
   	//更新指针位置
   	function updateNeedle(deg){
   		$needle.css({
   			"transform":"rotateZ("+deg+"deg)",
   			"webkitTransform":"rotateZ("+deg+"deg)",
   			"mozTransform":"rotateZ("+deg+"deg)",
   			"msTransform":"rotateZ("+deg+"deg)"
   		});
   	}

    
    //插入数据化
    function createFlowersStr(){
    	// flowerNum
    	var _flowerString="";
    	var _lightNum=Math.floor(settings.per/10);
    	for(var i=1;i<=flowerNum;i++){
    		var _class="on";
    		if(i>=(_lightNum+1))_class="off";
    		_flowerString=_flowerString+'<span class="'+_class+'"></span>';
    	}
    	return _flowerString;
    }

    for (var i = 0, len = data.length; i < len; i++) {
      segmentTotal += data[i].value;
      $paths[i] = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
        .attr({
          "stroke-width": settings.segmentStrokeWidth,
          "stroke": settings.segmentStrokeColor,
          "fill": data[i].color,
          "data-order": i
        })
        .appendTo($pathGroup);
        /*.on("mouseenter", pathMouseEnter)//暂不添加事件
        .on("mouseleave", pathMouseLeave)//暂不添加事件
        .on("mousemove", pathMouseMove);//暂不添加事件*/
    }

    //Animation start
    animationLoop(drawPieSegments);

    function pathMouseEnter(e) {
      var order = $(this).data().order;
      $tip.text(data[order].title + ": " + data[order].value)
          .fadeIn(200);
      settings.onPathEnter.apply($(this),[e,data]);
    }

    function pathMouseLeave(e) {
      $tip.hide();
      settings.onPathLeave.apply($(this),[e,data]);
    }

    function pathMouseMove(e) {
      $tip.css({
        top: e.pageY + settings.tipOffsetY,
        left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
      });
    }

    function drawPieSegments (animationDecimal) {
	  // console.log(animationDecimal);
      var startRadius = settings.startRadius,//-90 degree
          rotateAnimation = 1;
      if (settings.animation && settings.animateRotate) rotateAnimation = animationDecimal;//count up between0~1

      //不用统计总数
      // drawDoughnutText(animationDecimal, segmentTotal);

      $pathGroup.attr("opacity", animationDecimal);
      // //使用透明，大致根据帧率，todo。暂时不用
      // $pathGroup.attr("opacity", 1);
      
      

      //draw each path
      for (var i = 0, len = data.length; i < len; i++) {
        var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (settings.segmentAngle)),
            endRadius = startRadius + segmentAngle,//结束弧度
            largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * doughnutRadius,
            startY = centerY + sin(startRadius) * doughnutRadius,
            endX2 = centerX + cos(startRadius) * cutoutRadius,
            endY2 = centerY + sin(startRadius) * cutoutRadius,
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
        //如果带指针，需要更新指针位置和文字位置
        //现在为两个分片，所以在第一个分配时更新
        // settings.curRotateDeg
        if((settings.innerContent==2)&&(i==0)){
        	//更新指针位置
        	var delta=endRadius+Math.PI;

        	var _changedRadius=settings.curRotateDeg+delta;
    		var _deltaRadius=_changedRadius*(180/Math.PI);
    		updateNeedle(_deltaRadius);
    		//更新文字位置
    		//doughnutRadius
        	//内圆半径
        	//cutoutRadius
        	if(delta>.532){
        		//如果大于30deg
        		var _halfY=Math.sin(delta/2)*(doughnutRadius-5);
        		var _halfX=Math.cos(delta/2)*(doughnutRadius-5);
    			$hours.css({
    				top:doughnutRadius-_halfY+5,
    				left:doughnutRadius-_halfX+5
    			});
        	}
    		
        }
        var cmd = [
          'M', startX, startY,//Move pointer
          'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
          'L', startX2, startY2,//Draw line path(this line connects outer and innner arc paths)
          'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
          'Z'//Close path
        ];
        $paths[i].attr("d", cmd.join(' '));
        startRadius += segmentAngle;
      }
    }

    function drawDoughnutText(animationDecimal, segmentTotal) {
      $summaryNumber
        .css({opacity: animationDecimal})
        .text((segmentTotal * animationDecimal).toFixed(1));
    }

    function animateFrame(cnt, drawData) {
      var easeAdjustedAnimationPercent =(settings.animation)? CapValue(easingFunction(cnt), null, 0) : 1;
      drawData(easeAdjustedAnimationPercent);
    }

    function animationLoop(drawData) {
      var animFrameAmount = (settings.animation)? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
          cnt =(settings.animation)? 0 : 1;
      requestAnimFrame(function() {
          cnt += animFrameAmount;
          animateFrame(cnt, drawData);
          if (cnt <= 1) {
            requestAnimFrame(arguments.callee);
          } else {
            settings.afterDrawed.call($this);
          }
      });
    }
    function Max(arr) {
      return Math.max.apply(null, arr);
    }
    function Min(arr) {
      return Math.min.apply(null, arr);
    }
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function CapValue(valueToCap, maxValue, minValue) {
      if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
      if (isNumber(minValue) && valueToCap < minValue) return minValue;
      return valueToCap;
    }
    return $this;
  };
})(jQuery);