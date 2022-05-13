$(function(){
    //서브메뉴 슬라이드
    $("#nav").mouseenter(function(){
        $(".subMenu").stop().slideDown(500);
        $(".subBg").stop().slideDown(500);
    })
    $("#nav").mouseleave(function(){
        $(".subMenu").stop().slideUp(500);
        $(".subBg").stop().slideUp(500);
    })


    //모바일 메뉴
    $(".mMainMenu>li").click(function(){
        let mobileNum = $(this).index();

        console.log($(this).index())
        $(this).addClass("active").siblings().removeClass("active")

        $(".mobileNav>li").eq(mobileNum).css("display","block").siblings().css("display","none");
    });

    $("#mMenu").click(function(){
        $("#mobileMenu").css("display","block");
        $(".mobileMenuBg").css("display","block");
        $("#mobileMenu").stop().animate({
            "right":0
        },500)
    })
    $(".mobileClose").click(function(){
        $("#mobileMenu").stop().animate({
            "right":"-999px",
        },500)
        $("#mobileMenu").css("display","none");
        $(".mobileMenuBg").css("display","none");
    })

    //주요사이트
    let slideCount = 0;
    $(".famSite>a").click(function(){
        $(".family>li").css("display","block")
        $(".family").stop().slideUp(1000)
        slideCount++;
        if(slideCount%2 == 1){
            $(".family").stop().slideDown(300)
            $(".famSite>a>img").attr("src","images/familySite_Down.png");
        } else {
            $(".family").stop().slideUp(300)
            $(".famSite>a>img").attr("src","images/familySite_Up.png");
        }
    })

    $(window).on("resize",function(){
        wWidth = $(window).outerWidth();
        ginit();
        init();
        moveBanner();
        issinit();
        moveIssue();
        noticeInit();
        if(wWidth>1024){
            $("#mobileMenu").css({
                "display":"none",
                "right":"-999px"
            });
            $(".mobileMenuBg").css("display","none");
        }
    })
})