module.exports=function(grunt){
	grunt.initConfig({
		//read package.json
		pkg:grunt.file.readJSON('package.json'),
		sass:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				style: 'compressed'				
			},
			balloonCssBuild:{
				src:"blowBalloon/static/events/sass/blowBalloon.scss",
				dest:"blowBalloon/static/events/css/source/blowBalloonPart.css"
			}
		},
		uglify:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',				
			},
			balloonCssBuild:{
				src:"blowBalloon/static/events/css/blowBalloon.css",
				dest:"blowBalloon/static/events/css/blowBalloon-min.css"
				},
			balloonJsBuild:{
				src:"blowBalloon/static/events/js/source/blowBalloon.js",
				dest:"blowBalloon/static/events/js/blowBalloon-min.js"
			}
		},
		concat:{
			balloonCssBuild:{
				src:"blowBalloon/static/events/css/source/*.css",
				dest:"blowBalloon/static/events/css/blowBalloon.css"
			},
			balloonJsBuild:{
				src:["blowBalloon/static/events/js/source/*.js","!zepto.min.js"],
				dest:"blowBalloon/static/events/js/blowBalloon.js"
			}
		},
		watch:{
		    css:{
		        files: ["blowBalloon/static/events/sass/*.scss"],
		        tasks: ['sass:balloonCssBuild']
		    },
		    js:{
		    	files: ["blowBalloon/static/events/js/source/*.js","!zepto.min.js"],
		        tasks: ['concat:balloonJsBuild']
		    }
		}
	});
	//加载Grunt插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');

    //默认的Grunt任务
    grunt.registerTask('default',['sass'],function(){
    	grunt.log.write('grunt default...').ok();
    });
    //log text color
    // grunt.log('test color'.green);
}