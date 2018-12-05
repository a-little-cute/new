//关闭广告
$(".close").click(function(){
	$(".advert").css("display","none");
})
//轮播图
function LunBo(){
	var timer = null,
		index = 0,
		$main = $(".main")
		$ulist = $(".main ul>li"),
		$olist = $(".main ol>li");
	$olist.eq(index).css({"opacity":1,"background-color":"#f5004b"})
	console.log($olist)
	timer = setInterval( autoPlay , 3000 );
	function autoPlay(){
		index++;
		if(  index == $ulist.size() ){
			index = 0;
		}
		var bgcolor = $olist.eq(index).attr("color");
		$main.css("background",bgcolor);		
		$olist.eq(index).css({"opacity":1,"background-color":"#f5004b"})
						.addClass("current")
						.siblings()
						.css({"opacity":.3,"background-color":"#000"});
		$ulist.eq(index).fadeIn(1000).siblings().fadeOut(1000);
	}
	$olist.mouseenter(function(){
		clearInterval( timer );
		index = $(this).index()-1;
		autoPlay();
	}).mouseleave(function(){
		timer = setInterval( autoPlay , 3000 );
	})
	
}
 LunBo();
//我的特权
function Vip(){ 
	var i=1;
	var step = $(".public-drop div").width();
	
	$(".p-d-next").click(function(){
		var pleft = parseInt($("#p-d-ul").css("left"));
		
		$("#p-d-ul").css("left",pleft-step);
		console.log(pleft);
		if( pleft == "-480" ){
			$("#p-d-ul").css("left",-480)
		}
			
	})
	$(".p-d-prev").click(function(){
		var pleft = parseInt($("#p-d-ul").css("left"));
		$("#p-d-ul").css("left",pleft+step);
		if( pleft == "0" ){
			$("#p-d-ul").css("left",0)
		}	
	})
}
Vip();

function search(){
	$(".search-left div").mouseenter(function(){
		$(".search-left ul").css("display","block");
		$(".search-left div i").css("background-position","-55px -433px");
	}).mouseleave(function(){
		$(".search-left ul").css("display","none");
		$(".search-left div i").css("background-position","-62px -433px");
		
	})
	$(".search-left ul").mouseenter(function(){
		$(".search-left ul").css("display","block");
		$(".search-left div i").css("background-position","-55px -433px");
	}).mouseleave(function(){
		$(".search-left ul").css("display","none");
		$(".search-left div i").css("background-position","-62px -433px");
	})
	$(".search-left ul li").mouseenter(function(){
		$(this).css("background","#E9E9E9").siblings().css("background","");
	}).click(function(){
		$(".search-left div span").html($(this).html());
	})
}
search();

//全部商品分类
function all(){
	$(".bannerLeft li").mouseenter(function(){
		$(".subnav").css("display","block");
	}).mouseleave(function(){
		$(".subnav").css("display","none");
	})
	$(".subnav").mouseenter(function(){
		$(this).css("display","block");
	}).mouseleave(function(){
		$(this).css("display","none");
	})
	
}
all();
$.extend({
	like : function(){
		$(".change-btn-next").click(function(){
			$(".like-bottom").css("left","-1200px");
		})
	}
})
//猜你喜欢
$.like();
$.fn.extend({
	fnMouseenter : function(){
		this.on("mouseenter","li",function(){
			var index = $(this).index();
			$(this).parent().attr("index",index);
			var hcolor = $(this).parent().attr("hcolor");
			$(this).css({"background":hcolor})
					.children()
					.css("color","#fff")
					.end()
				   .siblings()
				   .css("background","")
				   .children()
				   .css("color","#5E5E5E");
			$(this).parent().parent().parent().find(".mc_main").eq(index).css("display","block").siblings(".mc_main").css("display","none");
		})
	},
	fnClick : function(){
		this.click(function(){
			var $tab = $(this).parent().parent().parent().find(".tab");
			var index = $tab.attr("index");
			if( index == 4 ){
				index = -1;
			}
			index++
			var hcolor = $(".tab").attr("hcolor");
			$tab.find("li").eq(index).css({"background":hcolor}).children().css("color","#fff").end().siblings()
				   .css("background","").children().css("color","#5E5E5E");
			$(this).parent().parent().parent().find(".mc_main").eq(index).css("display","block").siblings(".mc_main").css("display","none");
			$tab.attr("index",index);
		})
	}
})
$(".Louti1 .tab").fnMouseenter();
$(".Louti2 .tab").fnMouseenter();
$(".Louti3 .tab").fnMouseenter();
$(".Louti4 .tab").fnMouseenter();
$(".Louti1 .mc>.slider_page .slider_down").fnClick();
$(".Louti2 .mc>.slider_page .slider_down").fnClick();
$(".Louti3 .mc>.slider_page .slider_down").fnClick();
$(".Louti4 .mc>.slider_page .slider_down").fnClick();

	var $list = $("#LoutiNav li:not(.last)"),//楼层号
		$floor = $(".louti"),
		flag = true;//假设值为true时  滚动条可以操作
		console.log($floor);
	$list.click(function(){
		flag = false;
		$(this).addClass("red")
			   .siblings()
			   .removeClass("red");
		//获取当前点击的楼层号的下标
		var index = $(this).index();
		//根据下标获取index对应的楼层相对于内容窗口顶部的距离
		var t = $floor.eq(index).offset().top;
		//设置滚动条滚动的距离 为 t
		$("html,body").animate({"scrollTop":t},1000,function(){
			//运动完成后  将开关变量的值变成true
			flag = true;
		});
	})
	//回到顶部
	$(".up").click(function(){
		flag = false;
		$("html,body").animate({"scrollTop":0},1000,function(){
			flag = true;
		});
	})
	//去底部
	$(".down").click(function(){
		flag = false;
		$("html,body").animate({"scrollTop":$("body").height()},1000,function(){
			flag = true;
		});
	})
	//操作滚动条
	$(window).scroll( function(){
		if( $(document).scrollTop()>1650 ){
			$("#LoutiNav").show();
		}else{
			$("#LoutiNav").hide();
		}
		if( flag ){
			var sTop = $(document).scrollTop();
			//得到满足某个条件的楼层
			//条件 绝对值(页面滚走的距离-某个楼层的top值) < 楼层高度的一半
			var $f = $floor.filter( function(){
				//返回满足某个条件的元素
				return Math.abs( sTop - $(this).offset().top ) < $(this).outerHeight()/2;
			} )
			var index = $f.index();//获取满足某个条件的楼层的下标
			if( index != -1 ){
				//根据下标找到楼层号并高亮显示
				$list.eq(index).addClass("red")
			   				   .siblings()
			   				   .removeClass("red");
			}
			if( sTop < 100 ){
				$list.removeClass("red");
			}
		}
	} )
