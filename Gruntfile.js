module.export=function(){
    //加载Grunt插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registTask("build","projects",function(project){
        var path="../"+project;
        console.log.debug(path);
        //set src dest
        grunt.config.set("config",{
            srcDir:path+"/src",
            distDir:path+"/dist"
        });
        var projectConfig=grunt.file.readJSON(path+"/gruntCfg.json");

    });
}