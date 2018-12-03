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
			console.log(index);
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
