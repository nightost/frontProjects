
/**
 * do when images loaded
 */
function imagesLoadedHandle(){
    $(".game-wait").css({
        "-webkit-transform":"scale(0)"
    });
    console.log("all images loaded~");
};