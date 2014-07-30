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
				src:"blowBalloon/src/static/events/sass/blowBalloon.scss",
				dest:"blowBalloon/src/static/events/css/blowBalloonPart.css"
			}
		},
		cssmin:{
			"blowBalloon/dist/static/events/css/blowBalloo-min.css":"blowBalloon/src/static/events/css/*.css"
		},
		uglify:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',	
				beautify: {
                //中文ascii化，非常有用！防止中文乱码的神配置
                ascii_only: true
            }			
			},
			/*balloonCssBuild:{
				src:"blowBalloon/static/events/css/blowBalloon.css",
				dest:"blowBalloon/static/events/css/blowBalloon-min.css"
				},*/
			balloonJsBuild:{
				src:"blowBalloon/src/static/events/js/blowBalloon.js",
				dest:"blowBalloon/dist/static/events/js/blowBalloon-min.js"
			}
		},
		concat:{
			/*balloonCssBuild:{
				src:"blowBalloon/src/static/events/css/source/*.css",
				dest:"blowBalloon/dist/static/events/css/blowBalloon.css"
			},*/
			balloonJsBuild:{
				src:["blowBalloon/src/static/events/js/source/*.js","!zepto.min.js"],
				dest:"blowBalloon/dist/static/events/js/blowBalloon.js"
			}
		},
		watch:{
		    css:{
		        files: ["blowBalloon/src/static/events/sass/*.scss"],
		        tasks: ['sass:balloonCssBuild']
		    },
		    js:{
		    	files: ["blowBalloon/src/static/events/js/source/*.js","!zepto.min.js"],
		        tasks: ['concat:balloonJsBuild']
		    },
		    html:{
		    	files:["blowBalloon/dist/html/*.html"],
		    	options:{
		    		liveload:true;
		    	}
		    }
		}
	});
	//加载Grunt插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //默认的Grunt任务
    grunt.registerTask('build','concat and uglify',['sass','cssmin','concat','uglify'],function(){
    	grunt.log.write('grunt default...').ok();
    });

    //log text color
    // grunt.log('test color'.green);
}