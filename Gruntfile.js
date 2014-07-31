module.exports=function(grunt){
	grunt.initConfig({
		//read package.json
		pkg:grunt.file.readJSON('package.json'),
		balloonTasks:grunt.file.readJSON("blowBalloon/tasks.json"),
		sass:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				style: 'compressed'				
			},
			balloonCssBuild:'<%=balloonTasks.sass%>'
		},
		cssmin:{
			balloonCssMin:'<%=balloonTasks.cssmin%>'
			
		},
		imagemin:'<%=balloonTasks.imagemin%>',
		uglify:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',	
				beautify: {
                //中文ascii化，非常有用！防止中文乱码的神配置
                ascii_only: true
            }			
			},
			balloonJsBuild:'<%=balloonTasks.uglify%>'
		},
		concat:{
			balloonJsBuild:'<%=balloonTasks.jsconcat%>'
		},
		watch:'<%=balloonTasks.watch%>',
		connect:{
			options:{
				hostname:"localhost",
				port:9001,
				livereload:35731
			},
			livereload:{
				options:'<%=balloonTasks.watch%>'
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
    grunt.registerTask('build','concat and uglify',['sass','cssmin','concat','uglify'],function(str){
    	var _test=str;
    	grunt.log.write(_test).ok();
    });
    grunt.registerTask('autoreload','connect',['connect','watch'],function(str){
    	grunt.log.write('autoreload.....'+str).ok();
    });

    //log text color
    // grunt.log('test color'.green);
}