// Diapo slideshow v1.0.0 - a jQuery slideshow with many effects, transitions, easy to customize, using canvas and mobile ready, based on jQuery 1.5+
// Copyright (c) 2011 by Manuel Masia - www.pixedelic.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
;(function($){$.fn.diapo = function(opts, callback) {
	
	var defaults = {
		selector			: 'div',	//target element
		
		fx					: 'random',
//'random','simpleFade','curtainTopLeft','curtainTopRight','curtainBottomLeft','curtainBottomRight','curtainSliceLeft','curtainSliceRight','blindCurtainTopLeft','blindCurtainTopRight','blindCurtainBottomLeft','blindCurtainBottomRight','blindCurtainSliceBottom','blindCurtainSliceTop','stampede','mosaic','mosaicReverse','mosaicRandom','mosaicSpiral','mosaicSpiralReverse','topLeftBottomRight','bottomRightTopLeft','bottomLeftTopRight','bottomLeftTopRight','scrollLeft','scrollRight','scrollTop','scrollBottom','scrollHorz'
		
//you can also use more than one effect: 'curtainTopLeft, mosaic, bottomLeftTopRight'

		mobileFx			: '',	//leave empty if you want to display the same effect on mobile devices and on desktop etc.

		slideOn				: 'random',	//next, prev, random: decide if the transition effect will be applied to the current (prev) or the next slide
				
		gridDifference		: 250,	//to make the grid blocks slower than the slices, this value must be smaller than transPeriod
		
		easing				: 'easeInOutExpo',	//for the complete list http://jqueryui.com/demos/effect/easing.html
		
		mobileEasing		: '',	//leave empty if you want to display the same easing on mobile devices and on desktop etc.
		
		loader				: 'pie',	//pie, bar, none (even if you choose "pie", old browsers like IE8- can't display it... they will display always a loading bar)
		
		loaderOpacity		: .8,	//0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1
		
		loaderColor			: '#ffff00', 
		
		loaderBgColor		: '#222222', 
		
		pieDiameter			: 50,
		
		piePosition			: 'top:5px; right:5px',	//this option accepts any CSS value
		
		pieStroke			: 8,
		
		barPosition			: 'bottom',	//bottom, top
		
		barStroke			: 5,
		
		navigation			: true,	//true, false. It enables the previous and the next buttons, their IDs are #pix_prev and #pix_next
		
		mobileNavigation	: true,	//true, false. It enables the previous and the next buttons on mobile devices
		
		navigationHover		: true,	//true, false. If true navigation will be visible only on hover state
		
		mobileNavHover		: true,	//true, false. If true navigation will be visible only on hover state for mobile devices
		
		commands			: true,	//true, false. It enables stop and play buttons
		
		mobileCommands		: true,	//true, false. It enables stop and play buttons on mobile devices
				
		pagination			: true,	//true, false. It enables the pagination numbers. This is the appended code: 
									//<div id="pix_pag">
										//<ul id="pix_pag_ul">
											//<li id="pag_nav_0"><span><span>0</span></span></li>
											//<li id="pag_nav_1"><span><span>1</span></span></li>
											//<li id="pag_nav_2"><span><span>2</span></span></li>
											//...etc.
										//</ul>
									//</div>
		
		mobilePagination	: true,	//true, false. It enables the pagination numbers on mobile devices
		
		thumbs				: true,	//true, false. It shows the thumbnails (if available) when the mouse is on the pagination buttons. Not available for mobile devices
		
		hover				: true,	//true, false. Puase on state hover. Not available for mobile devices
		
		pauseOnClick		: true,	//true, false. It stops the slideshow when you click the sliders.
		
		rows				: 4,
		
		cols				: 6,
		
		slicedRows			: 8,	//if 0 the same value of rows
		
		slicedCols			: 12,	//if 0 the same value of cols
		
		time				: 3000,	//milliseconds between the end of the sliding effect and the start of the nex one
		
		transPeriod			: 1500,	//lenght of the sliding effect in milliseconds
		
		autoAdvance			: true,	//true, false
		
		mobileAutoAdvance	: true, //truem false. Auto-advancing for mobile devices
		
		onStartLoading		: function() {  },
		
		onLoaded			: function() {  },
		
		onEnterSlide		: function() {  },
		
		onStartTransition	: function() {  }
    };
	
	
	function isMobile() {	//sniff a mobile browser
		if( navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/webOS/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPod/i)
			){
				return true;
		}	
	}
	
	var opts = $.extend({}, defaults, opts);
	
	var elem = this;
	
	var h = elem.height();
	var w = elem.width();
	
	var u;

//Define some difference if is a mobile device or not
	var clickEv,
		autoAdv,
		navigation,
		navHover,
		commands,
		pagination;

	if (isMobile()) {
		clickEv = 'tap';
	} else {
		clickEv = 'click';
	}
	
	if(isMobile()){
		autoAdv = opts.mobileAutoAdvance;
	} else {
		autoAdv = opts.autoAdvance;
	}
	
	if(autoAdv==false){
		elem.addClass('stopped');
	}

	if(isMobile()){
		navigation = opts.mobileNavigation;
	} else {
		navigation = opts.navigationHover;
	}

	if(isMobile()){
		navHover = opts.mobileNavHover;
	} else {
		navHover = opts.navigationHover;
	}

	if(isMobile()){
		commands = opts.mobileCommands;
	} else {
		commands = opts.commands;
	}

	if(isMobile()){
		pagination = opts.mobilePagination;
	} else {
		pagination = opts.pagination;
	}

//The slideshow starts when all the images are loaded
	function loadimages(imgArr,callback) {
		if (!$.browser.msie || ($.browser.msie && $.browser.version == 9)) {
			var imagesLoaded = 0;
			opts.onStartLoading.call(this);
			$.each(imgArr, function(i, image) {
	
			   var img = new Image();
			
			   img.onload = function() {
				   imagesLoaded++;
				   if (imagesLoaded == imgArr.length) {
						opts.onLoaded.call(this);
					   callback();
				   }
			   };
			
			   img.src = image;
	
			});
		} else {
		   callback();
		}
	}



	if(elem.length!=0){
			
		var selector = $('> '+ opts.selector, elem).not('#pix_canvas').not('#pix_canvas_wrap').not('#pix_next').not('#pix_prev').not('#pix_commands');
		selector.wrapInner('<div class="pix_relativize" style="width:'+w+'px; height:'+h+'px" />');	//wrap a div for the position of absolute elements
		var amountSlide = selector.length;    //how many sliders
		
		var nav;	//nextSlide(nav)
		
		function imgFake() {	//this function replace elements such as iframes or objects with an image stored in data-fake attribute
			$('*[data-fake]',elem).each(function(){
				var t = $(this);
				var imgFakeUrl = t.attr('data-fake');
				var wIf = t.width();
				var hIf = t.height();
				var imgFake = new Image(wIf, hIf);
				t.after($(imgFake).attr('src',imgFakeUrl).attr('class','imgFake'));	//the image has class imgFake
				var clone = t.clone();
				t.remove();	//I remove the element after cloning so it is initialized only when it appears
				$('.elemToHide').show();
				$(imgFake)[clickEv](function(){
					$(this).hide().after(clone);
					$('.elemToHide').hide();
				});
			});
		}
		
		imgFake();
		
		
		if(opts.hover==true){	//if the option "hover" is true I stop the slideshow on mouse over and I resume it on mouse out
			if(!isMobile()){
				elem.hoverIntent({	
					over: function(){
							elem.addClass('stopped');
						},
					out: function(){
							if(autoAdv!=false){
								elem.removeClass('stopped');
							}									
						},
					timeout: 0
				});
			}
		}

		if(navHover==true){	//if the option is true I show the next and prev button only on mouse over
			if(isMobile()){
				elem.live('vmouseover',function(){
					$('#pix_prev, #pix_next').animate({opacity:1},200);
				});
				elem.live('vmouseout',function(){
					$('#pix_prev, #pix_next').delay(500).animate({opacity:0},200);
				});
			} else {
				elem.hover(function(){
					$('#pix_prev, #pix_next').stop(true,false).animate({opacity:1},200);
				},function(){
					$('#pix_prev, #pix_next').stop(true,false).animate({opacity:0},200);
				});
			}
		}
	
	
		$.fn.diapoStop = function() {
			autoAdv = false;
			elem.addClass('stopped');
			if($('#pix_stop').length){
				$('#pix_stop').fadeOut(100,function(){
					$('#pix_play').fadeIn(100);
					if(opts.loader!='none'){
						$('#pix_canvas').fadeOut(100);
					}
				});
			} else {
				if(opts.loader!='none'){
					$('#pix_canvas').fadeOut(100);
				}
			}
		}

		$('#pix_stop').live('click',function(){	//stop function
			elem.diapoStop();
		});
	
		$.fn.diapoPlay = function() {
			autoAdv = true;
			elem.removeClass('stopped');
			if($('#pix_play').length){
				$('#pix_play').fadeOut(100,function(){
					$('#pix_stop').fadeIn(100);
					if(opts.loader!='none'){
						$('#pix_canvas').fadeIn(100);
					}
				});
			} else {
				if(opts.loader!='none'){
					$('#pix_canvas').fadeIn(100);
				}
			}
		}

		$('#pix_play').live('click',function(){	//play function
			elem.diapoPlay();
		});
	
		if(opts.pauseOnClick==true){	//if option is true I stop the slideshow if the user clicks on the slider
			selector[clickEv](function(){
				autoAdv = false;
				elem.addClass('stopped');
				$('#pix_stop').fadeOut(100,function(){
					$('#pix_play').fadeIn(100);
					$('#pix_canvas').fadeOut(100);
				});
			});
		}
		
		
		var allImg = new Array();	//I create an array for the images of the slideshow
		$('img', elem).each( function() { 
			allImg.push($(this).attr('src'));	//all the images are pushed in the array
		});
		if (!$.browser.msie) {	//sorry IE8- has some problem with this
			$('div, span, a', elem).each(function(){	//I check all the background images in the sliders and I push them into the array
				var bG = $(this).css('background');
				var bG2 = $(this).attr('style');
				if(typeof bG !== 'undefined' && bG !== false && bG.indexOf("url") != -1) {
					var bGstart = bG.lastIndexOf('url(')+4;
					var bGfinish = bG.lastIndexOf(')');
					bG = bG.substring(bGstart,bGfinish);
					bG = bG.replace(/'/g,'');
					bG = bG.replace(/"/g,'');
					allImg.push(bG);
				} else if (typeof bG2 !== 'undefined' && bG2 !== false && bG2.indexOf("url") != -1) {
					var bG2start = bG2.lastIndexOf('url(')+4;
					var bG2finish = bG2.lastIndexOf(')');
					bG2 = bG2.substring(bG2start,bG2finish);
					bG2 = bG2.replace(/'/g,'');
					bG2 = bG2.replace(/"/g,'');
					allImg.push(bG2);
				}
			});
		}
				
	
		loadimages(allImg,nextSlide);	//when all the images in the array are loaded nextSlide function starts
		
	}
	
	
		function shuffle(arr) {	//to randomize the effect
			for(
			  var j, x, i = arr.length; i;
			  j = parseInt(Math.random() * i),
			  x = arr[--i], arr[i] = arr[j], arr[j] = x
			);
			return arr;
		}
	
		function isInteger(s) {	//to check if a number is integer
			return Math.ceil(s) == Math.floor(s);
		}	
	
		if (($.browser.msie && $.browser.version < 9) || opts.loader == 'bar') {	//IE8- has some problems with canvas, I prefer to use a simple loading bar in CSS
			elem.append('<span id="pix_canvas" />');
			var canvas = $("#pix_canvas");
			if(opts.barPosition=='top'){
				canvas.css({'top':0});
			} else {
				canvas.css({'bottom':0});
			}
			canvas.css({'position':'absolute', 'left':0, 'z-index':1001, 'height':opts.barStroke, 'width':0, 'background-color':opts.loaderColor});
		} else {
			elem.append('<canvas id="pix_canvas"></canvas>');
			var G_vmlCanvasManager;
			var canvas = document.getElementById("pix_canvas");
			canvas.setAttribute("width", opts.pieDiameter);
			canvas.setAttribute("height", opts.pieDiameter);
			canvas.setAttribute("style", "position:absolute; z-index:1002; "+opts.piePosition);
			var rad;
			var radNew;
	
			if (canvas && canvas.getContext) {
				var ctx = canvas.getContext("2d");
				ctx.rotate(Math.PI*(3/2));
				ctx.translate(-opts.pieDiameter,0);
			}
		
		}
		if(opts.loader=='none' || autoAdv==false) {	//hide the loader if you want
			$('#pix_canvas, #pix_canvas_wrap').hide();
		}
		
		if(navigation==true) {	//I create the next/prev buttons
			elem.append('<div id="pix_prev" />').append('<div id="pix_next" />');
			$('#pix_prev').animate({opacity:0},200);
		}
			
		elem.after('<div id="pix_pag" />');	//I create a div that will contain the play/stop button and the pagination buttons
		if(pagination==true) {
			$('#pix_pag').append('<ul id="pix_pag_ul" />');
			var li;
			for (li = 0; li < amountSlide; li++){
				$('#pix_pag_ul').append('<li id="pag_nav_'+li+'" style="position:relative; z-index:1002"><span><span>'+li+'</span></span></li>');
				if(opts.thumbs==true) {
					var dataThumb = selector.eq(li).attr('data-thumb');
					var newImg = new Image();
					newImg.src = dataThumb;
					$('li#pag_nav_'+li).append($(newImg).attr('class','pix_thumb').css('position','absolute').animate({opacity:0},0));
					$('li#pag_nav_'+li+' > img').after('<div class="thumb_arrow" />');
					$('li#pag_nav_'+li+' > .thumb_arrow').animate({opacity:0},0);
					
					if(!isMobile()){
						$('#pix_pag li').hover(function(){
							$('.pix_thumb, .thumb_arrow',this).addClass('visible').stop(true,false).animate({'margin-top':-15, opacity: 1},300,'easeOutQuad');					
						},function(){
							$('.pix_thumb, .thumb_arrow',this).removeClass('visible').stop(true,false).animate({'margin-top':0, opacity: 0},150);					
						});
					}
				}
			}
		}
			
		if(commands==true) {
			$('#pix_pag').append('<div id="pix_commands" />');
			$('#pix_pag').find('#pix_commands').append('<div id="pix_play" />').append('<div id="pix_stop" />');
			if(autoAdv==true){
				$('#pix_play').hide();
				$('#pix_stop').show();
			} else {
				$('#pix_stop').hide();
				$('#pix_play').show();
			}
		}
			
		if(navHover==true){
			$('#pix_prev, #pix_next').animate({opacity:0},0);
		}
			
		function canvasLoader() {
			opts.onStartTransition.call(this);
			rad = 0;
			if (($.browser.msie && $.browser.version < 9) || opts.loader == 'bar') {
				$('#pix_canvas').css({'width':0});
			} else {
				ctx.clearRect(0,0,opts.pieDiameter,opts.pieDiameter); // clear canvas
			}
		}
		
		
		canvasLoader();
		
		
		$('.fromLeft, .fromRight, .fromTop, .fromBottom, .fadeIn').each(function(){
			$(this).css('visibility','hidden');
		});
		
	
	/*************************** FUNCTION nextSlide() ***************************/
	
	function nextSlide(nav){    //funzione per il fading delle immagini
		elem.addClass('diaposliding');	//aggiunge una classe che mi dice che il fading è in corso
		
		var vis = parseFloat($('> '+opts.selector +'.diapocurrent',elem).not('#pix_canvas').not('#pix_canvas_wrap').not('#pix_next').not('#pix_prev').not('#pix_commands').index());    //la variabile è il numero del div partendo da 0

		if(nav>0){    //se siamo all'ultimo div o se ancora non ho creato nessun div
			var i = nav-1;
		} else if (vis == amountSlide-1) { 
			var i = 0;
		} else {    //altrimenti l'indice è l'id corrent più uno, quindi il div successivo
			var i = vis+1;
		}
		
		

		var rows = opts.rows,
			cols = opts.cols,
			couples = 1,
			difference = 0,
			dataSlideOn,
			time,
			fx,
			easing,
			randomFx = new Array('simpleFade','curtainTopLeft','curtainTopRight','curtainBottomLeft','curtainBottomRight','curtainSliceLeft','curtainSliceRight','blindCurtainTopLeft','blindCurtainTopRight','blindCurtainBottomLeft','blindCurtainBottomRight','blindCurtainSliceBottom','blindCurtainSliceTop','stampede','mosaic','mosaicReverse','mosaicRandom','mosaicSpiral','mosaicSpiralReverse','topLeftBottomRight','bottomRightTopLeft','bottomLeftTopRight','bottomLeftTopRight','scrollLeft','scrollRight','scrollTop','scrollBottom','scrollHorz');
			marginLeft = 0,
			marginTop = 0;
		
		
		if(isMobile()){
			var dataFx = selector.eq(i).attr('data-fx');
		} else {
			var dataFx = selector.eq(i).attr('data-mobileFx');
		}
		if(typeof dataFx !== 'undefined' && dataFx!== false){
			fx = dataFx;
		} else {
			if(isMobile()&&opts.mobileFx!=''){
				fx = opts.mobileFx;
			} else {
				fx = opts.fx;
			}
			if(fx=='random') {
				fx = shuffle(randomFx);
				fx = fx[0];
			} else {
				fx = fx;
				if(fx.indexOf(',')>0){
					fx = fx.replace(/ /g,'');
					fx = fx.split(',');
					fx = shuffle(fx);
					fx = fx[0];
				}
			}
		}
		
		if(isMobile()&&opts.mobileEasing!=''){
			easing = opts.mobileEasing;
		} else {
			easing = opts.easing;
		}

		dataSlideOn = selector.eq(i).attr('data-slideOn');
		if(typeof dataSlideOn !== 'undefined' && dataSlideOn!== false){
			slideOn = dataSlideOn;
		} else {
			if(opts.slideOn=='random'){
				var slideOn = new Array('next','prev');
				slideOn = shuffle(slideOn);
				slideOn = slideOn[0];
			} else {
				slideOn = opts.slideOn;
			}
		}
			
		time = selector.eq(i).attr('data-time');
		if(typeof time !== 'undefined' && time!== false){
			time = time;
		} else {
			time = opts.time;
		}
			
		if(!$(elem).hasClass('diapostarted')){
			fx = 'simpleFade';
			slideOn = 'next';
			$(elem).addClass('diapostarted')
		}

		switch(fx){
			case 'simpleFade':
				cols = 1;
				rows = 1;
					break;
			case 'curtainTopLeft':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainTopRight':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainBottomLeft':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainBottomRight':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainSliceLeft':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainSliceRight':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'blindCurtainTopLeft':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainTopRight':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainBottomLeft':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainBottomRight':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainSliceTop':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainSliceBottom':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'stampede':
				difference = '-'+opts.transPeriod;
					break;
			case 'mosaic':
				difference = opts.gridDifference;
					break;
			case 'mosaicReverse':
				difference = opts.gridDifference;
					break;
			case 'mosaicRandom':
					break;
			case 'mosaicSpiral':
				difference = opts.gridDifference;
				couples = 1.7;
					break;
			case 'mosaicSpiralReverse':
				difference = opts.gridDifference;
				couples = 1.7;
					break;
			case 'topLeftBottomRight':
				difference = opts.gridDifference;
				couples = 6;
					break;
			case 'bottomRightTopLeft':
				difference = opts.gridDifference;
				couples = 6;
					break;
			case 'bottomLeftTopRight':
				difference = opts.gridDifference;
				couples = 6;
					break;
			case 'topRightBottomLeft':
				difference = opts.gridDifference;
				couples = 6;
					break;
			case 'scrollLeft':
				cols = 1;
				rows = 1;
					break;
			case 'scrollRight':
				cols = 1;
				rows = 1;
					break;
			case 'scrollTop':
				cols = 1;
				rows = 1;
					break;
			case 'scrollBottom':
				cols = 1;
				rows = 1;
					break;
			case 'scrollHorz':
				cols = 1;
				rows = 1;
					break;
		}
			
			var cycle = 0;
			var blocks = rows*cols;	//number of squares
			var leftScrap = w-(Math.floor(w/cols)*cols);	//difference between rounded widths and total width
			var topScrap = h-(Math.floor(h/rows)*rows);	//difference between rounded heights and total height
			var addLeft;	//1 optional pixel to the widths
			var addTop;	//1 optional pixel to the heights
			var tAppW = 0;	//I need it to calculate the margin left for the widths
			var tAppH = 0;	//I need it to calculate the margin right for the widths
			var arr = new Array();
			var delay = new Array();
			var order = new Array();
			while(cycle < blocks){
				arr.push(cycle);
				delay.push(cycle);
				elem.append('<div class="diapoappended" style="display:none; overflow:hidden; position:absolute; z-index:1000" />');
				var tApp = $('.diapoappended:eq('+cycle+')');
				tApp.find('iframe').remove();
				if(fx=='scrollLeft' || fx=='scrollRight' || fx=='scrollTop' || fx=='scrollBottom' || fx=='scrollHorz'){
					selector.eq(i).clone().show().appendTo(tApp);
				} else {
					if(slideOn=='next'){
						selector.eq(i).clone().show().appendTo(tApp);
					} else {
						selector.eq(vis).clone().show().appendTo(tApp);
					}
				}

				if(cycle%cols<leftScrap){
					addLeft = 1;
				} else {
					addLeft = 0;
				}
				if(cycle%cols==0){
					tAppW = 0;
				}
				if(Math.floor(cycle/cols)<topScrap){
					addTop = 1;
				} else {
					addTop = 0;
				}
				tApp.css({
					'height': Math.floor((h/rows)+addTop+1),
					'left': tAppW,
					'top': tAppH,
					'width': Math.floor((w/cols)+addLeft+1)
				});
				$('> '+opts.selector, tApp).not('#pix_canvas').not('#pix_canvas_wrap').not('#pix_next').not('#pix_prev').not('#pix_commands').css({
					'height': h,
					'margin-left': '-'+tAppW+'px',
					'margin-top': '-'+tAppH+'px',
					'width': w
				});
				tAppW = tAppW+tApp.width()-1;
				if(cycle%cols==cols-1){
					tAppH = tAppH + tApp.height() - 1;
				}
				cycle++;
			}
			

			
			switch(fx){
				case 'curtainTopLeft':
						break;
				case 'curtainBottomLeft':
						break;
				case 'curtainSliceLeft':
						break;
				case 'curtainTopRight':
					arr = arr.reverse();
						break;
				case 'curtainBottomRight':
					arr = arr.reverse();
						break;
				case 'curtainSliceRight':
					arr = arr.reverse();
						break;
				case 'blindCurtainTopLeft':
						break;
				case 'blindCurtainBottomLeft':
					arr = arr.reverse();
						break;
				case 'blindCurtainSliceTop':
						break;
				case 'blindCurtainTopRight':
						break;
				case 'blindCurtainBottomRight':
					arr = arr.reverse();
						break;
				case 'blindCurtainSliceBottom':
					arr = arr.reverse();
						break;
				case 'stampede':
					arr = shuffle(arr);
						break;
				case 'mosaic':
						break;
				case 'mosaicReverse':
					arr = arr.reverse();
						break;
				case 'mosaicRandom':
					arr = shuffle(arr);
						break;
				case 'mosaicSpiral':
					var rows2 = rows/2, x, y, z, n=0;
						for (z = 0; z < rows2; z++){
							y = z;
							for (x = z; x < cols - z - 1; x++) {
								order[n++] = y * cols + x;
							}
							x = cols - z - 1;
							for (y = z; y < rows - z - 1; y++) {
								order[n++] = y * cols + x;
							}
							y = rows - z - 1;
							for (x = cols - z - 1; x > z; x--) {
								order[n++] = y * cols + x;
							}
							x = z;
							for (y = rows - z - 1; y > z; y--) {
								order[n++] = y * cols + x;
							}
						}
						
						arr = order;

						break;
				case 'mosaicSpiralReverse':
					var rows2 = rows/2, x, y, z, n=blocks-1;
						for (z = 0; z < rows2; z++){
							y = z;
							for (x = z; x < cols - z - 1; x++) {
								order[n--] = y * cols + x;
							}
							x = cols - z - 1;
							for (y = z; y < rows - z - 1; y++) {
								order[n--] = y * cols + x;
							}
							y = rows - z - 1;
							for (x = cols - z - 1; x > z; x--) {
								order[n--] = y * cols + x;
							}
							x = z;
							for (y = rows - z - 1; y > z; y--) {
								order[n--] = y * cols + x;
							}
						}

						arr = order;
						
						break;
				case 'topLeftBottomRight':
					for (var y = 0; y < rows; y++)
					for (var x = 0; x < cols; x++) {
						order.push(x + y);
					}
						delay = order;
						break;
				case 'bottomRightTopLeft':
					for (var y = 0; y < rows; y++)
					for (var x = 0; x < cols; x++) {
						order.push(x + y);
					}
						delay = order.reverse();
						break;
				case 'bottomLeftTopRight':
					for (var y = rows; y > 0; y--)
					for (var x = 0; x < cols; x++) {
						order.push(x + y);
					}
						delay = order;
						break;
				case 'topRightBottomLeft':
					for (var y = 0; y < rows; y++)
					for (var x = cols; x > 0; x--) {
						order.push(x + y);
					}
						delay = order;
						break;
			}
			
			
						
			$.each(arr, function(index, value) {

				if(value%cols<leftScrap){
					addLeft = 1;
				} else {
					addLeft = 0;
				}
				if(value%cols==0){
					tAppW = 0;
				}
				if(Math.floor(value/cols)<topScrap){
					addTop = 1;
				} else {
					addTop = 0;
				}
				
				$('.interval').text(fx);
			
				switch(fx){
					case 'simpleFade':
						height = h;
						width = w;
							break;
					case 'curtainTopLeft':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1),
						marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';
							break;
					case 'curtainTopRight':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1),
						marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';
							break;
					case 'curtainBottomLeft':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1),
						marginTop = Math.floor((h/rows)+addTop+1)+'px';
							break;
					case 'curtainBottomRight':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1),
						marginTop = Math.floor((h/rows)+addTop+1)+'px';
							break;
					case 'curtainSliceLeft':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1);
						if(value%2==0){
							marginTop = Math.floor((h/rows)+addTop+1)+'px';					
						} else {
							marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';					
						}
							break;
					case 'curtainSliceRight':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1);
						if(value%2==0){
							marginTop = Math.floor((h/rows)+addTop+1)+'px';					
						} else {
							marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';					
						}
							break;
					case 'blindCurtainTopLeft':
						height = Math.floor((h/rows)+addTop+1),
						width = 0,
						marginLeft = '-'+Math.floor((w/cols)+addLeft+1)+'px';
							break;
					case 'blindCurtainTopRight':
						height = Math.floor((h/rows)+addTop+1),
						width = 0,
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';
							break;
					case 'blindCurtainBottomLeft':
						height = Math.floor((h/rows)+addTop+1),
						width = 0,
						marginLeft = '-'+Math.floor((w/cols)+addLeft+1)+'px';
							break;
					case 'blindCurtainBottomRight':
						height = Math.floor((h/rows)+addTop+1),
						width = 0,
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';
							break;
					case 'blindCurtainSliceBottom':
						height = Math.floor((h/rows)+addTop+1),
						width = 0;
						if(value%2==0){
							marginLeft = '-'+Math.floor((w/cols)+addLeft+1)+'px';
						} else {
							marginLeft = Math.floor((w/cols)+addLeft+1)+'px';
						}
							break;
					case 'blindCurtainSliceTop':
						height = Math.floor((h/rows)+addTop+1),
						width = 0;
						if(value%2==0){
							marginLeft = '-'+Math.floor((w/cols)+addLeft+1)+'px';
						} else {
							marginLeft = Math.floor((w/cols)+addLeft+1)+'px';
						}
							break;
					case 'stampede':
						height = 0;
						width = 0;					
						marginLeft = (w*0.2)*(((index)%cols)-(cols-(Math.floor(cols/2))))+'px';					
						marginTop = (h*0.2)*((Math.floor(index/cols)+1)-(rows-(Math.floor(rows/2))))+'px';	
							break;
					case 'mosaic':
						height = 0;
						width = 0;					
							break;
					case 'mosaicReverse':
						height = 0;
						width = 0;					
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)+'px';					
							break;
					case 'mosaicRandom':
						height = 0;
						width = 0;					
						marginLeft = Math.floor((w/cols)+addLeft+1)*0.5+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)*0.5+'px';					
							break;
					case 'mosaicSpiral':
						height = 0;
						width = 0;
						marginLeft = Math.floor((w/cols)+addLeft+1)*0.5+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)*0.5+'px';					
							break;
					case 'mosaicSpiralReverse':
						height = 0;
						width = 0;
						marginLeft = Math.floor((w/cols)+addLeft+1)*0.5+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)*0.5+'px';					
							break;
					case 'topLeftBottomRight':
						height = 0;
						width = 0;					
							break;
					case 'bottomRightTopLeft':
						height = 0;
						width = 0;					
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)+'px';					
							break;
					case 'bottomLeftTopRight':
						height = 0;
						width = 0;					
						marginLeft = 0;					
						marginTop = Math.floor((h/rows)+addTop+1)+'px';					
							break;
					case 'topRightBottomLeft':
						height = 0;
						width = 0;					
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';					
						marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';					
							break;
					case 'scrollRight':
						height = h;
						width = w;
						marginLeft = -w;					
							break;
					case 'scrollLeft':
						height = h;
						width = w;
						marginLeft = w;					
							break;
					case 'scrollTop':
						height = h;
						width = w;
						marginTop = h;					
							break;
					case 'scrollBottom':
						height = h;
						width = w;
						marginTop = -h;					
							break;
					case 'scrollHorz':
						height = h;
						width = w;
						if(vis==0 && i==amountSlide-1) {
							marginLeft = -w;	
						} else if(vis<i  || (vis==amountSlide-1 && i==0)) {
							marginLeft = w;	
						} else {
							marginLeft = -w;	
						}
							break;
					}
					
			
				var tApp = $('.diapoappended:eq('+value+')');
								
				start = new Date().valueOf()+(opts.transPeriod+difference);
				
				if(typeof u !== 'undefined'){
					clearInterval(u);
					setTimeout(canvasLoader,opts.transPeriod+difference);
				}
				
				
				function diapoeased() {
					$(this).addClass('diapoeased');
					if($('.diapoeased').length==blocks){
						opts.onEnterSlide.call(this);
						
						$('.fromLeft, .fromRight, .fromTop, .fromBottom, .fadeIn').each(function(){
							$(this).css('visibility','hidden');
						});
		
						selector.eq(i).show().css('z-index','999').addClass('diapocurrent');
						selector.eq(vis).css('z-index','1').removeClass('diapocurrent');
						var lMoveIn = selector.eq(i).find('.fromLeft, .fromRight, .fromTop, .fromBottom, .fadeIn').length;
						
						if (lMoveIn!=0){
							$('.diapocurrent .fromLeft, .diapocurrent .fromRight, .diapocurrent .fromTop, .diapocurrent .fromBottom, .diapocurrent .fadeIn').each(function(){
								if($(this).attr('data-easing')!=''){
									var easeMove = $(this).attr('data-easing');
								} else {
									var easeMove = easing;
								}
								var t = $(this);
								var wMoveIn = t.width();
								var hMoveIn = t.outerHeight();
								t.css('width',wMoveIn);
								var pos = t.position();
								var left = pos.left;
								var top = pos.top;
								var tClass = t.attr('class');
								var ind = t.index();
								var hRel = t.parents('.pix_relativize').height();
								var wRel = t.parents('.pix_relativize').width();
								if(tClass.indexOf("fromLeft") != -1) {
									t.css({'left':'-'+wRel+'px','right':'auto'});
									t.css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({'left':pos.left},(time/lMoveIn)*0.2,easeMove);
								} else if(tClass.indexOf("fromRight") != -1) {
									t.css({'left':wRel+'px','right':'auto'});
									t.css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({'left':pos.left},(time/lMoveIn)*0.2,easeMove);
								} else if(tClass.indexOf("fromTop") != -1) {
									t.css({'top':'-'+hRel+'px','bottom':'auto'});
									t.css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({'top':pos.top},(time/lMoveIn)*0.2,easeMove);
								} else if(tClass.indexOf("fromBottom") != -1) {
									t.css({'top':hRel+'px','bottom':'auto'});
									t.css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({'top':pos.top},(time/lMoveIn)*0.2,easeMove);
								} else if(tClass.indexOf("fadeIn") != -1) {
									t.animate({opacity:0},0).css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({opacity:1},(time/lMoveIn)*0.2,easeMove);
								}
							});
						}

						
						if(pagination==true){
							$('#pix_pag li').removeClass('diapocurrent');
							$('#pix_pag li').eq(i).addClass('diapocurrent');
						}
						
						$('.diapoappended').remove();
						elem.removeClass('diaposliding');	//I remove this class, that means the effect is finished
							selector.eq(vis).hide();

							$('#pix_canvas').animate({opacity:opts.loaderOpacity},400);
							u = setInterval(
								function(){
									if (($.browser.msie && $.browser.version < 9) || opts.loader == 'bar') {
										if(rad<=1 && !elem.hasClass('stopped')){
											rad = rad+0.01;
										} else if (rad<=1 && (elem.hasClass('stopped'))){
											rad = rad;
										} else {
											if(!elem.hasClass('stopped'))
												imgFake();
												clearInterval(u);
												$('#pix_canvas').animate({opacity:0},200,function(){
													setTimeout(canvasLoader,opts.transPeriod+difference);
													nextSlide();
												});
										}
										canvas.css({'width':(w*rad)});
									} else {
										radNew = rad;
										ctx.clearRect(0,0,opts.pieDiameter,opts.pieDiameter);
										ctx.globalCompositeOperation = 'destination-over';
										ctx.beginPath();
										ctx.arc((opts.pieDiameter)/2, (opts.pieDiameter)/2, (opts.pieDiameter)/2-opts.pieStroke,0,Math.PI*2,false);
										ctx.lineWidth = opts.pieStroke;
										ctx.strokeStyle = opts.loaderBgColor;
										ctx.stroke();
										ctx.closePath();
										ctx.globalCompositeOperation = 'source-over';
										ctx.beginPath();
										ctx.arc((opts.pieDiameter)/2, (opts.pieDiameter)/2, (opts.pieDiameter)/2-opts.pieStroke,0,Math.PI*2*radNew,false);
										ctx.lineWidth = opts.pieStroke-4;
										ctx.strokeStyle = opts.loaderColor;
										ctx.stroke();
										ctx.closePath();
												
										if(rad<=1 && !elem.hasClass('stopped')){
											rad = rad+0.01;
										} else if (rad<=1 && (elem.hasClass('stopped'))){
											rad = rad;
										} else {
											if(!elem.hasClass('stopped'))
												imgFake();
												clearInterval(u);
												$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},200,function(){
													setTimeout(canvasLoader,opts.transPeriod+difference);
													nextSlide(); 
												});
										}
									}
								},(time)*0.01
							);
						}

				}


				if(fx=='scrollLeft' || fx=='scrollRight' || fx=='scrollTop' || fx=='scrollBottom' || fx=='scrollHorz'){
					tApp.delay((((opts.transPeriod+difference)/blocks)*delay[index]*couples)*0.5).css({
							'display' : 'block',
							'height': height,
							'margin-left': marginLeft,
							'margin-top': marginTop,
							'width': width
						}).animate({
							'height': Math.floor((h/rows)+addTop+1),
							'margin-top' : 0,
							'margin-left' : 0,
							'width' : Math.floor((w/cols)+addLeft+1)
						},(opts.transPeriod-difference),easing,diapoeased);
					selector.eq(vis).delay((((opts.transPeriod+difference)/blocks)*delay[index]*couples)*0.5).animate({
							'margin-left': marginLeft*(-1),
							'margin-top': marginTop*(-1),
						},(opts.transPeriod-difference),easing,function(){
							jQuery(this).css({'margin-top' : 0,'margin-left' : 0});
						});
				} else {
					if(slideOn=='next'){
						tApp.delay((((opts.transPeriod+difference)/blocks)*delay[index]*couples)*0.5).css({
								'display' : 'block',
								'height': height,
								'margin-left': marginLeft,
								'margin-top': marginTop,
								'width': width,
								'opacity' : 0
							}).animate({
								'height': Math.floor((h/rows)+addTop+1),
								'margin-top' : 0,
								'margin-left' : 0,
								'opacity' : 1,
								'width' : Math.floor((w/cols)+addLeft+1)
							},(opts.transPeriod-difference),easing,diapoeased);
					} else {
						selector.eq(i).show().css('z-index','999').addClass('diapocurrent');
						selector.eq(vis).css('z-index','1').removeClass('diapocurrent');
						tApp.delay((((opts.transPeriod+difference)/blocks)*delay[index]*couples)*0.5).css({
								'display' : 'block',
								'height': Math.floor((h/rows)+addTop+1),
								'margin-top' : 0,
								'margin-left' : 0,
								'opacity' : 1,
								'width' : Math.floor((w/cols)+addLeft+1)
							}).animate({
								'height': height,
								'margin-left': marginLeft,
								'margin-top': marginTop,
								'width': width,
								'opacity' : 0
							},(opts.transPeriod-difference),easing,diapoeased);
					}
				}



				if(navigation==true){
					$('#pix_prev')[clickEv](function(){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($('.diapocurrent').index());
							clearInterval(u);
							imgFake();
							$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
							canvasLoader();
							if(idNum!=0){
								nextSlide(idNum);
							} else {
								nextSlide(amountSlide);
						   }
						}
					});
			
					$('#pix_next')[clickEv](function(){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($('.diapocurrent').index()); 
							clearInterval(u);
							imgFake();
							$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
							canvasLoader();
							if(idNum==amountSlide-1){
								nextSlide(1);
							} else {
								nextSlide(idNum+2);
						   }
						}
					});
				}


				if(isMobile()){
					elem.live('swipeleft',function(event){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($('.diapocurrent').index()); 
							clearInterval(u);
							imgFake();
							$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
							canvasLoader();
							if(idNum==amountSlide-1){
								nextSlide(1);
							} else {
								nextSlide(idNum+2);
						   }
						}
					});
					elem.live('swiperight',function(event){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($('.diapocurrent').index());
							clearInterval(u);
							imgFake();
							$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
							canvasLoader();
							if(idNum!=0){
								nextSlide(idNum);
							} else {
								nextSlide(amountSlide);
						   }
						}
					});
				}

				if(pagination==true){
					$('#pix_pag li')[clickEv](function(){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($(this).index());
							var curNum = parseFloat($('.diapocurrent').index());
							if(idNum!=curNum) {
								clearInterval(u);
								imgFake();
								$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
								canvasLoader();
								nextSlide(idNum+1);
							}
						}
					});
				}

				if(opts.thumbs==true){

					$('#pix_pag li .pix_thumb')[clickEv](function(){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($(this).parents('li').index());
							var curNum = parseFloat($('.diapocurrent').index());
							if(idNum!=curNum) {
								clearInterval(u);
								imgFake();
								$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
								canvasLoader();
								nextSlide(idNum+1);
							}
						}
					});
				}



			});
				
				
				
	 
	}

		
		
	
}

})(jQuery);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */



