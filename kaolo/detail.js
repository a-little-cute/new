
//$.ajax({
//	type:"get",
//	url:"../json/11.json",
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
				url:"11.json",
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
				url:"11.json",
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
				url:"11.json",
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
				url:"11.json",
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


