window.photoweb = {
	myFrame:null,
	isMyFrameLoad:false,
	framefunction:'',
	framebody:'',
	isComContainerOpen:false,
	sly:'',
	tps:'',
	isedit:true,
	dragelement:null,
	tpstime:null,
	loadingTime:false,
	basestyle:null,
	css3:false,
	comtypelist:{
		"toolbarbutton-layout":{},
		"toolbarbutton-head":{
			"nav"            :      "导航"
		},
		"toolbarbutton-banner":{
			"banner":"轮播图"
		},
		"toolbarbutton-body":{
			// "productlist"    :      "图片滚动",
	        "picture"        :      "单图素材",
	        "summarize"      :      "活动介绍",
	        "form"           :      "预约报名",
	        "table"          :      "经销商",
	        "classify"       :      "选项卡"
		},
		"toolbarbutton-foot":{
			"foot"           :      "页脚"
		},
		"toolbarbutton-other":{
			// 暂无
		},
		"toolbarbutton-template":{
			// 暂无
		}
	}
}
$(document).ready(function() {

	photoweb.myFrame=$('#resizerFrame');
	//切换网页背景
	$('body').on('click', '#changeIframeBG', function(event) {
		changeIframeBG();
		
	});
	$('#openphotoweb').click(function(event) {
		try{
			cef_pro.OpenProject( );
		}
		catch(e){
			console.log("打开操作错误："+e);
		}
	});
	$('#updatecss').on('click', '', function(event) {
		event.preventDefault();
		location.reload();
	});
	//网格系统添加
	$('#toolbarbutton-layout').click(function(event) {
		// var containerhtml=$('<div class="container"><div class="containerhandle"><div class="containerdelete"></div><div class="containermove"></div></div></div>');
		// var gridhtml=$('<div class="row"><div class="span12"></div></div>');
		// gridhtml.find('[class*="span"],[class*="col"]').each(function(index, el) {
		// 	var gridhandle = $('<div class="gridhandle"><div class="griddelete"></div><div class="gridcutbefore"></div><div class="gridcutafter"></div></div>');
		// 	$(this).prepend(gridhandle);
		// 	$(this).droppable({
		// 		accept: ".tempComContainer",
		// 		activeClass: "ui-state-highlight",
		// 		hoverClass: "ui-state-hover",
		// 		drop: function(event, ui) {
		// 			ui.draggable.css({"top":"0px","left":"0px"});
		// 			$(this).append(ui.draggable);
		// 		}
		// 	});
		// });
		// containerhtml.append(gridhtml).appendTo(photoweb.framebody.find('#gridSystemContainer'));
		photoweb.framefunction.addContainer();
	});

	//html5拖拽开始
	$('body').on('dragstart', '#com-item-container li', function(ev) {
		photoweb.framefunction.dragelement={};
		var data=$(this).data();
		for(var i in data){
			photoweb.framefunction.dragelement[i]=data[i];
		}
		var dt = ev.originalEvent.dataTransfer;
		dt.effectAllowed = 'move';
		photoweb.framefunction.dragelement.dom = ev.target;
		return true;
	});









	//html5拖拽结束
	$('body').on('dragend', '#com-item-container li', function(ev) {
		// return true;
		// console.log('11212');
	});







	//按钮点击状态
	// $('body').on("click", "div#comtool .item", function() {
	// 	$(this).addClass('active');
	// 	$(this).siblings().removeClass('active');
	// });



	//原始的左侧工具栏上下滚动
	// $('#toolbarup').click(function(event) {
	// 	$('#toolbar').animate({scrollTop: "-=200"}, 400);
	// });
	// $('#toolbardown').click(function(event) {
	// 	$('#toolbar').animate({scrollTop: "+=200"}, 400);
	// });	


	$('#feeblesslogobar span').click(function(event) {
		$(this).addClass('active');
		$(this).siblings('').removeClass('active');
	});

	//鼠标移入的文本提示
	$('body').on('mouseenter', '[tiptext]', function(event) {
		event.preventDefault();
		creatTps($(this));
	});
	$('body').on('mouseleave', '[tiptext]', function(event) {
		event.preventDefault();
		deleteTps();
	});







	//撤销与重做
	$('#undo').click(function(){
		
	});
	$('#redo').click(function(){
		
	});
	// $('#undo').click(function(){
	// 	photoweb.framefunction.stopsave++;
	// 	if (photoweb.framefunction.undoLayout()) photoweb.framefunction.initContainer();
	// 	photoweb.framefunction.stopsave--;
	// });
	// $('#redo').click(function(){
	// 	photoweb.framefunction.stopsave++;
	// 	if (photoweb.framefunction.redoLayout()) photoweb.framefunction.initContainer();
	// 	photoweb.framefunction.stopsave--;
	// });


	// 保存
	$('#save').click(function(event) {
		var log=photoweb.framefunction.jiami(photoweb.framefunction.outputhtml());
		try{
			cef_pro_save.SaveProject(log);
		}catch(e){
			console.log(log);
		}
	});

	// 生成
	$('#makehtml').click(function(event) {
		makehtml();
		photowebMessage("已打包生成，请前往打包目录查看！");
	});

	// 另存为
	$('#save_as').click(function(event) {
		save_page_as.SavePageAs();
		makehtml();
	});









	// 右侧工具栏的隐藏和显示
	// $('body').on("click", "div#attrbar-body .attr-head i", function() {
	// 	$(this).toggleClass('fa-rotate-90');
	// 	$(this).parent().siblings('.attr-body').toggleClass('hide');
	// });










	//iframe窗体变换
	$('body').on("click", "#viewDriveControl .item", function() {
		if(photoweb.isedit){
			photowebMessage("当前为编辑状态，不可进行设备变换，请切换至预览状态");
			return false;
		}
		else{
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			var screenName = $(this).find('img').attr('screenName');
			$('#resizerFrame').attr("class", "").addClass("frameScreen-" + screenName);
		}
	});









	//原始的左侧工具栏打开函数
	// $('body').on("click","#toolbar .comtool .item:not('.active')",function(){
	// 	if (photoweb.isedit){
	// 		var data=$(this).attr('comdata');
	// 		getcomstar();
	// 		try {
	// 			cef.GetComponentName(data);
	// 		}catch(e){
	// 			$.get('com/getcom.php?type='+data, function(rdata) {
	// 				getcomsuccess(rdata);
	// 			});
	// 		}
	// 	}
	// 	else{
	// 		photowebMessage("当前为预览状态，请切换到编辑状态");
	// 		return false;
	// 	}
	// });















	//点击工具栏打开组件窗口
	$('.toolbarbutton-init').on('click', '', function(event) {
		event.preventDefault();
		/* Act on the event */
		getcomstar();
		var html="";
		var json=photoweb.comtypelist[$(this).attr("id")];
		var keyname="";
		for(var i in json){
			if(! keyname){
				keyname=i;
				html+='<a href="###" class="active" comdata="'+i+'"><img src="images/toolsicon/'+i+'.png"/>'+json[i]+'</a>';
			}
			else{
				html+='<a href="###" comdata="'+i+'"><img src="images/toolsicon/'+i+'.png"/>'+json[i]+'</a>';
			}
			
		}
		$('#com-container-tab').html(html);
		try {
			cef.GetComponentName(keyname);
		}catch(e){
			$.get('com/getcom.php?type='+keyname, function(rdata) {
				getcomsuccess(rdata);
			});
		}
	});
	$('body').on('click', '#com-container-tab a:not(".active")', function(event) {
		event.preventDefault();
		/* Act on the event */
		$(this).addClass('active').siblings('').removeClass('active');
		try {
			getcomstar();
			cef.GetComponentName($(this).attr("comdata"));
		}catch(e){
			getcomstar();
			$.get('com/getcom.php?type='+$(this).attr("comdata"), function(rdata) {
				getcomsuccess(rdata);
			});
		}
	});


	//网格属性调节
	$('body').on('click', '.numup', function(event) {
		event.preventDefault();
		var span=$(this).siblings('span');
		if($(this).parent().siblings('.gridcolinput').length>0){
			if($(this).parent().next().length>0){
				var nextspan=$(this).parent().next().find('span');
				if(nextspan.text()==1){return false}
				nextspan.text(parseInt(nextspan.text())-1);
			}
			else{
				var prevspan=$(this).parent().prev().find('span');
				if(prevspan.text()==1){return false}
				prevspan.text(parseInt(prevspan.text())-1);
			}
			span.text(parseInt(span.text())+1);
			var arr=[];
			$('.gridcolinput span').each(function(index, el) {
				arr.push($(el).text());
			});
			updategridclass(arr);
		}
	});

	$('body').on('click', '.numdown', function(event) {
		event.preventDefault();
		var span=$(this).siblings('span');
		if($(this).parent().siblings('.gridcolinput').length>0){
			if(span.text()!=1){
				span.text(parseInt(span.text())-1);
				if($(this).parent().next().length>0){
					var nextspan=$(this).parent().next().find('span');
					nextspan.text(parseInt(nextspan.text())+1);
				}
				else{
					var prevspan=$(this).parent().prev().find('span');
					prevspan.text(parseInt(prevspan.text())+1);
				}
			}
			var arr=[];
			$('.gridcolinput span').each(function(index, el) {
				arr.push($(el).text());
			});
			updategridclass(arr);
		}
	});
	//网格外部插入调节
	$('body').on('click', '.insertbefore', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlInsertBefore(photoweb.framefunction.selectdom.dom)
	});
	$('body').on('click', '.insertafter', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlInsertAfter(photoweb.framefunction.selectdom.dom)
	});
	$('body').on('click', '.inserttop', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlInsertTop(photoweb.framefunction.selectdom.dom)
	});
	$('body').on('click', '.insertbottom', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlInsertBottom(photoweb.framefunction.selectdom.dom)
	});
	//网格内部插入调节
	$('body').on('click', '.insertinner', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlInsertInner(photoweb.framefunction.selectdom.dom)
	});
	//网格移动调节
	$('body').on('click', '.movebefore', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlMoveBefore(photoweb.framefunction.selectdom.dom)
	});
	$('body').on('click', '.moveafter', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlMoveAfter(photoweb.framefunction.selectdom.dom)
	});
	//网格宽度类型调节
	$('body').on('click', '.gridcolautowidth', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlChangeauto(photoweb.framefunction.selectdom.dom)
	});
	$('body').on('click', '.gridcolfullwidth', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlChangefull(photoweb.framefunction.selectdom.dom)
	});
	//删除
	$('body').on('click', '.gridcoldelete', function(event) {
		event.preventDefault();
		photoweb.framefunction.gridControlDeleteGrid(photoweb.framefunction.selectdom.dom)
	});
	// 背景颜色选择
	$('body').on('click', '.gridcontrolchangebgcolor', function(event) {
		event.preventDefault();
		// console.log($('#gridcontrolcolorselect').val());
		$('#gridcontrolcolorselect').trigger("click");
	});
	$('body').on('change', '#gridcontrolcolorselect', function(event) {
		event.preventDefault();
		photoweb.framefunction.selectdom.dom.css("backgroundColor",$(this).val());
	});
	$('body').on('click', '.gridcontrolnotbgcolor', function(event) {
		event.preventDefault();
		photoweb.framefunction.selectdom.dom.css("backgroundColor","");
	});
	//编辑预览
	$('#editandview').click(function(){
		viewOrEdit($(this));
	});










	//iframe加载交互操作
	photoweb.myFrame.attr("src", "insidePage.html");
	// new canvasLoader($('canvas#jumozi')[0], 400, 100).init();//临时删除
	photoweb.myFrame.load(function() {
		photoweb.isMyFrameLoad = true;
		 if (document.all){ // IE
		  	photoweb.framebody = document.frames["resizerFrame"].document; 
		  	photoweb.framefunction=document.frames("resizerFrame").document;
		}else{ // 标准
		  	photoweb.framebody = $(document.getElementById("resizerFrame").contentDocument); 
		  	photoweb.framefunction=document.getElementById("resizerFrame").contentWindow;
		};
		// photoweb.framefunction=document.getElementById("resizerFrame").contentWindow;
		// photoweb.framebody=$(window.frames["resizerFrame"].document);
		//下面的代码为临时添加
		// $('#waitframe').css("backgroundImage","none").find('div').fadeIn().html("数据准备完成，开始建站<br/><a href='###'>开始建站</a>");
		// $('#waitframe').find('canvas,h3').fadeOut().remove();

		// $('#waitframe div a:eq(0)').click(function(event) {
		// 	$('#waitframe').delay(400).fadeOut('slow', function() {
		// 		$(this).remove();
		// 		introJs().setOption('skipLabel','跳过').setOption('nextLabel','继续学习').setOption('prevLabel','复习一下').setOption('doneLabel','会玩了，走起').start();
		// 		$('#tps').fadeOut();
		// 	});
		// });
		// 
		// $('#waitframe div a').click(function(event) {
			$('#waitframe').delay(400).fadeOut('slow', function() {
				$(this).remove();
			});
		// });
	});
	$(window).resize(function(){
		if(photoweb.sly){
			photoweb.sly.reload();
		}
	});
});





