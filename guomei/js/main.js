//鼠标移入到底部小图时，显示对应的中图和大图

$.fn.extend({
	fnSmall : function(){
		this.mouseenter(function(){
			$(this).addClass("borderRed").siblings().removeClass("borderRed");
			this.index = $(this).index();
			$(".pic-big ul li").eq(this.index).show().siblings().hide();
			$("#big img").eq(this.index).show().siblings().hide();
		})
		return this;
	},
	fnZoom : function(){
		$(".pic-big").fnEnter().fnDrgat().fnLeave();
	},
	fnEnter : function(){
		this.mouseenter(function(event) {
			/* Act on the event */
			$("#mask").show();
			$("#big").show();
		}.bind(this));
		return this;
	},
	fnLeave : function(){
		this.mouseleave(function(event) {
			/* Act on the event */
			$("#mask").hide();
			$("#big").hide();
		});
		return this;
	},
	fnDrgat : function(){
		this.bind("mousemove", function(event){
			var e = event || window.event;
			this.fnMove(e);
		}.bind(this));
		return this;
	},
	fnMove : function(e){
		this.x = e.pageX - this.offset().left - $("#mask").width() / 2; 
		this.y = e.pageY - this.offset().top - $("#mask").height() / 2;
		this.maxL = this.width() - $("#mask").width();
		this.maxT = this.height() -$("#mask").height();
		this.x = Math.min (Math.max( 0, this.x ),this.maxL);
		this.y = Math.min (Math.max( 0, this.y ),this.maxT);
		$("#mask").css("left",this.x);
		$("#mask").css("top",this.y);
		//大图移动
		this.X = this.x * ($("#big img").width() - $("#big").width()) / this.maxL;
		this.Y = this.y * ($("#big img").height() - $("#big").height()) / this.maxT;
		$("#big img").css("left",-this.X);
		$("#big img").css("top",-this.Y);
	},
})
$("#small li").fnSmall().fnZoom();



//$.ajax({
//	type:"get",
//	url:"../json/../json/11.json",
//	async:true,
//	success : function(mes){
//		var str = "";
//		for(var val of mes){
//			str += `<li>${val.name}</li>`
//		}
//		$("#province").html(str);
//		$(".location").animate({"height":$(".location").height()+$("#province").height()+10},500)
//		console.log($("#province").height());
//	}
//})	

function selectAddr(obj){
	this.thg = $(obj);
	this.init();
}
selectAddr.prototype = {
	init : function(){
		this.incident();
	},
	incident :function(){
		this.thg.click( $.proxy(this.meth,this) )
	},
	meth :function(){
		if($(".location").css("display") == "none"){
			$.ajax({
				type:"get",
				url:"json/11.json",
				async:true,
				success : function(mes){
					var str = "";
					for(var val of mes){
						str += `<li><a href="javascript:;">${val.name}</a></li>`
					}
					$(".load1").html(str);
				}
			})
		}
		$(".location").toggle();
	}
}
new selectAddr("#selectAddr");

function TabToggle(obj1,obj2){
	this.btns = $(obj1).children("li");
	this.contents = $(obj2).children("ul");
	this.init();
	this.proIndex = 0;
	this.cityIndex = 0;
	this.regionIndex = 0;
}

TabToggle.prototype = {
	init : function(){
		this.sja();
		this.sjd();
	},
	sja : function(){
		this.btns.each($.proxy(this.sjb,this))
	},
	sjb : function(index,el){
		$(el).on("click",index,$.proxy(this.sjc,this))
	},
	sjc : function(e){
		if(e.data == 0) this.loadprovince();
		if(e.data == 1) this.loadcity();
		if(e.data == 2) this.loadregion();
		this.btns.eq(e.data).addClass("setstyle").siblings().removeClass("setstyle");
		this.contents.eq(e.data).show().siblings().hide();
		return false;
	},
	loadprovince : function(){
		$.ajax({
				type:"get",
				url:"json/11.json",
				async:true,
				success : function(mes){
					var str = "";
					for(var val of mes){
						str += `<li><a href="javascript:;">${val.name}</a></li>`
					}
					$(".load1").html(str);
				}
			})
	},
	loadcity : function(){
		$.ajax({
				type:"get",
				url:"json/11.json",
				async:true,
				success : function(mes){
					var str = "";
					mes = mes[this.proIndex].districts;
					for(var val of mes){
						str += `<li><a href="javascript:;">${val.name}</a></li>`
					}
					$(".load2").html(str);
				}.bind(this)
			})
	},
	loadregion : function(){
		$.ajax({
				type:"get",
				url:"json/11.json",
				async:true,
				success : function(mes){
					var str = "";
					mes = mes[this.proIndex].districts[this.cityIndex].districts;
					for(var val of mes){
						str += `<li><a href="javascript:;">${val.name}</a></li>`
					}
					$(".load3").html(str);
				}.bind(this)
			})
	},
	sjd : function(){
		var that = this
		$(".load1").on("click","a",function(e){
			that.proIndex = $(this).parent().index();
			return false;
		})
		$(".load2").on("click","a",function(e){
			that.cityIndex = $(this).parent().index();
			return false;
		})
	}
}

new TabToggle(".provinceWarp",".content");

$(".advert").load("html/public.html #advert",function(){
		$(".close").click(function(){
			$(".advert").css("display","none");
		})
});
$(".foot-wrap").load("html/public.html .foot");