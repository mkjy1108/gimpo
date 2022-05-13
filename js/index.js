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

    //메인이미지 슬라이드
    let sNum = 0;
    let liCount = $(".slideBox>li").length;
    let liWidth = $(".slideBox>li:eq(0)").width();
    let obj = $(".slideBox>.banner1").clone();
    $(".slideBox").append(obj);
    let copyCount = $(".slideBox>li").length;

    $(".slideBox").width(copyCount*liWidth);
    let bannerWidth = $(".slideBox").width();
    $(".slideBox>li").width(bannerWidth/copyCount);
    let copyWidth = $(".slideBox>li").width();
    let wWidth = $(window).outerWidth();


    function init(){
        $(".slideBox").outerWidth(wWidth*5);
        $(".slideBox>li").outerWidth(wWidth);
        oliWidth = $(".slideBox>li").outerWidth();
    }

    function moveBanner(){
        $(".slideBox").stop().animate({
            "margin-left":-sNum*oliWidth,
        },1500)
    }

    init();
    moveBanner();

    $(".slideBtn>li").click(function(){
        sNum = $(this).index();
        moveBanner();
        if(sNum==4){
            $(".slideBtn>li").eq(0).addClass("active").siblings().removeClass("active");
        } else {
            $(".slideBtn>li").eq(sNum).addClass("active").siblings().removeClass("active");
        }
    })

    let timer = setInterval(function(){
        if(sNum==4){
            sNum=0;
            $(".slideBox").css("margin-left",0)
        }
        sNum++;
        if(sNum==4){
            $(".slideBtn>li").eq(0).addClass("active").siblings().removeClass("active");
        } else {
            $(".slideBtn>li").eq(sNum).addClass("active").siblings().removeClass("active");
        }
        moveBanner();
    },3500)

    $(".mainBanner").on("mouseover",function(){
        clearInterval(timer);
    })
    $(".mainBanner").on("mouseout",function(){
        timer = setInterval(function(){
            if(sNum==4){
                sNum=0;
                $(".slideBox").css("margin-left",0)
            }
            sNum++;
            if(sNum==4){
                $(".slideBtn>li").eq(0).addClass("active").siblings().removeClass("active");
            } else {
                $(".slideBtn>li").eq(sNum).addClass("active").siblings().removeClass("active");
            }
            moveBanner();
        },3500)
    })


    //달력
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let lastDay = [31,28,31,30,31,30,31,31,30,31,30,31];
    
    if(year % 4 == 0 && year % 100 !=0 || year % 400==0){
        lastDay[1]=29;
    }

    function makeCalendar(){
        if(year % 4 == 0 && year % 100 !=0 || year % 400==0){
            lastDay[1]=29;
        }
        $(".day>a").empty();
        let thisMonth = new Date(year,month,1);
        let week = thisMonth.getDay();
        let satDay = 6-week;
        let sunDay = satDay+1;

        $(".yearTxt").text(year);
        if(month>=9){
            $(".monthList").text(month+1);
        } else {
            $(".monthList").text("0"+(month+1));
        }

        for(i=1; i<=lastDay[month]; i++){
            $(".day>a").append(`<span>${i}</span>`);
        }
        $(".day>a>span").eq(day-1).addClass("today");

        for(i=0; i<lastDay[month]; i++){
            $(".day>a>span").eq(satDay+i*7).addClass("sat");
            $(".day>a>span").eq(sunDay+i*7).addClass("sun");
        }
    }
    makeCalendar();

    $(".mNext").on("click",function(){
        date = new Date(year, month+1, day);
        year = date.getFullYear();
        month = date.getMonth();
        makeCalendar();
    })
    $(".mPrev").on("click",function(){
        date = new Date(year, month-1, day);
        year = date.getFullYear();
        month = date.getMonth();
        makeCalendar();
    })

    //공지사항 슬라이드
    let nNum = 0;
    let nliWidth = $(".noticeBox>ul:eq(0)").width();
    $(".titleList>li").click(function(){
        nNum = $(this).index();
        $(".noticeBox").stop().animate({
            "margin-left":-nNum*nliWidth,
        },500)
    })
    $(".noticeBox>ul li>a").on("mouseenter",function(){
        $(this).children("img").attr("src","images/notice_moreHover.png");
    })
    $(".noticeBox>ul li>a").on("mouseleave",function(){
        $(this).children("img").attr("src","images/notice_more.png");
    })

    function noticeInit(){
        let notiLen = $(".noticeBox>ul").length;
        let notiBoxWidth = 100 * notiLen
        $(".noticeBox").width(notiBoxWidth+"%");
        let notiUlWidth = $(".noticeBox>ul").width();
        $(".noticeBox").stop().animate({
            "margin-left":-nNum*notiUlWidth,
        },500)
        $(".titleList>li").click(function(){
            nNum = $(this).index();
            $(".noticeBox").stop().animate({
                "margin-left":-nNum*notiUlWidth,
            },500)
        })
        if(wWidth<=767){
            $(".noticeBox>ul>li").width(99+"%");
            $(".noticeList>li:first").css("border-right","1px solid gray");
            $(".schoolList>li:first").css("border-right","1px solid gray");
            $(".infoList>li:first").css("border-right","1px solid gray");
            $(".qnaList>li:first").css("border-right","1px solid gray");
        } else if(wWidth<=1490){
            $(".noticeBox>ul>li").width(49.6+"%");
            $(".noticeList>li:first").css("border-right","none");
            $(".schoolList>li:first").css("border-right","none");
            $(".infoList>li:first").css("border-right","none");
            $(".qnaList>li:first").css("border-right","none");
        } else {
            $(".noticeBox>ul>li").width(24.8+"%");
            $(".noticeList>li:first").css("border-right","none");
            $(".schoolList>li:first").css("border-right","none");
            $(".infoList>li:first").css("border-right","none");
            $(".qnaList>li:first").css("border-right","none");
        }
    }
    noticeInit();


    //원형 아이콘
    $("#iconBtn>li").mouseenter(function(){
        iconNum = $(this).index();
        if(iconNum==0){
            $("#iconBtn>li:eq(0)>a>img").attr("src", "images/icon_school_hover.svg")
        } else if (iconNum==1) {
            $("#iconBtn>li:eq(1)>a>img").attr("src", "images/icon_moni_hover.svg")
        } else if (iconNum==2) {
            $("#iconBtn>li:eq(2)>a>img").attr("src", "images/icon_note_hover.svg")
        } else if (iconNum==3) {
            $("#iconBtn>li:eq(3)>a>img").attr("src", "images/icon_cap_hover.svg")
        } else if (iconNum==4) {
            $("#iconBtn>li:eq(4)>a>img").attr("src", "images/icon_search_hover.svg")
        } else if (iconNum==5) {
            $("#iconBtn>li:eq(5)>a>img").attr("src", "images/icon_pen_hover.svg")
        }
    })
    $("#iconBtn>li").mouseleave(function(){
        iconNum = $(this).index();
        if(iconNum==0){
            $("#iconBtn>li:eq(0)>a>img").attr("src", "images/icon_school.svg")
        } else if (iconNum==1) {
            $("#iconBtn>li:eq(1)>a>img").attr("src", "images/icon_moni.svg")
        } else if (iconNum==2) {
            $("#iconBtn>li:eq(2)>a>img").attr("src", "images/icon_note.svg")
        } else if (iconNum==3) {
            $("#iconBtn>li:eq(3)>a>img").attr("src", "images/icon_cap.svg")
        } else if (iconNum==4) {
            $("#iconBtn>li:eq(4)>a>img").attr("src", "images/icon_search.svg")
        } else if (iconNum==5) {
            $("#iconBtn>li:eq(5)>a>img").attr("src", "images/icon_pen.svg")
        }
    })

    //이슈 슬라이드
    let issNum = 0;
    let issliCount = $(".issList>li").length;
    let issliWidth = $(".issList>li:eq(0)").width();
    let issFirstObj = $(".issList>li:eq(0)").clone();
    let issLastObj = $(".issList>li:eq(3)").clone();
    $(".issList").append(issFirstObj);
    $(".issList").prepend(issLastObj);
    let issCopyCount = $(".issList>li").length;

    $(".issList").width(issCopyCount*issliWidth);
    let issListWidth = $(".issList").width();
    $(".issList>li").width(issListWidth/issCopyCount);
    let issCopyWidth = $(".issList>li").width();

    
    function issinit(){
        if(wWidth<=1490){
            $(".issList").outerWidth(wWidth*270);
            let initIssList = $(".issList").width()  
            $(".issList>li").outerWidth(initIssList/wWidth);
            issCwidth = $(".issList>li").outerWidth();
        } else if(wWidth>1490){
            $(".issList").outerWidth(wWidth*330);
            let initIssList = $(".issList").width()  
            $(".issList>li").outerWidth(initIssList/wWidth);
            issCwidth = $(".issList>li").outerWidth();
        } else {
            $(".issList").outerWidth(wWidth*issCopyWidth);
            let initIssList = $(".issList").width()  
            $(".issList>li").outerWidth(initIssList/wWidth);
            issCwidth = $(".issList>li").outerWidth();
        }
    }
    
    function moveIssue(){
        $(".issList").stop().animate({
            "margin-left":-issNum*issCwidth
        },1500)
    }

    issinit();
    moveIssue();
    
    let issTimer = setInterval(function(){
        if(issNum==4){
            issNum=0;
            $(".issList").css("margin-left",0)
        }
        issNum++;
        moveIssue();
    },5000)

    $(".nextBtn").on("click",(e)=>{
        if(issNum==4){
            issNum=0;
            $(".issList").css("margin-left",0)
        }
        issNum++;
        moveIssue()
    })
    $(".prevBtn").on("click",(e)=>{
        if(issNum==0){
            $(".issList").css("margin-left",-4*issCopyWidth)
            issNum=4;
        }
        issNum--;
        moveIssue();
    })
    let playCount = 0;
    $(".playBtn").click(function(){
        playCount++;
        if(playCount%2 == 1){
            $(this).find("img").attr("src","images/issue_play.png");
            clearInterval(issTimer);
        } else {
            $(this).find("img").attr("src","images/issue_pause.png");
            issTimer = setInterval(function(){
                if(issNum==4){
                    issNum=0;
                    $(".issList").css("margin-left",0)
                }
                issNum++;
                moveIssue();
            },5000)
        }
    })


    //갤러리
    let galBanner = 0;
    let gliCount = $(".imgList>li").length;
    let gliWidth = $(".imgList>li").outerWidth();
    let lastObj = $(".imgList>li:gt(6)").clone();
    let firstObj = $(".imgList>li:lt(4)").clone();

    $(".imgList").append(firstObj);
    $(".imgList").prepend(lastObj);

    let gcopyCount = $(".imgList>li").length;
    let gbWidth = gcopyCount*100/5+"%";
    $(".imgList").outerWidth(gbWidth);
    $(".imgList>li").outerWidth(gliWidth);

    let gtimer = setInterval(function(){
        if(galBanner==10){
            galBanner=0;
            $(".imgList").css("left",galBanner)
        }
        galBanner++;
        ginit();
    },2500)

    $(".imgList>li").on("mouseover",function(){
        $(this).addClass("active").siblings().removeClass("active")
        clearInterval(gtimer);
    })
    $(".imgList>li").on("mouseout",function(){
        $(this).removeClass("active")
        gtimer = setInterval(function(){
            if(galBanner==10){
                galBanner=0;
                $(".imgList").css("left",galBanner)
            }
            galBanner++;
            ginit();
        },2500)
    })

    function ginit(){
        if(wWidth>1024){
            $(".imgList").outerWidth(wWidth*18/4);
            $(".imgList>li").outerWidth(wWidth/5);
        } else if(wWidth<=767){
            $(".imgList").outerWidth(wWidth*18/1);
            $(".imgList>li").outerWidth(wWidth/2);
        }
        if(wWidth<425){
            $(".subTitle").css({
                "display":"none",
            });
            $(".imgTitle").css({
                "top":"40%"
            })
        } else {
            $(".subTitle").css({
                "display":"block",
                "overflow":"hidden",
                "text-overflow":"ellipsis",
                "display": "-webkit-box",
                "-webkit-line-clamp":"2",
                "-webkit-box-orient":"vertical"
            });
            $(".imgTitle").css({
                "top":"30%"
            });
        }
        gliWidth = $(".imgList>li").outerWidth();

        $(".imgList").stop().animate({
            "left":galBanner*-gliWidth
        },1000)
    }
    ginit();

    $(window).on("resize",function(){
        wWidth = $(window).outerWidth();
        ginit();
        init();
        moveBanner();
        issinit();
        moveIssue();
        noticeInit();
        if(wWidth>1024){
            $("#mobileMenu").css("display","none");
            $(".mobileMenuBg").css("display","none");
        }
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

    // 주요사이트
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
})