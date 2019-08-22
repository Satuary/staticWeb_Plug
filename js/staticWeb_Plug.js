$(function ($) {

    /**
     *  锚点跳转
     */
    $.fn.anchor = function (options) {
        var defaults = {
            navClass        : 'headerScroll',                                       // 滚动后添加的className
            excludeObj      : [],                                                   // 不包含进导航栏的区块
            anchorSpeed     : 500,                                                  // 锚点滚动到区块速度
            customAction    : function () {}                                       // 自定义操作
        };


        var options         = $.extend(defaults, options);                               // 继承默认参数
        var $this           = $(this);                                                  // 当然响应事件对象
        var anchorArr       = [];                                                       // 锚点元素数组
        var navHeight       = $this.innerHeight();                             // 导航栏高度
        var navBarStatus    = $this.css("position") == "fixed" ? 1 : 0;        // 导航栏定位状态, 1:fixed / 0:static


        /**
         * 获取每个锚点模块的name、offset值, 存到数组中
         */
        // 获取导航栏指向的区块
        $this.find(".anchorJump").each(function () {
            var obj = $(this).attr("href");
            var temp = constructArr(obj, 1);
            anchorArr.push(temp)
        });
        // 不包含在导航里的区块
        options.excludeObj.forEach(function (item) {
            var obj = item.selector;
            var temp = constructArr(obj, 0);
            anchorArr.push(temp)
        });


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
         * 滚动后给fixed导航栏添加ClassName
         * @param top           滚动的Top值
         * @param className     添加的className
         */
        function addBarClass(top) {
            if(top > 1 && !$this.hasClass(options.navClass)){
                $this.addClass(options.navClass);
            }else if(top < 1){
                $this.removeClass(options.navClass);
            }
        }


        /**
         * 点击导航栏跳转页面滚动到对应模块
         * @param name  锚点名
         */
        function anchorJump(name) {
            var i = screenArr(name);               //  获取该锚点的offsetTop
            var top = anchorArr[i].offsetTop;

            setNavBarActive(name);                           //   给对应的导航项添加className

            $("html, body").animate({                        //   动画效果滚动到指定位置
                scrollTop: top
            }, options.anchorSpeed);
        }


        /**
         * 根据当前模块给导航栏对应项添加选中className
         * @param name  锚点名
         */
        function setNavBarActive(name) {
            options.customAction();
            $this.find(".anchorJump[href='"+ name +"']").parent().addClass('active').siblings().removeClass('active');
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
                    $this.find('.anchorJump').parent().removeClass('active');
                }
            }
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


        /**
         * 点击锚点跳转到相应区块
         */
        $("body").on("click", ".anchorJump", function() {
            var name = $(this).attr('href');                                                // 获取锚点项的跳转区块名
            anchorJump(name, $(this));                                                      // 调用跳转滚动方法
            return false;                                                                  // 禁止跳转
        });


        /**
         * 滚动检测区块
         * addBarClass:     给导航栏添加class
         * addgoToTop:      添加返回顶部按钮
         * checkLocation:   检测滚动位置到达哪个区块
         */
        $(window).scroll(function () {
            var top = $(window).scrollTop();
            addBarClass(top);
            checkLocation(top);
        });
    };

    /**
     *   返回头部
     */
    $.fn.backTop = function(options){
        var defaults = {
            backTopSpeed:   800,                                                   // 返回头部速度
            btnContent:     ''                                                     // 按钮内容
        };

        var options         = $.extend(defaults, options);                               // 继承默认参数
        var $this           = $(this);                                                  // 当然响应事件对象
        var btnHtml         = "<div id='goToTop'>" + options.btnContent + "</div>";


        /**
         * 点击返回头部按钮返回头部
         */
        $this.on("click", "#goToTop", function() {
            $("html, body").animate({
                scrollTop: 0
            }, options.backTopSpeed);
        });


        /**
         * 添加返回顶部按钮
         */
        $(window).scroll(function () {
            var top = $(window).scrollTop();
            var len = $("#goToTop").length;
            if(top > 1 && len<=0){
                $this.append(btnHtml);
            }else if(top < 1){
                $("#goToTop").remove();
            }
        });
    };

    /**
     *  首屏满屏文字居中显示
     */
    $.fn.fullScreen = function (options) {
        var defaults = {
            excludeObj: [],          // 需要排除的元素
            model     :  1,          // 设置属性使自身满屏 0:height   1:pading
            offsetNum :  0,          // 偏移值
            media     :  0         // 哪个分辨率下不执行全屏
        };

        var options         = $.extend(defaults, options);//继承默认参数
        var $this           = $(this); //当前响应事件对象

        var windowWidth    = $(window).width();                              // 屏幕高度
        var windowHeight    = $(window).height();                           // 屏幕高度
        var objHeight       = $this.height();                          // 元素高度
        var pad = 0, padTop = 0, padBot = 0, ExcludeHeight = 0;             // 定义值

        // 计算被排除元素的高度
        options.excludeObj.forEach(function (index, key) {
            ExcludeHeight += index.innerHeight();
        });

        windowHeight = windowHeight - ExcludeHeight;

        if(windowWidth > options.media){

            if(options.model){
                pad             = (windowHeight - objHeight) / 2;               // 计算出对半padding高度
                padTop          = pad + options.offsetNum;                      // padding减掉你的自定义数值
                padBot          = pad - options.offsetNum;

                $this.css("padding-top",padTop);
                $this.css("padding-bottom",padBot);
            }else{
                $this.height(windowHeight);
            }

        }
    };

});



