var targetModel = (function( test ){
    console.log(test)

    var anchorArr       = [];                                               // 锚点元素数组
    var navBar          = $(".header_top");                                 // 导航栏元素
    var navHeight       = navBar.innerHeight();                             // 导航栏高度
    var navBarStatus    = navBar.css("position") == "fixed" ? 1 : 0;        // 导航栏定位状态, 1:fixed / 0:static


    /**
     * 获取每个锚点模块的name、offset值, 存到数组中
     * @param nocheck   不包含进导航栏的区块
     */
    function computeScrollTop(nocheck) {
        // 获取导航栏指向的区块
        navBar.find(".anchorJump").each(function () {
            var obj = $(this).attr("href");
            var temp = constructArr(obj, 1);
            anchorArr.push(temp)
        });
        // 不包含在导航里的区块
        nocheck.forEach(function (item) {
            var obj = item.selector;
            var temp = constructArr(obj, 0);
            anchorArr.push(temp)
        });
    }



    /**
     * 组装数组
     * @param obj       数组对象
     * @param status    区块状态 1: 在导航栏中  2:不在导航里
     * @returns {{name: *, offsetTop: number, offsetBottom: *, status: *}}      返回一个组装好数组对象
     */
    function constructArr(obj, status) {
        var pad = parseInt($(obj).css('margin-top')) / 2;                                       // 获取区块的margintop减掉一些空余
        var top = $(obj).offset().top - pad;
        top = navBarStatus ? top - navHeight : top;                                             // 导航栏fixed需要减掉导航栏的高度

        var height = $(obj).height();
        var bottom = height + top;                                                              // 区块的底线为top + 其高度

        var temp = {                                                                            // 组装加入数组
            name: obj,
            offsetTop: top,
            offsetBottom: bottom,
            status: status
        };

        return temp;
    }



    /**
     * 首屏满屏文字居中显示
     * @param banner    要添加padding的元素 (必填)
     * @param num       自定义的加减值 (选填)
     */
    function bannerFull(banner, num) {
        var windowHeight = $(window).height();                          // 屏幕高度
        var objHeight    = banner.innerHeight();                        // 元素高度
        var pad = 0, padTop = 0, padBot = 0;                            // 定义padding
        var num = num ? num : 0;                                        // 自定义的padding值,没传入默认为0

        if(!navBarStatus)  windowHeight = windowHeight - navHeight;     // 判断导航栏是否fixed,不是的windowHeight需要减掉导航栏高度

        pad          = (windowHeight - objHeight) / 2;                  // 计算出对半padding高度
        padTop       = pad + num;                                       // padding减掉你的自定义数值
        padBot       = pad - num;

        banner.css("padding-top",padTop);
        banner.css("padding-bottom",padBot);
    }



    /**
     * 点击导航栏跳转页面滚动到对应模块
     * @param name  锚点名
     */
    function anchorJump(name) {
        var i = screenArr(name);               //  获取该锚点的offsetTop
        var top = anchorArr[i].offsetTop;

        setNavBarActive(name);                 //   给对应的导航项添加className
        animateScroll(top, 500);               //   动画效果滚动到指定位置
    }



    /**
     * 滚动检测在哪个模块区间，给导航栏对应项添加className
     * @param top       滚动值
     */
    function checkLocation(top) {
        var i = screenArr(top);
        if(i!=undefined){
            // 如果区块在导航栏中添加选中状态，否则清除状态
            if(anchorArr[i].status){
                var name = anchorArr[i].name;
                setNavBarActive(name);
            }else{
                navBar.find('.anchorJump').parent().removeClass('active');
            }
        }
    }




    /**
     * 滚动后给fixed导航栏添加ClassName
     * @param top           滚动的Top值
     * @param className     添加的className
     */
    function addBarClass(top, className) {
        if(top > 1 && !navBar.hasClass(className)){
            navBar.addClass(className);
        }else if(top < 1){
            navBar.removeClass(className);
        }
    }



    /**
     * 添加返回顶部按钮, 固定id = goToTop
     * @param top   滚动的Top值
     */
    function addgoToTop(top) {
        var len = $("#goToTop").length;
        if(top > 1 && len<=0){
            $('body').append("<a id='goToTop'><i class='iconfont iconzhiding'></i></a>");
        }else if(top < 1){
            $("#goToTop").remove();
        }
    }



    /**
     * 返回头部
     */
    function goToTop() {
        animateScroll(0, 800);
    }



    /**
     * 动画滚动
     * @param top       滚动位置
     * @param speed     滚动速度
     */
    function animateScroll(top, speed) {
        $("html, body").animate({
            scrollTop: top
        }, speed);
    }



    /**
     * 根据当前模块给导航栏对应项添加选中className
     * @param name  锚点名
     */
    function setNavBarActive(name) {
        console.log(name);
        navBar.find(".anchorJump[href='"+ name +"']").parent().addClass('active').siblings().removeClass('active');
    }



    /**
     * 筛选出对应项返回其索引值
     * 条件1: anchorArr[i].name == val                                            如果点击传进来的name = 数组中的name
     * 条件2: val > anchorArr[i].offsetTop && val < anchorArr[i].offsetBottom     页面滚动的scrollTop值在某一个区块的scrollTop区间
     * @param val      对比的变量名
     * @returns {number}    索引值
     */
    function screenArr(val) {
        var len = anchorArr.length;
        for(var i=0; i<len; i++){
            var top = anchorArr[i].offsetTop - 10;          // 适当减少边距
            var bottom = anchorArr[i].offsetBottom - 10;
            if(anchorArr[i].name == val || (val > top && val <= bottom)) return i;
        }
    }


    $(function () {
        targetModel.bannerFull($(".bannerText"));
        targetModel.computeScrollTop([$(".header"), $(".needs")]);
    });


    $('body').on("click", ".anchorJump", function() {
        var name = $(this).attr('href');                                                // 获取锚点项的跳转区块名
        targetModel.anchorJump(name, $(this));                                          // 调用跳转滚动方法
        return false;                                                                  // 禁止跳转
    });



    $('body').on("click", "#goToTop", function() {
        targetModel.goToTop();
    });



    $(window).scroll(function () {
        var top = $(window).scrollTop();                                                // 获取滚动条的scrollTop值
        targetModel.addBarClass(top, 'headerChange');                                   // 给导航栏添加class
        targetModel.addgoToTop(top);                                                    // 添加返回顶部按钮
        targetModel.checkLocation(top);                                                 // 检测滚动位置到达哪个区块
    });


    return {
        computeScrollTop: computeScrollTop,
        bannerFull      : bannerFull,
        anchorJump      : anchorJump,
        addBarClass     : addBarClass,
        addgoToTop      : addgoToTop,
        checkLocation   : checkLocation,
        goToTop         : goToTop
    };

})(window.targetModel || {});



$(function () {
    // targetModel.bannerFull($(".bannerText"));
    // targetModel.computeScrollTop([$(".header"), $(".needs")]);
    // targetModel.anchorJump(name, $(this));
    // targetModel.goToTop();
    // var top = $(window).scrollTop();
    // targetModel.addBarClass(top, 'headerChange');
    // targetModel.addgoToTop(top);
    // targetModel.checkLocation(top);


    /**
     * 1. banner元素
     *
     */
    targetModel('test')
});
