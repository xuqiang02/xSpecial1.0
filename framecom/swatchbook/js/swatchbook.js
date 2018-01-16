;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.substr(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.5.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;","<style>",a,"</style>"].join(""),k.id=h,(l?k:m).innerHTML+=f,m.appendChild(k),l||(m.style.background="",g.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e});var G=function(a,c){var d=a.join(""),f=c.length;w(d,function(a,c){var d=b.styleSheets[b.styleSheets.length-1],g=d?d.cssRules&&d.cssRules[0]?d.cssRules[0].cssText:d.cssText||"":"",h=a.childNodes,i={};while(f--)i[h[f].id]=h[f];e.csstransforms3d=(i.csstransforms3d&&i.csstransforms3d.offsetLeft)===9&&i.csstransforms3d.offsetHeight===3},f,c)}([,["@media (",m.join("transform-3d),("),h,")","{#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join("")],[,"csstransforms3d"]);q.cssanimations=function(){return F("animationName")},q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&(a=e.csstransforms3d),a},q.csstransitions=function(){return F("transition")};for(var H in q)y(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return z(""),i=k=null,function(a,b){function g(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function h(){var a=k.elements;return typeof a=="string"?a.split(" "):a}function i(a){var b={},c=a.createElement,e=a.createDocumentFragment,f=e();a.createElement=function(a){var e=(b[a]||(b[a]=c(a))).cloneNode();return k.shivMethods&&e.canHaveChildren&&!d.test(a)?f.appendChild(e):e},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+h().join().replace(/\w+/g,function(a){return b[a]=c(a),f.createElement(a),'c("'+a+'")'})+");return n}")(k,f)}function j(a){var b;return a.documentShived?a:(k.shivCSS&&!e&&(b=!!g(a,"article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")),f||(b=!i(a)),b&&(a.documentShived=b),a)}var c=a.html5||{},d=/^<|^(?:button|form|map|select|textarea)$/i,e,f;(function(){var a=b.createElement("a");a.innerHTML="<xyz></xyz>",e="hidden"in a,f=a.childNodes.length==1||function(){try{b.createElement("a")}catch(a){return!0}var c=b.createDocumentFragment();return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"}()})();var k={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:j};a.html5=k,j(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document);

;( function( $, window, undefined ) {
	
	'use strict';

	// global
	var Modernizr = window.Modernizr;

	jQuery.fn.reverse = [].reverse;
	
	$.SwatchBook = function( options, element ) {
		
		this.$el = $( element );
		this._init( options );
		
	};

	$.SwatchBook.defaults = {
		// index of initial centered item
		center : 6,
		// number of degrees that is between each item
		angleInc : 8,
		speed : 700,
		easing : 'ease',
		// amount in degrees for the opened item's next sibling
		proximity : 45,
		// amount in degrees between the opened item's next siblings
		neighbor : 4,
		// animate on load
		onLoadAnim : true,
		// if it should be closed by default
		initclosed : false,
		// index of the element that when clicked, triggers the open/close function
		// by default there is no such element
		closeIdx : -1,
		// open one specific item initially (overrides initclosed)
		openAt : -1
	};

	$.SwatchBook.prototype	= {

		_init : function( options ) {
			
			this.options = $.extend( true, {}, $.SwatchBook.defaults, options );

			this.$items = this.$el.children( 'div' );
			this.itemsCount = this.$items.length;
			this.current = -1;
			this.support = Modernizr.csstransitions;
			this.cache = [];
			
			if( this.options.onLoadAnim ) {
				this._setTransition();
			}

			if( !this.options.initclosed ) {
				this._center( this.options.center, this.options.onLoadAnim );
			}
			else {

				this.isClosed = true;
				if( !this.options.onLoadAnim ) {
					this._setTransition();
				}

			}

			if( this.options.openAt >= 0 && this.options.openAt < this.itemsCount ) {
				this._openItem( this.$items.eq( this.options.openAt ) );
			}
			
			this._initEvents();
			
		},
		_setTransition : function() {

			if( this.support ) {
				this.$items.css( { 'transition': 'all ' + this.options.speed + 'ms ' + this.options.easing } );
			}

		},
		_openclose : function() {

			this.isClosed ? this._center( this.options.center, true ) : this.$items.css( { 'transform' : 'rotate(0deg)' } );
			this.isClosed = !this.isClosed;

		},
		_center : function( idx, anim ) {

			var self = this;

			this.$items.each( function( i ) {

				var transformStr = 'rotate(' + ( self.options.angleInc * ( i - idx ) ) + 'deg)';
				$( this ).css( { 'transform' : transformStr } );

			} );

		},
		_openItem : function( $item ) {
			
			var itmIdx = $item.index();
			
			if( itmIdx !== this.current ) {

				if( this.options.closeIdx !== -1 && itmIdx === this.options.closeIdx ) {

					this._openclose();
					this._setCurrent();

				}
				else {

					this._setCurrent( $item );
					$item.css( { 'transform' : 'rotate(0deg)' } );
					this._rotateSiblings( $item );

				}

			}

		},
		_initEvents : function() {

			var self = this;
			
			this.$items.on( 'click.swatchbook', function( event ) {
				self._openItem( $( this ) );
			} );

		},
		_rotateSiblings : function( $item ) {

			var self = this,
				idx = $item.index(),
				$cached = this.cache[ idx ],
				$siblings;

			if( $cached ) {
				$siblings = $cached;
			}
			else {

				$siblings = $item.siblings();
				this.cache[ idx ] = $siblings;
				
			}

			$siblings.each( function( i ) {

				var rotateVal = i < idx ? 
					self.options.angleInc * ( i - idx ) : 
					i - idx === 1 ?
						self.options.proximity : 
						self.options.proximity + ( i - idx - 1 ) * self.options.neighbor;

				var transformStr = 'rotate(' + rotateVal + 'deg)';

				$( this ).css( { 'transform' : transformStr } );

			} );

		},
		_setCurrent : function( $el ) {

			this.current = $el ? $el.index() : -1;
			this.$items.removeClass( 'ff-active' );
			if( $el ) {
				$el.addClass( 'ff-active' );
			}

		}

	};
	
	var logError			= function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.swatchbook			= function( options ) {
		
		var instance = $.data( this, 'swatchbook' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !instance ) {

					logError( "cannot call methods on swatchbook prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for swatchbook instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				if ( instance ) {

					instance._init();
				
				}
				else {

					instance = $.data( this, 'swatchbook', new $.SwatchBook( options, this ) );
				
				}

			});
		
		}
		
		return instance;
		
	};
	
} )( jQuery, window );