/**
 * [需要周六，年月日 当前时间]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
;(function datePlugin($){
	var _parent,
		_date,
		daysArray,
		//get origin data
		_year,
		_weekDay,
		_month,
		_day,
		_hours,
		_minutes,
		_weekDayStr,
		_dayStr,
		_yearStr,
		_hoursStr,
		_minutsStr,
		_apmStr,
		_apmArray;

	_parent=$(".date-pugin");

	function init(){
		

		_date=new Date();

		daysArray=["周日","周一","周二","周三","周四","周五","周六"]

		_apmArray=["AM","PM"];

		//get origin data
		_weekDay=_date.getDay();

		_month=_date.getMonth()+1;

		_day=_date.getDate();

		_hours=_date.getHours();

		_minutes=_date.getMinutes();
		_minutes=_minutes<10?"0"+_minutes:_minutes;

		_year=_date.getFullYear();
	}
	init();
	//create str
    function createStr(){
    	_weekDayStr=daysArray[_weekDay];
    	_dayStr=_month+"月"+_day+"日";
    	_yearStr=_year+"年";
    	_apmStr=_hours>=12?_apmArray[1]:_apmArray[0];
    }
    /**
     * [到00:00是更新日期]
     * @return {[type]} [description]
     */
    function updateDate(){
    	init();
    	createStr();
    }

    function apendStr(){
		createStr();
		_parent.find(".day").text(_weekDayStr);
		_parent.find(".date").text(_dayStr);
		_parent.find(".year").text(_yearStr);
		_parent.find(".right-time .am-pm").text(_apmStr);
		_parent.find(".right-time .hours").text(_hours);
		_parent.find(".right-time .minuts").text(_minutes);
    }

    function danamicMinus(){
    	setInterval(function(){
    		var _innerDate=new Date();
    		_hours=_innerDate.getHours();

			_minutes=_innerDate.getMinutes();
			_minutes=_minutes<10?"0"+_minutes:_minutes;

			_parent.find(".right-time .hours").text(_hours);
			_parent.find(".right-time .minuts").text(_minutes);

			// 到00:00是更新日期
			// 没有测~扛不到12点，也不想改系统时间
			if((_hours==24)&&(_minutes=0)){
				updateDate();
			}
    	},1000);
    }

    apendStr();
	danamicMinus();
})($);