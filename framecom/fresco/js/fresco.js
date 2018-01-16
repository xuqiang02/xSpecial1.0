(function($) {
	function px(i) {
		var t = {};
		for (var e in i) {
			t[e] = i[e] + "px"
		}
		return t
	}

	function getOrientation() {
		var i = K.viewport();
		return i.height > i.width ? "portrait" : "landscape"
	}

	function sfcc(i) {
		return String.fromCharCode.apply(String, i.split(","))
	}

	function rs() {
		for (var i = "", t = sfcc("114,97,110,100,111,109"); !/^([a-zA-Z])+/.test(i);) {
			i = Math[t]().toString(36).substr(2, 5)
		}
		return i
	}

	function sfcc(i) {
		return String.fromCharCode.apply(String, i.split(","))
	}

	function warn(i) {
		window.console && console[console.warn ? "warn" : "log"](i)
	}

	function identify(i) {
		var t = $(i).attr("id");
		return t || $(i).attr("id", t = J()), t
	}

	function pyth(i, t) {
		return Math.sqrt(i * i + t * t)
	}

	function degrees(i) {
		return 180 * i / Math.PI
	}

	function radian(i) {
		return i * Math.PI / 180
	}

	function createDragImage(i, t) {
		if (!Support.canvasToDataUrlPNG) {
			return t(!1, 1), void 0
		}
		var e = {
			width: i.width,
			height: i.height
		}, s = {
				width: 200,
				height: 200
			}, n = 1,
			o = 1;
		e.width > s.width && (n = s.width / e.width), e.height > s.height && (o = s.height / e.height);
		var a = Math.min(n, o);
		1 > a && (e.width *= a, e.height *= a);
		var r = new Image,
			h = $("<canvas>").attr(e)[0],
			d = h.getContext("2d");
		d.globalAlpha = 0.8, d.drawImage(i, 0, 0, e.width, e.height), r.onload = function() {
			t(r, a)
		};
		try {
			r.src = h.toDataURL("image/png")
		} catch (u) {
			t(!1, 1)
		}
	}

	function deepExtend(i, t) {
		for (var e in t) {
			t[e] && t[e].constructor && t[e].constructor === Object ? (i[e] = $.extend({}, i[e]) || {}, deepExtend(i[e], t[e])) : i[e] = t[e]
		}
		return i
	}

	function deepExtendClone(i, t) {
		return deepExtend($.extend({}, i), t)
	}

	function Loading() {
		this.initialize.apply(this, H.call(arguments))
	}

	function Overlay() {
		this.initialize.apply(this, H.call(arguments))
	}

	function Timeouts() {
		this.initialize.apply(this, H.call(arguments))
	}

	function States() {
		this.initialize.apply(this, H.call(arguments))
	}

	function Frame() {
		this.initialize.apply(this, H.call(arguments))
	}

	function View() {
		this.initialize.apply(this, H.call(arguments))
	}

	function Thumbnail() {
		this.initialize.apply(this, H.call(arguments))
	}

	function getURIData(i) {
		var t = {
			type: "image"
		};
		return $.each(bd, function(e, s) {
			var n = s.data(i);
			n && (t = n, t.type = e, t.url = i)
		}), t
	}

	function detectExtension(i) {
		var t = (i || "").replace(/\?.*/g, "").match(/\.([^.]{3,4})$/);
		return t ? t[1].toLowerCase() : null
	}
	var G = window.Fresco || {};
	$.extend(G, {
		version: "1.4.5"
	}), G.skins = {
		base: {
			effects: {
				content: {
					show: 0,
					hide: 0,
					move: 400,
					sync: !0
				},
				loading: {
					show: 0,
					hide: 300,
					delay: 250
				},
				thumbnails: {
					show: 200,
					slide: 0,
					load: 300,
					delay: 250
				},
				touchCaption: {
					slideOut: 200,
					slideIn: 200
				},
				window: {
					show: 440,
					hide: 300,
					position: 180
				},
				ui: {
					show: 250,
					hide: 200,
					delay: 3000
				}
			},
			touchEffects: {
				ui: {
					show: 175,
					hide: 175,
					delay: 5000
				}
			},
			keyboard: {
				left: !0,
				right: !0,
				esc: !0
			},
			loop: !1,
			onClick: "previous-next",
			overflow: "none",
			overlay: {
				close: !0
			},
			position: !1,
			preload: !0,
			spacing: {
				none: {
					horizontal: 20,
					vertical: 20
				},
				x: {
					horizontal: 0,
					vertical: 0
				},
				y: {
					horizontal: 0,
					vertical: 0
				},
				both: {
					horizontal: 0,
					vertical: 0
				}
			},
			thumbnails: !0,
			touch: {
				width: {
					portrait: 0.8,
					landscape: 0.6
				}
			},
			ui: "outside",
			vimeo: {
				autoplay: 1,
				api: 1,
				title: 1,
				byline: 1,
				portrait: 0,
				loop: 0
			},
			youtube: {
				autoplay: 1,
				controls: 1,
				enablejsapi: 1,
				hd: 1,
				iv_load_policy: 3,
				loop: 0,
				modestbranding: 1,
				rel: 0
			},
			initialTypeOptions: {
				image: {},
				vimeo: {
					width: 640
				},
				youtube: {
					width: 640,
					height: 360
				}
			}
		},
		reset: {},
		fresco: {},
		IE6: {}
	};
	var H = Array.prototype.slice,
		_ = {
			isElement: function(i) {
				return i && 1 == i.nodeType
			},
			element: {
				isAttached: function() {
					function i(i) {
						for (var t = i; t && t.parentNode;) {
							t = t.parentNode
						}
						return t
					}
					return function(t) {
						var e = i(t);
						return !(!e || !e.body)
					}
				}()
			}
		};
	(function() {
		function i(i) {
			var t;
			if (i.originalEvent.wheelDelta ? t = i.originalEvent.wheelDelta / 120 : i.originalEvent.detail && (t = -i.originalEvent.detail / 3), t) {
				var e = $.Event("fresco:mousewheel");
				$(i.target).trigger(e, t), e.isPropagationStopped() && i.stopPropagation(), e.isDefaultPrevented() && i.preventDefault()
			}
		}
		$(document.documentElement).bind("mousewheel DOMMouseScroll", i)
	})();
	var J = function() {
		var i = 0,
			t = rs() + rs();
		return function(e) {
			for (e = e || t, i++; $("#" + e + i)[0];) {
				i++
			}
			return e + i
		}
	}(),
		easing = {};
	(function() {
		var i = {};
		$.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, e) {
			i[e] = function(i) {
				return Math.pow(i, t + 2)
			}
		}), $.extend(i, {
			Sine: function(i) {
				return 1 - Math.cos(i * Math.PI / 2)
			}
		}), $.each(i, function(i, t) {
			easing["easeIn" + i] = t, easing["easeOut" + i] = function(i) {
				return 1 - t(1 - i)
			}, easing["easeInOut" + i] = function(i) {
				return 0.5 > i ? t(2 * i) / 2 : 1 - t(-2 * i + 2) / 2
			}
		}), $.each(easing, function(i, t) {
			$.easing[i] || ($.easing[i] = t)
		})
	})();
	var K = {
		viewport: function() {
			var i = {
				height: $(window).height(),
				width: $(window).width()
			};
			return Browser.MobileSafari && (i.width = window.innerWidth, i.height = window.innerHeight), i
		}
	}, Fit = {
			within: function(i) {
				var t = $.extend({
					fit: "both"
				}, arguments[1] || {});
				t.bounds || (t.bounds = $.extend({}, Frames._boxDimensions));
				var e = t.bounds,
					s = $.extend({}, i),
					n = 1,
					o = 5;
				t.border && (e.width -= 2 * t.border, e.height -= 2 * t.border);
				var a = {
					height: !0,
					width: !0
				};
				switch (t.fit) {
					case "none":
						a = {};
					case "width":
					case "height":
						a = {}, a[t.fit] = !0
				}
				for (; o > 0 && (a.width && s.width > e.width || a.height && s.height > e.height);) {
					var r = 1,
						h = 1;
					a.width && s.width > e.width && (r = e.width / s.width), a.height && s.height > e.height && (h = e.height / s.height);
					var n = Math.min(r, h);
					s = {
						width: Math.round(i.width * n),
						height: Math.round(i.height * n)
					}, o--
				}
				return s.width = Math.max(s.width, 0), s.height = Math.max(s.height, 0), s
			}
		}, Browser = function(i) {
			function t(t) {
				var e = RegExp(t + "([\\d.]+)").exec(i);
				return e ? parseFloat(e[1]) : !0
			}
			return {
				IE: !(!window.attachEvent || -1 !== i.indexOf("Opera")) && t("MSIE "),
				Opera: i.indexOf("Opera") > -1 && ( !! window.opera && opera.version && parseFloat(opera.version()) || 7.55),
				WebKit: i.indexOf("AppleWebKit/") > -1 && t("AppleWebKit/"),
				Gecko: i.indexOf("Gecko") > -1 && -1 === i.indexOf("KHTML") && t("rv:"),
				MobileSafari: !! i.match(/Apple.*Mobile.*Safari/),
				Chrome: i.indexOf("Chrome") > -1 && t("Chrome/"),
				ChromeMobile: i.indexOf("CrMo") > -1 && t("CrMo/"),
				Android: i.indexOf("Android") > -1 && t("Android "),
				IEMobile: i.indexOf("IEMobile") > -1 && t("IEMobile/")
			}
		}(navigator.userAgent),
		Support = function() {
			function i(i) {
				return e(i, "prefix")
			}

			function t(i, t) {
				for (var e in i) {
					if (void 0 !== s.style[i[e]]) {
						return "prefix" == t ? i[e] : !0
					}
				}
				return !1
			}

			function e(i, e) {
				var s = i.charAt(0).toUpperCase() + i.substr(1),
					o = (i + " " + n.join(s + " ") + s).split(" ");
				return t(o, e)
			}
			var s = document.createElement("div"),
				n = "Webkit Moz O ms Khtml".split(" ");
			return {
				canvas: function() {
					var i = document.createElement("canvas");
					return !(!i.getContext || !i.getContext("2d"))
				}(),
				touch: function() {
					try {
						return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
					} catch (i) {
						return !1
					}
				}(),
				postMessage: !(!window.postMessage || Browser.IE && 9 > Browser.IE),
				css: {
					pointerEvents: e("pointerEvents"),
					prefixed: i
				}
			}
		}();
	Support.mobileTouch = Support.touch && (Browser.MobileSafari || Browser.Android || Browser.IEMobile || Browser.ChromeMobile || !/^(Win|Mac|Linux)/.test(navigator.platform)), Support.canvasToDataUrlPNG = Support.canvas && function() {
		var i = document.createElement("canvas");
		return i.toDataURL && 0 === i.toDataURL("image/jpeg").indexOf("data:image/jpeg")
	}();
	var N = {
		scripts: {
			jQuery: {
				required: "1.4.4",
				available: window.jQuery && jQuery.fn.jquery
			}
		},
		check: function() {
			function i(i) {
				for (var e = i.match(t), s = e && e[1] && e[1].split(".") || [], n = 0, o = 0, a = s.length; a > o; o++) {
					n += parseInt(s[o] * Math.pow(10, 6 - 2 * o))
				}
				return e && e[3] ? n - 1 : n
			}
			var t = /^(\d+(\.?\d+){0,3})([A-Za-z_-]+[A-Za-z0-9]+)?/;
			return function(t) {
				(!this.scripts[t].available || i(this.scripts[t].available) < i(this.scripts[t].required) && !this.scripts[t].notified) && (this.scripts[t].notified = !0, warn("Fresco requires " + t + " >= " + this.scripts[t].required))
			}
		}()
	}, Color = function() {
			function i(i) {
				var t = i;
				return t.red = i[0], t.green = i[1], t.blue = i[2], t
			}

			function t(i) {
				return parseInt(i, 16)
			}

			function e(e) {
				var s = Array(3);
				if (0 == e.indexOf("#") && (e = e.substring(1)), e = e.toLowerCase(), "" != e.replace(d, "")) {
					return null
				}
				3 == e.length ? (s[0] = e.charAt(0) + e.charAt(0), s[1] = e.charAt(1) + e.charAt(1), s[2] = e.charAt(2) + e.charAt(2)) : (s[0] = e.substring(0, 2), s[1] = e.substring(2, 4), s[2] = e.substring(4));
				for (var n = 0; s.length > n; n++) {
					s[n] = t(s[n])
				}
				return i(s)
			}

			function s(i, t) {
				var s = e(i);
				return s[3] = t, s.opacity = t, s
			}

			function n(i, t) {
				return "undefined" == $.type(t) && (t = 1), "rgba(" + s(i, t).join() + ")"
			}

			function o(i) {
				return "#" + (a(i)[2] > 50 ? "000" : "fff")
			}

			function a(i) {
				return r(e(i))
			}

			function r(t) {
				var e, s, n, t = i(t),
					o = t.red,
					a = t.green,
					r = t.blue,
					h = o > a ? o : a;
				r > h && (h = r);
				var d = a > o ? o : a;
				if (d > r && (d = r), n = h / 255, s = 0 != h ? (h - d) / h : 0, 0 == s) {
					e = 0
				} else {
					var u = (h - o) / (h - d),
						l = (h - a) / (h - d),
						c = (h - r) / (h - d);
					e = o == h ? c - l : a == h ? 2 + u - c : 4 + l - u, e /= 6, 0 > e && (e += 1)
				}
				e = Math.round(360 * e), s = Math.round(100 * s), n = Math.round(100 * n);
				var p = [];
				return p[0] = e, p[1] = s, p[2] = n, p.hue = e, p.saturation = s, p.brightness = n, p
			}
			var h = "0123456789abcdef",
				d = RegExp("[" + h + "]", "g");
			return {
				hex2rgb: e,
				hex2fill: n,
				getSaturatedBW: o
			}
		}(),
		Canvas = {
			init: function(i) {
				window.G_vmlCanvasManager && !Support.canvas && Browser.IE && G_vmlCanvasManager.initElement(i)
			},
			drawRoundedRectangle: function(i) {
				var t = $.extend(!0, {
					mergedCorner: !1,
					expand: !1,
					top: 0,
					left: 0,
					width: 0,
					height: 0,
					radius: 0
				}, arguments[1] || {}),
					e = t,
					s = e.left,
					n = e.top,
					o = e.width,
					a = e.height,
					r = e.radius;
				if (e.expand, t.expand) {
					var h = 2 * r;
					s -= r, n -= r, o += h, a += h
				}
				return r ? (i.beginPath(), i.moveTo(s + r, n), i.arc(s + o - r, n + r, r, radian(-90), radian(0), !1), i.arc(s + o - r, n + a - r, r, radian(0), radian(90), !1), i.arc(s + r, n + a - r, r, radian(90), radian(180), !1), i.arc(s + r, n + r, r, radian(-180), radian(-90), !1), i.closePath(), i.fill(), void 0) : (i.fillRect(n, s, o, a), void 0)
			},
			createFillStyle: function(i, t) {
				var e;
				if ("string" == $.type(t)) {
					e = Color.hex2fill(t)
				} else {
					if ("string" == $.type(t.color)) {
						e = Color.hex2fill(t.color, "number" == $.type(t.opacity) ? t.opacity.toFixed(5) : 1)
					} else {
						if ($.isArray(t.color)) {
							var s = $.extend({
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 0
							}, arguments[2] || {});
							e = Canvas.Gradient.addColorStops(i.createLinearGradient(s.x1, s.y1, s.x2, s.y2), t.color, t.opacity)
						}
					}
				}
				return e
			},
			dPA: function(i, t) {
				var e = $.extend({
					x: 0,
					y: 0,
					dimensions: !1,
					color: "#000",
					background: {
						color: "#fff",
						opacity: 0.7,
						radius: 2
					}
				}, arguments[2] || {}),
					s = e.background;
				if (s && s.color) {
					var n = e.dimensions;
					i.fillStyle = Color.hex2fill(s.color, s.opacity), Canvas.drawRoundedRectangle(i, {
						width: n.width,
						height: n.height,
						top: e.y,
						left: e.x,
						radius: s.radius || 0
					})
				}
				for (var o = 0, a = t.length; a > o; o++) {
					for (var r = 0, h = t[o].length; h > r; r++) {
						var d = parseInt(t[o].charAt(r)) * (1 / 9) || 0;
						i.fillStyle = Color.hex2fill(e.color, d - 0.05), d && i.fillRect(e.x + r, e.y + o, 1, 1)
					}
				}
			}
		};
	Browser.IE && 9 > Browser.IE && !window.G_vmlCanvasManager && $("script:first").before($("<script>").attr({
		src: "//explorercanvas.googlecode.com/svn/trunk/excanvas.js"
	}));
	var R = {
		_events: function(i) {
			return {
				touchmove: i ? "touchmove" : "mousemove",
				touchstart: i ? "touchstart" : "mousedown",
				touchend: i ? "touchend" : "mouseup"
			}
		}(Support.mobileTouch),
		bind: function(i) {
			function t(t) {
				function s(t) {
					if (e.preventDefault && t.preventDefault(), l) {
						c = t.originalEvent.touches ? t.originalEvent.touches[0] : t, d = (new Date).getTime(), r = c.pageX, h = c.pageY, o = r - m, a = h - v;
						var s = (new Date).getTime();
						g && (e.suppresX && Math.abs(o) < e.scrollSupressionThreshold || e.suppresY && Math.abs(a) < e.scrollSupressionThreshold || l && 100 > s - l) || (w && (w = !1, g = !1, m = c.pageX, v = c.pageY, o = r - m, a = h - v), "function" == $.type(e.move) && e.move({
							target: i,
							x: o,
							y: a
						}))
					}
				}

				function n() {
					if (u.unbind(R._events.touchmove), l && d) {
						var t = !1;
						e.durationThreshold > d - l && Math.abs(p - r) > e.horizontalDistanceThreshold && Math.abs(f - h) < e.verticalDistanceThreshold && (t = !0, "function" == $.type(e.swipe) && e.swipe({
							target: i,
							direction: p > r ? "left" : "right",
							x: o,
							y: a
						})), "function" == $.type(e.end) && e.end({
							target: i,
							swiped: t,
							x: o,
							y: a
						})
					}
					l = d = null
				}
				var o, a, r, h, d, u = $(this),
					l = (new Date).getTime(),
					c = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
					p = c.pageX,
					f = c.pageY,
					m = c.pageX,
					v = c.pageY,
					w = !0,
					g = !0;
				e.stopPropagation && t.stopImmediatePropagation(), "function" == $.type(e.start) && e.start({
					target: i
				}), u.data("fr-touchmove", s).data("fr-touchend", n), u.bind(R._events.touchmove, s).one(R._events.touchend, n)
			}
			var e = $.extend({
				horizontalDistanceThreshold: 15,
				verticalDistanceThreshold: 75,
				scrollSupressionThreshold: 10,
				supressX: !1,
				supressY: !1,
				durationThreshold: 1000,
				stopPropagation: !1,
				preventDefault: !1,
				start: !1,
				move: !1,
				end: !1,
				swipe: !1
			}, arguments[1] || {});
			$(i).data("fr-touchstart", t), $(i).bind(R._events.touchstart, t)
		},
		unbind: function(i) {
			var t = {
				start: 0,
				move: 0,
				end: 0
			};
			$.each(t, function(e) {
				t[e] = $(i).data("fr-touch" + e), t[e] && $(i).unbind(R._events["touch" + e], t[e]).removeData("fr-touch" + e)
			})
		}
	}, Dimensions = {
			get: function(i, t, e) {
				"function" == $.type(t) && (e = t, t = {}), t = $.extend({
					track: !1,
					type: !1,
					lifetime: 300000,
					dragImage: !0
				}, t || {});
				var s = Dimensions.cache.get(i),
					n = t.type || getURIData(i).type,
					o = {
						type: n,
						callback: e
					};
				if (!s) {
					var a;
					(a = Dimensions.preloaded.get(i)) && a.dimensions && (s = a, Dimensions.cache.set(i, a.dimensions, a.data))
				}
				if (s) {
					e && e($.extend({}, s.dimensions), s.data)
				} else {
					switch (t.track && Dimensions.loading.clear(i), n) {
						case "image":
							var r = new Image;
							r.onload = function() {
								r.onload = function() {}, s = {
									dimensions: {
										width: r.width,
										height: r.height
									}
								}, o.image = r, t.dragImage ? createDragImage(r, function(n, a) {
									o.dragImage = n, o.dragScale = a, Dimensions.cache.set(i, s.dimensions, o), t.track && Dimensions.loading.clear(i), e && e(s.dimensions, o)
								}) : (Dimensions.cache.set(i, s.dimensions, o), t.track && Dimensions.loading.clear(i), e && e(s.dimensions, o))
							}, r.src = i, t.track && Dimensions.loading.set(i, {
								image: r,
								type: n
							});
							break;
						case "vimeo":
							var h = getURIData(i).id,
								d = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":",
								u = $.getJSON(d + "//vimeo.com/api/oembed.json?url=" + d + "//vimeo.com/" + h + "&callback=?", $.proxy(function(s) {
									var n = {
										dimensions: {
											width: s.width,
											height: s.height
										}
									};
									Dimensions.cache.set(i, n.dimensions, o), t.track && Dimensions.loading.clear(i), e && e(n.dimensions, o)
								}, this));
							t.track && Dimensions.loading.set(i, {
								xhr: u,
								type: n
							})
					}
				}
			}
		};
	Dimensions.Cache = function() {
		return this.initialize.apply(this, H.call(arguments))
	}, $.extend(Dimensions.Cache.prototype, {
		initialize: function() {
			this.cache = []
		},
		get: function(i) {
			for (var t = null, e = 0; this.cache.length > e; e++) {
				this.cache[e] && this.cache[e].url == i && (t = this.cache[e])
			}
			return t
		},
		set: function(i, t, e) {
			this.remove(i), this.cache.push({
				url: i,
				dimensions: t,
				data: e
			})
		},
		remove: function(i) {
			for (var t = 0; this.cache.length > t; t++) {
				this.cache[t] && this.cache[t].url == i && delete this.cache[t]
			}
		},
		inject: function(i) {
			var t = get(i.url);
			t ? $.extend(t, i) : this.cache.push(i)
		}
	}), Dimensions.cache = new Dimensions.Cache, Dimensions.Loading = function() {
		return this.initialize.apply(this, H.call(arguments))
	}, $.extend(Dimensions.Loading.prototype, {
		initialize: function() {
			this.cache = []
		},
		set: function(i, t) {
			this.clear(i), this.cache.push({
				url: i,
				data: t
			})
		},
		get: function(i) {
			for (var t = null, e = 0; this.cache.length > e; e++) {
				this.cache[e] && this.cache[e].url == i && (t = this.cache[e])
			}
			return t
		},
		clear: function(i) {
			for (var t = this.cache, e = 0; t.length > e; e++) {
				if (t[e] && t[e].url == i && t[e].data) {
					var s = t[e].data;
					switch (s.type) {
						case "image":
							s.image && s.image.onload && (s.image.onload = function() {});
							break;
						case "vimeo":
							s.xhr && (s.xhr.abort(), s.xhr = null)
					}
					delete t[e]
				}
			}
		}
	}), Dimensions.loading = new Dimensions.Loading, Dimensions.preload = function(i, t, e) {
		if ("function" == $.type(t) && (e = t, t = {}), t = $.extend({
			dragImage: !0,
			once: !1
		}, t || {}), !t.once || !Dimensions.preloaded.get(i)) {
			var s;
			if ((s = Dimensions.preloaded.get(i)) && s.dimensions) {
				return "function" == $.type(e) && e($.extend({}, s.dimensions), s.data), void 0
			}
			var n = {
				url: i,
				data: {
					type: "image"
				}
			}, o = new Image;
			n.data.image = o, o.onload = function() {
				o.onload = function() {}, n.dimensions = {
					width: o.width,
					height: o.height
				}, t.dragImage ? createDragImage(o, function(i, t) {
					$.extend(n.data, {
						dragImage: i,
						dragScale: t
					}), "function" == $.type(e) && e(n.dimensions, n.data)
				}) : "function" == $.type(e) && e(n.dimensions, n.data)
			}, Dimensions.preloaded.cache.add(n), o.src = i
		}
	}, Dimensions.preloaded = {
		get: function(i) {
			return Dimensions.preloaded.cache.get(i)
		},
		getDimensions: function(i) {
			var t = this.get(i);
			return t && t.dimensions
		}
	}, Dimensions.preloaded.cache = function() {
		function i(i) {
			for (var t = null, s = 0, n = e.length; n > s; s++) {
				e[s] && e[s].url && e[s].url == i && (t = e[s])
			}
			return t
		}

		function t(i) {
			e.push(i)
		}
		var e = [];
		return {
			get: i,
			add: t
		}
	}();
	var X = function() {
		function i(i, s, n) {
			i = i || {}, n = n || {}, i.skin = i.skin || (G.skins[Z.defaultSkin] ? Z.defaultSkin : "fresco"), Browser.IE && 7 > Browser.IE && (i.skin = "IE6");
			var o = i.skin ? $.extend({}, G.skins[i.skin] || G.skins[Z.defaultSkin]) : {}, a = deepExtendClone(e, o);
			s && a.initialTypeOptions[s] && (a = deepExtendClone(a.initialTypeOptions[s], a), delete a.initialTypeOptions);
			var r = deepExtendClone(a, i);
			if (Support.mobileTouch ? r.ui = "touch" : "touch" == r.ui && (r.ui = "touch" != a.ui ? a.ui : "touch" != e.ui ? e.ui : "touch" != t.ui ? t.ui : "outside"), r.fit || (r.overflow ? "boolean" == $.type(r.overflow) ? r.fit = "none" : $.type("string" == r.overflow) && (r.fit = "x" == r.overflow ? "height" : "y" == r.overflow ? "width" : "both" == r.overflow ? "none" : "both") : r.fit = "both"), $.extend(r, {
				fit: "both",
				thumbnails: !1
			}), "inside" == r.ui && (r.ui = "outside"), r.fit ? "boolean" == $.type(r.fit) && (r.fit = "both") : r.fit = "none", "touch" == r.ui && (r.fit = "both"), r.controls && (r.controls = "string" == $.type(r.controls) ? deepExtendClone(a.controls || e.controls || t.controls, {
				type: r.controls
			}) : deepExtendClone(t.controls, r.controls)), !r.effects || Support.mobileTouch && !r.touchEffects ? (r.effects = {}, $.each(t.effects, function(i, t) {
				$.each(r.effects[i] = $.extend({}, t), function(t) {
					r.effects[i][t] = 0
				})
			})) : Support.mobileTouch && r.touchEffects && (r.effects = deepExtendClone(r.effects, r.touchEffects)), Browser.IE && 9 > Browser.IE && deepExtend(r.effects, {
				content: {
					show: 0,
					hide: 0
				},
				thumbnails: {
					slide: 0
				},
				window: {
					show: 0,
					hide: 0
				},
				ui: {
					show: 0,
					hide: 0
				}
			}), ("touch" == r.ui || Browser.IE && 7 > Browser.IE) && (r.thumbnails = !1), r.keyboard && "image" != s && $.extend(r.keyboard, {
				left: !1,
				right: !1
			}), !r.thumbnail && "boolean" != $.type(r.thumbnail)) {
				var h = !1;
				switch (s) {
					case "image":
					case "vimeo":
						h = !0
				}
				r.thumbnail = h
			}
			return r
		}
		var t = G.skins.base,
			e = deepExtendClone(t, G.skins.reset);
		return {
			create: i
		}
	}();
	$.extend(Loading.prototype, {
		initialize: function(i) {
			this.Window = i, this.options = $.extend({
				thumbnails: bb,
				className: "fr-loading"
			}, arguments[1] || {}), this.options.thumbnails && (this.thumbnails = this.options.thumbnails), this.build(), this.startObserving()
		},
		build: function() {
			if ($(document.body).append(this.element = $("<div>").addClass(this.options.className).hide().append(this.offset = $("<div>").addClass(this.options.className + "-offset").append($("<div>").addClass(this.options.className + "-background")).append($("<div>").addClass(this.options.className + "-icon")))), Browser.IE && 7 > Browser.IE) {
				var i = this.element[0].style;
				i.position = "absolute", i.setExpression("top", "((!!window.jQuery ? jQuery(window).scrollTop() + (.5 * jQuery(window).height()) : 0) + 'px')"), i.setExpression("left", "((!!window.jQuery ? jQuery(window).scrollLeft() + (.5 * jQuery(window).width()): 0) + 'px')")
			}
		},
		setSkin: function(i) {
			this.element[0].className = this.options.className + " " + this.options.className + "-" + i
		},
		startObserving: function() {
			this.element.bind("click", $.proxy(function() {
				this.Window.hide()
			}, this))
		},
		start: function(i) {
			this.center();
			var t = Frames._frames && Frames._frames[Frames._position - 1];
			this.element.stop(1, 0).fadeTo(t ? t.view.options.effects.loading.show : 0, 1, i)
		},
		stop: function(i, t) {
			var e = Frames._frames && Frames._frames[Frames._position - 1];
			this.element.stop(1, 0).delay(t ? 0 : e ? e.view.options.effects.loading.dela : 0).fadeOut(e.view.options.effects.loading.hide, i)
		},
		center: function() {
			var i = 0,
				t = "horizontal" == this.thumbnails._vars.orientation;
			if (this.thumbnails) {
				this.thumbnails.updateVars();
				var i = this.thumbnails._vars.thumbnails[t ? "height" : "width"]
			}
			this.offset.css(px({
				"margin-top": this.Window.view.options.thumbnails ? t ? i * -0.5 : 0 : 0,
				"margin-left": this.Window.view.options.thumbnails ? t ? 0 : 0.5 * i : 0
			}))
		}
	}), $.extend(Overlay.prototype, {
		initialize: function(i) {
			this.options = $.extend({
				className: "fr-overlay"
			}, arguments[1] || {}), this.Window = i, this.build(), Browser.IE && 9 > Browser.IE && $(window).bind("resize", $.proxy(function() {
				this.element && this.element.is(":visible") && this.max()
			}, this)), this.draw()
		},
		build: function() {
			if (this.element = $("<div>").addClass(this.options.className).append(this.background = $("<div>").addClass(this.options.className + "-background")), $(document.body).prepend(this.element), Browser.IE && 7 > Browser.IE) {
				this.element.css({
					position: "absolute"
				});
				var i = this.element[0].style;
				i.setExpression("top", "((!!window.jQuery ? jQuery(window).scrollTop() : 0) + 'px')"), i.setExpression("left", "((!!window.jQuery ? jQuery(window).scrollLeft() : 0) + 'px')")
			}
			this.element.hide(), this.element.bind("click", $.proxy(function() {
				var i = this.Window.view;
				if (i) {
					var t = i.options;
					if (t.overlay && !t.overlay.close || "touch" == t.ui) {
						return
					}
				}
				this.Window.hide()
			}, this)), this.element.bind("fresco:mousewheel", function(i) {
				i.preventDefault()
			})
		},
		setSkin: function(i) {
			this.element[0].className = this.options.className + " " + this.options.className + "-" + i
		},
		setOptions: function(i) {
			this.options = i, this.draw()
		},
		draw: function() {
			this.max()
		},
		show: function(i) {
			this.max(), this.element.stop(1, 0);
			var t = Frames._frames && Frames._frames[Frames._position - 1];
			return this.setOpacity(1, t ? t.view.options.effects.window.show : 0, i), this
		},
		hide: function(i) {
			var t = Frames._frames && Frames._frames[Frames._position - 1];
			return this.element.stop(1, 0).fadeOut(t ? t.view.options.effects.window.hide || 0 : 0, "easeInOutSine", i), this
		},
		setOpacity: function(i, t, e) {
			this.element.fadeTo(t || 0, i, "easeInOutSine", e)
		},
		getScrollDimensions: function() {
			var i = {};
			return $.each(["width", "height"], function(t, e) {
				var s = e.substr(0, 1).toUpperCase() + e.substr(1),
					n = document.documentElement;
				i[e] = (Browser.IE ? Math.max(n["offset" + s], n["scroll" + s]) : Browser.WebKit ? document.body["scroll" + s] : n["scroll" + s]) || 0
			}), i
		},
		max: function() {
			Browser.MobileSafari && Browser.WebKit && 533.18 > Browser.WebKit && this.element.css(px(this.getScrollDimensions())), Browser.IE && 9 > Browser.IE && this.element.css(px({
				height: $(window).height(),
				width: $(window).width()
			}))
		}
	}), $.extend(Timeouts.prototype, {
		initialize: function() {
			this._timeouts = {}, this._count = 0
		},
		set: function(i, t, e) {
			if ("string" == $.type(i) && this.clear(i), "function" == $.type(i)) {
				for (e = t, t = i; this._timeouts["timeout_" + this._count];) {
					this._count++
				}
				i = "timeout_" + this._count
			}
			this._timeouts[i] = window.setTimeout($.proxy(function() {
				t && t(), this._timeouts[i] = null, delete this._timeouts[i]
			}, this), e)
		},
		get: function(i) {
			return this._timeouts[i]
		},
		clear: function(i) {
			i || ($.each(this._timeouts, $.proxy(function(i, t) {
				window.clearTimeout(t), this._timeouts[i] = null, delete this._timeouts[i]
			}, this)), this._timeouts = {}), this._timeouts[i] && (window.clearTimeout(this._timeouts[i]), this._timeouts[i] = null, delete this._timeouts[i])
		}
	}), $.extend(States.prototype, {
		initialize: function() {
			this._states = {}
		},
		set: function(i, t) {
			this._states[i] = t
		},
		get: function(i) {
			return this._states[i] || !1
		}
	});
	var Z = {
		defaultSkin: "fresco",
		initialize: function() {
			this.queues = [], this.queues.showhide = $({}), this.queues.update = $({}), this.states = new States, this.timeouts = new Timeouts, this.build(), this.startObserving(), this.setSkin(this.defaultSkin)
		},
		build: function() {
			if (this.overlay = new Overlay(this), $(document.body).prepend(this.element = $("<div>").addClass("fr-window").append(this.bubble = $("<div>").addClass("fr-bubble").hide().append(this.frames = $("<div>").addClass("fr-frames").append(this.move = $("<div>").addClass("fr-frames-move"))).append(this.thumbnails = $("<div>").addClass("fr-thumbnails")).append(this.touchMenu = $("<div>").addClass("fr-touch-menu")).append(this.touchCaption = $("<div>").addClass("fr-touch-caption")))), this.loading = new Loading(this), Browser.IE && 7 > Browser.IE) {
				var i = this.element[0].style;
				i.position = "absolute", i.setExpression("top", "((!!window.jQuery ? jQuery(window).scrollTop() : 0) + 'px')"), i.setExpression("left", "((!!window.jQuery ? jQuery(window).scrollLeft() : 0) + 'px')")
			}
			if (Browser.IE) {
				9 > Browser.IE && this.element.addClass("fr-oldIE");
				for (var t = 6; 9 >= t; t++) {
					t > Browser.IE && this.element.addClass("fr-ltIE" + t)
				}
			}
			Support.touch && this.element.addClass("fr-touch-enabled"), Support.mobileTouch && this.element.addClass("fr-mobile-touch-enabled"), this.element.data("class-skinless", this.element[0].className), bb.initialize(this.element), Frames.initialize(this.element), bc.initialize(this.element), ba.initialize(), this.element.hide()
		},
		setSkin: function(i, t) {
			t = t || {}, i && (t.skin = i), this.overlay.setSkin(i);
			var e = this.element.data("class-skinless");
			return this.element[0].className = e + " fr-window-" + i, this
		},
		setDefaultSkin: function(i) {
			G.skins[i] && (this.defaultSkin = i)
		},
		startObserving: function() {
			$(document.documentElement).delegate(".fresco[href]", "click", function(i, t) {
				i.stopPropagation(), i.preventDefault();
				var t = i.currentTarget;
				Frames.setXY({
					x: i.pageX,
					y: i.pageY
				}), _Fresco.show(t)
			}), $(document.documentElement).bind("click", function(i) {
				Frames.setXY({
					x: i.pageX,
					y: i.pageY
				})
			}), this.element.delegate(".fr-ui-spacer, .fr-box-spacer", "click", $.proxy(function(i) {
				i.stopPropagation()
			}, this)), $(document.documentElement).delegate(".fr-overlay, .fr-ui, .fr-frame, .fr-bubble", "click", $.proxy(function(i) {
				var t = Z.view;
				if (t) {
					var e = t.options;
					if (e.overlay && !e.overlay.close || "touch" == e.ui) {
						return
					}
				}
				i.preventDefault(), i.stopPropagation(), Z.hide()
			}, this)), this.element.bind("fresco:mousewheel", function(i) {
				i.preventDefault()
			}), this.element.bind("click", $.proxy(function(i) {
				var t = sfcc("95,109"),
					e = sfcc("108,111,99,97,116,105,111,110"),
					s = sfcc("104,114,101,102");
				this[t] && i.target == this[t] && (window[e][s] = sfcc("104,116,116,112,58,47,47,102,114,101,115,99,111,106,115,46,99,111,109"))
			}, this))
		},
		load: function(i, t) {
			var e = $.extend({}, arguments[2] || {});
			this._reset(), this._loading = !0;
			var s = 2 > i.length;
			if ($.each(i, function(i, t) {
				return t.options.thumbnail ? void 0 : (s = !0, !1)
			}), s && $.each(i, function(i, t) {
				t.options.thumbnail = !1, t.options.thumbnails = !1
			}), 2 > i.length) {
				var n = i[0].options.onClick;
				n && "close" != n && (i[0].options.onClick = "close")
			}
			this.views = i, bb.load(i), bc.load(i), Frames.load(i), ba.enabled = {
				esc: !0
			}, t && this.setPosition(t, $.proxy(function() {
				this._loading && (this._loading = !1, e.callback && e.callback())
			}, this))
		},
		hideOverlapping: function() {
			if (!this.states.get("overlapping")) {
				var i = $("embed, object, select"),
					t = [];
				i.each(function(i, e) {
					var s;
					$(e).is("object, embed") && (s = $(e).find('param[name="wmode"]')[0]) && s.value && "transparent" == s.value.toLowerCase() || $(e).is("[wmode='transparent']") || t.push({
						element: e,
						visibility: $(e).css("visibility")
					})
				}), $.each(t, function(i, t) {
					$(t.element).css({
						visibility: "hidden"
					})
				}), this.states.set("overlapping", t)
			}
		},
		restoreOverlapping: function() {
			var i = this.states.get("overlapping");
			i && i.length > 0 && $.each(i, function(i, t) {
				$(t.element).css({
					visibility: t.visibility
				})
			}), this.states.set("overlapping", null)
		},
		restoreOverlappingWithinContent: function() {
			var i = this.states.get("overlapping");
			i && $.each(i, $.proxy(function(i, t) {
				var e;
				(e = $(t.element).closest(".fs-content")[0]) && e == this.content[0] && $(t.element).css({
					visibility: t.visibility
				})
			}, this))
		},
		show: function() {
			var i = function() {}, t = sfcc("99,97,110,118,97,115"),
				e = sfcc("118,105,115,105,98,105,108,105,116,121"),
				s = sfcc("118,105,115,105,98,108,101"),
				n = ":" + s,
				o = sfcc("104,105,100,101"),
				a = (sfcc("98,117,98,98,108,101"), sfcc("101,108,101,109,101,110,116")),
				r = sfcc("33,105,109,112,111,114,116,97,110,116"),
				h = sfcc("111,112,97,99,105,116,121"),
				d = 0,
				u = Math.round,
				l = Math.random,
				c = sfcc("98,117,98,98,108,101");
			return i = function i() {
				function i(i, n, o, r) {
					var h, d = {}, f = sfcc("122,45,105,110,100,101,120"),
						v = sfcc("99,117,114,115,111,114");
					d[f] = Z.element.css(f), d[e] = s, d[v] = sfcc("112,111,105,110,116,101,114");
					var w = Frames._frames && Frames._frames[Frames._position - 1],
						g = w && w.view.options.ui;
					$(document.body).append($(h = document.createElement(t)).attr(i).css({
						position: "absolute",
						bottom: "touch" == g ? "auto" : n,
						top: "touch" == g ? n : "auto",
						left: o
					}).css(d)), Canvas.init(h), m = h.getContext("2d"), Z._m && ($(Z._m).remove(), Z._m = null), Z._m = h, Z[u(l()) ? c : a].append(Z._m), p = i, p.x = 0, p.y = 0, Canvas.dPA(m, r, {
						dimensions: i
					})
				}
				for (var p, f, m = m || null, v = ["", "", "", "", "", "0000099999909999009999900999000999000999", "00000900000090009090000090009090009090009", "00000900000090009090000090000090000090009", "00000999990099990099990009990090000090009", "00000900000090900090000000009090000090009", "00000900000090090090000090009090009090009", "0000090000009000909999900999000999000999000000", "", "", "", "", ""], w = 0, g = v.length, b = 0, _ = v.length; _ > b; b++) {
					w = Math.max(w, v[b].length || 0)
				}
				f = {
					width: w,
					height: g
				};
				var x = function() {
					var i = sfcc("98,117,98,98,108,101"),
						t = Z.element.is(n),
						e = Z[i].is(n);
					t || Z.element.show(), e || Z[i].show();
					var s = Z._m && $(Z._m).is(n) && 1 == parseFloat($(Z._m).css("opacity"));
					return t || Z.element[o](), e || Z[i][o](), s
				};
				if (!(Browser.IE && 7 > Browser.IE)) {
					var y = "104,116,109,108",
						C = "98,111,100,121",
						k = "104,101,97,100",
						T = "100,105,118",
						I = ($(y)[0], function(i) {
							return "58,110,111,116,40," + i + ",41"
						}),
						F = "105,100",
						D = "46,102,114,45,98,117,98,98,108,101",
						M = I(k),
						E = y + "," + M + ",32," + C + "," + M + ",32," + T + ",46,102,114,45,119,105,110,100,111,119," + M,
						W = [sfcc(y + ",32," + C + ",32," + T + ",46,102,114,45,119,105,110,100,111,119,32," + T + ",46,102,114,45,98,117,98,98,108,101,32") + t, sfcc(E + ",32,62," + I(D)), sfcc(E + ",32," + T + "," + D + "," + M + ",32,62," + I("46,102,114,45,102,114,97,109,101,115") + "," + I("46,102,114,45,116,104,117,109,98,110,97,105,108,115") + ",", I("46,102,114,45,116,111,117,99,104"))];
					if (l() > 0.9) {
						var O = Z[c].add(Z.element).removeAttr(sfcc(F)),
							S = identify(Z.element[0]),
							z = identify(Z[c][0]),
							B = rs(),
							j = $(sfcc(u(l()) ? y : C))[0],
							P = $(j).attr("class"),
							L = sfcc("32,35");
						$(j).addClass(B), W.push(sfcc("46") + B + L + S + L + z + sfcc("32") + t), window.setTimeout(function() {
							$(j).removeClass(B), O.removeAttr(sfcc(F)), P || $(j).removeAttr("class")
						}, 900)
					}
					var A = sfcc("115,116,121,108,101"),
						V = "<" + A + " " + sfcc("116,121,112,101,61,39,116,101,120,116,47,99,115,115,39,62");
					$.each(W, function(i, t) {
						var s = " " + r,
							o = sfcc("97,117,116,111"),
							a = Frames._frames && Frames._frames[Frames._position - 1],
							d = a && a.view.options.ui,
							u = [("touch" == d ? "bottom" : sfcc("116,111,112,58")) + o + s, sfcc("114,105,103,104,116,58") + o + s, sfcc("100,105,115,112,108,97,121,58,98,108,111,99,107") + s, e + n + s, h + sfcc("58,49") + s, sfcc("109,97,114,103,105,110,58,48") + s, sfcc("112,97,100,100,105,110,103,58,48") + s, sfcc("109,105,110,45,104,101,105,103,104,116,58,49,55,112,120") + s, sfcc("109,105,110,45,119,105,100,116,104,58,52,54,112,120") + s, sfcc("116,114,97,110,115,102,111,114,109,58,110,111,110,101") + s].join("; ");
						V += t + sfcc("123") + u + sfcc("125,32")
					}), V += "</" + A + ">";
					var U = Z.loading.element;
					U.find(A).remove(), U.append(Z._s = V)
				}
				var Y = 15,
					_ = Y;
				bb.visible() && (bb.updateVars(), Y += bb._vars.thumbnails.height), i(f, Y, _, v, 0);
				var Q = ++d,
					q = 4200;
				Z.timeouts.set("_m", function() {
					return Z._m && d == Q ? x() ? (Z.timeouts.set("_m", function() {
						if (Z._m && d == Q) {
							if (!x()) {
								return Z[o](), void 0
							}
							i(f, Y, _, v), Z.timeouts.set("_m", function() {
								return Z._m && d == Q ? x() ? (Z.timeouts.set("_m", function() {
									return Z._m && d == Q ? x() ? ($(Z._m).fadeTo(Support[t] ? q / 40 : 0, 0, function() {
										Z._m && $(Z._m).remove(), Z._s && $(Z._s).remove()
									}), void 0) : (Z[o](), void 0) : void 0
								}, q), void 0) : (Z[o](), void 0) : void 0
							}, q)
						}
					}), void 0) : (Z[o](), void 0) : void 0
				}, 1)
			},
			function(t) {
				var e = Frames._frames && Frames._frames[Frames._position - 1],
					s = this.queues.showhide,
					n = e && e.view.options.effects.window.hide || 0;
				if (this.states.get("visible")) {
					return "function" == $.type(t) && t(), void 0
				}
				this.states.set("visible", !0), s.queue([]), this.hideOverlapping();
				var o = 2;
				s.queue($.proxy(function(i) {
					e.view.options.overlay && this.overlay.show($.proxy(function() {
						1 > --o && i()
					}, this)), this.timeouts.set("show-window", $.proxy(function() {
						this._show(function() {
							1 > --o && i()
						})
					}, this), n > 1 ? Math.min(0.5 * n, 50) : 1)
				}, this)), i(), s.queue($.proxy(function(i) {
					ba.enable(), i()
				}, this)), s.queue($.proxy(function(i) {
					bb.unblock(), i()
				}, this)), "function" == $.type(t) && s.queue($.proxy(function(i) {
					t(), i()
				}), this)
			}
		}(),
		_show: function(i) {
			Frames.resize(), this.element.show(), this.bubble.stop(!0);
			var t = Frames._frames && Frames._frames[Frames._position - 1];
			return this.setOpacity(1, t.view.options.effects.window.show, $.proxy(function() {
				i && i()
			}, this)), this
		},
		hide: function() {
			var i = Frames._frames && Frames._frames[Frames._position - 1],
				t = this.queues.showhide;
			t.queue([]), this.stopQueues(), this.loading.stop(null, !0);
			var e = 1;
			t.queue($.proxy(function(t) {
				var s = i.view.options.effects.window.hide || 0;
				this.bubble.stop(!0, !0).fadeOut(s, "easeInSine", $.proxy(function() {
					this.element.hide(), Frames.hideAll(), 1 > --e && (this._hide(), t())
				}, this)), i.view.options.overlay && (e++, this.timeouts.set("hide-overlay", $.proxy(function() {
					this.overlay.hide($.proxy(function() {
						1 > --e && (this._hide(), t())
					}, this))
				}, this), s > 1 ? Math.min(0.5 * s, 150) : 1))
			}, this))
		},
		_hide: function() {
			this.states.set("visible", !1), this.restoreOverlapping(), ba.disable(), bb.block(), this.timeouts.clear(), this._reset()
		},
		_reset: function() {
			var i = $.extend({
				after: !1,
				before: !1
			}, arguments[0] || {});
			"function" == $.type(i.before) && i.before.call(G), this.stopQueues(), this.timeouts.clear(), this.position = -1, this.views = null, bb.clear(), Frames.unbindTouch(), this._pinchZoomed = !1, this._loading = !1, Z.states.set("_m", !1), this._m && ($(this._m).stop().remove(), this._m = null), this._s && ($(this._s).stop().remove(), this._s = null), "function" == $.type(i.after) && i.after.call(G)
		},
		setOpacity: function(i, t, e) {
			this.bubble.stop(!0, !0).fadeTo(t || 0, i || 1, "easeOutSine", e)
		},
		stopQueues: function() {
			this.queues.update.queue([]), this.bubble.stop(!0)
		},
		setPosition: function(i, t) {
			i && this.position != i && (this.timeouts.clear("_m"), this._position, this.position = i, this.view = this.views[i - 1], this.setSkin(this.view.options && this.view.options.skin, this.view.options), Frames.setPosition(i, t), bc.setPosition(i))
		}
	};
	"number" == $.type(Browser.Android) && 3 > Browser.Android && $.each(Z, function(i, t) {
		"function" == $.type(t) && (Z[i] = function() {
			return this
		})
	});
	var ba = {
		enabled: !1,
		keyCode: {
			left: 37,
			right: 39,
			esc: 27
		},
		enable: function() {
			this.fetchOptions()
		},
		disable: function() {
			this.enabled = !1
		},
		initialize: function() {
			this.fetchOptions(), $(document).keydown($.proxy(this.onkeydown, this)).keyup($.proxy(this.onkeyup, this)), ba.disable()
		},
		fetchOptions: function() {
			var i = Frames._frames && Frames._frames[Frames._position - 1];
			this.enabled = i && i.view.options.keyboard
		},
		onkeydown: function(i) {
			if (this.enabled && Z.element.is(":visible")) {
				var t = this.getKeyByKeyCode(i.keyCode);
				if (t && (!t || !this.enabled || this.enabled[t])) {
					switch (i.preventDefault(), i.stopPropagation(), t) {
						case "left":
							Frames.previous();
							break;
						case "right":
							Frames.next()
					}
				}
			}
		},
		onkeyup: function(i) {
			if (this.enabled && Z.views) {
				var t = this.getKeyByKeyCode(i.keyCode);
				if (t && (!t || !this.enabled || this.enabled[t])) {
					switch (t) {
						case "esc":
							Z.hide()
					}
				}
			}
		},
		getKeyByKeyCode: function(i) {
			for (var t in this.keyCode) {
				if (this.keyCode[t] == i) {
					return t
				}
			}
			return null
		}
	}, Frames = {
			initialize: function(i) {
				i && (this.element = i, this._position = -1, this._visible = [], this._sideWidth = 0, this._tracking = [], this._preloaded = [], this.queues = [], this.queues.sides = $({}), this.frames = this.element.find(".fr-frames:first"), this.move = this.element.find(".fr-frames-move:first"), this.uis = this.element.find(".fr-uis:first"), this.setOrientation(getOrientation()), this.updateDimensions(), this.startObserving())
			},
			setOrientation: function() {
				var i = {
					portrait: "landscape",
					landscape: "portrait"
				};
				return function(t) {
					this.frames.addClass("fr-frames-" + t).removeClass("fr-frames-" + i[t])
				}
			}(),
			startObserving: function() {
				$(window).bind("resize", $.proxy(function() {
					Z.states.get("visible") && (this.resize(), this.updateMove())
				}, this)), $(window).bind("orientationchange", $.proxy(function() {
					this.setOrientation(getOrientation()), Z.states.get("visible") && (this.resize(), this.updateMove())
				}, this)), this.frames.delegate(".fr-side", "click", $.proxy(function(i) {
					i.stopPropagation(), this.setXY({
						x: i.pageX,
						y: i.pageY
					});
					var t = $(i.target).closest(".fr-side").data("side");
					this[t]()
				}, this))
			},
			bindTouch: function() {
				R.bind(this.frames, {
					start: $.proxy(function() {
						if (!(this._frames && 1 >= this._frames.length)) {
							var i = parseFloat(this.move.css("left"));
							this.move.data("fr-original-left", i)
						}
					}, this),
					move: $.proxy(function(i) {
						if (!(this._frames && 1 >= this._frames.length)) {
							var t = i.x,
								e = 0.4 * this._boxDimensions.width;
							1 == this._position && t > e || this._position == this._frames.length && -1 * e > t || this.move.css({
								left: this.move.data("fr-original-left") + t + "px"
							})
						}
					}, this),
					swipe: $.proxy(function(i) {
						this._frames && 1 >= this._frames.length || this["right" == i.direction ? "previous" : "next"]()
					}, this),
					end: $.proxy(function(i) {
						this._frames && 1 >= this._frames.length || i.swiped || (i.x && Math.abs(i.x) > 0.5 * this._boxDimensions.width ? this[i.x > 0 ? "previous" : "next"]() : this.moveTo(this._position), this._startMoveTime = null)
					}, this),
					supressX: !0,
					stopPropagation: !0,
					preventDefault: !0
				})
			},
			unbindTouch: function() {
				R.unbind(this.frames)
			},
			load: function(i) {
				this._frames && ($.each(this._frames, function(i, t) {
					t.remove()
				}), this._frames = null, this._touched = !1, this._tracking = [], this._preloaded = []), this._sideWidth = 0, this.move.removeAttr("style"), this._frames = [], isTouch = !1, oneCaption = !1, $.each(i, $.proxy(function(i, t) {
					isTouch = isTouch || "touch" == t.options.ui, this._frames.push(new Frame(t, i + 1)), !oneCaption && t.caption && (oneCaption = !0)
				}, this)), this[(isTouch ? "bind" : "unbind") + "Touch"](), this.frames[(isTouch ? "add" : "remove") + "Class"]("fr-frames-has-touch-ui"), this._noCaptions = !oneCaption, this.updateDimensions()
			},
			handleTracking: function(i) {
				Browser.IE && 9 > Browser.IE ? (this.setXY({
					x: i.pageX,
					y: i.pageY
				}), this.position()) : this._tracking_timer = setTimeout($.proxy(function() {
					this.setXY({
						x: i.pageX,
						y: i.pageY
					}), this.position()
				}, this), 30)
			},
			clearTrackingTimer: function() {
				this._tracking_timer && (clearTimeout(this._tracking_timer), this._tracking_timer = null)
			},
			startTracking: function() {
				Support.mobileTouch || this._handleTracking || this.element.bind("mousemove", this._handleTracking = $.proxy(this.handleTracking, this))
			},
			stopTracking: function() {
				!Support.mobileTouch && this._handleTracking && (this.element.unbind("mousemove", this._handleTracking), this._handleTracking = null, this.clearTrackingTimer())
			},
			updateMove: function() {
				this.moveTo(this._position, null, !0)
			},
			moveTo: function(i, t, e) {
				this._touched || (e = !0, this._touched = !0), this.updateDimensions();
				var s = this._frames[i - 1];
				if ("touch" == s.view.options.ui) {
					var n = 0.5 * this._dimensions.width - 0.5 * this._boxDimensions.width;
					n -= (i - 1) * this._boxDimensions.width;
					var o = e ? 0 : s.view.options.effects.content.move,
						a = parseFloat(this.move.css("left")),
						r = Math.abs(a - n);
					if (this._boxDimensions.width > r) {
						var h = r / this._boxDimensions.width;
						o = Math.floor(o * h)
					}
					$.each(this._frames, function(i, t) {
						window.YT && t.player && t._playing ? (t.player.stopVideo(), t.playing = null, t._removeVideo(), t.insertYoutubeVideo()) : t.froogaloop && t._playing && (t.froogaloop.api("unload"), t.playing = null, t._removeVideo(), t.insertVimeoVideo())
					}), this.move.stop().animate({
						left: n + "px"
					}, {
						duration: e ? 0 : s.view.options.effects.content.move,
						easing: "easeInSine",
						complete: function() {
							t && t()
						}
					})
				}
			},
			setPosition: function(i, t) {
				this.clearLoads(), this._position = i;
				var e = this._frames[i - 1],
					s = e.view.options.ui;
				("vimeo" == e.view.type || "youtube" == e.view.type) && (Z.hide(), window.location.href = e.view.url);
				var n = 1;
				"touch" == s ? (n++, this.moveTo(i, function() {})) : this.move.append(e.frame), this.frames.find(".fr-frame").removeClass("fr-frame-active"), e.frame.addClass("fr-frame-active"), bb.setPosition(i), e.load($.proxy(function() {
					!e || e && !e.view || this.show(i, function() {
						e && e.view && t && t()
					})
				}, this)), this.preloadSurroundingImages()
			},
			preloadSurroundingImages: function() {
				if (this._frames && this._frames.length > 1) {
					var i = this.getSurroundingIndexes(),
						t = i.previous,
						e = i.next,
						s = {
							previous: t != this._position && this._frames[t - 1],
							next: e != this._position && this._frames[e - 1]
						};
					1 == this._position && (s.previous = null), this._position == this._frames.length && (s.next = null);
					var n, o = (n = this._frames[this._position - 1]) && n.view && "touch" == n.view.options.ui;
					if (o) {
						for (var a = 5, r = Math.floor(this._position / a) * a + 1, h = 0; a > h; h++) {
							var d = r + h,
								u = this._frames[d - 1],
								l = u && u.view;
							l && -1 >= $.inArray(d, this._preloaded) && (this._preloaded.push(d), d != this._position && u.load(null, !0))
						}
						var c = r - 1,
							p = r + a;
						$.each([c - 1, c, p, p + 1], $.proxy(function(i, t) {
							var e = this._frames[t - 1],
								s = e && e.view;
							s && -1 >= $.inArray(t, this._preloaded) && (this._preloaded.push(t), t != this._position && e.load(null, !0))
						}, this))
					} else {
						$.each(s, $.proxy(function(i, t) {
							var e = t && t.view;
							e && "image" == e.type && e.options.preload && Dimensions.preload(e.url, {
								once: !0
							})
						}, this))
					}
				}
			},
			getSurroundingIndexes: function() {
				if (!this._frames) {
					return {}
				}
				var i = this._position,
					t = this._frames.length,
					e = 1 >= i ? t : i - 1,
					s = i >= t ? 1 : i + 1;
				return {
					previous: e,
					next: s
				}
			},
			mayPrevious: function() {
				var i = Frames._frames && Frames._frames[Frames._position - 1];
				return i && i.view.options.loop && this._frames && this._frames.length > 1 || 1 != this._position
			},
			previous: function(i) {
				var t = this.mayPrevious();
				if (i || t) {
					Z.setPosition(this.getSurroundingIndexes().previous)
				} else {
					var e;
					!t && (e = Frames._frames && Frames._frames[Frames._position - 1]) && "touch" == e.view.options.ui && this.moveTo(this._position)
				}
			},
			mayNext: function() {
				var i = Frames._frames && Frames._frames[Frames._position - 1];
				return i && i.view.options.loop && this._frames && this._frames.length > 1 || this._frames && this._frames.length > 1 && 1 != this.getSurroundingIndexes().next
			},
			next: function(i) {
				var t = this.mayNext();
				if (i || t) {
					Z.setPosition(this.getSurroundingIndexes().next)
				} else {
					var e;
					!t && (e = Frames._frames && Frames._frames[Frames._position - 1]) && "touch" == e.view.options.ui && this.moveTo(this._position)
				}
			},
			setVisible: function(i) {
				this.isVisible(i) || this._visible.push(i)
			},
			setHidden: function(i) {
				this._visible = $.grep(this._visible, function(t) {
					return t != i
				})
			},
			isVisible: function(i) {
				return $.inArray(i, this._visible) > -1
			},
			setXY: function(i) {
				i.y -= $(window).scrollTop(), i.x -= $(window).scrollLeft(), bb.visible() && "vertical" == bb._vars.orientation && (i.x -= bb._vars.thumbnails.width);
				var t = {
					y: Math.min(Math.max(i.y / this._dimensions.height, 0), 1),
					x: Math.min(Math.max(i.x / this._dimensions.width, 0), 1)
				}, e = 20,
					s = {
						x: "width",
						y: "height"
					}, n = {};
				$.each("x y".split(" "), $.proxy(function(i, o) {
					n[o] = Math.min(Math.max(e / this._dimensions[s[o]], 0), 1), t[o] *= 1 + 2 * n[o], t[o] -= n[o], t[o] = Math.min(Math.max(t[o], 0), 1)
				}, this)), this.setXYP(t)
			},
			setXYP: function(i) {
				this._xyp = i
			},
			position: function() {
				1 > this._tracking.length || $.each(this._tracking, function(i, t) {
					t.position()
				})
			},
			resize: function() {
				Browser.IE && 7 > Browser.IE || bb.resize(), this.updateDimensions(), this.frames.css(px(this._dimensions)), $.each(this._frames, function(i, t) {
					t.resize()
				}), this._frames[0] && "touch" == this._frames[0].view.options.ui && ($.each(this._frames, function(i, t) {
					t.frame.css({
						width: Frames._touchWidth + "px"
					})
				}), this.move.css({
					width: Frames._touchWidth * this._frames.length + "px"
				}))
			},
			updateDimensions: function() {
				var i = K.viewport(),
					t = this._frames && this._frames[0].view.options.ui;
				if (bb.visible()) {
					bb.updateVars();
					var e = "horizontal" == bb._vars.orientation,
						s = e ? "height" : "width",
						n = bb._vars.thumbnails[s],
						o = {
							left: e ? 0 : n
						};
					i[s] -= n, this.frames.css(px(o))
				} else {
					this.frames.removeAttr("style")
				}
				bc.visible() && (bc.updateVars(), i.height -= bc._vars.menu.height + bc._vars.caption.height, this._noCaptions && (i.height += bc._vars.caption.height));
				var a = $.extend({}, i);
				switch (this._sideWidth = 0, t) {
					case "outside":
						$.each(this._frames, $.proxy(function(i, t) {
							var e = t.close;
							this._frames.length > 1 && (t._pos && (e = e.add(t._pos)), t._next_button && (e = e.add(t._next_button)));
							var s = 0;
							t._whileVisible(function() {
								$.each(e, function(i, t) {
									s = Math.max(s, $(t).outerWidth(!0))
								})
							}), this._sideWidth = Math.max(this._sideWidth, s) || 0
						}, this)), a.width -= 2 * (this._sideWidth || 0);
						break;
					case "touch":
						var r = getOrientation();
						this._frames && this._frames[0].frame;
						var h = this.move.attr("style");
						this.move.removeAttr("style");
						var d, u;
						this.frames.css(px({
							height: a.height
						})), $.each(this._frames, $.proxy(function(t, e) {
							var s = e.frame;
							if (s.data("portrait")) {
								d = Math.floor(i.width * s.data("portrait")), u = Math.floor(i.width * s.data("landscape"))
							} else {
								var n = e.view.options.touch.width;
								s.data("portrait", Math.max(n.portrait, 0.5)).data("landscape", Math.max(n.landscape, 0.5))
							}
						}, this)), this.setOrientation(r), this._touchWidth = "portrait" == r ? d : u, $.extend(a, {
							width: this._touchWidth || 0
						}), this.move.attr("style", h)
				}
				this._dimensions = i, this._boxDimensions = a, this._top = top
			},
			pn: function() {
				return {
					previous: this._position - 1 > 0,
					next: this._position + 1 <= this._frames.length
				}
			},
			show: function(i, t) {
				var e = [];
				$.each(this._frames, function(t, s) {
					s._position != i && e.push(s)
				});
				var s = e.length + 1,
					n = this._frames[this._position - 1];
				bb[n.view.options.thumbnails ? "show" : "hide"](), bc["touch" == n.view.options.ui ? "show" : "hide"](), ("touch" != n.view.options.ui || "image" != n.view.type) && this.resize();
				var o = n.view.options.effects.content.sync;
				$.each(e, $.proxy(function(e, n) {
					n.hide($.proxy(function() {
						o ? t && 1 >= s-- && t() : 2 >= s-- && this._frames[i - 1].show(t)
					}, this))
				}, this)), o && this._frames[i - 1].show(function() {
					t && 1 >= s-- && t()
				})
			},
			hideAll: function() {
				$.each(this._visible, $.proxy(function(i, t) {
					var e = this._frames[t - 1];
					e._removeVideo(), e.hide()
				}, this)), bb.hide(), this.setXY({
					x: 0,
					y: 0
				})
			},
			hideAllBut: function(i) {
				$.each(this._frames, $.proxy(function(t, e) {
					e.position != i && e.hide()
				}, this))
			},
			setTracking: function(i) {
				this.isTracking(i) || (this._tracking.push(this._frames[i - 1]), 1 == this._tracking.length && this.startTracking())
			},
			clearTracking: function() {
				this._tracking = []
			},
			removeTracking: function(i) {
				this._tracking = $.grep(this._tracking, function(t) {
					return t._position != i
				}), 1 > this._tracking.length && this.stopTracking()
			},
			isTracking: function(i) {
				var t = !1;
				return $.each(this._tracking, function(e, s) {
					return s._position == i ? (t = !0, !1) : void 0
				}), t
			},
			bounds: function() {
				var i = this._dimensions;
				return Z._scrollbarWidth && (i.width -= scrollbarWidth), i
			},
			clearLoads: function() {
				$.each(this._frames, $.proxy(function(i, t) {
					t.clearLoad()
				}, this))
			}
		};
	$.extend(Frame.prototype, {
		initialize: function(i, t) {
			this.view = i, this._position = t, this._dimensions = {}, this.build()
		},
		remove: function() {
			this.clearUITimer(), this._track && (Frames.removeTracking(this._position), this._track = !1), this._removeVideo(), this._reset(), this.frame.remove(), this.frame = null, this.ui && (this.ui.remove(), this.ui = null), this.view = null, this._dimensions = {}, this.clearLoad()
		},
		build: function() {
			var i = this.view.options.ui,
				t = Z.views.length;
			if (Frames.move.append(this.frame = $("<div>").addClass("fr-frame").append(this.box = $("<div>").addClass("fr-box").addClass("fr-box-has-ui-" + i).addClass("fr-box-has-type-" + this.view.type))), this.box.append(this.box_spacer = $("<div>").addClass("fr-box-spacer").append(this.box_padder = $("<div>").addClass("fr-box-padder").append(this.box_outer_border = $("<div>").addClass("fr-box-outer-border").append(this.box_wrapper = $("<div>").addClass("fr-box-wrapper"))))), "image" == this.view.type && "touch" != i && (this.download_image = $("<div>").addClass("fr-download-image")), "touch" == i) {
				this.frame.addClass("fr-frame-touch").show(), "image" == this.view.type && "close" == this.view.options.onClick && (this.frame.addClass("fr-frame-onclick-close"), this.box_wrapper.bind("click", function(i) {
					i.preventDefault(), i.stopPropagation(), Z.hide()
				}))
			} else {
				this.frame.show();
				var e = this.view.options.onClick;
				if ("image" == this.view.type && ("next" == e && (this.view.options.loop || !this.view.options.loop && this._position != Z.views.length) || "close" == e) && this.frame.addClass("fr-frame-onclick-" + e.toLowerCase()), "outside" == i && this.frame.prepend(this.ui = $("<div>").addClass("fr-ui fr-ui-outside")), this.box_spacer.bind("click", $.proxy(function(i) {
					i.target == this.box_spacer[0] && this.view.options.overlay && this.view.options.overlay.close && Z.hide()
				}, this)), "outside" == this.view.options.ui && this.ui.append(this.ui_wrapper = $("<div>").addClass("fr-ui-wrapper-outside")), t > 1 && (this.ui_wrapper.append(this._next = $("<div>").addClass("fr-side fr-side-next").append(this._next_button = $("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-icon"))).data("side", "next")), this._position != t || this.view.options.loop || (this._next.addClass("fr-side-disabled"), this._next_button.addClass("fr-side-button-disabled")), this.ui_wrapper.append(this._previous = $("<div>").addClass("fr-side fr-side-previous").append(this._previous_button = $("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-icon"))).data("side", "previous")), 1 != this._position || this.view.options.loop || (this._previous.addClass("fr-side-disabled"), this._previous_button.addClass("fr-side-button-disabled"))), this.download_image && "inside" == this.view.options.ui && this.ui_wrapper.find(".fr-side").prepend(this.download_image.clone()), this.frame.addClass("fr-no-caption"), (this.view.caption || "inside" == this.view.options.ui && !this.view.caption) && (this["inside" == this.view.options.ui ? "ui_wrapper" : "frame"].append(this.info = $("<div>").addClass("fr-info fr-info-" + this.view.options.ui).append(this.info_background = $("<div>").addClass("fr-info-background")).append(this.info_padder = $("<div>").addClass("fr-info-padder"))), this.info.bind("click", function(i) {
					i.stopPropagation()
				})), this.view.caption && (this.frame.removeClass("fr-no-caption").addClass("fr-has-caption"), this.info_padder.append(this.caption = $("<div>").addClass("fr-caption").html(this.view.caption))), t > 1 && this.view.options.position) {
					var s = this._position + " / " + t;
					this.frame.addClass("fr-has-position");
					var i = this.view.options.ui;
					this["inside" == i ? "info_padder" : "ui_wrapper"]["inside" == i ? "prepend" : "append"](this._pos = $("<div>").addClass("fr-position").append($("<div>").addClass("fr-position-background")).append($("<span>").addClass("fr-position-text").html(s)))
				}
				this.ui_wrapper.append(this.close = $("<div>").addClass("fr-close").bind("click", function() {
					Z.hide()
				}).append($("<span>").addClass("fr-close-background")).append($("<span>").addClass("fr-close-icon"))), "image" == this.view.type && "close" == this.view.options.onClick && this["outside" == this.view.options.ui ? "box_wrapper" : "ui_padder"].bind("click", function(i) {
					i.preventDefault(), i.stopPropagation(), Z.hide()
				}), this.frame.hide()
			}
		},
		_getInfoHeight: function(i) {
			if (!this.view.caption) {
				return 0
			}
			"outside" == this.view.options.ui && (i = Math.min(i, Frames._boxDimensions.width));
			var t, e = this.info.css("width");
			return this.info.css({
				width: i + "px"
			}), t = parseFloat(this.info.css("height")), this.info.css({
				width: e
			}), t
		},
		_whileVisible: function(i, t) {
			var e = [],
				s = Z.element.add(Z.bubble).add(this.frame).add(this.ui);
			t && (s = s.add(t)), $.each(s, function(i, t) {
				e.push({
					visible: $(t).is(":visible"),
					element: $(t).show()
				})
			}), i(), $.each(e, function(i, t) {
				t.visible || t.element.hide()
			})
		},
		getLayout: function() {
			this.updateVars();
			var i = this._dimensions.max,
				t = this.view.options.ui,
				e = this._fit,
				s = this._spacing,
				n = this._border,
				o = Fit.within(i, {
					fit: e,
					ui: t,
					border: n
				}),
				a = $.extend({}, o);
			if (n && (a = Fit.within(a, {
				bounds: o,
				ui: t
			}), o.width += 2 * n, o.height += 2 * n), s.horizontal || s.vertical) {
				var r = $.extend({}, Frames._boxDimensions);
				n && (r.width -= 2 * n, r.height -= 2 * n), r = {
					width: Math.max(r.width - 2 * s.horizontal, 0),
					height: Math.max(r.height - 2 * s.vertical, 0)
				}, a = Fit.within(a, {
					fit: e,
					bounds: r,
					ui: t
				})
			}
			var h = {
				caption: !0
			}, d = !1;
			if ("outside" == t) {
				var s = {
					height: o.height - a.height,
					width: o.width - a.width
				}, u = $.extend({}, a);
				this.caption && this.frame.hasClass("fr-no-caption");
				var l;
				if (this.caption) {
					l = this.caption, this.info.removeClass("fr-no-caption");
					var c = this.frame.hasClass("fr-no-caption");
					this.frame.removeClass("fr-no-caption");
					var p = this.frame.hasClass("fr-has-caption");
					this.frame.addClass("fr-has-caption")
				}
				Z.element.css({
					visibility: "visible"
				}), this._whileVisible($.proxy(function() {
					for (var i = 0, o = 2; o > i;) {
						h.height = this._getInfoHeight(a.width);
						var r = 0.5 * (Frames._boxDimensions.height - 2 * n - (s.vertical ? 2 * s.vertical : 0) - a.height);
						h.height > r && (a = Fit.within(a, {
							bounds: $.extend({}, {
								width: a.width,
								height: Math.max(a.height - h.height, 0)
							}),
							fit: e,
							ui: t
						})), i++
					}
					h.height = this._getInfoHeight(a.width);
					var d = K.viewport();
					(320 >= d.height && 568 >= d.width || 320 >= d.width && 568 >= d.height || h.height >= 0.5 * a.height || h.height >= 0.6 * a.width) && (h.caption = !1, h.height = 0, a = u)
				}, this), l), Z.element.css({
					visibility: "visible"
				}), c && this.frame.addClass("fr-no-caption"), p && this.frame.addClass("fr-has-caption");
				var f = {
					height: o.height - a.height,
					width: o.width - a.width
				};
				o.height += s.height - f.height, o.width += s.width - f.width, a.height != u.height && (d = !0)
			} else {
				h.height = 0
			}
			var m = {
				width: a.width + 2 * n,
				height: a.height + 2 * n
			};
			h.height && (o.height += h.height);
			var v = {
				spacer: {
					dimensions: o
				},
				padder: {
					dimensions: m
				},
				wrapper: {
					dimensions: a,
					bounds: m,
					margin: {
						top: 0.5 * (o.height - m.height) - 0.5 * h.height,
						left: 0.5 * (o.width - m.width)
					}
				},
				content: {
					dimensions: a
				},
				info: h
			};
			"outside" == t && (v.info.top = v.wrapper.margin.top, h.width = Math.min(a.width, Frames._boxDimensions.width));
			var r = $.extend({}, Frames._boxDimensions);
			return "outside" == t && (v.box = {
				dimensions: {
					width: Frames._boxDimensions.width
				},
				position: {
					left: 0.5 * (Frames._dimensions.width - Frames._boxDimensions.width)
				}
			}), v.ui = {
				spacer: {
					dimensions: {
						width: Math.min(o.width, r.width),
						height: Math.min(o.height, r.height)
					}
				},
				padder: {
					dimensions: m
				},
				wrapper: {
					dimensions: {
						width: Math.min(v.wrapper.dimensions.width, r.width - 2 * n),
						height: Math.min(v.wrapper.dimensions.height, r.height - 2 * n)
					},
					margin: {
						top: v.wrapper.margin.top + n,
						left: v.wrapper.margin.left + n
					}
				}
			}, v
		},
		updateVars: function() {
			var i = $.extend({}, this._dimensions.max),
				t = parseInt(this.box_outer_border.css("border-top-width"));
			this._border = t, t && (i.width -= 2 * t, i.height -= 2 * t);
			var e = this.view.options.fit;
			"smart" == e ? e = i.width > i.height ? "height" : i.height > i.width ? "width" : "none" : e || (e = "none"), this._fit = e;
			var s = {
				none: "both",
				width: "y",
				height: "x",
				both: "none"
			}, n = this.view.options.spacing[s[this._fit]];
			this._spacing = n
		},
		clearLoadTimer: function() {
			this._loadTimer && (clearTimeout(this._loadTimer), this._loadTimer = null)
		},
		clearLoad: function() {
			this._loadTimer && this._loading && !this._loaded && (this.clearLoadTimer(), this._loading = !1)
		},
		load: function(i, t) {
			return this._loaded || this._loading ? (this._loaded && this.afterLoad(i), void 0) : (t || Dimensions.cache.get(this.view.url) || Dimensions.preloaded.getDimensions(this.view.url) || Z.loading.start(), this._loading = !0, this._loadTimer = setTimeout($.proxy(function() {
				switch (this.clearLoadTimer(), this.view.type) {
					case "image":
						var e = this.view.options.ui;
						Dimensions.get(this.view.url, {
							dragImage: "touch" != e
						}, $.proxy(function(s, n) {
							if (this.view) {
								this._dimensions._max = s, this._dimensions.max = s, this._loaded = !0, this._loading = !1, this.updateVars();
								var o = this.getLayout();
								this._dimensions.spacer = o.spacer.dimensions, this._dimensions.content = o.content.dimensions, this.content = $("<img>").attr({
									src: this.view.url
								}).addClass("fr-content fr-content-image"), this.box_wrapper.append(this.content), "touch" == e && this.content.bind("dragstart", function(i) {
									i.preventDefault()
								});
								var a;
								this.box_wrapper.append(a = $("<div>").addClass("fr-content-image-overlay")), this.download_image && a.append(this.download_image.clone());
								var r;
								if ("outside" == this.view.options.ui && ((r = this.view.options.onClick) && "next" == r || "previous-next" == r)) {
									var h = this.view.options.loop;
									(this._position != Frames._frames.length || h) && this.box_wrapper.append($("<div>").addClass("fr-onclick-side fr-onclick-next").data("side", "next")), "previous-next" != r || 1 == this._position && !h || this.box_wrapper.append($("<div>").addClass("fr-onclick-side fr-onclick-previous").data("side", "previous")), this.download_image && this.box_wrapper.find(".fr-onclick-side").each($.proxy(function(i, t) {
										var e = $(t).data("side");
										$(t).prepend(this.download_image.clone().data("side", e))
									}, this)), this.frame.delegate(".fr-onclick-side", "click", function(i) {
										var t = $(i.target).closest(".fr-onclick-side").data("side");
										Frames[t]()
									}), this.frame.delegate(".fr-onclick-side", "mouseenter", $.proxy(function(i) {
										var t = $(i.target).closest(".fr-onclick-side").data("side"),
											e = t && this["_" + t + "_button"];
										e && this["_" + t + "_button"].addClass("fr-side-button-active")
									}, this)).delegate(".fr-onclick-side", "mouseleave", $.proxy(function(i) {
										var t = $(i.target).data("side"),
											e = t && this["_" + t + "_button"];
										e && this["_" + t + "_button"].removeClass("fr-side-button-active")
									}, this))
								}
								this.frame.find(".fr-download-image").each($.proxy(function(i, t) {
									var e = $("<img>").addClass("fr-download-image").attr({
										src: this.view.url
									}).css({
										opacity: 0
									}),
										s = $(t).data("side");
									if (Browser.IE && 9 > Browser.IE) {
										var o = parseInt(Z.element.css("z-index")) || 0;
										e.css({
											"z-index": o
										}), $(t).parents().css({
											"z-index": o
										}), /^(x|both)$/.test(this.view.options.overflow || "") && e.hide()
									}
									n.dragImage && !Support.mobileTouch && e.add(this.content).bind("dragstart", $.proxy(function(i) {
										if ("touch" == this.view.options.ui) {
											return i.preventDefault(), void 0
										}
										var t = i.originalEvent,
											e = t.dataTransfer || {};
										if (n.dragImage && e.setDragImage) {
											var s = t.pageX || 0,
												o = t.pageY || 0,
												a = this.content.offset();
											s = Math.round(s - a.left), o = Math.round(o - a.top), 1 > n.dragScale && (s *= n.dragScale, o *= n.dragScale), e.setDragImage(n.dragImage, s, o)
										} else {
											e.addElement ? e.addElement(this.content[0]) : i.preventDefault()
										}
									}, this)), s && e.data("side", s), $(t).replaceWith(e)
								}, this)), this.afterLoad(i, t)
							}
						}, this));
						break;
					case "vimeo":
						var s = {
							width: this.view.options.width,
							height: this.view.options.height
						};
						Dimensions.get(this.view.url, $.proxy(function(t) {
							if (this.view) {
								var e = s.width,
									n = s.height,
									o = t.width,
									a = t.height,
									r = !1;
								(r = e && !n || n && !e) || e && n ? (r && (e && !n ? s.height = e * a / o : s.width = n * o / a), s = Fit.within(t, {
										bounds: s
									})) : s = t, this._movieLoaded(s, i)
							}
						}, this))
				}
			}, this), 10), void 0)
		},
		_movieLoaded: function(i, t) {
			this._dimensions._max = i, this._dimensions.max = i, this._loaded = !0, this._loading = !1, this.updateVars();
			var e = this.getLayout();
			this._dimensions.spacer = e.spacer.dimensions, this._dimensions.content = e.content.dimensions, this.box_wrapper.append(this.content = $("<div>").addClass("fr-content fr-content-" + this.view.type)), "touch" != this.view.options.ui || "youtube" != this.view.type && "vimeo" != this.view.type || (this.resize(), ("youtube" == this.view.type && window.YT || "vimeo" == this.view.type && Support.postMessage) && this.show()), this.afterLoad(t)
		},
		afterLoad: function(i) {
			this.view.options.ui, this.resize(), this.ui && (Support.mobileTouch ? this.box.bind("click", $.proxy(function() {
				this.ui_wrapper.is(":visible") || this.showUI(), this.startUITimer()
			}, this)) : this.ui.delegate(".fr-ui-padder", "mousemove", $.proxy(function() {
				this.ui_wrapper.is(":visible") || this.showUI(), this.startUITimer()
			}, this)));
			var t;
			Frames._frames && (t = Frames._frames[Frames._position - 1]) && (t.view.url == this.view.url || "touch" == t.view.options.ui) && Z.loading.stop(), i && i()
		},
		resize: function() {
			if (this.content) {
				var i = this.getLayout(),
					t = this.view.options.ui;
				this._dimensions.spacer = i.spacer.dimensions, this._dimensions.content = i.content.dimensions, this.box_spacer.css(px(i.spacer.dimensions)), "inside" == t && this.ui_spacer.css(px(i.ui.spacer.dimensions)), this.box_wrapper.add(this.box_outer_border).css(px(i.wrapper.dimensions));
				var e = 0;
				switch ("outside" == this.view.options.ui && i.info.caption && (e = i.info.height), this.box_outer_border.css({
					"padding-bottom": e + "px"
				}), this.box_padder.css(px({
					width: i.padder.dimensions.width,
					height: i.padder.dimensions.height + e
				})), i.spacer.dimensions.width > ("outside" == this.view.options.ui ? i.box.dimensions.width : K.viewport().width) ? this.box.addClass("fr-prevent-swipe") : this.box.removeClass("fr-prevent-swipe"), t) {
					case "outside":
						this.caption && this.info.css(px({
							width: i.info.width
						}))
				}
				if (this.caption) {
					var s = i.info.caption;
					this.caption[s ? "show" : "hide"](), this.frame[(s ? "remove" : "add") + "Class"]("fr-no-caption"), this.frame[(s ? "add" : "remove") + "Class"]("fr-has-caption")
				}
				this.box_padder.add(this.ui_padder).css(px(i.wrapper.margin));
				var n = Frames._boxDimensions,
					o = this._dimensions.spacer;
				this.overlap = {
					y: o.height - n.height,
					x: o.width - n.width
				}, this._track = this.overlap.x > 0 || this.overlap.y > 0, Frames[(this._track ? "set" : "remove") + "Tracking"](this._position), Browser.IE && 8 > Browser.IE && "image" == this.view.type && this.content.css(px(i.wrapper.dimensions))
			}
			this.position()
		},
		position: function() {
			if (this.content) {
				var i = Frames._xyp,
					t = Frames._boxDimensions,
					e = this._dimensions.spacer,
					s = {
						top: 0,
						left: 0
					}, n = this.overlap;
				s.top = n.y > 0 ? 0 - i.y * n.y : 0.5 * t.height - 0.5 * e.height, s.left = n.x > 0 ? 0 - i.x * n.x : 0.5 * t.width - 0.5 * e.width, Support.mobileTouch && (n.y > 0 && (s.top = 0), n.x > 0 && (s.left = 0), this.box_spacer.css({
					position: "relative"
				})), this._style = s, this.box_spacer.css({
					top: s.top + "px",
					left: s.left + "px"
				});
				var o = $.extend({}, s);
				0 > o.top && (o.top = 0), 0 > o.left && (o.left = 0);
				var a = this.view.options.ui;
				switch (a) {
					case "outside":
						var r = this.getLayout();
						if (this.box.css(px(r.box.dimensions)).css(px(r.box.position)), this.view.caption) {
							var h = s.top + r.wrapper.margin.top + r.wrapper.dimensions.height + this._border;
							h > Frames._boxDimensions.height - r.info.height && (h = Frames._boxDimensions.height - r.info.height);
							var d = Frames._sideWidth + s.left + r.wrapper.margin.left + this._border;
							Frames._sideWidth > d && (d = Frames._sideWidth), d + r.info.width > Frames._sideWidth + r.box.dimensions.width && (d = Frames._sideWidth), this.info.css({
								top: h + "px",
								left: d + "px"
							})
						}
				}
			}
		},
		setDimensions: function(i) {
			this.dimensions = i
		},
		insertYoutubeVideo: function() {
			var i = Browser.IE && 8 > Browser.IE,
				t = this.getLayout(),
				e = t.wrapper.dimensions,
				s = $.extend({}, this.view.options.youtube || {}),
				n = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":";
			if ("touch" == this.view.options.ui && (s.autoplay = 0), window.YT) {
				var o;
				this.content.append(this.player_div = $("<div>").append(o = $("<div>")[0])), this.player = new YT.Player(o, {
					height: e.height,
					width: e.width,
					videoId: this.view._data.id,
					playerVars: s,
					events: i ? {} : {
						onReady: $.proxy(function(i) {
							if (this.view.options.youtube.hd) {
								try {
									i.target.setPlaybackQuality(this.view._data.quality)
								} catch (t) {}
							}
							this.resize()
						}, this),
						onStateChange: $.proxy(function(i) {
							i.data > -1 && (this._playing = !0)
						}, this)
					}
				})
			} else {
				var a = $.param(s);
				this.content.append(this.player_iframe = $("<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen>").attr({
					src: n + "//www.youtube.com/embed/" + this.view._data.id + "?" + a,
					height: e.height,
					width: e.width,
					frameborder: 0
				}))
			}
		},
		insertVimeoVideo: function() {
			var i = this.getLayout(),
				t = i.wrapper.dimensions,
				e = $.extend({}, this.view.options.vimeo || {});
			"touch" == this.view.options.ui && (e.autoplay = 0);
			var s = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":",
				n = J() + "vimeo";
			e.player_id = n, e.api = 1;
			var o = $.param(e);
			this.content.append(this.player_iframe = $("<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen>").attr({
				src: s + "//player.vimeo.com/video/" + this.view._data.id + "?" + o,
				id: n,
				height: t.height,
				width: t.width,
				frameborder: 0
			})), window.Froogaloop && $f(this.player_iframe[0]).addEvent("ready", $.proxy(function(i) {
				this.froogaloop = $f(i).addEvent("play", $.proxy(function() {
					this._playing = !0
				}, this))
			}, this))
		},
		_preShow: function() {},
		show: function(i) {
			if ("touch" == this.view.options.ui) {
				if (this._shown) {
					return i && i(), void 0
				}
				this._shown = !0
			}
			this._preShow(), Frames.setVisible(this._position), this.frame.stop(1, 0), this.ui && (this.ui.stop(1, 0), this.showUI(null, !0)), this._track && Frames.setTracking(this._position), this.setOpacity(1, Math.max(this.view.options.effects.content.show, Browser.IE && 9 > Browser.IE ? 0 : 10), $.proxy(function() {
				i && i()
			}, this))
		},
		_postHide: function() {
			this.view && this.content && "touch" != this.view.options.ui && this._removeVideo()
		},
		_removeVideo: function() {
			if (this._playing = !1, this.player_iframe && (this.player_iframe.remove(), this.player_iframe = null), this.player) {
				try {
					this.player.destroy()
				} catch (i) {}
				this.player = null
			}
			this.player_div && (this.player_div.remove(), this.player_div = null), ("youtube" == this.view.type || "vimeo" == this.view.type) && (this.content && this.content.html(""), this.player_div = null, this.player = null, this.player_iframe = null)
		},
		_reset: function(i) {
			Frames.removeTracking(this._position), Frames.setHidden(this._position), this._postHide(i)
		},
		hide: function(i) {
			if ("touch" == this.view.options.ui) {
				return i && i(), void 0
			}
			var t = Math.max(this.view.options.effects.content.hide || 0, Browser.IE && 9 > Browser.IE ? 0 : 10),
				e = this.view.options.effects.content.sync ? "easeInQuad" : "easeOutSine";
			this.frame.stop(1, 0).fadeOut(t, e, $.proxy(function() {
				this._reset(), i && i()
			}, this))
		},
		setOpacity: function(i, t, e) {
			var s = this.view.options.effects.content.sync ? "easeOutQuart" : "easeInSine";
			this.frame.stop(1, 0).fadeTo(t || 0, i, s, e)
		},
		showUI: function(i, t) {
			this.ui && (t ? (this.ui_wrapper.show(), this.startUITimer(), "function" == $.type(i) && i()) : this.ui_wrapper.stop(1, 0).fadeTo(t ? 0 : this.view.options.effects.ui.show, 1, "easeInSine", $.proxy(function() {
				this.startUITimer(), "function" == $.type(i) && i()
			}, this)))
		},
		hideUI: function(i, t) {
			this.ui && "outside" != this.view.options.ui && (t ? (this.ui_wrapper.hide(), "function" == $.type(i) && i()) : this.ui_wrapper.stop(1, 0).fadeOut(t ? 0 : this.view.options.effects.ui.hide, "easeOutSine", function() {
				"function" == $.type(i) && i()
			}))
		},
		clearUITimer: function() {
			this._ui_timer && (clearTimeout(this._ui_timer), this._ui_timer = null)
		},
		startUITimer: function() {
			this.clearUITimer(), this._ui_timer = setTimeout($.proxy(function() {
				this.hideUI()
			}, this), this.view.options.effects.ui.delay)
		},
		hideUIDelayed: function() {
			this.clearUITimer(), this._ui_timer = setTimeout($.proxy(function() {
				this.hideUI()
			}, this), this.view.options.effects.ui.delay)
		}
	}), $.extend(View.prototype, {
		initialize: function(a) {
			var b = arguments[1] || {}, d = {};
			if ("string" == $.type(a)) {
				a = {
					url: a
				}
			} else {
				if (a && 1 == a.nodeType) {
					var c = $(a);
					a = {
						element: c[0],
						url: c.attr("href"),
						caption: c.data("fresco-caption"),
						group: c.data("fresco-group"),
						extension: c.data("fresco-extension"),
						type: c.data("fresco-type"),
						options: c.data("fresco-options") && eval("({" + c.data("fresco-options") + "})") || {}
					}
				}
			} if (a && (a.extension || (a.extension = detectExtension(a.url)), !a.type)) {
				var d = getURIData(a.url);
				a._data = d, a.type = d.type
			}
			return a._data || (a._data = getURIData(a.url)), a.options = a && a.options ? $.extend(!0, $.extend({}, b), $.extend({}, a.options)) : $.extend({}, b), a.options = X.create(a.options, a.type, a._data), $.extend(this, a), this
		}
	});
	var bb = {
		initialize: function(i) {
			this.element = i, this._thumbnails = [], this._vars = {
				orientation: "horizontal",
				thumbnail: {
					height: 0,
					width: 0
				},
				thumbnail_frame: {
					height: 0,
					width: 0
				},
				thumbnails: {
					height: 0,
					width: 0
				}
			}, this.thumbnails = this.element.find(".fr-thumbnails:first"), this.build(), this.block(), this.hide(), this.startObserving()
		},
		build: function() {
			this.thumbnails.append(this.wrapper = $("<div>").addClass("fr-thumbnails-wrapper").append(this._slider = $("<div>").addClass("fr-thumbnails-slider").append(this._previous = $("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-previous").append(this._previous_button = $("<div>").addClass("fr-thumbnails-side-button").append($("<div>").addClass("fr-thumbnails-side-button-background")).append($("<div>").addClass("fr-thumbnails-side-button-icon")))).append(this._thumbs = $("<div>").addClass("fr-thumbnails-thumbs").append(this._slide = $("<div>").addClass("fr-thumbnails-slide"))).append(this._next = $("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-next").append(this._next_button = $("<div>").addClass("fr-thumbnails-side-button").append($("<div>").addClass("fr-thumbnails-side-button-background")).append($("<div>").addClass("fr-thumbnails-side-button-icon")))))), this.measure = $("<div>").addClass("fr-thumbnails fr-thumbnails-horizontal").append($("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-previous")).append($("<div>").addClass("fr-thumbnail")).append($("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-next"))
		},
		startObserving: function() {
			this._slider.delegate(".fr-thumbnail", "click", $.proxy(function(i) {
				i.stopPropagation();
				var t = $(i.target).closest(".fr-thumbnail")[0],
					e = t && $(t).data("fr-position");
				e && (this.setActive(e), Z.setPosition(e))
			}, this)), this._slider.bind("click", function(i) {
				i.stopPropagation()
			}), this._previous.bind("click", $.proxy(this.previousPage, this)), this._next.bind("click", $.proxy(this.nextPage, this))
		},
		load: function(i) {
			if (this.clear(), this._thumbnails = [], !(2 > i.length)) {
				var t = !1;
				if ($.each(i, $.proxy(function(i, e) {
					return "touch" == e.options.ui ? (t = !0, !1) : void 0
				}, this)), !t) {
					var e = "horizontal";
					$.each(i, $.proxy(function(i, t) {
						"vertical" == t.options.thumbnails && (e = "vertical")
					}, this)), this._vars.orientation = e, this.setOrientationClass(e), $.each(i, $.proxy(function(i, t) {
						this._thumbnails.push(new Thumbnail(this._slide, t, i + 1))
					}, this)), Browser.IE && 7 > Browser.IE || this.resize()
				}
			}
		},
		clear: function() {
			$.each(this._thumbnails, function(i, t) {
				t.remove()
			}), this._thumbnails = [], this._position = -1, this._page = -1
		},
		setOrientationClass: function(i) {
			this.thumbnails.removeClass("fr-thumbnails-horizontal fr-thumbnails-vertical").addClass("fr-thumbnails-" + i)
		},
		flipMargins: function(i) {
			$.each(i, $.proxy(function(i, t) {
				this.flipMargin(t)
			}, this))
		},
		flipMargin: function(i) {
			var t = i["margin-left"],
				e = i["margin-right"];
			i["margin-left"] = 0, i["margin-right"] = 0, i["margin-top"] = t, i["margin-bottom"] = e
		},
		flipDimensions: function(i) {
			var t = i.width;
			i.width = i.height, i.height = t
		},
		flipMultiple: function(i) {
			$.each(i, $.proxy(function(i, t) {
				this.flipDimensions(t)
			}, this))
		},
		updateVars: function() {
			var i = Z.element,
				t = Z.bubble,
				e = this._vars,
				s = e.orientation,
				n = K.viewport(),
				o = i.is(":visible");
			o || i.show();
			var a = t.is(":visible");
			a || t.show(), this.thumbnails.before(this.measure);
			var r = this.measure.find(".fr-thumbnails-side-previous:first"),
				h = this.measure.find(".fr-thumbnails-side-next:first"),
				d = this.measure.find(".fr-thumbnail:first"),
				u = this.measure.innerHeight(),
				l = parseInt(this.measure.css("padding-top")) || 0;
			$.extend(e.thumbnails, {
				height: u,
				padding: l
			});
			var c = u - 2 * l,
				p = parseInt(d.css("margin-left"));
			$.extend(e.thumbnail, {
				height: c,
				width: c
			}), $.extend(e.thumbnail_frame, {
				width: c + 2 * p,
				height: u
			}), e.sides = {
				previous: {
					dimensions: {
						width: r.innerWidth(),
						height: u
					},
					margin: {
						"margin-top": 0,
						"margin-bottom": 0,
						"margin-left": parseInt(r.css("margin-left")) || 0,
						"margin-right": parseInt(r.css("margin-right")) || 0
					}
				},
				next: {
					dimensions: {
						width: h.innerWidth(),
						height: u
					},
					margin: {
						"margin-top": 0,
						"margin-bottom": 0,
						"margin-left": parseInt(h.css("margin-left")) || 0,
						"margin-right": parseInt(h.css("margin-right")) || 0
					}
				}
			};
			var f = n["horizontal" == s ? "width" : "height"],
				m = e.thumbnail_frame.width,
				v = this._thumbnails.length;
			e.thumbnails.width = f, e.sides.enabled = v * m / f > 1;
			var w = f,
				g = e.sides,
				b = g.previous,
				_ = g.next,
				x = b.margin["margin-left"] + b.dimensions.width + b.margin["margin-right"] + _.margin["margin-left"] + _.dimensions.width + _.margin["margin-right"];
			e.sides.enabled && (w -= x), w = Math.floor(w / m) * m;
			var y = v * m;
			w > y && (w = y);
			var C = w + (e.sides.enabled ? x : 0);
			e.ipp = w / m, this._mode = "page", 1 >= e.ipp && (w = f, C = f, e.sides.enabled = !1, this._mode = "center"), e.pages = Math.ceil(v * m / w), e.wrapper = {
				width: C + 1,
				height: u
			}, e.thumbs = {
				width: w,
				height: u
			}, e.slide = {
				width: v * m + 1,
				height: u
			}, "vertical" == s && (this.flipMultiple([e.thumbnails, e.wrapper, e.thumbs, e.slide, e.thumbnail_frame, e.thumbnail, e.sides.previous.dimensions, e.sides.next.dimensions]), this.flipMargins([e.sides.previous.margin, e.sides.next.margin])), this.measure.detach(), a || t.hide(), o || i.hide()
		},
		disable: function() {
			this._disabled = !0
		},
		enable: function() {
			this._disabled = !1
		},
		enabled: function() {
			return !this._disabled
		},
		show: function() {
			2 > this._thumbnails.length || (this.enable(), this.thumbnails.show(), this._visible = !0)
		},
		hide: function() {
			this.disable(), this.thumbnails.hide(), this._visible = !1
		},
		visible: function() {
			return !!this._visible
		},
		resize: function() {
			this.updateVars();
			var i = this._vars,
				t = "horizontal" == this._vars.orientation,
				e = i.thumbnails;
			this.thumbnails.css({
				width: e.width + "px",
				height: e.height + "px",
				"min-height": "none",
				"max-height": "none",
				"min-width": "none",
				"max-width": "none",
				padding: 0
			}), $.each(this._thumbnails, function(i, t) {
				t.resize()
			}), this._previous[i.sides.enabled ? "show" : "hide"]().css(px(i.sides.previous.dimensions)).css(px(i.sides.previous.margin)), this._next[i.sides.enabled ? "show" : "hide"]().css(px(i.sides.next.dimensions)).css(px(i.sides.next.margin)), Browser.IE && 9 > Browser.IE && (Z.timeouts.clear("ie-resizing-thumbnails"), Z.timeouts.set("ie-resizing-thumbnails", $.proxy(function() {
				this.updateVars(), this._thumbs.css(px(i.thumbs)), this._slide.css(px(i.slide))
			}, this), 500)), this._thumbs.css(px(i.thumbs)), this._slide.css(px(i.slide));
			var s = $.extend({}, px(i.wrapper));
			s["margin-" + (t ? "left" : "top")] = Math.round(-0.5 * i.wrapper[t ? "width" : "height"]) + "px", s["margin-" + (t ? "top" : "left")] = 0, this.wrapper.css(s), this._previous.css(px(i.sides.previous)), this._previous.css(px(i.sides.next)), this._position && this.moveTo(this._position, !0)
		},
		moveToPage: function(i) {
			if (!(1 > i || i > this._vars.pages || i == this._page)) {
				var t = this._vars.ipp * (i - 1) + 1;
				this.moveTo(t)
			}
		},
		previousPage: function() {
			this.moveToPage(this._page - 1)
		},
		nextPage: function() {
			this.moveToPage(this._page + 1)
		},
		adjustToViewport: function() {
			var i = K.viewport();
			return i
		},
		setPosition: function(i) {
			if (!(Browser.IE && 7 > Browser.IE)) {
				var t = 0 > this._position;
				1 > i && (i = 1);
				var e = this._thumbnails.length;
				i > e && (i = e), this._position = i, this.setActive(i), ("page" != this._mode || this._page != Math.ceil(i / this._vars.ipp)) && this.moveTo(i, t)
			}
		},
		moveTo: function(i, t) {
			this.updateVars();
			var e, s = "horizontal" == this._vars.orientation,
				n = K.viewport()[s ? "width" : "height"],
				o = 0.5 * n,
				a = this._vars.thumbnail_frame[s ? "width" : "height"];
			if ("page" == this._mode) {
				var r = Math.ceil(i / this._vars.ipp);
				this._page = r, e = -1 * a * (this._page - 1) * this._vars.ipp;
				var h = "fr-thumbnails-side-button-disabled";
				this._previous_button[(2 > r ? "add" : "remove") + "Class"](h), this._next_button[(r >= this._vars.pages ? "add" : "remove") + "Class"](h)
			} else {
				e = o + -1 * (a * (i - 1) + 0.5 * a)
			}
			var d = Frames._frames && Frames._frames[Frames._position - 1],
				u = {}, l = {};
			u[s ? "top" : "left"] = 0, l[s ? "left" : "top"] = e + "px", this._slide.stop(1, 0).css(u).animate(l, t ? 0 : d ? d.view.options.effects.thumbnails.slide : 0, $.proxy(function() {
				this.loadCurrentPage()
			}, this))
		},
		block: function() {
			this._blocked = !0
		},
		unblock: function() {
			this._blocked = !1, this._thumbnails.length > 0 && this.loadCurrentPage()
		},
		loadCurrentPage: function() {
			var i = !1;
			this._blocked && (i = !0);
			var t, e;
			if (this._position && this._vars.thumbnail_frame.width && !(1 > this._thumbnails.length)) {
				if ("page" == this._mode) {
					if (1 > this._page) {
						return
					}
					t = (this._page - 1) * this._vars.ipp + 1, e = Math.min(t - 1 + this._vars.ipp, this._thumbnails.length)
				} else {
					var s = "horizontal" == this._vars.orientation,
						n = Math.ceil(this._vars.thumbnails[s ? "width" : "height"] / this._vars.thumbnail_frame[s ? "width" : "height"]);
					t = Math.max(Math.floor(Math.max(this._position - 0.5 * n, 0)), 1), e = Math.ceil(Math.min(this._position + 0.5 * n)), e > this._thumbnails.length && (e = this._thumbnails.length)
				}
				for (var o = t; e >= o; o++) {
					this._thumbnails[o - 1][i ? "build" : "load"]()
				}
			}
		},
		setActive: function(i) {
			this._slide.find(".fr-thumbnail-active").removeClass("fr-thumbnail-active");
			var t = i && this._thumbnails[i - 1];
			t && t.activate()
		},
		refresh: function() {
			this._position && this.setPosition(this._position)
		}
	};
	$.extend(Thumbnail.prototype, {
		initialize: function(i, t, e) {
			this.element = i, this.view = t, this._dimension = {}, this._position = e, this.preBuild()
		},
		preBuild: function() {
			this.thumbnail = $("<div>").addClass("fr-thumbnail").data("fr-position", this._position)
		},
		build: function() {
			if (!this.thumbnail_frame) {
				var i = this.view.options;
				this.element.append(this.thumbnail_frame = $("<div>").addClass("fr-thumbnail-frame").append(this.thumbnail.append(this.thumbnail_wrapper = $("<div>").addClass("fr-thumbnail-wrapper")))), "image" == this.view.type && this.thumbnail.addClass("fr-load-thumbnail").data("thumbnail", {
					view: this.view,
					src: i.thumbnail || this.view.url
				});
				var t = i.thumbnail && i.thumbnail.icon;
				t && this.thumbnail.append($("<div>").addClass("fr-thumbnail-icon fr-thumbnail-icon-" + t));
				var e;
				this.thumbnail.append(e = $("<div>").addClass("fr-thumbnail-overlay").append($("<div>").addClass("fr-thumbnail-overlay-background")).append(this.loading = $("<div>").addClass("fr-thumbnail-loading").append($("<div>").addClass("fr-thumbnail-loading-background")).append($("<div>").addClass("fr-thumbnail-loading-icon"))).append($("<div>").addClass("fr-thumbnail-overlay-border"))), this.thumbnail.append($("<div>").addClass("fr-thumbnail-state")), this.resize()
			}
		},
		remove: function() {
			this.thumbnail_frame && (this.thumbnail_frame.remove(), this.thumbnail_frame = null, this.thumbnail_image = null), this._loading = !1, this._removed = !0
		},
		load: function() {
			if (!this._loaded && !this._loading && bb.visible() && !this._removed) {
				this.thumbnail_wrapper || this.build(), this._loading = !0;
				var i = this.view.options.thumbnail,
					t = i && "boolean" == $.type(i) ? this.view.url : i || this.view.url;
				if (this._url = t, t) {
					if ("vimeo" == this.view.type) {
						if (t == i) {
							Dimensions.preload(this._url, {
								type: "image"
							}, $.proxy(this._afterLoad, this))
						} else {
							var e = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":";
							$.getJSON(e + "//vimeo.com/api/oembed.json?url=" + e + "//vimeo.com/" + this.view._data.id + "&callback=?", $.proxy(function(i) {
								i && i.thumbnail_url ? (this._url = i.thumbnail_url, Dimensions.preload(this._url, {
									type: "image"
								}, $.proxy(this._afterLoad, this))) : (this._loaded = !0, this._loading = !1, this.loading.stop(1, 0).delay(this.view.options.effects.thumbnails.delay).fadeTo(this.view.options.effects.thumbnails.load, 0))
							}, this))
						}
					} else {
						Dimensions.preload(this._url, {
							type: "image"
						}, $.proxy(this._afterLoad, this))
					}
				}
			}
		},
		_afterLoad: function(i) {
			this.thumbnail_frame && this._loading && (this._loaded = !0, this._loading = !1, this._dimensions = i, this.image = $("<img>").attr({
				src: this._url
			}), this.thumbnail_wrapper.prepend(this.image), this.resize(), this.loading.stop(1, 0).delay(this.view.options.effects.thumbnails.delay).fadeTo(this.view.options.effects.thumbnails.load, 0))
		},
		resize: function() {
			if (this.thumbnail_frame) {
				this.thumbnail_frame.css(px(bb._vars.thumbnail_frame));
				var i = "horizontal" == bb._vars.orientation;
				if (this.thumbnail_frame.css(px({
					top: i ? 0 : bb._vars.thumbnail_frame.height * (this._position - 1),
					left: i ? bb._vars.thumbnail_frame.width * (this._position - 1) : 0
				})), this.thumbnail_wrapper) {
					var t = bb._vars.thumbnail;
					if (this.thumbnail.css(px({
						width: t.width,
						height: t.height,
						"margin-top": Math.round(-0.5 * t.height),
						"margin-left": Math.round(-0.5 * t.width),
						"margin-bottom": 0,
						"margin-right": 0
					})), this.image) {
						var e, s = {
								width: t.width,
								height: t.height
							}, n = Math.max(s.width, s.height),
							o = $.extend({}, this._dimensions);
						if (o.width > s.width && o.height > s.height) {
							e = Fit.within(o, {
								bounds: s
							});
							var a = 1,
								r = 1;
							e.width < s.width && (a = s.width / e.width), e.height < s.height && (r = s.height / e.height);
							var h = Math.max(a, r);
							h > 1 && (e.width *= h, e.height *= h), $.each("width height".split(" "), function(i, t) {
								e[t] = Math.round(e[t])
							})
						} else {
							e = Fit.within(o.width < s.width || o.height < s.height ? {
								width: n,
								height: n
							} : s, {
								bounds: this._dimensions
							})
						}
						var d = Math.round(0.5 * s.width - 0.5 * e.width),
							u = Math.round(0.5 * s.height - 0.5 * e.height);
						this.image.css(px($.extend({}, e, {
							top: u,
							left: d
						})))
					}
				}
			}
		},
		activate: function() {
			this.thumbnail.addClass("fr-thumbnail-active")
		}
	});
	var bc = {
		initialize: function(i) {
			this.element = i, this._views = [], this._expanded = !1, this._vars = {
				menu: {},
				caption: {}
			}, this.touchMenu = this.element.find(".fr-touch-menu:first"), this.touchCaption = this.element.find(".fr-touch-caption:first"), this.build(), this.hide(), this.startObserving()
		},
		build: function() {
			this.touchMenu.append(this.menu_wrapper = $("<div>").addClass("fr-touch-menu-wrapper").append($("<div>").addClass("fr-touch-menu-background")).append(this.close = $("<div>").addClass("fr-touch-button fr-touch-close").append($("<span>").addClass("fr-touch-button-background")).append($("<span>").addClass("fr-touch-button-icon")))).hide(), this.touchCaption.append(this.caption_wrapper = $("<div>").addClass("fr-touch-caption-wrapper").append(this.drag = $("<div>").addClass("fr-touch-caption-background")).append(this.info = $("<div>").addClass("fr-touch-caption-info").append(this.info_padder = $("<div>").addClass("fr-touch-caption-info-padder").append(this.caption_wrapper = $("<div>").addClass("fr-touch-caption-text-wrapper").append(this.caption = $("<div>").addClass("fr-touch-caption-text"))))).append(this.more = $("<div>").addClass("fr-touch-button fr-touch-caption-more").append($("<span>").addClass("fr-touch-button-background")).append($("<span>").addClass("fr-touch-button-icon")))).hide()
		},
		startObserving: function() {
			this.close.bind("click", function() {
				Z.hide()
			}), $(window).bind("resize orientationchange", $.proxy(function() {
				Z.states.get("visible") && this.resize()
			}, this)), this.more.bind("click", $.proxy(function() {
				this[this._expanded ? "collapse" : "expand"]()
			}, this)), this.touchCaption.bind("touchmove", $.proxy(function(i) {
				this._scrolling || i.preventDefault()
			}, this))
		},
		show: function() {
			this.enable(), this.touchMenu.show(), this.touchCaption[this._noCaptions ? "hide" : "show"](), this._visible = !0
		},
		hide: function() {
			this.disable(), this.touchMenu.hide(), this.touchCaption.hide(), this._visible = !1
		},
		visible: function() {
			return !!this._visible
		},
		updateVars: function() {
			var i = Z.element,
				t = Z.bubble,
				e = this._vars;
			this.touchCaption.css({
				visibility: "hidden"
			});
			var s = this.more;
			$.each(s, $.proxy(function(i, t) {
				var e = $(t);
				e.data("restore-margin-top", e.css("margin-top")), e.css({
					"margin-top": 0
				})
			}, this));
			var n = i.is(":visible");
			n || i.show();
			var o = t.is(":visible");
			o || t.show();
			var a = this.hasOverflowClass();
			a && this.setOverflowClass(!1);
			var r = this.touchMenu.innerHeight(),
				h = this.touchCaption.innerHeight();
			a && this.setOverflowClass(!0), e.menu.height = r, e.caption.height = h, a || this.setOverflowClass(!0);
			var d = this.touchCaption.innerHeight(),
				u = d > h;
			e.overflow = u, a && this.setOverflowClass(!0), u && (this.setOverflowClass(!0), d = this.touchCaption.innerHeight()), e.caption.overflowHeight = d, this.setOverflowClass(a), $.each(s, $.proxy(function(i, t) {
				var e = $(t);
				e.css({
					"margin-top": e.data("restore-margin-top")
				})
			}, this)), this.touchCaption.css({
				visibility: "visible"
			}), o || t.hide(), n || i.hide()
		},
		hasPaddedClass: function() {
			return this.touchCaption.hasClass("fr-touch-caption-padded")
		},
		setPaddedClass: function(i) {
			this.touchCaption[(i ? "add" : "remove") + "Class"]("fr-touch-caption-padded")
		},
		hasOverflowClass: function() {
			return this.touchCaption.hasClass("fr-touch-caption-overflow")
		},
		setOverflowClass: function(i) {
			this.touchCaption[(i ? "add" : "remove") + "Class"]("fr-touch-caption-overflow")
		},
		disable: function() {
			this._disabled = !0
		},
		enable: function() {
			this._disabled = !1
		},
		enabled: function() {
			return !this._disabled
		},
		load: function(i) {
			this.clear();
			var t = !1;
			$.each(i, $.proxy(function(i, e) {
				this._views.push(e), !t && e.caption && (t = !0)
			}, this)), this.touchCaption[(t ? "remove" : "add") + "Class"]("fr-touch-caption-nocaptions"), this._noCaptions = !t
		},
		clear: function() {
			this._views = [], this.view = null, this._position = -1, this._page = -1
		},
		setPosition: function(i) {
			if (i != this._position) {
				var t = this._views[i - 1];
				if ("touch" == t.options.ui) {
					this.view = t;
					var e = t.caption || "";
					this.caption.html(e), this.resize(), this.collapse(!0)
				}
			}
		},
		resize: function() {
			this.collapse(!0), this.updateVars()
		},
		expand: function(i) {
			this.setOverflowClass(!0), this.setPaddedClass(!0), this._expanded = !0, this.more.addClass("fr-touch-caption-less");
			var t = K.viewport(),
				e = -1 * Math.min(t.height, this._vars.caption.overflowHeight || 0);
			this._vars.caption.overflowHeight > t.height ? (this.info.css({
				height: t.height + "px"
			}).addClass("fr-touch-caption-overflow-scroll"), this._scrolling = !0) : (this.info.css({
				height: "auto"
			}).removeClass("fr-touch-caption-overflow-scroll"), this._scrolling = !1), this.touchCaption.stop(1, 0).animate({
				"margin-top": e + "px"
			}, {
				duration: i ? 0 : this.view.options.effects.touchCaption.slideOut
			})
		},
		collapse: function(i) {
			this._expanded = !1, this.more.removeClass("fr-touch-caption-less"), this.info.scrollTop(0), this.info.css({
				height: "auto"
			}).removeClass("fr-touch-caption-overflow-scroll"), this._scrolling = !1, this.touchCaption.stop(1, 0).animate({
				"margin-top": -1 * (this._vars.caption.height || 0) + "px"
			}, {
				duration: i ? 0 : this.view.options.effects.touchCaption.slideIn,
				complete: $.proxy(function() {
					this.setOverflowClass(!1), this.setPaddedClass(this._vars.overflow)
				}, this)
			})
		}
	}, _Fresco = {
			show: function(b) {
				var c = arguments[1] || {}, position = arguments[2];
				arguments[1] && "number" == $.type(arguments[1]) && (position = arguments[1], c = X.create({}));
				var d = [],
					object_type;
				switch (object_type = $.type(b)) {
					case "string":
					case "object":
						var f = new View(b, c),
							_dgo = "data-fresco-group-options";
						if (f.group) {
							if (_.isElement(b)) {
								var g = $('.fresco[data-fresco-group="' + $(b).data("fresco-group") + '"]'),
									h = {};
								g.filter("[" + _dgo + "]").each(function(i, a) {
									$.extend(h, eval("({" + ($(a).attr(_dgo) || "") + "})"))
								}), g.each(function(i, t) {
									position || t != b || (position = i + 1), d.push(new View(t, $.extend({}, h, c)))
								})
							}
						} else {
							var h = {};
							_.isElement(b) && $(b).is("[" + _dgo + "]") && ($.extend(h, eval("({" + ($(b).attr(_dgo) || "") + "})")), f = new View(b, $.extend({}, h, c))), d.push(f)
						}
						break;
					case "array":
						$.each(b, function(i, t) {
							var e = new View(t, c);
							d.push(e)
						})
				}(!position || 1 > position) && (position = 1), position > d.length && (position = d.length), Frames._xyp || Frames.setXY({
					x: 0,
					y: 0
				}), Z.load(d, position, {
					callback: function() {
						Z.show(function() {})
					}
				})
			}
		};
	$.extend(G, {
		initialize: function() {
			N.check("jQuery"), Z.initialize()
		}
	}), "number" == $.type(Browser.Android) && 3 > Browser.Android || Browser.MobileSafari && "number" == $.type(Browser.WebKit) && 533.18 > Browser.WebKit;
	var bd = {
		image: {
			extensions: "bmp gif jpeg jpg png",
			detect: function(i) {
				return $.inArray(detectExtension(i), this.extensions.split(" ")) > -1
			},
			data: function(i) {
				return this.detect() ? {
					extension: detectExtension(i)
				} : !1
			}
		},
		youtube: {
			detect: function(i) {
				var t = /(youtube\.com|youtu\.be)\/watch\?(?=.*vi?=([a-zA-Z0-9-_]+))(?:\S+)?$/.exec(i);
				return t && t[2] ? t[2] : (t = /(youtube\.com|youtu\.be)\/(vi?\/|u\/|embed\/)?([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(i), t && t[3] ? t[3] : !1)
			},
			data: function(i) {
				var t = this.detect(i);
				return t ? {
					id: t
				} : !1
			}
		},
		vimeo: {
			detect: function(i) {
				var t = /(vimeo\.com)\/([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(i);
				return t && t[2] ? t[2] : !1
			},
			data: function(i) {
				var t = this.detect(i);
				return t ? {
					id: t
				} : !1
			}
		}
	};
	$(document).ready(function() {
		G.initialize()
	}), window.Fresco = G
})(jQuery);