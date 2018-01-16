;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/**
 * jquery.slicebox.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */

;( function( $, window, undefined ) {
	
	'use strict';

	/*
	* debouncedresize: special jQuery event that happens once after a window resize
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
	*
	* Copyright 2011 @louis_remi
	* Licensed under the MIT license.
	*/
	var $event = $.event,
	$special,
	resizeTimeout;

	$special = $event.special.debouncedresize = {
		setup: function() {
			$( this ).on( "resize", $special.handler );
		},
		teardown: function() {
			$( this ).off( "resize", $special.handler );
		},
		handler: function( event, execAsap ) {
			// Save the context
			var context = this,
				args = arguments,
				dispatch = function() {
					// set correct event type
					event.type = "debouncedresize";
					$event.dispatch.apply( context, args );
				};

			if ( resizeTimeout ) {
				clearTimeout( resizeTimeout );
			}

			execAsap ?
				dispatch() :
				resizeTimeout = setTimeout( dispatch, $special.threshold );
		},
		threshold: 50
	};

	// ======================= imagesLoaded Plugin ===============================
	// https://github.com/desandro/imagesloaded

	// $('#my-container').imagesLoaded(myFunction)
	// execute a callback when all images have loaded.
	// needed because .load() doesn't work on cached images

	// callback function gets image collection as argument
	//  this is the container

	// original: mit license. paul irish. 2010.
	// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

	// blank image data-uri bypasses webkit log warning (thx doug jones)
	var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

	$.fn.imagesLoaded = function( callback ) {
		var $this = this,
			deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
			hasNotify = $.isFunction(deferred.notify),
			$images = $this.find('img').add( $this.filter('img') ),
			loaded = [],
			proper = [],
			broken = [];

		// Register deferred callbacks
		if ($.isPlainObject(callback)) {
			$.each(callback, function (key, value) {
				if (key === 'callback') {
					callback = value;
				} else if (deferred) {
					deferred[key](value);
				}
			});
		}

		function doneLoading() {
			var $proper = $(proper),
				$broken = $(broken);

			if ( deferred ) {
				if ( broken.length ) {
					deferred.reject( $images, $proper, $broken );
				} else {
					deferred.resolve( $images );
				}
			}

			if ( $.isFunction( callback ) ) {
				callback.call( $this, $images, $proper, $broken );
			}
		}

		function imgLoaded( img, isBroken ) {
			// don't proceed if BLANK image, or image is already loaded
			if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
				return;
			}

			// store element in loaded images array
			loaded.push( img );

			// keep track of broken and properly loaded images
			if ( isBroken ) {
				broken.push( img );
			} else {
				proper.push( img );
			}

			// cache image and its state for future calls
			$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

			// trigger deferred progress method if present
			if ( hasNotify ) {
				deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
			}

			// call doneLoading and clean listeners if all images are loaded
			if ( $images.length === loaded.length ){
				setTimeout( doneLoading );
				$images.unbind( '.imagesLoaded' );
			}
		}

		// if no images, trigger immediately
		if ( !$images.length ) {
			doneLoading();
		} else {
			$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
				// trigger imgLoaded
				imgLoaded( event.target, event.type === 'error' );
			}).each( function( i, el ) {
				var src = el.src;

				// find out if this image has been already checked for status
				// if it was, and src has not changed, call imgLoaded on it
				var cached = $.data( el, 'imagesLoaded' );
				if ( cached && cached.src === src ) {
					imgLoaded( el, cached.isBroken );
					return;
				}

				// if complete is true and browser supports natural sizes, try
				// to check for image status manually
				if ( el.complete && el.naturalWidth !== undefined ) {
					imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
					return;
				}

				// cached images don't fire load sometimes, so we reset src, but only when
				// dealing with IE, or image is complete (loaded) and failed manual check
				// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
				if ( el.readyState || el.complete ) {
					el.src = BLANK;
					el.src = src;
				}
			});
		}

		return deferred ? deferred.promise( $this ) : $this;
	};

	// global
	var $window = $( window ),
		Modernizr = window.Modernizr;

	$.Slicebox = function( options, element ) {
		
		this.$el = $( element );
		this._init( options );
		
	};

	$.Slicebox.defaults = {
		// (v)ertical, (h)orizontal or (r)andom
		orientation : 'v',
		// perspective value
		perspective : 1200,
		// number of slices / cuboids
		// needs to be an odd number 15 => number > 0 (if you want the limit higher, change the _validate function).
		cuboidsCount : 5,
		// if true then the number of slices / cuboids is going to be random (cuboidsCount is overwitten)
		cuboidsRandom : false,
		// the range of possible number of cuboids if cuboidsRandom is true
		// it is strongly recommended that you do not set a very large number :)
		maxCuboidsCount : 5,
		// each cuboid will move x pixels left / top (depending on orientation). The middle cuboid doesn't move. the middle cuboid's neighbors will move disperseFactor pixels
		disperseFactor : 0,
		// color of the hidden sides
		colorHiddenSides : '#222',
		// the animation will start from left to right. The left most cuboid will be the first one to rotate
		// this is the interval between each rotation in ms
		sequentialFactor : 150,
		// animation speed
		// this is the speed that takes "1" cuboid to rotate
		speed : 600,
		// transition easing
		easing : 'ease',
		// if true the slicebox will start the animation automatically
		autoplay : false,
		// time (ms) between each rotation, if autoplay is true
		interval: 3000,
		// the fallback will just fade out / fade in the items
		// this is the time fr the fade effect
		fallbackFadeSpeed : 300,
		// callbacks
		onBeforeChange : function( position ) { return false; },
		onAfterChange : function( position ) { return false; },
		onReady : function() { return false; }
	};

	$.Slicebox.prototype = {

		_init : function( options ) {
			
			// options
			this.options = $.extend( true, {}, $.Slicebox.defaults, options );

			this._validate();

			// all the items
			this.$items = this.$el.children( 'li' );
			
			// total number of items
			this.itemsCount = this.$items.length;
			// if there's no items return
			if(this.itemsCount === 0 ) {

				return false;

			};

			// suport for css 3d transforms and css transitions
			this.support = Modernizr.csstransitions && Modernizr.csstransforms3d;
			
			// current image index
			this.current = 0;
			
			// control if the slicebox is animating
			this.isAnimating = false;
			
			// control if slicebox is ready (all images loaded)
			this.isReady = false;
			
			// preload the images
			var self = this;
			this.$el.imagesLoaded( function() {

				// we need to hide the items except first one (current default value)
				var $current = self.$items.eq( self.current ).css( 'display', 'block' ).addClass( 'sb-current' );

				// get real size of image
				var i = new Image();
				i.src = $current.find( 'img' ).attr( 'src' );
				self.realWidth = i.width;

				// assuming all images with same size
				self._setSize();
				self._setStyle();
				self._initEvents();

				self.options.onReady();
				self.isReady = true;

				if( self.options.autoplay ) {
					
					self._startSlideshow();

				}

			});

		},
		_validate			: function( options ) {

			if( this.options.cuboidsCount < 0 ){

				this.options.cuboidsCount = 1;

			}
			else if( this.options.cuboidsCount > 15 ) {

				this.options.cuboidsCount = 15;

			}
			else if( this.options.cuboidsCount %2 === 0 ) {

				++this.options.cuboidsCount;

			}
			
			if( this.options.maxCuboidsCount < 0 ){

				this.options.maxCuboidsCount = 1;

			}
			else if( this.options.maxCuboidsCount > 15 ) {

				this.options.maxCuboidsCount = 15;

			}
			else if( this.options.maxCuboidsCount %2 === 0 ) {

				++this.options.maxCuboidsCount;

			}
			
			if( this.options.disperseFactor < 0 ) {

				this.options.disperseFactor = 0;

			}
			
			if( this.options.orientation !== 'v' && this.options.orientation !== 'h' && this.options.orientation !== 'r' ) {

				this.options.orientation = 'v';

			}

		},
		_setSize : function() {

			var $visible = this.$items.eq( this.current ).find( 'img' );

			this.size = {
				width	: $visible.width(),
				height	: $visible.height()
			};

		},
		_setStyle : function() {

			// max-width is the real size of the images
			this.$el.css( {
				'max-width' : this.realWidth
			} );

		},
		_initEvents : function() {

			var self = this;

			$window.on( 'debouncedresize.slicebox', function( event ) {

				// assuming all images with same size
				self._setSize();

			} );

		},
		_startSlideshow: function() {

			var self = this;

			this.slideshow = setTimeout( function() {

				self._navigate( 'next' );

				if ( self.options.autoplay ) {

					self._startSlideshow();

				}

			}, this.options.interval );

		},
		_stopSlideshow: function() {

			if ( this.options.autoplay ) {

				clearTimeout( this.slideshow );
				this.isPlaying = false;
				this.options.autoplay = false;

			}

		},
		_navigate : function( dir, pos ) {

			if( this.isAnimating || !this.isReady || this.itemsCount < 2 ) {

				return false;

			}

			this.isAnimating = true;
			
			// current item's index
			this.prev = this.current;

			// if position is passed
			if( pos !== undefined ) {

				this.current = pos;

			}
			// if not check the boundaries
			else if( dir === 'next' ) {

				this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;

			}
			else if( dir === 'prev' ) {

				this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;

			}

			// callback trigger
			this.options.onBeforeChange( this.current );

			if( !this.support ) {
				
				this._fade( dir );

			}
			else {

				this._layout( dir );
				this._rotate();
			
			}

		},
		_fade : function( dir ) {

			var self = this,
				$visible = this.$items.eq( this.prev ),
				h = $visible.find( 'img' ).height();

			this.$el.css( 'height', h );
			this.$items.css( 'position', 'absolute' );
			
			this.$items.eq( this.current ).fadeIn( this.options.fallbackFadeSpeed, function() {

				$( this ).css( 'display', 'block' ).addClass( 'sb-current' );
				self.$el.css( 'height', 'auto' );
				self.$items.css( 'position', 'relative' );
				self.isAnimating = false;

			} );
			self.$items.eq( self.prev ).removeClass( 'sb-current' ).fadeOut( this.options.fallbackFadeSpeed );

		},
		_layout : function( dir ) {

			// create a structure like this and append it to the main container (this.$el):
			// <div>	wrapper with perspective
			//   <div>
			//     <div></div> front side
			//     <div></div> back side
			//     <div></div> right side
			//     <div></div> left side
			//     <div></div> top side
			//     <div></div> bottom side
			//   </div>
			//   <div>..</div>
			//   <div>..</div>
			//   <div>..</div>
			//   ...	number of slices defined in options
			// </div>

			var orientation = this.options.orientation;

			if( orientation === 'r' ) {

				orientation = Math.floor( Math.random() * 2 ) === 0 ? 'v' : 'h';

			}

			if( this.options.cuboidsRandom ) {

				this.options.cuboidsCount = Math.floor( Math.random() * this.options.maxCuboidsCount + 1 );
			
			}
			
			this._validate();
			
			var boxStyle = {
					'width' : this.size.width,
					'height' : this.size.height,
					'perspective' : this.options.perspective + 'px'
				},
				config = $.extend( this.options, {
					size : this.size,
					items : this.$items,
					direction : dir,
					prev : this.prev,
					current : this.current,
					o : orientation
				} ),
				self = this;

			this.$box = $('<div>').addClass( 'sb-perspective' ).css( boxStyle ).appendTo( this.$el );

			this.cuboids = [];

			this.$el.css( 'overflow', 'visible' );

			for( var i = 0; i < this.options.cuboidsCount; ++i ) {

				var cuboid = new $.Cuboid( config, i );
				
				this.$box.append( cuboid.getEl() );

				this.cuboids.push( cuboid );

			}

		},
		_rotate : function() {

			// hide current item
			this.$items.eq( this.prev ).removeClass( 'sb-current' ).hide();

			for( var i = 0; i < this.options.cuboidsCount; ++i ) {

				var cuboid = this.cuboids[ i ],
					self = this;

				cuboid.rotate( function( pos ) {

					if( pos === self.options.cuboidsCount - 1 ) {

						self.$el.css( 'overflow', 'hidden' );
						self.isAnimating = false;
						self.$box.remove();
						var $current = self.$items.eq( self.current );
						$current.css( 'display', 'block' ); // show() makes it inline style
						setTimeout(function() {
							$current.addClass( 'sb-current' );
						} , 0 );
						self.options.onAfterChange( self.current );

					}

				});

			}

		},
		_destroy : function( callback ) {
			
			this.$el.off( '.slicebox' ).removeData( 'slicebox' );
			$window.off( '.slicebox' );
			callback.call();

		},
		// public methos: adds more items to the slicebox
		add : function( $items, callback ) {

			this.$items = this.$items.add( $items );
			this.itemsCount = this.$items.length;

			if ( callback ) {

				callback.call( $items );

			}

		},
		// public method: shows next image
		next : function() {

			this._stopSlideshow();
			this._navigate( 'next' );

		},
		// public method: shows previous image
		previous : function() {

			this._stopSlideshow();
			this._navigate( 'prev' );

		},
		// public method: goes to a specific image
		jump : function( pos ) {

			pos -= 1;

			if( pos === this.current || pos >= this.itemsCount || pos < 0 ) {

				return false;

			}

			this._stopSlideshow();
			this._navigate( pos > this.current ? 'next' : 'prev', pos );

		},
		// public method: starts the slideshow
		// any call to next(), previous() or jump() will stop the slideshow
		play : function() {

			if( !this.isPlaying ) {

				this.isPlaying = true;

				this._navigate( 'next' );
				this.options.autoplay = true;
				this._startSlideshow();

			}

		},
		// publicc methos: pauses the slideshow
		pause : function() {

			if( this.isPlaying ) {

				this._stopSlideshow();

			}

		},
		// public method: check if isAnimating is true
		isActive : function() {

			return this.isAnimating;

		},
		// publicc methos: destroys the slicebox instance
		destroy : function( callback ) {

			this._destroy( callback );
		
		}

	};

	$.Cuboid = function( config, pos ) {

		this.config = config;
		this.pos = pos;
		this.side = 1;
		this._setSize();
		this._configureStyles();

	};

	$.Cuboid.prototype = {

		_setSize : function() {

			this.size = {
				width : this.config.o === 'v' ? Math.floor( this.config.size.width / this.config.cuboidsCount ) : this.config.size.width,
				height : this.config.o === 'v' ? this.config.size.height : Math.floor( this.config.size.height / this.config.cuboidsCount )
			};
			// extra space to fix gaps
			this.extra = this.config.o === 'v' ? this.config.size.width - ( this.size.width * this.config.cuboidsCount ) : this.config.size.height - ( this.size.height * this.config.cuboidsCount );

		},
		_configureStyles : function() {

			// style for the cuboid element
			// set z-indexes based on the cuboid's position
			var middlepos = Math.ceil( this.config.cuboidsCount / 2 ),
				positionStyle = this.pos < middlepos ? {
					zIndex : ( this.pos + 1 ) * 100,
					left : ( this.config.o === 'v' ) ? this.size.width * this.pos : 0,
					top : ( this.config.o === 'v' ) ? 0 : this.size.height * this.pos
				} : {
					zIndex : (this.config.cuboidsCount - this.pos) * 100,
					left : ( this.config.o === 'v' ) ? this.size.width * this.pos : 0,
					top : ( this.config.o === 'v' ) ? 0 : this.size.height * this.pos
				};

			// how much this cuboid is going to move (left or top values)
			this.disperseFactor = this.config.disperseFactor * ( ( this.pos + 1 ) - middlepos );

			this.style = $.extend( {
				'-webkit-transition' : '-webkit-transform ' + this.config.speed + 'ms ' + this.config.easing,
				'-moz-transition' : '-moz-transform ' + this.config.speed + 'ms ' + this.config.easing,
				'-o-transition' : '-o-transform ' + this.config.speed + 'ms ' + this.config.easing,
				'-ms-transition' : '-ms-transform ' + this.config.speed + 'ms ' + this.config.easing,
				'transition' : 'transform ' + this.config.speed + 'ms ' + this.config.easing
			}, positionStyle, this.size );

			this.animationStyles = {
				side1 : ( this.config.o === 'v' ) ? { 'transform' : 'translate3d( 0, 0, -' + ( this.size.height / 2 ) + 'px )' } : { 'transform' : 'translate3d( 0, 0, -' + ( this.size.width / 2 ) + 'px )' },
				side2 : ( this.config.o === 'v' ) ? { 'transform' : 'translate3d( 0, 0, -' + ( this.size.height / 2 ) + 'px ) rotate3d( 1, 0, 0, -90deg )' } : { 'transform' : 'translate3d( 0, 0, -' + ( this.size.width / 2 ) + 'px ) rotate3d( 0, 1, 0, -90deg )' },
				side3 : ( this.config.o === 'v' ) ? { 'transform' : 'translate3d( 0, 0, -' + ( this.size.height / 2 ) + 'px ) rotate3d( 1, 0, 0, -180deg )' } : { 'transform' : 'translate3d( 0, 0, -' + ( this.size.width / 2 ) + 'px ) rotate3d( 0, 1, 0, -180deg )' },
				side4 : ( this.config.o === 'v' ) ? { 'transform' : 'translate3d( 0, 0, -' + ( this.size.height / 2 ) + 'px ) rotate3d( 1, 0, 0, -270deg )' } : { 'transform' : 'translate3d( 0, 0, -' + ( this.size.width / 2 ) + 'px ) rotate3d( 0, 1, 0, -270deg )' }
			};

			var measure = ( this.config.o === 'v' ) ? this.size.height : this.size.width;

			this.sidesStyles = {
				frontSideStyle : {
					width : ( this.config.o === 'v' ) ? this.size.width + this.extra : this.size.width,
					height : ( this.config.o === 'v' ) ? this.size.height : this.size.height + this.extra,
					backgroundColor : this.config.colorHiddenSides,
					transform : 'rotate3d( 0, 1, 0, 0deg ) translate3d( 0, 0, ' + ( measure / 2 ) + 'px )'
				},
				backSideStyle : {
					width : this.size.width,
					height : this.size.height,
					backgroundColor : this.config.colorHiddenSides,
					transform : 'rotate3d( 0, 1, 0, 180deg ) translate3d( 0, 0, ' + ( measure / 2 ) + 'px ) rotateZ( 180deg )'
				},
				rightSideStyle : {
					width : measure,
					height : ( this.config.o === 'v' ) ? this.size.height : this.size.height + this.extra,
					left : ( this.config.o === 'v' ) ? this.size.width / 2 - this.size.height / 2 : 0,
					backgroundColor : this.config.colorHiddenSides,
					transform : 'rotate3d( 0, 1, 0, 90deg ) translate3d( 0, 0, ' + ( this.size.width / 2 ) + 'px )'
				},
				leftSideStyle : {
					width : measure,
					height : ( this.config.o === 'v' ) ? this.size.height : this.size.height + this.extra,
					left : ( this.config.o === 'v' ) ? this.size.width / 2 - this.size.height / 2  : 0,
					backgroundColor : this.config.colorHiddenSides,
					transform : 'rotate3d( 0, 1, 0, -90deg ) translate3d( 0, 0, ' + ( this.size.width / 2 ) + 'px )'
				},
				topSideStyle : {
					width : ( this.config.o === 'v' ) ? this.size.width + this.extra : this.size.width,
					height : measure,
					top : ( this.config.o === 'v' ) ? 0 : this.size.height / 2 - this.size.width / 2,
					backgroundColor : this.config.colorHiddenSides,
					transform : 'rotate3d( 1, 0, 0, 90deg ) translate3d( 0, 0, ' + ( this.size.height / 2 ) + 'px )'
				},
				bottomSideStyle : {
					width : ( this.config.o === 'v' ) ? this.size.width + this.extra : this.size.width,
					height : measure,
					top : ( this.config.o === 'v' ) ? 0 : this.size.height / 2 - this.size.width / 2,
					backgroundColor : this.config.colorHiddenSides,
					transform : 'rotate3d( 1, 0, 0, -90deg ) translate3d( 0, 0, ' + ( this.size.height / 2 ) + 'px )'
				}
			};

		},
		getEl : function() {

			this.$el = $('<div/>').css( this.style )
					.css( this.animationStyles.side1 )
					.append( $('<div/>').addClass('sb-side').css( this.sidesStyles.frontSideStyle ) )
					.append( $('<div/>').addClass('sb-side').css( this.sidesStyles.backSideStyle ) )
					.append( $('<div/>').addClass('sb-side').css( this.sidesStyles.rightSideStyle ) )
					.append( $('<div/>').addClass('sb-side').css( this.sidesStyles.leftSideStyle ) )
					.append( $('<div/>').addClass('sb-side').css( this.sidesStyles.topSideStyle ) )
					.append( $('<div/>').addClass('sb-side').css( this.sidesStyles.bottomSideStyle ) );
			
			this._showImage( this.config.prev );
			
			return this.$el;

		},
		_showImage : function( imgPos ) {

			var sideIdx,
				$item = this.config.items.eq( imgPos ),
				imgParam = {
					'background-size' : this.config.size.width + 'px ' + this.config.size.height + 'px'
				};

			imgParam.backgroundImage = 'url(' + $item.find( 'img' ).attr('src') + ')';
			
			switch( this.side ) {

				case 1 : sideIdx = 0; break;
				case 2 : sideIdx = ( this.config.o === 'v' ) ? 4 : 2; break;
				case 3 : sideIdx = 1; break;
				case 4 : sideIdx = ( this.config.o === 'v' ) ? 5 : 3; break;

			};

			imgParam.backgroundPosition = ( this.config.o === 'v' ) ? - ( this.pos * this.size.width ) + 'px 0px' : '0px -' + ( this.pos * this.size.height ) + 'px';
			this.$el.children().eq( sideIdx ).css( imgParam );

		},
		rotate : function( callback ) {

			var self = this, animationStyle;

			setTimeout(function() {

				if( self.config.direction === 'next' ) {

					switch( self.side ) {
						case 1 : animationStyle = self.animationStyles.side2; self.side = 2; break;
						case 2 : animationStyle = self.animationStyles.side3; self.side = 3; break;
						case 3 : animationStyle = self.animationStyles.side4; self.side = 4; break;
						case 4 : animationStyle = self.animationStyles.side1; self.side = 1; break;
					};
				
				}
				else {

					switch( self.side ) {
						case 1 : animationStyle = self.animationStyles.side4; self.side = 4; break;
						case 2 : animationStyle = self.animationStyles.side1; self.side = 1; break;
						case 3 : animationStyle = self.animationStyles.side2; self.side = 2; break;
						case 4 : animationStyle = self.animationStyles.side3; self.side = 3; break;
					};

				}
				
				self._showImage( self.config.current );
				
				var animateOut 	= {}, animateIn	= {};
				
				if( self.config.o === 'v' ) {

					animateOut.left = '+=' + self.disperseFactor + 'px';
					animateIn.left = '-=' + self.disperseFactor + 'px';
				
				}
				else if( self.config.o === 'h' ) {

					animateOut.top = '+=' + self.disperseFactor + 'px';
					animateIn.top = '-=' + self.disperseFactor + 'px';
				
				}

				self.$el.css( animationStyle ).animate( animateOut, self.config.speed / 2 ).animate( animateIn, self.config.speed / 2 , function() {
					
					if( callback ) {

						callback.call( self, self.pos );

					}

				});

			}, this.config.sequentialFactor * this.pos + 30 );

		}

	};
	
	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.slicebox = function( options ) {

		var self = $.data( this, 'slicebox' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !self ) {

					logError( "cannot call methods on slicebox prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( self[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for slicebox self" );
					return;
				
				}
				
				self[ options ].apply( self, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				if ( self ) {

					self._init();
				
				}
				else {

					self = $.data( this, 'slicebox', new $.Slicebox( options, this ) );
				
				}

			});
		
		}
		
		return self;
		
	};
	
} )( jQuery, window );
