/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';
$(function () {
    function resize(){
        //根据屏幕宽度的变化决定轮播图应该展示什么
        var windowWidth=$(window).width();
        var isSmallScreen=windowWidth<768;
        //$("#carousel-example-generic>.carousel-inner>.item")获取到的是一个数组
        $("#carousel-example-generic>.carousel-inner>.item").each(function (i,item) {
            var $item=$(item);//因为拿到的是dom对象需要转换
            var imgSrc=isSmallScreen?$item.data("image-xs"):$item.data("image-lg")
            //$element.data()用于取自定义属性
            $item.css("backgroundImage","url("+imgSrc+")");
            //我们需要小图时候尺寸等比例变化，所以小图时候用img方式
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'" alt="aaa">');
            }else{
                $item.empty();
            }

        })

    }
    $(window).on('resize',resize).trigger('resize');//先触发一下resize事件

    //初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();
    var $carousels=$(".carousel");
    var startX,endX;
    var offset=50;
    //注册滑动事件
    $carousels.on("touchstart", function (e) {
        startX=e.originalEvent.touches[0].clientX;

    })

    $carousels.on("touchmove", function (e) {//变量重复赋值
        endX=e.originalEvent.touches[0].clientX;
    })
    $carousels.on("touchend", function () {
        //离开一瞬间的坐标x
        //获取每次运动的距离，当距离大于一定值认为是有方向的变化
        var distance=Math.abs(startX-endX);
        if(distance>offset){
            //有方向变化
            //根据获得的方向选择上一张或者下一张
            $(this).carousel(startX>endX? "next":"prev");
        }
    })


    var $a=$("#introduce .row>div a");
    $a.each(function () {
        $(this).on("mouseenter", function () {
            $(this).children(".black-mask").fadeIn();
        })
        $(this).on("mouseleave", function () {
            $(this).children(".black-mask").fadeOut();
        })
    })


})