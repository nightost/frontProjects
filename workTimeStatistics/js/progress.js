/*!
 * jquery.progress.js
 * 
 * 
 */
;(function($, undefined) {
	$.fn.createProgress=function(data,options){
		var $this=this,
			W=$this.width(),
			H=$this.height(),
			delta=data.topNum-data.leftNum,
			leftPersent,
			rightPersent,
			rightText,
			$left,
			$right,
			$trianger,
			overPersent,
			settings=$.extend({
				bgColor:"#eaeaea",
				rightColor:"rgba(0, 0, 0, 0)",
				leftColor:"#6bcbe0",
				unit:"h",
				triangerColor:"#6acee4",
				rightTextColor:"#54b7cd",
				rightTextSize:14,
				triangerColor:"#6acee4",
				triangerW:10,
				triangerH:9
			},options);

			init();

			function init(){
				caculArgs();
				createElements();
				setTimeout(function(){
					setWidth();
				}, 500);
			}

			function caculArgs(){
				var _leftDotN=(data.leftNum/data.topNum)*100;
				leftPersent=_leftDotN+"%";
				rightPersent=100-_leftDotN+"%";
				rightText=Math.abs(delta)+data.unit;

				//如果是大于
				if(delta<0){
					leftPersent="100%";
					rightPersent="0%";
					overPersent=(Math.abs(delta)/data.topNum)*100+"%";
				}
			}

			function createElements(){
			// $left,
			// $right,
			// $trianger,
			// triangerColor:"#6acee4",
				// triangerW:10,
				// triangerH:9
				// rightTextColor:"#54b7cd",
				// rightTextSize:14,
				// bgColor:"#eaeaea",
				// rightColor:"rgba(0, 0, 0, 0)",
				// leftColor:"#6bcbe0",
				$left=$('<div class="left-p"></div>').appendTo($this).css({
					height:H+"px",
					width:"0%",
					position:'relative',
					backgroundColor:settings.leftColor,
					verticalAlign:"middle"
				});

				$trianger=$('<div class="trianger">&nbsp;</div>').appendTo($left).css({
					width: 0,
				    height: 0,
				    borderLeft: settings.triangerW/2+"px solid transparent",
				    borderRight: settings.triangerW/2+"px solid transparent",
				    borderTop: settings.triangerH+"px solid "+settings.triangerColor,
				    position:'absolute',
				    top:"-"+(settings.triangerH+2)+"px",
				    right:"-"+(settings.triangerW/2-1)+"px"
				});


				$right=$('<div class="right-p">'+rightText+'</div>').appendTo($this).css({
					height:H+"px",
					lineHeight:H+"px",
					width:"100%",
					textAlign:"center",
					fontSize:settings.rightTextSize+"px",
					color:settings.rightTextColor,
					backgroundColor:delta<0?"rgba(0, 0, 0, 0)":settings.rightColor,
					verticalAlign:"middle"
				});

				$this.css("backgroundColor",settings.bgColor);

				if(delta<0){
					setTimeout(function(){
						// overPersent
						$right.css({
							position:"absolute",
							right:0,
							backgroundColor:settings.rightColor,
							width:overPersent
						});
					},2000);
				}
			}

			function setWidth(){
				$left.css({
					width:leftPersent
				});
				$right.css({
					width:rightPersent
				});
			}
	}
})($);