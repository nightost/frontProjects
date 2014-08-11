module.exports=function(grunt){
    //加载Grunt插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask("build","build project",function(project){
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
     });
    grunt.registerTask("buildSg","build:sgProduct",function(){
        grunt.task.run(["build:sgProduct"]);
    });
};