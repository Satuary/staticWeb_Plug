new WOW().init();

// SERVICES 鼠标移入移出变换图片
$('.serItem').hover(function(e){
    $(this).find("img[class^=serItemIcon]").eq(0).hide()
	$(this).find("img[class^=serItemIcon]").eq(1).show()
  },function(){
    $(this).find("img[class^=serItemIcon]").eq(0).show()
	$(this).find("img[class^=serItemIcon]").eq(1).hide()
  });

$(document).ready(function() {
    var _uat=navigator.userAgent;
    function fn() {
        $("body").niceScroll({cursorborder:"",cursorcolor:"rgba(0,0,0,0)",boxzoom:false});
    }
    // 兼容性判断
    if($(window).width()>768){
        if(_uat.indexOf("Firefox")>0){
            fn();
        }else{
            window.addEventListener('touchmove', fn, { passive: false })
        }
    }

    // swiper
    var swiper = new Swiper('.swiper-container', {
        autoplay:{
            delay: 20000
        },
        loop: true,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
        }
    });


    $(".bannerText").fullScreen({
        media: 640
    });

    $(".navbar").anchor({
        navClass: 'headerChange',
        excludeObj: [$(".header"), $(".needs")]
    });

    $("body").backTop();
});
