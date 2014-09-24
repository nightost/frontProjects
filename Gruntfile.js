module.exports=function(grunt){
    grunt.initConfig({
        meta: {
            name: 'Nightost',
            banner: '/* Copyright (c) <%= grunt.template.today("yyyy") %>*/ \n' +'/*Nightost; Licensed MIT */'
        },
        projects:{
            projectname:"eatChickenCutlet"
        },
        curProject:'<%=projects.projectname%>',
        path:{
            srcDir:"<%=curProject%>/src",
            distDir:"<%=curProject%>/dist"
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:[{
                    "expand": true,
                    "cwd": "<%=path.srcDir%>/html/",
                    "src": ["**/*.html"],
                    "dest": "<%=path.distDir%>/html/",
                    "ext":".html"
                }]
            }
        },
        sass:{
            main:{
                files:[{
                    "expand": true,
                    "cwd": "<%=path.srcDir%>/sass/",
                    "src": ["**/*.scss"],
                    "dest": "<%=path.distDir%>/css/",
                    "ext":".css"
                }]
            }
        },
        "cssmin":{
            "main":{
                files:[{
                    "expand": true,
                    "cwd": "<%=path.distDir%>/css/",
                    "src": ["**/*.css"],
                    "dest": "<%=path.distDir%>/css/",
                    "ext":".min.css"
                }]
            }
        },
        "imagemin":{
            "main":{
                "files":[{
                    "expand": true,
                    "cwd": "<%=path.srcDir%>/images/",
                    "src": ["**/*.{png,jpg,jpeg}"],
                    "dest": "<%=path.distDir%>/images/"
                }]
            }
        },
        "uglify":{
            "options":{
                "banner":"<%=meta.banner%>\n",
                "beautify": {
                    "ascii_only": true
                }
            },
            "main":{
                "files":[{
                    "expand": true,
                    "cwd": "<%=path.distDir%>/js/",
                    "src": ["**/*.js"],
                    "dest": "<%=path.distDir%>/js/",
                    "ext":".min.js"
                }]
            }
        },
        concat:{
            "lib":{
                    "src": ["<%=path.srcDir%>/js/zepto.min.js","<%=path.srcDir%>/js/fx.js","<%=path.srcDir%>/js/hammer.js"],
                    "dest":"<%=path.distDir%>/js/libs.js"
            },
            "funs":{
                "src": ["<%=path.srcDir%>/js/*.js","!<%=path.srcDir%>/js/zepto.min.js","!<%=path.srcDir%>/js/fx.js","!<%=path.srcDir%>/js/hammer.js"],
                "dest":"<%=path.distDir%>/js/index.js"
            }
        },
        "watch":{
            "html":{
                "files":["<%=path.srcDir%>/html/*.html"],
                "tasks":["htmlmin"]
            },
            "css":{
                "files": ["<%=path.srcDir%>/sass/*.scss"],
                "tasks": ["sass","cssmin"]
            },
            "image":{
                "files": ["<%=path.srcDir%>/images/*.{png,jpg,jpeg}"],
                "tasks": ["imagemin"]
            },
//           , 暂时不压缩
            "uglify":{
                "files": ["<%=path.srcDir%>/js/*.js"],
                "tasks": ["concat","uglify"]
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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
//    grunt.loadNpmTasks('grunt-contrib-connect');
/*    grunt.registerTask("build","build project",function(project){
         var path=project;
         grunt.log.debug(path);
         //set src dest
         grunt.config.set("config",{
             srcDir:path+"/src",
             distDir:path+"/dist"
         });
         var projectConfig=grunt.file.readJSON(path+"/gruntCfg.json");
         grunt.config.set("sass",projectConfig.sass);
         grunt.config.set("imagemin",projectConfig.imagemin);
         grunt.config.set("uglify",projectConfig.uglify);
         grunt.config.set("cssmin",projectConfig.cssmin);
         grunt.task.run(["sass","cssmin","uglify"]);
     });*/
    grunt.registerTask("buildP","just watch",function(project){
        //命令行可带参数运行
        grunt.log.debug(project);
        grunt.config.set("projects.projectname",project);
//        grunt.config.set("projects.projectname","eatChickenCutlet");
        grunt.task.run("watch");
    });
};