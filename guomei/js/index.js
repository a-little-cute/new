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
