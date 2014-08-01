module.exports=function(grunt){
	grunt.initConfig({
		//read package.json
		pkg:grunt.file.readJSON('package.json'),
		//balloonTasks:grunt.file.readJSON("blowBalloon/tasks.json"),
		sass:{
            balloonCssBuild:{
                "src":"blowBalloon/src/static/events/sass/blowBalloon.scss",
                "dest":"blowBalloon/src/static/events/css/blowBalloonPart.css"
            }
        },
		cssmin:{
                "blowBalloon/dist/static/events/css/blowBalloon-min.css":"blowBalloon/src/static/events/css/*.css"
        },
		imagemin:{
                "dist":{
                    "options": {
                        "optimizationLevel": 3
                    },
                    "files":[{
                        "expand": true,
                        "cwd": "blowBalloon/src/static/events/images/",
                        "src": ["**/*.{png,jpg,jpeg}"],
                        "dest": "blowBalloon/dist/static/events/images/"
                    }]
                }
        },
		uglify:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				beautify: {
                //中文ascii化，非常有用！防止中文乱码的神配置
                ascii_only: true
             }
			},
			balloonJsBuild:{
                "files":[{
                    "blowBalloon/dist/static/events/js/blowBalloon-min.js":"blowBalloon/dist/static/events/js/blowBalloon.js",
                    "blowBalloon/dist/static/events/js/loadImgLoaded.js":"blowBalloon/src/static/events/js/loadImgLoaded.js"
                }]
            }
		},
		concat:{
			balloonJsBuild:{
                "files":[{
                    "src":["blowBalloon/src/static/events/js/*.js","!blowBalloon/src/static/events/js/zepto.min.js","!blowBalloon/src/static/events/js/loadImgLoaded.js"],
                     "dest":"blowBalloon/dist/static/events/js/blowBalloon.js"
                },{
                    "src":["blowBalloon/src/static/events/js/zepto.min.js","blowBalloon/src/static/events/js/touch.js"],
                    "dest":"blowBalloon/dist/static/events/js/zepto.min.js"
                 }]
            }
		},
		watch:{
            "css":{
                "files": ["blowBalloon/src/static/events/sass/*.scss"],
                "tasks": ["sass:balloonCssBuild","cssmin"]
            },
            "js":{
                "files": ["blowBalloon/src/static/events/js/*.js","!zepto.min.js"],
                "tasks": ["concat:balloonJsBuild","uglify:balloonJsBuild"]
            },
            "html":{
                "files":["blowBalloon/dist/html/index.html"],
                "options":{
                    "livereload":"<%=connect.options.livereload%>"
                }
            },
            "image":{
                "files": ["blowBalloon/src/static/events/images/*.{png,jpg,jpeg}"],
                "tasks": ["imagemin"]
            }
        },
		connect:{
			options:{
				hostname:"localhost",
				port:9001,
				livereload:35731
			},
			livereload:{
				options:{
                    "open":"http://<%=connect.options.hostname%>:<%=connect.options.port%>/blowBalloon/dist/html/index.html"
                }
			}
		}
	});
	//加载Grunt插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');

    //默认的Grunt任务
    //我的世界
    grunt.registerTask('build',['sass','cssmin','concat','uglify'],function(str){
    	var _test=str;
    	grunt.log.write(_test).ok();
    });
    grunt.registerTask('autoreload','connect',['connect','watch'],function(str){
    	grunt.log.write('autoreload.....'+str).ok();
    });

    //log text color
    // grunt.log('test color'.green);
};