/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);


/*!
 * jQuery Mobile v1.0b2
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a,d){if(a.cleanData){var c=a.cleanData;a.cleanData=function(f){for(var b=0,d;(d=f[b])!=null;b++)a(d).triggerHandler("remove");c(f)}}else{var b=a.fn.remove;a.fn.remove=function(f,c){return this.each(function(){c||(!f||a.filter(f,[this]).length)&&a("*",this).add([this]).each(function(){a(this).triggerHandler("remove")});return b.call(a(this),f,c)})}}a.widget=function(b,c,d){var h=b.split(".")[0],i,b=b.split(".")[1];i=h+"-"+b;if(!d)d=c,c=a.Widget;a.expr[":"][i]=function(c){return!!a.data(c,
b)};a[h]=a[h]||{};a[h][b]=function(a,b){arguments.length&&this._createWidget(a,b)};c=new c;c.options=a.extend(!0,{},c.options);a[h][b].prototype=a.extend(!0,c,{namespace:h,widgetName:b,widgetEventPrefix:a[h][b].prototype.widgetEventPrefix||b,widgetBaseClass:i},d);a.widget.bridge(b,a[h][b])};a.widget.bridge=function(b,c){a.fn[b]=function(g){var h=typeof g==="string",i=Array.prototype.slice.call(arguments,1),k=this,g=!h&&i.length?a.extend.apply(null,[!0,g].concat(i)):g;if(h&&g.charAt(0)==="_")return k;
h?this.each(function(){var c=a.data(this,b);if(!c)throw"cannot call methods on "+b+" prior to initialization; attempted to call method '"+g+"'";if(!a.isFunction(c[g]))throw"no such method '"+g+"' for "+b+" widget instance";var e=c[g].apply(c,i);if(e!==c&&e!==d)return k=e,!1}):this.each(function(){var d=a.data(this,b);d?d.option(g||{})._init():a.data(this,b,new c(g,this))});return k}};a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)};a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",
options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this);this.element=a(c);this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){var b={};a.metadata&&(b=a.metadata.get(element)[this.widgetName]);return b},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(b,c){var g=b;if(arguments.length===0)return a.extend({},this.options);if(typeof b==="string"){if(c===d)return this.options[b];g={};g[b]=c}this._setOptions(g);return this},_setOptions:function(b){var c=this;a.each(b,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,b){this.options[a]=b;a==="disabled"&&
this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",b);return this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var h=this.options[b],c=a.Event(c);c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase();d=d||{};if(c.originalEvent)for(var b=a.event.props.length,i;b;)i=a.event.props[--b],c[i]=c.originalEvent[i];this.element.trigger(c,
d);return!(a.isFunction(h)&&h.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);(function(a,d){a.widget("mobile.widget",{_getCreateOptions:function(){var c=this.element,b={};a.each(this.options,function(a){var e=c.jqmData(a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}));e!==d&&(b[a]=e)});return b}})})(jQuery);
(function(a){a(window);var d=a("html");a.mobile.media=function(){var c={},b=a("<div id='jquery-mediatest'>"),f=a("<body>").append(b);return function(a){if(!(a in c)){var g=document.createElement("style"),h="@media "+a+" { #jquery-mediatest { position:absolute; } }";g.type="text/css";g.styleSheet?g.styleSheet.cssText=h:g.appendChild(document.createTextNode(h));d.prepend(f).prepend(g);c[a]=b.css("position")==="absolute";f.add(g).remove()}return c[a]}}()})(jQuery);
(function(a,d){function c(a){var b=a.charAt(0).toUpperCase()+a.substr(1),a=(a+" "+e.join(b+" ")+b).split(" "),c;for(c in a)if(f[c]!==d)return!0}var b=a("<body>").prependTo("html"),f=b[0].style,e=["webkit","moz","o"],g="palmGetResource"in window,h=window.blackberry;a.mobile.browser={};a.mobile.browser.ie=function(){for(var a=3,b=document.createElement("div"),c=b.all||[];b.innerHTML="<\!--[if gt IE "+ ++a+"]><br><![endif]--\>",c[0];);return a>4?a:!a}();a.extend(a.support,{orientation:"orientation"in
window,touch:"ontouchend"in document,cssTransitions:"WebKitTransitionEvent"in window,pushState:!!history.pushState,mediaquery:a.mobile.media("only all"),cssPseudoElement:!!c("content"),boxShadow:!!c("boxShadow")&&!h,scrollTop:("pageXOffset"in window||"scrollTop"in document.documentElement||"scrollTop"in b[0])&&!g,dynamicBaseTag:function(){var c=location.protocol+"//"+location.host+location.pathname+"ui-dir/",f=a("head base"),d=null,e="",g;f.length?e=f.attr("href"):f=d=a("<base>",{href:c}).appendTo("head");
g=a("<a href='testurl'></a>").prependTo(b)[0].href;f[0].href=e?e:location.pathname;d&&d.remove();return g.indexOf(c)===0}(),eventCapture:"addEventListener"in document});b.remove();g=function(){var a=window.navigator.userAgent;return a.indexOf("Nokia")>-1&&(a.indexOf("Symbian/3")>-1||a.indexOf("Series60/5")>-1)&&a.indexOf("AppleWebKit")>-1&&a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}();a.mobile.ajaxBlacklist=window.blackberry&&!window.WebKitPoint||window.operamini&&Object.prototype.toString.call(window.operamini)===
"[object OperaMini]"||g;g&&a(function(){a("head link[rel=stylesheet]").attr("rel","alternate stylesheet").attr("rel","stylesheet")});a.support.boxShadow||a("html").addClass("ui-mobile-nosupport-boxshadow")})(jQuery);
(function(a,d,c,b){function f(a){for(;a&&typeof a.originalEvent!=="undefined";)a=a.originalEvent;return a}function e(b){for(var c={},f,d;b;){f=a.data(b,n);for(d in f)if(f[d])c[d]=c.hasVirtualBinding=!0;b=b.parentNode}return c}function g(){v&&(clearTimeout(v),v=0);v=setTimeout(function(){B=v=0;A.length=0;w=!1;r=!0},a.vmouse.resetTimerDuration)}function h(c,d,r){var e=!1,g;if(!(g=r&&r[c])){if(r=!r)a:{for(r=d.target;r;){if((g=a.data(r,n))&&(!c||g[c]))break a;r=r.parentNode}r=null}g=r}if(g){var e=d,r=
e.type,j,h,e=a.Event(e);e.type=c;g=e.originalEvent;j=a.event.props;if(g)for(h=j.length;h;)c=j[--h],e[c]=g[c];if(r.search(/^touch/)!==-1&&(c=f(g),r=c.touches,c=c.changedTouches,r=r&&r.length?r[0]:c&&c.length?c[0]:b)){g=0;for(len=z.length;g<len;g++)c=z[g],e[c]=r[c]}a(d.target).trigger(e);e=e.isDefaultPrevented()}return e}function i(b){var c=a.data(b.target,x);!w&&(!B||B!==c)&&h("v"+b.type,b)}function k(b){var c=f(b).touches,d;if(c&&c.length===1&&(d=b.target,c=e(d),c.hasVirtualBinding))B=F++,a.data(d,
x,B),v&&(clearTimeout(v),v=0),s=r=!1,d=f(b).touches[0],y=d.pageX,u=d.pageY,h("vmouseover",b,c),h("vmousedown",b,c)}function l(a){r||(s||h("vmousecancel",a,e(a.target)),s=!0,g())}function m(b){if(!r){var c=f(b).touches[0],d=s,j=a.vmouse.moveDistanceThreshold;s=s||Math.abs(c.pageX-y)>j||Math.abs(c.pageY-u)>j;flags=e(b.target);s&&!d&&h("vmousecancel",b,flags);h("vmousemove",b,flags);g()}}function p(a){if(!r){r=!0;var b=e(a.target),c;h("vmouseup",a,b);!s&&h("vclick",a,b)&&(c=f(a).changedTouches[0],A.push({touchID:B,
x:c.clientX,y:c.clientY}),w=!0);h("vmouseout",a,b);s=!1;g()}}function o(b){var b=a.data(b,n),c;if(b)for(c in b)if(b[c])return!0;return!1}function j(){}function q(b){var c=b.substr(1);return{setup:function(){o(this)||a.data(this,n,{});a.data(this,n)[b]=!0;t[b]=(t[b]||0)+1;t[b]===1&&C.bind(c,i);a(this).bind(c,j);if(E)t.touchstart=(t.touchstart||0)+1,t.touchstart===1&&C.bind("touchstart",k).bind("touchend",p).bind("touchmove",m).bind("scroll",l)},teardown:function(){--t[b];t[b]||C.unbind(c,i);E&&(--t.touchstart,
t.touchstart||C.unbind("touchstart",k).unbind("touchmove",m).unbind("touchend",p).unbind("scroll",l));var f=a(this),d=a.data(this,n);d&&(d[b]=!1);f.unbind(c,j);o(this)||f.removeData(n)}}}var n="virtualMouseBindings",x="virtualTouchID",d="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),z="clientX clientY pageX pageY screenX screenY".split(" "),t={},v=0,y=0,u=0,s=!1,A=[],w=!1,r=!1,E=a.support.eventCapture,C=a(c),F=1,B=0;a.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,
resetTimerDuration:1500};for(var D=0;D<d.length;D++)a.event.special[d[D]]=q(d[D]);E&&c.addEventListener("click",function(b){var c=A.length,f=b.target,d,r,e,g,j;if(c){d=b.clientX;r=b.clientY;threshold=a.vmouse.clickDistanceThreshold;for(e=f;e;){for(g=0;g<c;g++)if(j=A[g],e===f&&Math.abs(j.x-d)<threshold&&Math.abs(j.y-r)<threshold||a.data(e,x)===j.touchID){b.preventDefault();b.stopPropagation();return}e=e.parentNode}}},!0)})(jQuery,window,document);
(function(a,d,c){function b(b,c,f){var d=f.type;f.type=c;a.event.handle.call(b,f);f.type=d}a.each("touchstart touchmove touchend orientationchange throttledresize tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)};a.attrFn[c]=!0});var f=a.support.touch,e=f?"touchstart":"mousedown",g=f?"touchend":"mouseup",h=f?"touchmove":"mousemove";a.event.special.scrollstart={enabled:!0,setup:function(){function c(a,
e){d=e;b(f,d?"scrollstart":"scrollstop",a)}var f=this,d,e;a(f).bind("touchmove scroll",function(b){a.event.special.scrollstart.enabled&&(d||c(b,!0),clearTimeout(e),e=setTimeout(function(){c(b,!1)},50))})}};a.event.special.tap={setup:function(){var c=this,f=a(c);f.bind("vmousedown",function(a){function d(){g=!1;clearTimeout(h);f.unbind("vclick",e).unbind("vmousecancel",d)}function e(a){d();j==a.target&&b(c,"tap",a)}if(a.which&&a.which!==1)return!1;var g=!0,j=a.target,h;f.bind("vmousecancel",d).bind("vclick",
e);h=setTimeout(function(){g&&b(c,"taphold",a)},750)})}};a.event.special.swipe={scrollSupressionThreshold:10,durationThreshold:1E3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var b=a(this);b.bind(e,function(f){function d(b){if(p){var c=b.originalEvent.touches?b.originalEvent.touches[0]:b;o={time:(new Date).getTime(),coords:[c.pageX,c.pageY]};Math.abs(p.coords[0]-o.coords[0])>a.event.special.swipe.scrollSupressionThreshold&&b.preventDefault()}}var e=f.originalEvent.touches?
f.originalEvent.touches[0]:f,p={time:(new Date).getTime(),coords:[e.pageX,e.pageY],origin:a(f.target)},o;b.bind(h,d).one(g,function(){b.unbind(h,d);p&&o&&o.time-p.time<a.event.special.swipe.durationThreshold&&Math.abs(p.coords[0]-o.coords[0])>a.event.special.swipe.horizontalDistanceThreshold&&Math.abs(p.coords[1]-o.coords[1])<a.event.special.swipe.verticalDistanceThreshold&&p.origin.trigger("swipe").trigger(p.coords[0]>o.coords[0]?"swipeleft":"swiperight");p=o=c})})}};(function(a,b){function c(){var a=
d();a!==e&&(e=a,f.trigger("orientationchange"))}var f=a(b),d,e;a.event.special.orientationchange={setup:function(){if(a.support.orientation)return!1;e=d();f.bind("throttledresize",c)},teardown:function(){if(a.support.orientation)return!1;f.unbind("throttledresize",c)},add:function(a){var b=a.handler;a.handler=function(a){a.orientation=d();return b.apply(this,arguments)}}};a.event.special.orientationchange.orientation=d=function(){var a=document.documentElement;return a&&a.clientWidth/a.clientHeight<
1.1?"portrait":"landscape"}})(jQuery,d);(function(){a.event.special.throttledresize={setup:function(){a(this).bind("resize",b)},teardown:function(){a(this).unbind("resize",b)}};var b=function(){d=(new Date).getTime();e=d-c;e>=250?(c=d,a(this).trigger("throttledresize")):(f&&clearTimeout(f),f=setTimeout(b,250-e))},c=0,f,d,e})();a.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(b,c){a.event.special[b]={setup:function(){a(this).bind(c,a.noop)}}})})(jQuery,
this);
(function(a,d,c){function b(a){a=a||location.href;return"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}var f="hashchange",e=document,g,h=a.event.special,i=e.documentMode,k="on"+f in d&&(i===c||i>7);a.fn[f]=function(a){return a?this.bind(f,a):this.trigger(f)};a.fn[f].delay=50;h[f]=a.extend(h[f],{setup:function(){if(k)return!1;a(g.start)},teardown:function(){if(k)return!1;a(g.stop)}});g=function(){function g(){var c=b(),e=n(o);if(c!==o)q(o=c,e),a(d).trigger(f);else if(e!==o)location.href=location.href.replace(/#.*/,"")+
e;i=setTimeout(g,a.fn[f].delay)}var h={},i,o=b(),j=function(a){return a},q=j,n=j;h.start=function(){i||g()};h.stop=function(){i&&clearTimeout(i);i=c};a.browser.msie&&!k&&function(){var c,d;h.start=function(){if(!c)d=(d=a.fn[f].src)&&d+b(),c=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){d||q(b());g()}).attr("src",d||"javascript:0").insertAfter("body")[0].contentWindow,e.onpropertychange=function(){try{if(event.propertyName==="title")c.document.title=e.title}catch(a){}}};h.stop=
j;n=function(){return b(c.location.href)};q=function(b,d){var g=c.document,h=a.fn[f].domain;if(b!==d)g.title=e.title,g.open(),h&&g.write('<script>document.domain="'+h+'"<\/script>'),g.close(),c.location.hash=b}}();return h}()})(jQuery,this);(function(a){a.widget("mobile.page",a.mobile.widget,{options:{theme:"c",domCache:!1},_create:function(){var a=this.element,c=this.options;this._trigger("beforeCreate")!==!1&&a.addClass("ui-page ui-body-"+c.theme)}})})(jQuery);
(function(a,d){a.extend(a.mobile,{ns:"",subPageUrlKey:"ui-page",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",ajaxEnabled:!0,hashListeningEnabled:!0,defaultPageTransition:"slide",minScrollBack:screen.height/2,defaultDialogTransition:"pop",loadingMessage:"loading",pageLoadErrorMessage:"Error Loading Page",autoInitializePage:!0,gradeA:function(){return a.support.mediaquery||a.mobile.browser.ie&&a.mobile.browser.ie>=7},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,
COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},silentScroll:function(b){if(a.type(b)!=="number")b=a.mobile.defaultHomeScroll;a.event.special.scrollstart.enabled=!1;setTimeout(function(){d.scrollTo(0,b);a(document).trigger("silentscroll",{x:0,y:b})},
20);setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},nsNormalize:function(b){if(b)return a.camelCase(a.mobile.ns+b)}});a.fn.jqmData=function(b,c){return this.data(b?a.mobile.nsNormalize(b):b,c)};a.jqmData=function(b,c,d){return a.data(b,a.mobile.nsNormalize(c),d)};a.fn.jqmRemoveData=function(b){return this.removeData(a.mobile.nsNormalize(b))};a.jqmRemoveData=function(b,c){return a.removeData(b,a.mobile.nsNormalize(c))};a.jqmHasData=function(b,c){return a.hasData(b,a.mobile.nsNormalize(c))};
var c=a.find;a.find=function(b,d,e,g){b=b.replace(/:jqmData\(([^)]*)\)/g,"[data-"+(a.mobile.ns||"")+"$1]");return c.call(this,b,d,e,g)};a.extend(a.find,c);a.find.matches=function(b,c){return a.find(b,null,null,c)};a.find.matchesSelector=function(b,c){return a.find(c,null,null,[b]).length>0}})(jQuery,this);
(function(a,d){function c(a){var b=a.jqmData("lastClicked");b&&b.length?b.focus():(b=a.find(".ui-title:eq(0)"),b.length?b.focus():a.find(x).eq(0).focus())}function b(b){q&&(!q.closest(".ui-page-active").length||b)&&q.removeClass(a.mobile.activeBtnClass);q=null}function f(){t=!1;z.length>0&&a.mobile.changePage.apply(null,z.pop())}function e(b,d,f,e){var h=a.support.scrollTop?m.scrollTop():!0,j=b.data("lastScroll")||a.mobile.defaultHomeScroll,i=g();h&&window.scrollTo(0,a.mobile.defaultHomeScroll);j<
a.mobile.minScrollBack&&(j=0);d&&(d.height(i+h).jqmData("lastScroll",h).jqmData("lastClicked",q),d.data("page")._trigger("beforehide",null,{nextPage:b}));b.height(i+j).data("page")._trigger("beforeshow",null,{prevPage:d||a("")});a.mobile.hidePageLoadingMsg();f=(a.mobile.transitionHandlers[f||"none"]||a.mobile.defaultTransitionHandler)(f,e,b,d);f.done(function(){b.height("");j?(a.mobile.silentScroll(j),a(document).one("silentscroll",function(){c(b)})):c(b);d&&d.height("").data("page")._trigger("hide",
null,{nextPage:b});b.data("page")._trigger("show",null,{prevPage:d||a("")})});return f}function g(){var b=jQuery.event.special.orientationchange.orientation()==="portrait",c=b?screen.availHeight:screen.availWidth,b=Math.max(b?480:320,a(window).height());return Math.min(c,b)}function h(){a("."+a.mobile.activePageClass).css("min-height",g())}function i(b,c){c&&b.attr("data-"+a.mobile.ns+"role",c);b.page()}function k(a){for(;a;){if(a.nodeName.toLowerCase()=="a")break;a=a.parentNode}return a}function l(b){var b=
a(b).closest(".ui-page").jqmData("url"),c=s.hrefNoHash;if(!b||!j.isPath(b))b=c;return j.makeUrlAbsolute(b,c)}var m=a(window),p=a("html"),o=a("head"),j={urlParseRE:/^(((([^:\/#\?]+:)?(?:\/\/((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?]+)(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,parseUrl:function(b){if(a.type(b)==="object")return b;var b=j.urlParseRE.exec(b),c;b&&(c={href:b[0]||"",hrefNoHash:b[1]||"",hrefNoSearch:b[2]||"",domain:b[3]||"",protocol:b[4]||"",authority:b[5]||
"",username:b[7]||"",password:b[8]||"",host:b[9]||"",hostname:b[10]||"",port:b[11]||"",pathname:b[12]||"",directory:b[13]||"",filename:b[14]||"",search:b[15]||"",hash:b[16]||""});return c||{}},makePathAbsolute:function(a,b){if(a&&a.charAt(0)==="/")return a;for(var a=a||"",c=(b=b?b.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"")?b.split("/"):[],d=a.split("/"),f=0;f<d.length;f++){var e=d[f];switch(e){case ".":break;case "..":c.length&&c.pop();break;default:c.push(e)}}return"/"+c.join("/")},isSameDomain:function(a,
b){return j.parseUrl(a).domain===j.parseUrl(b).domain},isRelativeUrl:function(a){return j.parseUrl(a).protocol===""},isAbsoluteUrl:function(a){return j.parseUrl(a).protocol!==""},makeUrlAbsolute:function(a,b){if(!j.isRelativeUrl(a))return a;var c=j.parseUrl(a),d=j.parseUrl(b),f=c.protocol||d.protocol,e=c.authority||d.authority,g=c.pathname!=="",h=j.makePathAbsolute(c.pathname||d.filename,d.pathname);return f+"//"+e+h+(c.search||!g&&d.search||"")+c.hash},addSearchParams:function(b,c){var d=j.parseUrl(b),
f=typeof c==="object"?a.param(c):c,e=d.search||"?";return d.hrefNoSearch+e+(e.charAt(e.length-1)!=="?"?"&":"")+f+(d.hash||"")},convertUrlToDataUrl:function(a){var b=j.parseUrl(a);if(j.isEmbeddedPage(b))return b.hash.split(v)[0].replace(/^#/,"");else if(j.isSameDomain(b,s))return b.hrefNoHash.replace(s.domain,"");return a},get:function(a){if(a===d)a=location.hash;return j.stripHash(a).replace(/[^\/]*\.[^\/*]+$/,"")},getFilePath:function(b){var c="&"+a.mobile.subPageUrlKey;return b&&b.split(c)[0].split(v)[0]},
set:function(a){location.hash=a},isPath:function(a){return/\//.test(a)},clean:function(a){return a.replace(s.domain,"")},stripHash:function(a){return a.replace(/^#/,"")},cleanHash:function(a){return j.stripHash(a.replace(/\?.*$/,"").replace(v,""))},isExternal:function(a){a=j.parseUrl(a);return a.protocol&&a.domain!==u.domain?!0:!1},hasProtocol:function(a){return/^(:?\w+:)/.test(a)},isEmbeddedPage:function(a){a=j.parseUrl(a);if(a.protocol!=="")return a.hash&&(a.hrefNoHash===u.hrefNoHash||A&&a.hrefNoHash===
s.hrefNoHash);return/^#/.test(a.href)}},q=null,n={stack:[],activeIndex:0,getActive:function(){return n.stack[n.activeIndex]},getPrev:function(){return n.stack[n.activeIndex-1]},getNext:function(){return n.stack[n.activeIndex+1]},addNew:function(a,b,c,d){n.getNext()&&n.clearForward();n.stack.push({url:a,transition:b,title:c,pageUrl:d});n.activeIndex=n.stack.length-1},clearForward:function(){n.stack=n.stack.slice(0,n.activeIndex+1)},directHashChange:function(b){var c,f,e;a.each(n.stack,function(a,d){b.currentUrl===
d.url&&(c=a<n.activeIndex,f=!c,e=a)});this.activeIndex=e!==d?e:this.activeIndex;c?b.isBack():f&&b.isForward()},ignoreNextHashChange:!1},x="[tabindex],a,button:visible,select:visible,input",z=[],t=!1,v="&ui-state=dialog",y=o.children("base"),u=j.parseUrl(location.href),s=y.length?j.parseUrl(j.makeUrlAbsolute(y.attr("href"),u.href)):u,A=u.hrefNoHash!==s.hrefNoHash,w=a.support.dynamicBaseTag?{element:y.length?y:a("<base>",{href:s.hrefNoHash}).prependTo(o),set:function(a){w.element.attr("href",j.makeUrlAbsolute(a,
s))},reset:function(){w.element.attr("href",s.hrefNoHash)}}:d;a.fn.animationComplete=function(b){return a.support.cssTransitions?a(this).one("webkitAnimationEnd",b):(setTimeout(b,0),a(this))};a.mobile.updateHash=j.set;a.mobile.path=j;a.mobile.base=w;a.mobile.urlstack=n.stack;a.mobile.urlHistory=n;a.mobile.noneTransitionHandler=function(b,c,d,f){f&&f.removeClass(a.mobile.activePageClass);d.addClass(a.mobile.activePageClass);return a.Deferred().resolve(b,c,d,f).promise()};a.mobile.defaultTransitionHandler=
a.mobile.noneTransitionHandler;a.mobile.transitionHandlers={none:a.mobile.defaultTransitionHandler};a.mobile.allowCrossDomainPages=!1;a.mobile.getDocumentUrl=function(b){return b?a.extend({},u):u.href};a.mobile.getDocumentBase=function(b){return b?a.extend({},s):s.href};a.mobile.loadPage=function(b,c){var f=a.Deferred(),e=a.extend({},a.mobile.loadPage.defaults,c),g=null,h=null,p=j.makeUrlAbsolute(b,a.mobile.activePage&&l(a.mobile.activePage)||s.hrefNoHash);if(e.data&&e.type==="get")p=j.addSearchParams(p,
e.data),e.data=d;var n=j.getFilePath(p),o=j.convertUrlToDataUrl(p);e.pageContainer=e.pageContainer||a.mobile.pageContainer;g=e.pageContainer.children(":jqmData(url='"+o+"')");w&&w.reset();if(g.length){if(!e.reloadPage)return i(g,e.role),f.resolve(p,c,g),f.promise();h=g}if(e.showLoadMsg)var k=setTimeout(function(){a.mobile.showPageLoadingMsg()},e.loadMsgDelay);!a.mobile.allowCrossDomainPages&&!j.isSameDomain(u,p)?f.reject(p,c):a.ajax({url:n,type:e.type,data:e.data,dataType:"html",success:function(d){var l=
a("<div></div>"),q=d.match(/<title[^>]*>([^<]*)/)&&RegExp.$1,m=RegExp("\\bdata-"+a.mobile.ns+"url=[\"']?([^\"'>]*)[\"']?");RegExp(".*(<[^>]+\\bdata-"+a.mobile.ns+"role=[\"']?page[\"']?[^>]*>).*").test(d)&&RegExp.$1&&m.test(RegExp.$1)&&RegExp.$1&&(b=n=j.getFilePath(RegExp.$1));w&&w.set(n);l.get(0).innerHTML=d;g=l.find(":jqmData(role='page'), :jqmData(role='dialog')").first();g.length||(g=a("<div data-"+a.mobile.ns+"role='page'>"+d.split(/<\/?body[^>]*>/gmi)[1]+"</div>"));q&&!g.jqmData("title")&&g.jqmData("title",
q);if(!a.support.dynamicBaseTag){var s=j.get(n);g.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function(){var b=a(this).is("[href]")?"href":a(this).is("[src]")?"src":"action",c=a(this).attr(b),c=c.replace(location.protocol+"//"+location.host+location.pathname,"");/^(\w+:|#|\/)/.test(c)||a(this).attr(b,s+c)})}g.attr("data-"+a.mobile.ns+"url",j.convertUrlToDataUrl(n)).appendTo(e.pageContainer);g.one("pagecreate",function(){g.data("page").options.domCache||g.bind("pagehide.remove",
function(){a(this).remove()})});i(g,e.role);p.indexOf("&"+a.mobile.subPageUrlKey)>-1&&(g=e.pageContainer.children(":jqmData(url='"+o+"')"));e.showLoadMsg&&(clearTimeout(k),a.mobile.hidePageLoadingMsg());f.resolve(p,c,g,h)},error:function(){w&&w.set(j.get());e.showLoadMsg&&(clearTimeout(k),a.mobile.hidePageLoadingMsg(),a("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+a.mobile.pageLoadErrorMessage+"</h1></div>").css({display:"block",opacity:0.96,top:m.scrollTop()+100}).appendTo(e.pageContainer).delay(800).fadeOut(400,
function(){a(this).remove()}));f.reject(p,c)}});return f.promise()};a.mobile.loadPage.defaults={type:"get",data:d,reloadPage:!1,role:d,showLoadMsg:!1,pageContainer:d,loadMsgDelay:50};a.mobile.changePage=function(c,g){if(typeof g!=="object"){var h=null;if(typeof c==="object"&&c.url&&c.type)h={type:c.type,data:c.data,forcePageLoad:!0},c=c.url;var o=arguments.length;if(o>1){var k=["transition","reverse","changeHash","fromHashChange"],l;for(l=1;l<o;l++){var q=arguments[l];typeof q!=="undefined"&&(h=h||
{},h[k[l-1]]=q)}}if(h)return a.mobile.changePage(c,h)}if(t)z.unshift(arguments);else{t=!0;var m=a.extend({},a.mobile.changePage.defaults,g);m.pageContainer=m.pageContainer||a.mobile.pageContainer;if(typeof c=="string")a.mobile.loadPage(c,m).done(function(b,c,d,f){t=!1;c.duplicateCachedPage=f;a.mobile.changePage(d,c)}).fail(function(){t=!1;b(!0);f();m.pageContainer.trigger("changepagefailed")});else{var s=m.pageContainer,h=a.mobile.activePage,k=o=c.jqmData("url");j.getFilePath(o);l=n.getActive();var q=
n.activeIndex===0,y=0,u=document.title,x=m.role==="dialog"||c.jqmData("role")==="dialog";s.trigger("beforechangepage");if(h&&h[0]===c[0])t=!1,s.trigger("changepage");else{i(c,m.role);m.fromHashChange&&n.directHashChange({currentUrl:o,isBack:function(){y=-1},isForward:function(){y=1}});try{a(document.activeElement||"").add("input:focus, textarea:focus, select:focus").blur()}catch(w){}x&&l&&(o=l.url+v);if(m.changeHash!==!1&&o)n.ignoreNextHashChange=!0,j.set(o);var A=c.jqmData("title")||c.children(":jqmData(role='header')").find(".ui-title").text();
A&&u==document.title&&(u=A);y||n.addNew(o,m.transition,u,k);document.title=n.getActive().title;a.mobile.activePage=c;m.transition=m.transition||(y&&!q?l.transition:d)||(x?a.mobile.defaultDialogTransition:a.mobile.defaultPageTransition);m.reverse=m.reverse||y<0;e(c,h,m.transition,m.reverse).done(function(){b();m.duplicateCachedPage&&m.duplicateCachedPage.remove();p.removeClass("ui-mobile-rendering");f();s.trigger("changepage")})}}}};a.mobile.changePage.defaults={transition:d,reverse:!1,changeHash:!0,
fromHashChange:!1,role:d,duplicateCachedPage:d,pageContainer:d,showLoadMsg:!0};a.mobile._registerInternalEvents=function(){a("form").live("submit",function(b){var c=a(this);if(a.mobile.ajaxEnabled&&!c.is(":jqmData(ajax='false')")){var d=c.attr("method"),f=c.attr("target"),e=c.attr("action");if(!e&&(e=l(c),e===s.hrefNoHash))e=u.hrefNoSearch;e=j.makeUrlAbsolute(e,l(c));!j.isExternal(e)&&!f&&(a.mobile.changePage(e,{type:d&&d.length&&d.toLowerCase()||"get",data:c.serialize(),transition:c.jqmData("transition"),
direction:c.jqmData("direction"),reloadPage:!0}),b.preventDefault())}});a(document).bind("vclick",function(b){if((b=k(b.target))&&j.parseUrl(b.getAttribute("href")||"#").hash!=="#")a(b).closest(".ui-btn").not(".ui-disabled").addClass(a.mobile.activeBtnClass),a("."+a.mobile.activePageClass+" .ui-btn").not(b).blur()});a(document).bind("click",function(c){var f=k(c.target);if(f){var e=a(f),g=function(){window.setTimeout(function(){b(!0)},200)};if(e.is(":jqmData(rel='back')"))return window.history.back(),
!1;if(a.mobile.ajaxEnabled){var h=l(e),f=j.makeUrlAbsolute(e.attr("href")||"#",h);if(f.search("#")!=-1)if(f=f.replace(/[^#]*#/,""))f=j.isPath(f)?j.makeUrlAbsolute(f,h):j.makeUrlAbsolute("#"+f,u.hrefNoHash);else{c.preventDefault();return}var h=e.is("[rel='external']")||e.is(":jqmData(ajax='false')")||e.is("[target]"),i=a.mobile.allowCrossDomainPages&&u.protocol==="file:"&&f.search(/^https?:/)!=-1,h=h||j.isExternal(f)&&!i;q=e.closest(".ui-btn");h?g():(g=e.jqmData("transition"),h=(h=e.jqmData("direction"))&&
h==="reverse"||e.jqmData("back"),e=e.attr("data-"+a.mobile.ns+"rel")||d,a.mobile.changePage(f,{transition:g,reverse:h,role:e}),c.preventDefault())}else g()}});a(".ui-page").live("pageshow.prefetch",function(){var b=[];a(this).find("a:jqmData(prefetch)").each(function(){var c=a(this).attr("href");c&&a.inArray(c,b)===-1&&(b.push(c),a.mobile.loadPage(c))})});m.bind("hashchange",function(){var b=j.stripHash(location.hash),c=a.mobile.urlHistory.stack.length===0?"none":d;if(!a.mobile.hashListeningEnabled||
n.ignoreNextHashChange)n.ignoreNextHashChange=!1;else{if(n.stack.length>1&&b.indexOf(v)>-1)if(a.mobile.activePage.is(".ui-dialog")){var f=function(){b=a.mobile.urlHistory.getActive().pageUrl};n.directHashChange({currentUrl:b,isBack:f,isForward:f})}else{n.directHashChange({currentUrl:b,isBack:function(){window.history.back()},isForward:function(){window.history.forward()}});return}b?(b=typeof b==="string"&&!j.isPath(b)?"#"+b:b,a.mobile.changePage(b,{transition:c,changeHash:!1,fromHashChange:!0})):
a.mobile.changePage(a.mobile.firstPage,{transition:c,changeHash:!1,fromHashChange:!0})}});a(document).bind("pageshow",h);a(window).bind("throttledresize",h)}})(jQuery);
(function(a){function d(c,b,d,e){var g=new a.Deferred,h=b?" reverse":"",i="ui-mobile-viewport-transitioning viewport-"+c;d.animationComplete(function(){d.add(e).removeClass("out in reverse "+c);e&&e.removeClass(a.mobile.activePageClass);d.parent().removeClass(i);g.resolve(c,b,d,e)});d.parent().addClass(i);e&&e.addClass(c+" out"+h);d.addClass(a.mobile.activePageClass+" "+c+" in"+h);return g.promise()}a.mobile.css3TransitionHandler=d;if(a.mobile.defaultTransitionHandler===a.mobile.noneTransitionHandler)a.mobile.defaultTransitionHandler=
d})(jQuery,this);
(function(a){a.mobile.page.prototype.options.degradeInputs={color:!1,date:!1,datetime:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:"number",search:!0,tel:!1,time:!1,url:!1,week:!1};a.mobile.page.prototype.options.keepNative=":jqmData(role='none'), :jqmData(role='nojs')";a(document).bind("pagecreate enhance",function(d){var c=a(d.target).data("page").options;a(d.target).find("input").not(c.keepNative).each(function(){var b=a(this),d=this.getAttribute("type"),e=c.degradeInputs[d]||"text";
c.degradeInputs[d]&&b.replaceWith(a("<div>").html(b.clone()).html().replace(/\s+type=["']?\w+['"]?/,' type="'+e+'" data-'+a.mobile.ns+'type="'+d+'" '))})})})(jQuery);
(function(a,d){a.widget("mobile.dialog",a.mobile.widget,{options:{closeBtnText:"Close",theme:"a",initSelector:":jqmData(role='dialog')"},_create:function(){var c=this.element,b=c.attr("class").match(/ui-body-[a-z]/);b.length&&c.removeClass(b[0]);c.addClass("ui-body-"+this.options.theme);c.attr("role","dialog").addClass("ui-dialog").find(":jqmData(role='header')").addClass("ui-corner-top ui-overlay-shadow").prepend("<a href='#' data-"+a.mobile.ns+"icon='delete' data-"+a.mobile.ns+"rel='back' data-"+
a.mobile.ns+"iconpos='notext'>"+this.options.closeBtnText+"</a>").end().find(":jqmData(role='content'),:jqmData(role='footer')").last().addClass("ui-corner-bottom ui-overlay-shadow");c.bind("vclick submit",function(b){var b=a(b.target).closest(b.type==="vclick"?"a":"form"),c;b.length&&!b.jqmData("transition")&&(c=a.mobile.urlHistory.getActive()||{},b.attr("data-"+a.mobile.ns+"transition",c.transition||a.mobile.defaultDialogTransition).attr("data-"+a.mobile.ns+"direction","reverse"))}).bind("pagehide",
function(){a(this).find("."+a.mobile.activeBtnClass).removeClass(a.mobile.activeBtnClass)})},close:function(){d.history.back()}});a(a.mobile.dialog.prototype.options.initSelector).live("pagecreate",function(){a(this).dialog()})})(jQuery,this);
(function(a){a.mobile.page.prototype.options.backBtnText="Back";a.mobile.page.prototype.options.addBackBtn=!1;a.mobile.page.prototype.options.backBtnTheme=null;a.mobile.page.prototype.options.headerTheme="a";a.mobile.page.prototype.options.footerTheme="a";a.mobile.page.prototype.options.contentTheme=null;a(":jqmData(role='page'), :jqmData(role='dialog')").live("pagecreate",function(){var d=a(this).data("page").options,c=d.theme;a(":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')",
this).each(function(){var b=a(this),f=b.jqmData("role"),e=b.jqmData("theme"),g,h,i;b.addClass("ui-"+f);if(f==="header"||f==="footer"){e=e||(f==="header"?d.headerTheme:d.footerTheme)||c;b.addClass("ui-bar-"+e);b.attr("role",f==="header"?"banner":"contentinfo");g=b.children("a");h=g.hasClass("ui-btn-left");i=g.hasClass("ui-btn-right");if(!h)h=g.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length;i||g.eq(1).addClass("ui-btn-right");d.addBackBtn&&f==="header"&&a(".ui-page").length>1&&b.jqmData("url")!==
a.mobile.path.stripHash(location.hash)&&!h&&(f=a("<a href='#' class='ui-btn-left' data-"+a.mobile.ns+"rel='back' data-"+a.mobile.ns+"icon='arrow-l'>"+d.backBtnText+"</a>").prependTo(b),f.attr("data-"+a.mobile.ns+"theme",d.backBtnTheme||e));b.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({tabindex:"0",role:"heading","aria-level":"1"})}else f==="content"&&(b.addClass("ui-body-"+(e||c||d.contentTheme)),b.attr("role","main"))})})})(jQuery);
(function(a){a.widget("mobile.collapsible",a.mobile.widget,{options:{expandCueText:" click to expand contents",collapseCueText:" click to collapse contents",collapsed:!1,heading:">:header,>legend",theme:null,iconTheme:"d",initSelector:":jqmData(role='collapsible')"},_create:function(){var d=this.element,c=this.options,b=d.addClass("ui-collapsible-contain"),f=d.find(c.heading).eq(0),e=b.wrapInner("<div class='ui-collapsible-content'></div>").find(".ui-collapsible-content"),d=d.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set");
f.is("legend")&&(f=a("<div role='heading'>"+f.html()+"</div>").insertBefore(f),f.next().remove());f.insertBefore(e).addClass("ui-collapsible-heading").append("<span class='ui-collapsible-heading-status'></span>").wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a:eq(0)").buttonMarkup({shadow:!d.length,corners:!1,iconPos:"left",icon:"plus",theme:c.theme}).find(".ui-icon").removeAttr("class").buttonMarkup({shadow:!0,corners:!0,iconPos:"notext",icon:"plus",theme:c.iconTheme});
d.length?b.jqmData("collapsible-last")&&f.find("a:eq(0), .ui-btn-inner").addClass("ui-corner-bottom"):f.find("a:eq(0)").addClass("ui-corner-all").find(".ui-btn-inner").addClass("ui-corner-all");b.bind("collapse",function(d){!d.isDefaultPrevented()&&a(d.target).closest(".ui-collapsible-contain").is(b)&&(d.preventDefault(),f.addClass("ui-collapsible-heading-collapsed").find(".ui-collapsible-heading-status").text(c.expandCueText).end().find(".ui-icon").removeClass("ui-icon-minus").addClass("ui-icon-plus"),
e.addClass("ui-collapsible-content-collapsed").attr("aria-hidden",!0),b.jqmData("collapsible-last")&&f.find("a:eq(0), .ui-btn-inner").addClass("ui-corner-bottom"))}).bind("expand",function(a){a.isDefaultPrevented()||(a.preventDefault(),f.removeClass("ui-collapsible-heading-collapsed").find(".ui-collapsible-heading-status").text(c.collapseCueText),f.find(".ui-icon").removeClass("ui-icon-plus").addClass("ui-icon-minus"),e.removeClass("ui-collapsible-content-collapsed").attr("aria-hidden",!1),b.jqmData("collapsible-last")&&
f.find("a:eq(0), .ui-btn-inner").removeClass("ui-corner-bottom"))}).trigger(c.collapsed?"collapse":"expand");d.length&&!d.jqmData("collapsiblebound")&&(d.jqmData("collapsiblebound",!0).bind("expand",function(b){a(b.target).closest(".ui-collapsible-contain").siblings(".ui-collapsible-contain").trigger("collapse")}),d=d.children(":jqmData(role='collapsible')"),d.first().find("a:eq(0)").addClass("ui-corner-top").find(".ui-btn-inner").addClass("ui-corner-top"),d.last().jqmData("collapsible-last",!0));
f.bind("vclick",function(a){var c=f.is(".ui-collapsible-heading-collapsed")?"expand":"collapse";b.trigger(c);a.preventDefault()})}});a(document).bind("pagecreate create",function(d){a(a.mobile.collapsible.prototype.options.initSelector,d.target).collapsible()})})(jQuery);(function(a){a.fn.fieldcontain=function(){return this.addClass("ui-field-contain ui-body ui-br")};a(document).bind("pagecreate create",function(d){a(":jqmData(role='fieldcontain')",d.target).fieldcontain()})})(jQuery);
(function(a){a.fn.grid=function(d){return this.each(function(){var c=a(this),b=a.extend({grid:null},d),f=c.children(),e={solo:1,a:2,b:3,c:4,d:5},b=b.grid;if(!b)if(f.length<=5)for(var g in e)e[g]===f.length&&(b=g);else b="a";e=e[b];c.addClass("ui-grid-"+b);f.filter(":nth-child("+e+"n+1)").addClass("ui-block-a");e>1&&f.filter(":nth-child("+e+"n+2)").addClass("ui-block-b");e>2&&f.filter(":nth-child(3n+3)").addClass("ui-block-c");e>3&&f.filter(":nth-child(4n+4)").addClass("ui-block-d");e>4&&f.filter(":nth-child(5n+5)").addClass("ui-block-e")})}})(jQuery);
(function(a,d){a.widget("mobile.navbar",a.mobile.widget,{options:{iconpos:"top",grid:null,initSelector:":jqmData(role='navbar')"},_create:function(){var c=this.element,b=c.find("a"),f=b.filter(":jqmData(icon)").length?this.options.iconpos:d;c.addClass("ui-navbar").attr("role","navigation").find("ul").grid({grid:this.options.grid});f||c.addClass("ui-navbar-noicons");b.buttonMarkup({corners:!1,shadow:!1,iconpos:f});c.delegate("a","vclick",function(){b.not(".ui-state-persist").removeClass(a.mobile.activeBtnClass);
a(this).addClass(a.mobile.activeBtnClass)})}});a(document).bind("pagecreate create",function(c){a(a.mobile.navbar.prototype.options.initSelector,c.target).navbar()})})(jQuery);
(function(a){var d={};a.widget("mobile.listview",a.mobile.widget,{options:{theme:"c",countTheme:"c",headerTheme:"b",dividerTheme:"b",splitIcon:"arrow-r",splitTheme:"b",inset:!1,initSelector:":jqmData(role='listview')"},_create:function(){var a=this;a.element.addClass(function(b,d){return d+" ui-listview "+(a.options.inset?" ui-listview-inset ui-corner-all ui-shadow ":"")});a.refresh()},_itemApply:function(c,b){b.find(".ui-li-count").addClass("ui-btn-up-"+(c.jqmData("counttheme")||this.options.countTheme)+
" ui-btn-corner-all").end().find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(">img:eq(0), .ui-link-inherit>img:eq(0)").addClass("ui-li-thumb").each(function(){b.addClass(a(this).is(".ui-li-icon")?"ui-li-has-icon":"ui-li-has-thumb")}).end().find(".ui-li-aside").each(function(){var b=a(this);b.prependTo(b.parent())})},_removeCorners:function(a,b){a=a.add(a.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb"));b==="top"?a.removeClass("ui-corner-top ui-corner-tr ui-corner-tl"):
b==="bottom"?a.removeClass("ui-corner-bottom ui-corner-br ui-corner-bl"):a.removeClass("ui-corner-top ui-corner-tr ui-corner-tl ui-corner-bottom ui-corner-br ui-corner-bl")},refresh:function(c){this.parentPage=this.element.closest(".ui-page");this._createSubPages();var b=this.options,d=this.element,e=d.jqmData("dividertheme")||b.dividerTheme,g=d.jqmData("splittheme"),h=d.jqmData("spliticon"),i=d.children("li"),k=a.support.cssPseudoElement||!a.nodeName(d[0],"ol")?0:1,l,m,p,o,j;k&&d.find(".ui-li-dec").remove();
for(var q=0,n=i.length;q<n;q++){l=i.eq(q);m="ui-li";if(c||!l.hasClass("ui-li"))p=l.jqmData("theme")||b.theme,o=l.children("a"),o.length?(j=l.jqmData("icon"),l.buttonMarkup({wrapperEls:"div",shadow:!1,corners:!1,iconpos:"right",icon:o.length>1||j===!1?!1:j||"arrow-r",theme:p}),o.first().addClass("ui-link-inherit"),o.length>1&&(m+=" ui-li-has-alt",o=o.last(),j=g||o.jqmData("theme")||b.splitTheme,o.appendTo(l).attr("title",o.text()).addClass("ui-li-link-alt").empty().buttonMarkup({shadow:!1,corners:!1,
theme:p,icon:!1,iconpos:!1}).find(".ui-btn-inner").append(a("<span />").buttonMarkup({shadow:!0,corners:!0,theme:j,iconpos:"notext",icon:h||o.jqmData("icon")||b.splitIcon})))):l.jqmData("role")==="list-divider"?(m+=" ui-li-divider ui-btn ui-bar-"+e,l.attr("role","heading"),k&&(k=1)):m+=" ui-li-static ui-body-"+p;b.inset&&(q===0&&(m+=" ui-corner-top",l.add(l.find(".ui-btn-inner")).find(".ui-li-link-alt").addClass("ui-corner-tr").end().find(".ui-li-thumb").addClass("ui-corner-tl"),l.next().next().length&&
this._removeCorners(l.next())),q===i.length-1&&(m+=" ui-corner-bottom",l.add(l.find(".ui-btn-inner")).find(".ui-li-link-alt").addClass("ui-corner-br").end().find(".ui-li-thumb").addClass("ui-corner-bl"),l.prev().prev().length?this._removeCorners(l.prev()):l.prev().length&&this._removeCorners(l.prev(),"bottom")));k&&m.indexOf("ui-li-divider")<0&&(p=l.is(".ui-li-static:first")?l:l.find(".ui-link-inherit"),p.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>"+k++ +". </span>"));l.add(l.children(".ui-btn-inner")).addClass(m);
c||this._itemApply(d,l)}},_idStringEscape:function(a){return a.replace(/[^a-zA-Z0-9]/g,"-")},_createSubPages:function(){var c=this.element,b=c.closest(".ui-page"),f=b.jqmData("url"),e=f||b[0][a.expando],g=c.attr("id"),h=this.options,i="data-"+a.mobile.ns,k=this,l=b.find(":jqmData(role='footer')").jqmData("id"),m;typeof d[e]==="undefined"&&(d[e]=-1);g=g||++d[e];a(c.find("li>ul, li>ol").toArray().reverse()).each(function(b){var d=a(this),e=d.attr("id")||g+"-"+b,b=d.parent(),k=a(d.prevAll().toArray().reverse()),
k=k.length?k:a("<span>"+a.trim(b.contents()[0].nodeValue)+"</span>"),n=k.first().text(),e=(f||"")+"&"+a.mobile.subPageUrlKey+"="+e,x=d.jqmData("theme")||h.theme,z=d.jqmData("counttheme")||c.jqmData("counttheme")||h.countTheme;m=!0;d.detach().wrap("<div "+i+"role='page' "+i+"url='"+e+"' "+i+"theme='"+x+"' "+i+"count-theme='"+z+"'><div "+i+"role='content'></div></div>").parent().before("<div "+i+"role='header' "+i+"theme='"+h.headerTheme+"'><div class='ui-title'>"+n+"</div></div>").after(l?a("<div "+
i+"role='footer' "+i+"id='"+l+"'>"):"").parent().appendTo(a.mobile.pageContainer).page();d=b.find("a:first");d.length||(d=a("<a/>").html(k||n).prependTo(b.empty()));d.attr("href","#"+e)}).listview();m&&b.data("page").options.domCache===!1&&b.unbind("pagehide.remove").bind("pagehide.remove",function(c,d){var e=d.nextPage;d.nextPage&&(e=e.jqmData("url"),e.indexOf(f+"&"+a.mobile.subPageUrlKey)!==0&&(k.childPages().remove(),b.remove()))})},childPages:function(){var c=this.parentPage.jqmData("url");return a(":jqmData(url^='"+
c+"&"+a.mobile.subPageUrlKey+"')")}});a(document).bind("pagecreate create",function(c){a(a.mobile.listview.prototype.options.initSelector,c.target).listview()})})(jQuery);
(function(a){a.mobile.listview.prototype.options.filter=!1;a.mobile.listview.prototype.options.filterPlaceholder="Filter items...";a.mobile.listview.prototype.options.filterTheme="c";a(":jqmData(role='listview')").live("listviewcreate",function(){var d=a(this),c=d.data("listview");if(c.options.filter){var b=a("<form>",{"class":"ui-listview-filter ui-bar-"+c.options.filterTheme,role:"search"});a("<input>",{placeholder:c.options.filterPlaceholder}).attr("data-"+a.mobile.ns+"type","search").jqmData("lastval",
"").bind("keyup change",function(){var b=a(this),c=this.value.toLowerCase(),g=null,g=b.jqmData("lastval")+"",h=!1,i="";b.jqmData("lastval",c);change=c.replace(RegExp("^"+g),"");g=c.length<g.length||change.length!=c.length-g.length?d.children():d.children(":not(.ui-screen-hidden)");if(c){for(var k=g.length-1;k>=0;k--)b=a(g[k]),i=b.jqmData("filtertext")||b.text(),b.is("li:jqmData(role=list-divider)")?(b.toggleClass("ui-filter-hidequeue",!h),h=!1):i.toLowerCase().indexOf(c)===-1?b.toggleClass("ui-filter-hidequeue",
!0):h=!0;g.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden",!1);g.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden",!0).toggleClass("ui-filter-hidequeue",!1)}else g.toggleClass("ui-screen-hidden",!1)}).appendTo(b).textinput();a(this).jqmData("inset")&&b.addClass("ui-listview-filter-inset");b.bind("submit",function(){return!1}).insertBefore(d)}})})(jQuery);(function(a){a(document).bind("pagecreate create",function(d){a(":jqmData(role='nojs')",d.target).addClass("ui-nojs")})})(jQuery);
(function(a,d){a.widget("mobile.checkboxradio",a.mobile.widget,{options:{theme:null,initSelector:"input[type='checkbox'],input[type='radio']"},_create:function(){var c=this,b=this.element,f=b.closest("form,fieldset,:jqmData(role='page')").find("label").filter("[for='"+b[0].id+"']"),e=b.attr("type"),g=e+"-on",h=e+"-off",i=b.parents(":jqmData(type='horizontal')").length?d:h;if(!(e!=="checkbox"&&e!=="radio")){a.extend(this,{label:f,inputtype:e,checkedClass:"ui-"+g+(i?"":" "+a.mobile.activeBtnClass),
uncheckedClass:"ui-"+h,checkedicon:"ui-icon-"+g,uncheckedicon:"ui-icon-"+h});if(!this.options.theme)this.options.theme=this.element.jqmData("theme");f.buttonMarkup({theme:this.options.theme,icon:i,shadow:!1});b.add(f).wrapAll("<div class='ui-"+e+"'></div>");f.bind({vmouseover:function(){if(a(this).parent().is(".ui-disabled"))return!1},vclick:function(a){if(b.is(":disabled"))a.preventDefault();else return c._cacheVals(),b.prop("checked",e==="radio"&&!0||!b.prop("checked")),c._getInputSet().not(b).prop("checked",
!1),c._updateAll(),!1}});b.bind({vmousedown:function(){this._cacheVals()},vclick:function(){var b=a(this);b.is(":checked")?(b.prop("checked",!0),c._getInputSet().not(b).prop("checked",!1)):b.prop("checked",!1);c._updateAll()},focus:function(){f.addClass("ui-focus")},blur:function(){f.removeClass("ui-focus")}});this.refresh()}},_cacheVals:function(){this._getInputSet().each(function(){var c=a(this);c.jqmData("cacheVal",c.is(":checked"))})},_getInputSet:function(){if(this.inputtype=="checkbox")return this.element;
return this.element.closest("form,fieldset,:jqmData(role='page')").find("input[name='"+this.element.attr("name")+"'][type='"+this.inputtype+"']")},_updateAll:function(){var c=this;this._getInputSet().each(function(){var b=a(this);(b.is(":checked")||c.inputtype==="checkbox")&&b.trigger("change")}).checkboxradio("refresh")},refresh:function(){var c=this.element,b=this.label,d=b.find(".ui-icon");a(c[0]).prop("checked")?(b.addClass(this.checkedClass).removeClass(this.uncheckedClass),d.addClass(this.checkedicon).removeClass(this.uncheckedicon)):
(b.removeClass(this.checkedClass).addClass(this.uncheckedClass),d.removeClass(this.checkedicon).addClass(this.uncheckedicon));c.is(":disabled")?this.disable():this.enable()},disable:function(){this.element.prop("disabled",!0).parent().addClass("ui-disabled")},enable:function(){this.element.prop("disabled",!1).parent().removeClass("ui-disabled")}});a(document).bind("pagecreate create",function(c){a(a.mobile.checkboxradio.prototype.options.initSelector,c.target).not(":jqmData(role='none'), :jqmData(role='nojs')").checkboxradio()})})(jQuery);
(function(a){a.widget("mobile.button",a.mobile.widget,{options:{theme:null,icon:null,iconpos:null,inline:null,corners:!0,shadow:!0,iconshadow:!0,initSelector:"button, [type='button'], [type='submit'], [type='reset'], [type='image']"},_create:function(){var d=this.element,c=this.options;this.button=a("<div></div>").text(d.text()||d.val()).buttonMarkup({theme:c.theme,icon:c.icon,iconpos:c.iconpos,inline:c.inline,corners:c.corners,shadow:c.shadow,iconshadow:c.iconshadow}).insertBefore(d).append(d.addClass("ui-btn-hidden"));
c=d.attr("type");c!=="button"&&c!=="reset"&&d.bind("vclick",function(){var b=a("<input>",{type:"hidden",name:d.attr("name"),value:d.attr("value")}).insertBefore(d);a(document).submit(function(){b.remove()})});this.refresh()},enable:function(){this.element.attr("disabled",!1);this.button.removeClass("ui-disabled").attr("aria-disabled",!1);return this._setOption("disabled",!1)},disable:function(){this.element.attr("disabled",!0);this.button.addClass("ui-disabled").attr("aria-disabled",!0);return this._setOption("disabled",
!0)},refresh:function(){this.element.attr("disabled")?this.disable():this.enable()}});a(document).bind("pagecreate create",function(d){a(a.mobile.button.prototype.options.initSelector,d.target).not(":jqmData(role='none'), :jqmData(role='nojs')").button()})})(jQuery);
(function(a,d){a.widget("mobile.slider",a.mobile.widget,{options:{theme:null,trackTheme:null,disabled:!1,initSelector:"input[type='range'], :jqmData(type='range'), :jqmData(role='slider')"},_create:function(){var c=this,b=this.element,f=b.parents("[class*='ui-bar-'],[class*='ui-body-']").eq(0),f=f.length?f.attr("class").match(/ui-(bar|body)-([a-z])/)[2]:"c",e=this.options.theme?this.options.theme:f,g=this.options.trackTheme?this.options.trackTheme:f,h=b[0].nodeName.toLowerCase(),f=h=="select"?"ui-slider-switch":
"",i=b.attr("id"),k=i+"-label",i=a("[for='"+i+"']").attr("id",k),l=function(){return h=="input"?parseFloat(b.val()):b[0].selectedIndex},m=h=="input"?parseFloat(b.attr("min")):0,p=h=="input"?parseFloat(b.attr("max")):b.find("option").length-1,o=window.parseFloat(b.attr("step")||1),j=a("<div class='ui-slider "+f+" ui-btn-down-"+g+" ui-btn-corner-all' role='application'></div>"),q=a("<a href='#' class='ui-slider-handle'></a>").appendTo(j).buttonMarkup({corners:!0,theme:e,shadow:!0}).attr({role:"slider",
"aria-valuemin":m,"aria-valuemax":p,"aria-valuenow":l(),"aria-valuetext":l(),title:l(),"aria-labelledby":k});a.extend(this,{slider:j,handle:q,dragging:!1,beforeStart:null});h=="select"&&(j.wrapInner("<div class='ui-slider-inneroffset'></div>"),b.find("option"),b.find("option").each(function(b){var c=!b?"b":"a",d=!b?"right":"left",b=!b?" ui-btn-down-"+g:" ui-btn-active";a("<div class='ui-slider-labelbg ui-slider-labelbg-"+c+b+" ui-btn-corner-"+d+"'></div>").prependTo(j);a("<span class='ui-slider-label ui-slider-label-"+
c+b+" ui-btn-corner-"+d+"' role='img'>"+a(this).text()+"</span>").prependTo(q)}));i.addClass("ui-slider");b.addClass(h==="input"?"ui-slider-input":"ui-slider-switch").change(function(){c.refresh(l(),!0)}).keyup(function(){c.refresh(l(),!0,!0)}).blur(function(){c.refresh(l(),!0)});a(document).bind("vmousemove",function(a){if(c.dragging)return c.refresh(a),!1});j.bind("vmousedown",function(a){c.dragging=!0;if(h==="select")c.beforeStart=b[0].selectedIndex;c.refresh(a);return!1});j.add(document).bind("vmouseup",
function(){if(c.dragging){c.dragging=!1;if(h==="select"){c.beforeStart===b[0].selectedIndex&&c.refresh(!c.beforeStart?1:0);var a=l(),a=Math.round(a/(p-m)*100);q.addClass("ui-slider-handle-snapping").css("left",a+"%").animationComplete(function(){q.removeClass("ui-slider-handle-snapping")})}return!1}});j.insertAfter(b);this.handle.bind("vmousedown",function(){a(this).focus()}).bind("vclick",!1);this.handle.bind("keydown",function(b){var d=l();if(!c.options.disabled){switch(b.keyCode){case a.mobile.keyCode.HOME:case a.mobile.keyCode.END:case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:if(b.preventDefault(),
!c._keySliding)c._keySliding=!0,a(this).addClass("ui-state-active")}switch(b.keyCode){case a.mobile.keyCode.HOME:c.refresh(m);break;case a.mobile.keyCode.END:c.refresh(p);break;case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:c.refresh(d+o);break;case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:c.refresh(d-o)}}}).keyup(function(){if(c._keySliding)c._keySliding=!1,a(this).removeClass("ui-state-active")});this.refresh(d,d,!0)},refresh:function(a,
b,d){if(!this.options.disabled){var e=this.element,g=e[0].nodeName.toLowerCase(),h=g==="input"?parseFloat(e.attr("min")):0,i=g==="input"?parseFloat(e.attr("max")):e.find("option").length-1;if(typeof a==="object"){if(!this.dragging||a.pageX<this.slider.offset().left-8||a.pageX>this.slider.offset().left+this.slider.width()+8)return;a=Math.round((a.pageX-this.slider.offset().left)/this.slider.width()*100)}else a==null&&(a=g==="input"?parseFloat(e.val()):e[0].selectedIndex),a=(parseFloat(a)-h)/(i-h)*
100;if(!isNaN(a)){a<0&&(a=0);a>100&&(a=100);var k=Math.round(a/100*(i-h))+h;k<h&&(k=h);k>i&&(k=i);this.handle.css("left",a+"%");this.handle.attr({"aria-valuenow":g==="input"?k:e.find("option").eq(k).attr("value"),"aria-valuetext":g==="input"?k:e.find("option").eq(k).text(),title:k});g==="select"&&(k===0?this.slider.addClass("ui-slider-switch-a").removeClass("ui-slider-switch-b"):this.slider.addClass("ui-slider-switch-b").removeClass("ui-slider-switch-a"));if(!d)g==="input"?e.val(k):e[0].selectedIndex=
k,b||e.trigger("change")}}},enable:function(){this.element.attr("disabled",!1);this.slider.removeClass("ui-disabled").attr("aria-disabled",!1);return this._setOption("disabled",!1)},disable:function(){this.element.attr("disabled",!0);this.slider.addClass("ui-disabled").attr("aria-disabled",!0);return this._setOption("disabled",!0)}});a(document).bind("pagecreate create",function(c){a(a.mobile.slider.prototype.options.initSelector,c.target).not(":jqmData(role='none'), :jqmData(role='nojs')").slider()})})(jQuery);
(function(a){a.widget("mobile.textinput",a.mobile.widget,{options:{theme:null,initSelector:"input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea"},_create:function(){var i;var d=this.element,c=this.options,b=c.theme,f,e;b||(b=this.element.closest("[class*='ui-bar-'],[class*='ui-body-']"),i=(b=b.length&&/ui-(bar|body)-([a-z])/.exec(b.attr("class")))&&
b[2]||"c",b=i);b=" ui-body-"+b;a("label[for='"+d.attr("id")+"']").addClass("ui-input-text");d.addClass("ui-input-text ui-body-"+c.theme);f=d;typeof d[0].autocorrect!=="undefined"&&(d[0].setAttribute("autocorrect","off"),d[0].setAttribute("autocomplete","off"));d.is("[type='search'],:jqmData(type='search')")?(f=d.wrap("<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield"+b+"'></div>").parent(),e=a("<a href='#' class='ui-input-clear' title='clear text'>clear text</a>").tap(function(a){d.val("").focus();
d.trigger("change");e.addClass("ui-input-clear-hidden");a.preventDefault()}).appendTo(f).buttonMarkup({icon:"delete",iconpos:"notext",corners:!0,shadow:!0}),c=function(){d.val()?e.removeClass("ui-input-clear-hidden"):e.addClass("ui-input-clear-hidden")},c(),d.keyup(c).focus(c)):d.addClass("ui-corner-all ui-shadow-inset"+b);d.focus(function(){f.addClass("ui-focus")}).blur(function(){f.removeClass("ui-focus")});if(d.is("textarea")){var g=function(){var a=d[0].scrollHeight;d[0].clientHeight<a&&d.css({height:a+
15})},h;d.keyup(function(){clearTimeout(h);h=setTimeout(g,100)})}},disable:function(){(this.element.attr("disabled",!0).is("[type='search'],:jqmData(type='search')")?this.element.parent():this.element).addClass("ui-disabled")},enable:function(){(this.element.attr("disabled",!1).is("[type='search'],:jqmData(type='search')")?this.element.parent():this.element).removeClass("ui-disabled")}});a(document).bind("pagecreate create",function(d){a(a.mobile.textinput.prototype.options.initSelector,d.target).not(":jqmData(role='none'), :jqmData(role='nojs')").textinput()})})(jQuery);
(function(a){a.widget("mobile.selectmenu",a.mobile.widget,{options:{theme:null,disabled:!1,icon:"arrow-d",iconpos:"right",inline:null,corners:!0,shadow:!0,iconshadow:!0,menuPageTheme:"b",overlayTheme:"a",hidePlaceholderMenuItems:!0,closeText:"Close",nativeMenu:!0,initSelector:"select:not(:jqmData(role='slider'))"},_create:function(){var d=this,c=this.options,b=this.element.wrap("<div class='ui-select'>"),f=b.attr("id"),e=a("label[for='"+f+"']").addClass("ui-select"),g=b[0].selectedIndex==-1?0:b[0].selectedIndex,
h=(d.options.nativeMenu?a("<div/>"):a("<a>",{href:"#",role:"button",id:l,"aria-haspopup":"true","aria-owns":m})).text(a(b[0].options.item(g)).text()).insertBefore(b).buttonMarkup({theme:c.theme,icon:c.icon,iconpos:c.iconpos,inline:c.inline,corners:c.corners,shadow:c.shadow,iconshadow:c.iconshadow}),i=d.isMultiple=b[0].multiple;c.nativeMenu&&window.opera&&window.opera.version&&b.addClass("ui-select-nativeonly");if(!c.nativeMenu){var k=b.find("option"),l=f+"-button",m=f+"-menu",p=b.closest(".ui-page"),
g=/ui-btn-up-([a-z])/.exec(h.attr("class"))[1],o=a("<div data-"+a.mobile.ns+"role='dialog' data-"+a.mobile.ns+"theme='"+c.menuPageTheme+"'><div data-"+a.mobile.ns+"role='header'><div class='ui-title'>"+e.text()+"</div></div><div data-"+a.mobile.ns+"role='content'></div></div>").appendTo(a.mobile.pageContainer).page(),j=o.find(".ui-content");o.find(".ui-header a");var q=a("<div>",{"class":"ui-selectmenu-screen ui-screen-hidden"}).appendTo(p),n=a("<div>",{"class":"ui-selectmenu ui-selectmenu-hidden ui-overlay-shadow ui-corner-all ui-body-"+
c.overlayTheme+" "+a.mobile.defaultDialogTransition}).insertAfter(q),x=a("<ul>",{"class":"ui-selectmenu-list",id:m,role:"listbox","aria-labelledby":l}).attr("data-"+a.mobile.ns+"theme",g).appendTo(n),z=a("<div>",{"class":"ui-header ui-bar-"+g}).prependTo(n),t=a("<h1>",{"class":"ui-title"}).appendTo(z),v=a("<a>",{text:c.closeText,href:"#","class":"ui-btn-left"}).attr("data-"+a.mobile.ns+"iconpos","notext").attr("data-"+a.mobile.ns+"icon","delete").appendTo(z).buttonMarkup()}if(i)d.buttonCount=a("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(h);
c.disabled&&this.disable();b.change(function(){d.refresh()});a.extend(d,{select:b,optionElems:k,selectID:f,label:e,buttonId:l,menuId:m,thisPage:p,button:h,menuPage:o,menuPageContent:j,screen:q,listbox:n,list:x,menuType:void 0,header:z,headerClose:v,headerTitle:t,placeholder:""});c.nativeMenu?b.appendTo(h).bind("vmousedown",function(){h.addClass(a.mobile.activeBtnClass)}).bind("focus vmouseover",function(){h.trigger("vmouseover")}).bind("vmousemove",function(){h.removeClass(a.mobile.activeBtnClass)}).bind("change blur vmouseout",
function(){h.trigger("vmouseout").removeClass(a.mobile.activeBtnClass)}):(d.refresh(),b.attr("tabindex","-1").focus(function(){a(this).blur();h.focus()}),h.bind("vclick keydown",function(b){if(b.type=="vclick"||b.keyCode&&(b.keyCode===a.mobile.keyCode.ENTER||b.keyCode===a.mobile.keyCode.SPACE))d.open(),b.preventDefault()}),x.attr("role","listbox").delegate(".ui-li>a","focusin",function(){a(this).attr("tabindex","0")}).delegate(".ui-li>a","focusout",function(){a(this).attr("tabindex","-1")}).delegate("li:not(.ui-disabled, .ui-li-divider)",
"vclick",function(c){var e=a(this),f=b[0].selectedIndex,g=e.jqmData("option-index"),h=d.optionElems[g];h.selected=i?!h.selected:!0;i&&e.find(".ui-icon").toggleClass("ui-icon-checkbox-on",h.selected).toggleClass("ui-icon-checkbox-off",!h.selected);(i||f!==g)&&b.trigger("change");i||d.close();c.preventDefault()}).keydown(function(b){var c=a(b.target),d=c.closest("li");switch(b.keyCode){case 38:return b=d.prev(),b.length&&(c.blur().attr("tabindex","-1"),b.find("a").first().focus()),!1;case 40:return b=
d.next(),b.length&&(c.blur().attr("tabindex","-1"),b.find("a").first().focus()),!1;case 13:case 32:return c.trigger("vclick"),!1}}),d.menuPage.bind("pagehide",function(){d.list.appendTo(d.listbox);d._focusButton()}),q.bind("vclick",function(){d.close()}),d.headerClose.click(function(){if(d.menuType=="overlay")return d.close(),!1}))},_buildList:function(){var d=this,c=this.options,b=this.placeholder,f=[],e=[],g=d.isMultiple?"checkbox-off":"false";d.list.empty().filter(".ui-listview").listview("destroy");
d.select.find("option").each(function(h){var i=a(this),k=i.parent(),l=i.text(),m="<a href='#'>"+l+"</a>",p=[],o=[];k.is("optgroup")&&(k=k.attr("label"),a.inArray(k,f)===-1&&(e.push("<li data-"+a.mobile.ns+"role='list-divider'>"+k+"</li>"),f.push(k)));if(!this.getAttribute("value")||l.length==0||i.jqmData("placeholder"))c.hidePlaceholderMenuItems&&p.push("ui-selectmenu-placeholder"),b=d.placeholder=l;this.disabled&&(p.push("ui-disabled"),o.push("aria-disabled='true'"));e.push("<li data-"+a.mobile.ns+
"option-index='"+h+"' data-"+a.mobile.ns+"icon='"+g+"' class='"+p.join(" ")+"' "+o.join(" ")+">"+m+"</li>")});d.list.html(e.join(" "));d.list.find("li").attr({role:"option",tabindex:"-1"}).first().attr("tabindex","0");this.isMultiple||this.headerClose.hide();!this.isMultiple&&!b.length?this.header.hide():this.headerTitle.text(this.placeholder);d.list.listview()},refresh:function(d){var c=this,b=this.element,f=this.isMultiple,e=this.optionElems=b.find("option"),g=e.filter(":selected"),h=g.map(function(){return e.index(this)}).get();
!c.options.nativeMenu&&(d||b[0].options.length!=c.list.find("li").length)&&c._buildList();c.button.find(".ui-btn-text").text(function(){if(!f)return g.text();return g.length?g.map(function(){return a(this).text()}).get().join(", "):c.placeholder});f&&c.buttonCount[g.length>1?"show":"hide"]().text(g.length);c.options.nativeMenu||c.list.find("li:not(.ui-li-divider)").removeClass(a.mobile.activeBtnClass).attr("aria-selected",!1).each(function(b){a.inArray(b,h)>-1&&(b=a(this).addClass(a.mobile.activeBtnClass),
b.find("a").attr("aria-selected",!0),f&&b.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on"))})},open:function(){function d(){c.list.find(".ui-btn-active").focus()}if(!this.options.disabled&&!this.options.nativeMenu){var c=this,b=c.list.parent().outerHeight(),f=c.list.parent().outerWidth(),e=a(window).scrollTop(),g=c.button.offset().top,h=window.innerHeight,i=window.innerWidth;c.button.addClass(a.mobile.activeBtnClass);setTimeout(function(){c.button.removeClass(a.mobile.activeBtnClass)},
300);if(b>h-80||!a.support.scrollTop){c.thisPage.unbind("pagehide.remove");if(e==0&&g>h)c.thisPage.one("pagehide",function(){a(this).jqmData("lastScroll",g)});c.menuPage.one("pageshow",function(){a(window).one("silentscroll",function(){d()});c.isOpen=!0});c.menuType="page";c.menuPageContent.append(c.list);a.mobile.changePage(c.menuPage,{transition:a.mobile.defaultDialogTransition})}else{c.menuType="overlay";c.screen.height(a(document).height()).removeClass("ui-screen-hidden");var k=g-e,l=e+h-g,m=
b/2,p=parseFloat(c.list.parent().css("max-width")),b=k>b/2&&l>b/2?g+c.button.outerHeight()/2-m:k>l?e+h-b-30:e+30;f<p?p=(i-f)/2:(p=c.button.offset().left+c.button.outerWidth()/2-f/2,p<30?p=30:p+f>i&&(p=i-f-30));c.listbox.append(c.list).removeClass("ui-selectmenu-hidden").css({top:b,left:p}).addClass("in");d();c.isOpen=!0}}},_focusButton:function(){var a=this;setTimeout(function(){a.button.focus()},40)},close:function(){if(!this.options.disabled&&this.isOpen&&!this.options.nativeMenu)this.menuType==
"page"?(this.thisPage.bind("pagehide.remove",function(){a(this).remove()}),window.history.back()):(this.screen.addClass("ui-screen-hidden"),this.listbox.addClass("ui-selectmenu-hidden").removeAttr("style").removeClass("in"),this.list.appendTo(this.listbox),this._focusButton()),this.isOpen=!1},disable:function(){this.element.attr("disabled",!0);this.button.addClass("ui-disabled").attr("aria-disabled",!0);return this._setOption("disabled",!0)},enable:function(){this.element.attr("disabled",!1);this.button.removeClass("ui-disabled").attr("aria-disabled",
!1);return this._setOption("disabled",!1)}});a(document).bind("pagecreate create",function(d){a(a.mobile.selectmenu.prototype.options.initSelector,d.target).not(":jqmData(role='none'), :jqmData(role='nojs')").selectmenu()})})(jQuery);
(function(a){function d(b){for(;b;){var c=a(b);if(c.hasClass("ui-btn")&&!c.hasClass("ui-disabled"))break;b=b.parentNode}return b}a.fn.buttonMarkup=function(b){return this.each(function(){var d=a(this),e=a.extend({},a.fn.buttonMarkup.defaults,d.jqmData(),b),g="ui-btn-inner",h,i;c&&c();if(!e.theme)h=d.closest("[class*='ui-bar-'],[class*='ui-body-']"),e.theme=h.length?/ui-(bar|body)-([a-z])/.exec(h.attr("class"))[2]:"c";h="ui-btn ui-btn-up-"+e.theme;e.inline&&(h+=" ui-btn-inline");if(e.icon)e.icon="ui-icon-"+
e.icon,e.iconpos=e.iconpos||"left",i="ui-icon "+e.icon,e.iconshadow&&(i+=" ui-icon-shadow");e.iconpos&&(h+=" ui-btn-icon-"+e.iconpos,e.iconpos=="notext"&&!d.attr("title")&&d.attr("title",d.text()));e.corners&&(h+=" ui-btn-corner-all",g+=" ui-btn-corner-all");e.shadow&&(h+=" ui-shadow");d.attr("data-"+a.mobile.ns+"theme",e.theme).addClass(h);e=("<D class='"+g+"'><D class='ui-btn-text'></D>"+(e.icon?"<span class='"+i+"'></span>":"")+"</D>").replace(/D/g,e.wrapperEls);d.wrapInner(e)})};a.fn.buttonMarkup.defaults=
{corners:!0,shadow:!0,iconshadow:!0,wrapperEls:"span"};var c=function(){a(document).bind({vmousedown:function(b){var b=d(b.target),c;b&&(b=a(b),c=b.attr("data-"+a.mobile.ns+"theme"),b.removeClass("ui-btn-up-"+c).addClass("ui-btn-down-"+c))},"vmousecancel vmouseup":function(b){var b=d(b.target),c;b&&(b=a(b),c=b.attr("data-"+a.mobile.ns+"theme"),b.removeClass("ui-btn-down-"+c).addClass("ui-btn-up-"+c))},"vmouseover focus":function(b){var b=d(b.target),c;b&&(b=a(b),c=b.attr("data-"+a.mobile.ns+"theme"),
b.removeClass("ui-btn-up-"+c).addClass("ui-btn-hover-"+c))},"vmouseout blur":function(b){var b=d(b.target),c;b&&(b=a(b),c=b.attr("data-"+a.mobile.ns+"theme"),b.removeClass("ui-btn-hover-"+c).addClass("ui-btn-up-"+c))}});c=null};a(document).bind("pagecreate create",function(b){a(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a",b.target).not(".ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()})})(jQuery);
(function(a){a.fn.controlgroup=function(d){return this.each(function(){function c(a){a.removeClass("ui-btn-corner-all ui-shadow").eq(0).addClass(g[0]).end().filter(":last").addClass(g[1]).addClass("ui-controlgroup-last")}var b=a(this),f=a.extend({direction:b.jqmData("type")||"vertical",shadow:!1,excludeInvisible:!0},d),e=b.find(">legend"),g=f.direction=="horizontal"?["ui-corner-left","ui-corner-right"]:["ui-corner-top","ui-corner-bottom"];b.find("input:eq(0)").attr("type");e.length&&(b.wrapInner("<div class='ui-controlgroup-controls'></div>"),
a("<div role='heading' class='ui-controlgroup-label'>"+e.html()+"</div>").insertBefore(b.children(0)),e.remove());b.addClass("ui-corner-all ui-controlgroup ui-controlgroup-"+f.direction);c(b.find(".ui-btn"+(f.excludeInvisible?":visible":"")));c(b.find(".ui-btn-inner"));f.shadow&&b.addClass("ui-shadow")})};a(document).bind("pagecreate create",function(d){a(":jqmData(role='controlgroup')",d.target).controlgroup({excludeInvisible:!1})})})(jQuery);(function(a){a(document).bind("pagecreate create",function(d){a(d.target).find("a").not(".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")})})(jQuery);
(function(a,d){a.fn.fixHeaderFooter=function(){if(!a.support.scrollTop)return this;return this.each(function(){var c=a(this);c.jqmData("fullscreen")&&c.addClass("ui-page-fullscreen");c.find(".ui-header:jqmData(position='fixed')").addClass("ui-header-fixed ui-fixed-inline fade");c.find(".ui-footer:jqmData(position='fixed')").addClass("ui-footer-fixed ui-fixed-inline fade")})};a.mobile.fixedToolbars=function(){function c(){!i&&h==="overlay"&&(g||a.mobile.fixedToolbars.hide(!0),a.mobile.fixedToolbars.startShowTimer())}
function b(a){var b=0,c,d;if(a){d=document.body;c=a.offsetParent;for(b=a.offsetTop;a&&a!=d;){b+=a.scrollTop||0;if(a==c)b+=c.offsetTop,c=a.offsetParent;a=a.parentNode}}return b}function f(c){var d=a(window).scrollTop(),e=b(c[0]),f=c.css("top")=="auto"?0:parseFloat(c.css("top")),g=window.innerHeight,h=c.outerHeight(),i=c.parents(".ui-page:not(.ui-page-fullscreen)").length;return c.is(".ui-header-fixed")?(f=d-e+f,f<e&&(f=0),c.css("top",i?f:d)):c.css("top",i?d+g-h-(e-f):d+g-h)}if(a.support.scrollTop){var e,
g,h="inline",i=!1,k=null,l=!1,m=!0;a(function(){var b=a(document),d=a(window);b.bind("vmousedown",function(){m&&(k=h)}).bind("vclick",function(b){m&&!a(b.target).closest("a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed").length&&!l&&(a.mobile.fixedToolbars.toggle(k),k=null)}).bind("silentscroll",c);(b.scrollTop()===0?d:b).bind("scrollstart",function(){l=!0;k===null&&(k=h);var b=k=="overlay";if(i=b||!!g)a.mobile.fixedToolbars.clearShowTimer(),b&&a.mobile.fixedToolbars.hide(!0)}).bind("scrollstop",
function(b){a(b.target).closest("a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed").length||(l=!1,i&&(a.mobile.fixedToolbars.startShowTimer(),i=!1),k=null)});d.bind("resize",c)});a(".ui-page").live("pagebeforeshow",function(b,c){var d=a(b.target).find(":jqmData(role='footer')"),g=d.data("id"),h=c.prevPage,h=h&&h.find(":jqmData(role='footer')"),h=h.length&&h.jqmData("id")===g;g&&h&&(e=d,f(e.removeClass("fade in out").appendTo(a.mobile.pageContainer)))}).live("pageshow",function(){var b=
a(this);e&&e.length&&setTimeout(function(){f(e.appendTo(b).addClass("fade"));e=null},500);a.mobile.fixedToolbars.show(!0,this)});a(".ui-collapsible-contain").live("collapse expand",c);return{show:function(c,d){a.mobile.fixedToolbars.clearShowTimer();h="overlay";return(d?a(d):a.mobile.activePage?a.mobile.activePage:a(".ui-page-active")).children(".ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last").each(function(){var d=a(this),e=a(window).scrollTop(),g=b(d[0]),h=window.innerHeight,
i=d.outerHeight(),e=d.is(".ui-header-fixed")&&e<=g+i||d.is(".ui-footer-fixed")&&g<=e+h;d.addClass("ui-fixed-overlay").removeClass("ui-fixed-inline");!e&&!c&&d.animationComplete(function(){d.removeClass("in")}).addClass("in");f(d)})},hide:function(b){h="inline";return(a.mobile.activePage?a.mobile.activePage:a(".ui-page-active")).children(".ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last").each(function(){var c=a(this),d=c.css("top"),d=d=="auto"?0:parseFloat(d);c.addClass("ui-fixed-inline").removeClass("ui-fixed-overlay");
if(d<0||c.is(".ui-header-fixed")&&d!==0)b?c.css("top",0):c.css("top")!=="auto"&&parseFloat(c.css("top"))!==0&&c.animationComplete(function(){c.removeClass("out reverse").css("top",0)}).addClass("out reverse")})},startShowTimer:function(){a.mobile.fixedToolbars.clearShowTimer();var b=[].slice.call(arguments);g=setTimeout(function(){g=d;a.mobile.fixedToolbars.show.apply(null,b)},100)},clearShowTimer:function(){g&&clearTimeout(g);g=d},toggle:function(b){b&&(h=b);return h==="overlay"?a.mobile.fixedToolbars.hide():
a.mobile.fixedToolbars.show()},setTouchToggleEnabled:function(a){m=a}}}}();a.fixedToolbars=a.mobile.fixedToolbars;a(document).bind("pagecreate create",function(c){a(":jqmData(position='fixed')",c.target).length&&a(c.target).each(function(){if(!a.support.scrollTop)return this;var b=a(this);b.jqmData("fullscreen")&&b.addClass("ui-page-fullscreen");b.find(".ui-header:jqmData(position='fixed')").addClass("ui-header-fixed ui-fixed-inline fade");b.find(".ui-footer:jqmData(position='fixed')").addClass("ui-footer-fixed ui-fixed-inline fade")})})})(jQuery);
(function(a){function d(){var d=c.width(),g=[],h=[],i;b.removeClass("min-width-"+f.join("px min-width-")+"px max-width-"+f.join("px max-width-")+"px");a.each(f,function(a,b){d>=b&&g.push("min-width-"+b+"px");d<=b&&h.push("max-width-"+b+"px")});g.length&&(i=g.join(" "));h.length&&(i+=" "+h.join(" "));b.addClass(i)}var c=a(window),b=a("html"),f=[320,480,768,1024];a.mobile.addResolutionBreakpoints=function(b){a.type(b)==="array"?f=f.concat(b):f.push(b);f.sort(function(a,b){return a-b});d()};a(document).bind("mobileinit.htmlclass",
function(){c.bind("orientationchange.htmlclass throttledResize.htmlclass",function(a){a.orientation&&b.removeClass("portrait landscape").addClass(a.orientation);d()})});a(function(){c.trigger("orientationchange.htmlclass")})})(jQuery);
(function(a,d){var c=a("html");a("head");var b=a(d);a(d.document).trigger("mobileinit");if(a.mobile.gradeA()){if(a.mobile.ajaxBlacklist)a.mobile.ajaxEnabled=!1;c.addClass("ui-mobile ui-mobile-rendering");var f=a("<div class='ui-loader ui-body-a ui-corner-all'><span class='ui-icon ui-icon-loading spin'></span><h1></h1></div>");a.extend(a.mobile,{showPageLoadingMsg:function(){if(a.mobile.loadingMessage){var b=a("."+a.mobile.activeBtnClass).first();f.find("h1").text(a.mobile.loadingMessage).end().appendTo(a.mobile.pageContainer).css({top:a.support.scrollTop&&
a(d).scrollTop()+a(d).height()/2||b.length&&b.offset().top||100})}c.addClass("ui-loading")},hidePageLoadingMsg:function(){c.removeClass("ui-loading")},pageLoading:function(b){b?a.mobile.hidePageLoadingMsg():a.mobile.showPageLoadingMsg()},initializePage:function(){var c=a(":jqmData(role='page')");c.length||(c=a("body").wrapInner("<div data-"+a.mobile.ns+"role='page'></div>").children(0));c.add(":jqmData(role='dialog')").each(function(){var b=a(this);b.jqmData("url")||b.attr("data-"+a.mobile.ns+"url",
b.attr("id"))});a.mobile.firstPage=c.first();a.mobile.pageContainer=c.first().parent().addClass("ui-mobile-viewport");a.mobile.showPageLoadingMsg();!a.mobile.hashListeningEnabled||!a.mobile.path.stripHash(location.hash)?a.mobile.changePage(a.mobile.firstPage,{transition:"none",reverse:!0,changeHash:!1,fromHashChange:!0}):b.trigger("hashchange",[!0])}});a.mobile._registerInternalEvents();a(function(){d.scrollTo(0,1);a.mobile.defaultHomeScroll=!a.support.scrollTop||a(d).scrollTop()===1?0:1;a.mobile.autoInitializePage&&
a(a.mobile.initializePage);b.load(a.mobile.silentScroll)})}})(jQuery,this);