function viewOrEdit(obj){
	if(photoweb.isedit){
		if(photoweb.isComContainerOpen){
			$('#com-container-close').trigger('click');
		}
		obj.html('<img src="images/toolsicon/edit.png" /><span>编辑</span>');
		photoweb.basestyle=photoweb.framebody.find("#framedemostyle").detach();
		photoweb.framefunction.viewmood=true;
		photoweb.framefunction.deleteDragAssistLine();
		$('#viewDriveControl,#baseWebComTools').slideToggle();
		photoweb.isedit=false;
	}
	else{
		obj.html('<img src="images/toolsicon/view.png" /><span>预览</span>');
		photoweb.framebody.find('head').append(photoweb.basestyle);
		$('#viewDriveControl,#baseWebComTools').slideToggle();
		$('#viewDriveControl div:eq(0)').trigger('click');
		photoweb.isedit=true;
		photoweb.framefunction.viewmood=false;
	}
	return false;
}
function creatTps(el){
	photoweb.tpstime=setTimeout(function(){
		var position=el.attr("tipposition");
		var text=el.attr("tiptext");
		var dom=$('#tps');
		dom.attr("class","tps"+position).find('.ctt').text(text);
		if(position=="right"){
			dom.css({
				top: el.offset().top-el.height()/2+10+'px',
				left: el.offset().left+el.width()+10+'px'
			});
		}
		if(position=="bottom"){
			dom.css({
				top: el.offset().top+el.height()+10+'px',
				left: el.offset().left-dom.width()/2+el.width()/2+'px'
			})
		}
		if(position=="top"){
			dom.css({
				top: el.offset().top-50+'px',
				left: el.offset().left-dom.width()/2+el.width()/2+'px'
			})
		}
		dom.fadeIn();
	},500);
}
function deleteTps(){
	clearTimeout(photoweb.tpstime);
	$('#tps').fadeOut();
}
function canvasLoader(t, i, e) {
	var a = this;
	this.c = t, this.ctx = t.getContext("2d"), this.cw = i, this.ch = e, this.loaded = 0, this.loaderSpeed = .2, this.loaderHeight = 15, this.loaderWidth = 410, this.loader = {
		x: this.cw / 2 - this.loaderWidth / 2,
		y: this.ch / 2 - this.loaderHeight / 2
	}, this.particles = [], this.particleLift = 180, this.hueStart = 0, this.hueEnd = 120, this.hue = 0, this.gravity = .15, this.particleRate = 4, this.init = function() {
		this.loop()
	}, this.rand = function(t, i) {
		return~~ (Math.random() * (i - t + 1) + t)
	}, this.hitTest = function(t, i, e, a, h, r, s, n) {
		return !(h > t + e || t > h + s || r > i + a || i > r + n)
	}, this.updateLoader = function() {
		// this.loaded < 100 ? this.loaded += this.loaderSpeed : this.loaded = 0
		if(this.loaded < 100){
			this.loaded += this.loaderSpeed;
		}
		else{
			if(photoweb.isMyFrameLoad){

			}
			else{
				this.loaded = 0
			}
		}
	}, this.renderLoader = function() {
		this.ctx.fillStyle = "#000", this.ctx.fillRect(this.loader.x, this.loader.y, this.loaderWidth, this.loaderHeight), this.hue = this.hueStart + this.loaded / 100 * (this.hueEnd - this.hueStart);
		var t = this.loaded / 100 * this.loaderWidth;
		this.ctx.fillStyle = "hsla(" + this.hue + ", 100%, 40%, 1)", this.ctx.fillRect(this.loader.x, this.loader.y, t, this.loaderHeight), this.ctx.fillStyle = "#222", this.ctx.fillRect(this.loader.x, this.loader.y, t, this.loaderHeight / 2)
	}, this.Particle = function() {
		this.x = a.loader.x + a.loaded / 100 * a.loaderWidth - a.rand(0, 1), this.y = a.ch / 2 + a.rand(0, a.loaderHeight) - a.loaderHeight / 2, this.vx = (a.rand(0, 4) - 2) / 100, this.vy = (a.rand(0, a.particleLift) - 2 * a.particleLift) / 100, this.width = a.rand(1, 4) / 2, this.height = a.rand(1, 4) / 2, this.hue = a.hue
	}, this.Particle.prototype.update = function(t) {
		this.vx += (a.rand(0, 6) - 3) / 100, this.vy += a.gravity, this.x += this.vx, this.y += this.vy, this.y > a.ch && a.particles.splice(t, 1)
	}, this.Particle.prototype.render = function() {
		a.ctx.fillStyle = "hsla(" + this.hue + ", 100%, " + a.rand(50, 70) + "%, " + a.rand(20, 100) / 100 + ")", a.ctx.fillRect(this.x, this.y, this.width, this.height)
	}, this.createParticles = function() {
		for (var t = this.particleRate; t--;){
			this.particles.push(new this.Particle)
		}
	}, this.updateParticles = function() {
		for (var t = this.particles.length; t--;) {
			var i = this.particles[t];
			i.update(t)
		}
	}, this.renderParticles = function() {
		for (var t = this.particles.length; t--;) {
			var i = this.particles[t];
			i.render()
		}
	}, this.clearCanvas = function() {
		this.ctx.globalCompositeOperation = "source-over", this.ctx.clearRect(0, 0, this.cw, this.ch), this.ctx.globalCompositeOperation = "lighter"
	}, this.loop = function() {
		var t = function() {
			if(photoweb.isMyFrameLoad && parseInt(a.loaded)==100){
				$('#waitframe').css("backgroundImage","none").find('div').fadeIn().html("数据准备完成，开始建站<br/><a href='###' tipposition='bottom' tiptext='提供功能引导，帮助小鸟进步'>菜鸟报道</a><a href='###'  tipposition='bottom' tiptext='您已超神，何必费事'>老鸟归来</a>");
				$('#waitframe').find('canvas,h3').fadeOut().remove();
				$('#waitframe div a:eq(0)').click(function(event) {
					$('#waitframe').delay(400).fadeOut('slow', function() {
						$(this).remove();
						introJs().setOption('skipLabel','跳过').setOption('nextLabel','继续学习').setOption('prevLabel','复习一下').setOption('doneLabel','会玩了，走起').start();
						$('#tps').fadeOut();
					});
				});
				$('#waitframe div a:eq(1)').click(function(event) {
					$('#waitframe').delay(400).fadeOut('slow', function() {
						$(this).remove();
						$('#tps').fadeOut();
					});
				});
			}
			else{
				requestAnimationFrame(t, a.c);
				a.clearCanvas();
				a.createParticles();
				a.updateLoader();
				a.updateParticles();
				a.renderLoader();
				a.renderParticles()
			}
		};
		t()
	}
}
function photowebMessage(ms){
	Messenger().post({
	  message: ms,
	  type: "error",
	  hideAfter:4
	});
}
function getcomsuccess(data){
	var element=$('<div id="com-list-container"><div id="com-item-container"><ul><div class="handle"></div></ul></div></div>');
	var elementList=element.find('ul');
	var arr=eval(data);
	for (var i in arr){
		var type=arr[i].type;
		var name=arr[i].name;
		var intro=arr[i].intro?arr[i].intro:"作者很懒，什么信息都没有留下";
		var css3=arr[i].css3?true:false;
		var response=arr[i].response?true:false;
		var usestyle=arr[i].usestyle;
		var usesass=arr[i].usesass;
		var usejs=arr[i].usejs;
		var hasicon=arr[i].hasicon;		
		var hasimage=arr[i].hasimage;
		var icon=hasicon?$('<img src="com/'+type+'/'+name+'/icon.png"/>'):$('<img src="com/defaulticon.png"/>');
		// var img=hasimage?$('<img src="com/'+type+'/'+name+'/image.png"/>'):$('<img src="com/defaultimage.png"/>');
		if(photoweb.css3==true && css3==false){
			continue;
		}
		else{
			var li=$('<li draggable="true"><div class="help" tipposition="top" tiptext="'+intro+'"></div></li>');
		}
		li.data({'type':type,'name':name,'intro':intro,'css3':css3,'response':response,'usestyle':usestyle,'usesass':usesass,'usejs':usejs,'hasicon':hasicon }).append(icon).appendTo(elementList);
	}
	$('#com-container').append(element);
	var $frame = $('#com-item-container'); window.frr = $frame;
	photoweb.sly = new Sly($frame, {
		dragSource:'.handle',
		horizontal: 1,
		itemNav: 'forceCentered',
		itemSelector:'#com-item-container li',
		activateMiddle: 1,
		smart: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		scrollBy: 1,
		activatePageOn: 'click',
		speed: 300,
		moveBy: 600,
		elasticBounds: 1,
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1,
		//scrollBar: $('.scrollbar'),
		//scrollBy: 1
	}).init();
	$('#com-detailIntro').remove();	
}
function getcomstar(){
	if($('#com-detailIntro').length>0){
		$('#com-detailIntro').text("正在为您努力加载组件,请稍等。。。。");
	}
	else{
		var comDetailIntro=$('<div id="com-detailIntro">正在为您努力加载组件,请稍等。。。。</div>');
		$('#com-container').append(comDetailIntro);
	}
	if(photoweb.sly){
		photoweb.sly.destroy();
	}
	$('#com-list-container').remove();
	if(!photoweb.isComContainerOpen){
		$('#resizerFrame-container').addClass('comContainerOpen')
		$('#com-container').addClass('active').find('#com-container-close').one('click', function(event) {
			controlpanelclose();
		});
		photoweb.isComContainerOpen=true;
	}
}
function controlpanelclose(){
	// 拖拽后隐藏组件面板
	$('#com-container-tab').html("");
	$('#com-container').removeClass('active');
	photoweb.isComContainerOpen=false;
	$('div#toolbar .item').removeClass('active');
	if(photoweb.sly){
		photoweb.sly.destroy();
	}
	$('#com-list-container').remove();
	$('#resizerFrame-container').removeClass('comContainerOpen')
}
function getcomerror(){	$('#com-detailIntro').text('加载组件失败，请重试');}
function makegridcontrol(obj){
	var html="<a href='###' class='active'><img src='images/toolsicon/grid.png'/>网格系统调整</a>";
	$('#com-container-tab').html(html);
		var domlen=obj.siblings('').length+1;
		var prevlen=obj.prevAll().length;
		var parent=obj.parent();
		var gridcolarr=[];
		html='';
		html+='<div class="controlpanalcontainer len">';
		html+='<p class="controlpanaltext">比例修正（当前行共有'+domlen+'列）</p>';
		parent.children().each(function(index, el) {
			if(index==prevlen){
				html+='	 <div class="gridcolinput now">';
			}
			else{
				html+='	 <div class="gridcolinput">';
			}
			html+='	   <span>'+$(el).attr('class').match(/(span|col)\d{1,2}/ig)[0].match(/\d{1,2}/)+'</span>';
			html+='	   <a href="###" class="numup"><div></div></a>';
			html+='	   <a href="###" class="numdown"><div></div></a>';
			html+='	 </div>';
		});
		html+='</div>';
		
		html+='<div class="controlpanalcontainer">';
		html+='<p class="controlpanaltext">转换</p>';
		html+='    <a href="###" class="controlpanelbtn gridcolautowidth">居中显示</a>';
		html+='    <a href="###" class="controlpanelbtn gridcolfullwidth">全宽显示</a>';
		html+='</div>';
		html+='<div class="controlpanalcontainer len">';
		html+='<p class="controlpanaltext">外部插入</p>';
		html+='    <a href="###" class="controlpanelbtn insertbefore">前插一列</a>';
		html+='    <a href="###" class="controlpanelbtn insertafter">后插一列</a>';
		html+='    <a href="###" class="controlpanelbtn inserttop">上插一行</a>';
		html+='    <a href="###" class="controlpanelbtn insertbottom">下插一行</a>';
		html+='    <a href="###" class="controlpanelbtn insertinner">内部插入</a>';
		html+='</div>';
		html+='<div class="controlpanalcontainer">';
		html+='<p class="controlpanaltext">移动控制</p>';
		html+='    <a href="###" class="controlpanelbtn movebefore">向前移动</a>';
		html+='    <a href="###" class="controlpanelbtn moveafter">向后移动</a>';
		html+='</div>';
		html+='<div class="controlpanalcontainer ">';
		html+='<p class="controlpanaltext">背景调整</p>';
		html+='    <a href="###" class="controlpanelbtn gridcontrolchangebgcolor"><img src="images/changegridcolor.png" style="display:block;padding:3px;" /></a>';
		html+='    <a href="###" class="controlpanelbtn gridcontrolnotbgcolor">不使用背景</a>';
		html+='</div>';
		html+='<div class="controlpanalcontainer">';
		html+='<p class="controlpanaltext">删除</p>';
		html+='    <a href="###" class="controlpanelbtn gridcoldelete"><span></span></a>';
		html+='</div>';
		html+='  <input type="color" id="gridcontrolcolorselect" style="opacity:0;"/>';

		// html+='<div class="controlpanalcontainer auto2">';
		// html+='<p class="controlpanaltext">间距调整</p>';
		// html+='  <div>';
		// html+='    <a href="###" class="controlpanelbtn gridcolautowidth">居中显示</a>';
		// html+='    <a href="###" class="controlpanelbtn gridcolfullwidth">全屏显示</a>';
		// html+='  </div>';	
		// html+='</div>';
	$('<div id="com-list-container"></div>').append(html).appendTo('#com-container');
	$('#com-detailIntro').remove();
}
function makehtml(){
	var comarr='';
	var htmlhead='';
	var htmlfoot='';

	var htmlpluginLink='';
	var htmlpluginScript='';

	var pluginarr=new Array();
	$(photoweb.framebody).find('.pluginstyle').each(function(index, el) {
		if($(this).attr("name")!=undefined && $(this).attr("name")){
			pluginarr.push($(this).attr("name"));
			htmlpluginLink+='<link href="framecom/'+$(this).attr("name")+'/css/'+$(this).attr("name")+'.css" rel="stylesheet">';
			htmlpluginScript+='<script src="framecom/'+$(this).attr("name")+'/js/'+$(this).attr("name")+'.js"></script>';
		}
	});
	//head
	htmlhead+='<!DOCTYPE html>';
	htmlhead+='<html lang="en">';
	htmlhead+='<head>';
	htmlhead+='	<meta charset="UTF-8">';
	htmlhead+='	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />';
	htmlhead+='	<title>Document</title>';
	htmlhead+='<link rel="stylesheet" type="text/css" href="framecom/bootstrap/css/bootstrap.css">';
	htmlhead+='<link rel="stylesheet" type="text/css" href="framecom/base/reset.css">';
	htmlhead+='<link rel="stylesheet" type="text/css" href="framecom/grid/grid2.css">';
	htmlhead+=htmlpluginLink;
	var newcomstylearr=new Array();
	$(photoweb.framebody).find('.newcomstyle').each(function(index, el) {
		newcomstylearr.push($(this).attr("href"));
		htmlhead+='<link href="'+$(this).attr("href")+'" rel="stylesheet">';
	});

	// console.log(newcomstylestring);
	htmlhead+='</head><body style="overflow:hidden;overflow-y:scroll">';
	//foot
	htmlfoot+='<script src="http://libs.baidu.com/jquery/1.8.3/jquery.min.js"></script>';
	htmlfoot+=htmlpluginScript;
	var newcomscriptarr=new Array();
	$(photoweb.framebody).find('.newcomscript').each(function(index, el) {
		newcomscriptarr.push($(this).attr("path"));
		htmlfoot+='<script src="'+$(this).attr("path")+'"></script>';
	});

	// console.log(newcomscriptstring);
	htmlfoot+='</body>';
	htmlfoot+='</html>	';
	

	

	var source=$(photoweb.framebody).find('#gridSystemContainer');
	var htmlbody=source.clone();
	htmlbody.find('[classoption]').attr("classoption","");
	htmlbody.find('.ui-sortable').removeClass('ui-sortable');
	htmlbody.find('.ui-droppable').removeClass('ui-droppable');
	htmlbody.find('.tempComContainer').each(function(index, el) {
		if($(this).hasClass('pluginrec')){
			var pluginIndex=$(this).attr("pluginIndex");
			var code=$(photoweb.framefunction.pluginArr[pluginIndex].code);
			code.attr("options",photoweb.framefunction.pluginArr[pluginIndex].options);
			$(this).before(code);
			$(this).remove();
		}
		else{
			$(this).find('.comcover').remove();
			$(this).find('.tempcode').children().insertBefore($(this));
			$(this).remove();
		}
	});

	

	var outputjson={
		'html':(htmlhead+htmlbody.html()+htmlfoot),
		'css_path':newcomstylearr,
		'js_path':newcomscriptarr,
		'plugin_path':pluginarr
	};
	console.log(outputjson);
	$.post('./source/php/outputhtml.php', {
		'html':(htmlhead+htmlbody.html()+htmlfoot),
		'css_path':newcomstylearr,
		'js_path':newcomscriptarr,
		'plugin_path':pluginarr
	} ,function(data){
		// console.log(data)
	});

}
function waitingcomplit(){
	$('#waitingcontainer').show();
}
function updatacss(type,name){
	var link=photoweb.framebody.find('link#'+type+'_'+name);
	var randomNumber=Math.random()*1000000;
	randomNumber=parseInt(randomNumber);
	var href=link.attr('href');
	var positionofw=href.indexOf("?");
	if(positionofw=="-1"){
		href+="?"+randomNumber;
	}
	else{
		href=href.substring(0,positionofw)+"?"+randomNumber;
	}
	link.attr('href',href);
	$('#waitingcontainer').hide();
}
function updategridclass(arr){
	if(photoweb.framefunction.selectdom){
		var dom=photoweb.framefunction.selectdom.dom;
		var parent=dom.parent();
		parent.children().each(function(index, el) {
			$(el).attr("class",$(el).attr("class").replace(/(span|col)\d{1,2}/gi,"$1"+arr[index]));		
		});
		photoweb.framefunction.updateDragAssistLine(dom);
	}
}
//打开页面
function openphotoweb(str){
	photoweb.framefunction.inputhtml(photoweb.framefunction.jiemi(str));
}