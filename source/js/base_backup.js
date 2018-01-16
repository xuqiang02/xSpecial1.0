var photoweb = {
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
	basestyle:null
}
$(document).ready(function() {
	photoweb.myFrame=$('#resizerFrame');
	$('body').on('dragstart', '#com-item-container li.active', function(ev) {
		var name=$(this).data('name');
		var type=$(this).data('type');
		var dt = ev.originalEvent.dataTransfer;
		dt.setData('Text','["'+type+'","'+name+'"]');
		dt.effectAllowed = 'move';
		photoweb.framefunction.dragelement.dom = ev.target;
		photoweb.framefunction.dragelement.name = name;
		photoweb.framefunction.dragelement.type = type;
        return true;
        
	});
	$('body').on('dragend', '#com-item-container li.active', function(ev) {
		if(photoweb.framefunction.dragelement.type!="container"&&photoweb.framefunction.dragelement.type!="grid"){
			$('#com-container-close').trigger('click');
		}
        photoweb.framefunction.dragelement.dom = null;
        photoweb.framefunction.dragelement.name = null;
		photoweb.framefunction.dragelement.type = null;
        return false
	});
	$('body').on('dragend', '#com-item-container li:not(".active")', function(ev) {
		photowebMessage("亲，你需要将该组件处于选中状态才能进行拖拽哦");
        return false
	});
	//按钮点击状态
	$('body').on("click", "div#comtool .item,#frambar .item", function() {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
	$('#toolbarhead').toggle(function() {
		$('#toolbar,#frambar,#resizerFrame-container,#toolbarhead,#version').toggleClass('active');
		$('#com-container').toggleClass('actived');
	}, function() {
		$('#toolbar,#frambar,#resizerFrame-container,#toolbarhead,#version').toggleClass('active');
		$('#com-container').toggleClass('actived');
	});
	//tiptext
	$('body').on('mouseenter', '[tiptext]', function(event) {
		event.preventDefault();
		creatTps($(this));
	});
	$('body').on('mouseleave', '[tiptext]', function(event) {
		event.preventDefault();
		deleteTps();
	});
	//save
	$('#save').click(function(event) {
		var source=photoweb.framebody.find('#gridSystemContainer');
		var html=source.clone();
		html.find('.gridhandle,.containerhandle').remove();
		html.find('.ui-sortable').removeClass('ui-sortable');
		html.find('.ui-droppable').removeClass('ui-droppable');
		html.find('.tempComContainer').each(function(index, el) {
			var type=$(this).attr('type');
			if(type=="plugin"){
				var pluginIndex=$(this).attr("pluginIndex");
				var code=$(photoweb.framefunction.pluginArr[pluginIndex].code);
				code.attr("options",photoweb.framefunction.pluginArr[pluginIndex].options);
				console.log(code.attr("options"));
				$(this).before(code);
				$(this).remove();
			}
			else{
				$(this).find('.handle').remove();
				$(this).children().insertBefore($(this));
				$(this).remove();
			}
		});
		html.find('code').each(function(index, el) {
			$(this).children().insertBefore($(this));
			$(this).remove();
		});
		console.log(html.html());
	});
	// 右侧工具栏的隐藏和显示
	$('body').on("click", "div#attrbar-body .attr-head i", function() {
		$(this).toggleClass('fa-rotate-90');
		$(this).parent().siblings('.attr-body').toggleClass('hide');
	});
	//iframe窗体变换
	$('body').on("click", "#frambar .item", function() {
		var screenName = $(this).find('i').attr('screenName');
		$('#resizerFrame').attr("class", "").addClass("frameScreen-" + screenName);
	});
	//点击工具栏打开组件窗口
	$('body').on("click","#toolbar .comtool .item:not('.active')",function(){
		var data=$(this).attr('comdata');
		
		cef.GetComponentName(data);
		//var comDetail=new creatComDetail(data);
		//comDetail.init();
	});
	//view
	$('#editandview').click(function(){
		if(photoweb.isedit){
			$(this).attr("tiptext","切换到编辑模式").addClass('active').html('<i class="fa fa-edit"></i>');
			photoweb.basestyle=photoweb.framebody.find("#frametrans").html('.row,[class*="span"],[class*="col"]{-webkit-transition:all 1s;-moz-transition:all 1s;-o-transition:all 1s;transition:all 1s}');
			photoweb.basestyle=photoweb.framebody.find("#framedemostyle").detach();
			photoweb.isedit=false;
		}
		else{
			$(this).attr("tiptext","切换到预览模式").removeClass('active').html('<i class="fa fa-eye"></i>');
			photoweb.framebody.find("head").append(photoweb.basestyle).find("#frametrans").html('');
			photoweb.isedit=true;
		}
		return false;
	});
	//iframe交互操作
	photoweb.myFrame.attr("src", "insidePage.html");
	new canvasLoader($('canvas#jumozi')[0], 400, 100).init();
	photoweb.myFrame.load(function() {
		photoweb.isMyFrameLoad = true;
		photoweb.framefunction=document.getElementById("resizerFrame").contentWindow;
		photoweb.framebody=$(window.frames["resizerFrame"].document);
	});
	$(window).resize(function(){
		if(photoweb.sly){
			photoweb.sly.reload();
		}
	});
});
function creatComDetail(str,type){
	var _this=this;
	_this.init=function(){
		if(photoweb.sly){
			photoweb.sly.destroy();
			$('#com-list-container').remove();
		}
		if(!photoweb.isComContainerOpen){
			$('#resizerFrame-container').addClass('comContainerOpen')
			$('#com-container').addClass('active').find('#com-container-close').one('click', function(event) {
				_this.removeCom();
				$('#resizerFrame-container').removeClass('comContainerOpen')
			});
			photoweb.isComContainerOpen=true;
		}
		_this.addIntro();
		var element=$('<div id="com-list-container"><div id="com-item-container"><ul><div class="handle"></div></ul></div></div>');
		var elementList=element.find('ul');
		var arr=eval(str);
		for (i in arr){
			var name=arr[i][0];
			var intro=arr[i][1];
			var img=$('<img src="com/'+type+'/'+name+'.png"/>');
			var li=$('<li draggable="true"><div class="help" tipposition="top" tiptext="'+intro+'"></div></li>');
			li.data({'intro':intro,'name':name,'type':type}).append(img).appendTo(elementList);
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
		}).init();
		_this.removeIntro();
	}
	_this.addIntro=function(str){
		var text=str||"正在为您努力加载组件,请稍等。。。。";
		if($('#com-detailIntro').length>0){
			$('#com-detailIntro').text(text);
		}
		else{
			var comDetailIntro=$('<div id="com-detailIntro">'+text+'</div>');
			$('#com-container').append(comDetailIntro);
		}
	}
	_this.error=function(){
		$('#com-detailIntro').text('加载组件失败，请重试');
	}
	_this.removeCom=function(){
		$('#com-container').removeClass('active');
		photoweb.isComContainerOpen=false;
		$('div#toolbar .item').removeClass('active');
		photoweb.sly.destroy();
		$('#com-list-container').remove();
	}
	_this.removeIntro=function(){
		$('#com-detailIntro').remove();
	}
	_this.init();
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
