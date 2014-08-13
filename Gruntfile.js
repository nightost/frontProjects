module.exports=function(grunt){
    grunt.initConfig({
        meta: {
            name: 'Nightost',
            banner: '/* Copyright (c) <%= grunt.template.today("yyyy") %>*/ \n' +'/*Nightost; Licensed MIT */'
        },
        projects:{
            blowBalloon:"blowBalloon",
            sgProduct:"sgProduct_1"
        },
        curProject:'<%=projects.sgProduct%>',
        path:{
            srcDir:"<%=curProject%>/src",
            distDir:"<%=curProject%>/dist"
        },
        sass:{
            main:{
                files:[{
                    "expand": true,
                    "cwd": "<%=path.srcDir%>/sass/",
                    "src": ["**/*.scss"],
                    "dest": "<%=path.srcDir%>/css/",
                    "ext":".css"
                }]
            }
        },
        "cssmin":{
            "main":{
                "files":[{"<%=path.distDir%>/css/index.css":"<%=path.srcDir%>/css/*.css"}]
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
                    "cwd": "<%=path.srcDir%>/js/",
                    "src": ["**/*.js"],
                    "dest": "<%=path.distDir%>/js/"
                }]
            }
        },
        concat:{
            "main":{
                    "src": ["<%=path.distDir%>/js/*.js","!<%=path.distDir%>/js/zepto.min.js","!<%=path.distDir%>/js/index.js"],
                    "dest":"<%=path.distDir%>/js/index.js"
            }
        },
        "watch":{
            "css":{
                "files": ["<%=path.srcDir%>/sass/*.scss"],
                "tasks": ["sass","cssmin"]
            },
            "image":{
                "files": ["<%=path.srcDir%>/images/*.{png,jpg,jpeg}"],
                "tasks": ["imagemin"]
            }
//           , 暂时不压缩
            /*"uglify":{
                "files": ["<%=path.srcDir%>/js*//*.js"],
                "tasks": ["uglify","concat"]
            }*/
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
    grunt.registerTask("buildSg","just watch",['watch'],function(){
        grunt.log.debug("哇咔咔，走起");
    });
};