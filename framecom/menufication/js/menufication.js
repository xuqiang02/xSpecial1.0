/** Minified JS for Menufication jQuery plugin **/
"use strict";
(function(e) {
	e.fn.extend({
		menufication: function(n) {
			return v[n] && p ? v[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? (e.error("Method " + n + " does not exist for menufication"), void 0) : v.init.apply(this, arguments)
		},
		hasClasses: function(e) {
			var n = e.replace(/\s/g, "").split(","),
				i = this;
			for (var t in n)
				if (jQuery(i).hasClass(n[t])) return !0;
			return !1
		},
		addClasses: function(e) {
			var n = e.replace(/\s/g, "").split(","),
				i = this;
			for (var t in n) jQuery(i).addClass(n[t])
		}
	});
	var n, i, t, o, r, s, a, l, d, c, u, g = !1,
		p = !1,
		f = !1,
		h = "menufication",
		m = 0;
	i = {
		toggleElement: null,
		enableSwipe: !0,
		hideDefaultMenu: !0,
		showHeader: !0,
		customFixedHeader: null,
		menuText: "",
		headerLogo: "../images/logo.png",
		triggerWidth: 770,
		addHomeLink: !0,
		addHomeText: "Home",
		childMenuSupport: !0,
		childMenuSelector: "subnavdiv",
		activeClassSelector: "active-class, active",
		supportAndroidAbove: 3.5,
		onlyMobile: !1,
		transitionDuration: 600,
		scrollSpeed: .6,
		allowedTags: "DIV, NAV, UL, LI, A, P, H1, H2, H3, H4, SPAN",
		wrapTagsInList: "",
		addToFixedHolder: "",
		direction: "left",
		theme: "dark",
		menuLogo: "",
		disableSlideScaling: !1
	};
	var v = {
		init: function(o) {
			p || w.utils.isBB() || w.utils.isOldIE(9) || (n = e(this), o || (o = {}), t = e.extend({}, i, o), (!t.onlyMobile || w.utils.isMobile()) && ((!w.utils.hasTranslate3d() || w.utils.androidVersionIsBelow(t.supportAndroidAbove) || w.utils.isIE()) && (h += "-non-css3"), t.gestures = w.utils.isMobile() && !w.utils.isIE() ? {
				start: "touchstart",
				move: "touchmove",
				end: "touchend",
				click: "click",
				fastClick: "touchend"
			} : {
				start: "mousedown",
				move: "mousemove",
				end: "mouseup",
				click: "click",
				fastClick: "click"
			}, w.utils.androidVersionIsBelow(t.supportAndroidAbove) && (t.gestures.fastClick = "click"), w.scrolling.setScrollHandlers(), t.triggerWidth ? (e(window).bind("resize", function() {
				w.utils.checkTriggerWidth(e(window).width())
			}), w.utils.checkTriggerWidth(e(window).width())) : w.init()))
		},
		openMenu: function() {
			r.addClass(h + "-transition-in"), g = !0, o.bind(t.gestures.move, function(e) {
				e.preventDefault()
			})
		},
		closeMenu: function() {
			r.removeClass(h + "-transition-in"), g = !1, o.unbind()
		},
		toggleMenu: function() {
			g ? v.closeMenu() : v.openMenu()
		}
	}, w = {
			init: function() {
				w.utils.wrapBody([h + "-page-holder", h + "-inner-wrap", h + "-outer-wrap"]), r.addClass(t.theme).addClass(t.direction + "-direction"), t.customFixedHeader ? w.buildCustomFixedHeader() : t.showHeader && w.buildHeader(), w.buildFixedHolder(), w.buildMenu(), w.addEvents(), w.utils.isMobile() ? w.scrolling.addBouncyScroll() : a.addClass(h + "-scroll"), p = !0, e(document).trigger("menufication-done", ["done"])
			},
			buildHeader: function() {
				var n = e('<div id="' + h + '-top" />').append('<div id="' + h + '-btn"><p>' + t.menuText + "</p></div>");
				r.prepend(n).addClass(h + "-add-padding"), t.toggleElement = "#" + h + "-btn"//, t.headerLogo.length > 0 && w.addHeaderLogo(n)
			},
			// addHeaderLogo: function(n) {
			// 	var i = e('<center><img src="' + t.headerLogo + '" id="' + h + '-header-logo" /></center>');
			// 	n.append(i)
			// },
			buildCustomFixedHeader: function() {
				e(t.customFixedHeader).hide().addClass(h + "-original-custom-fixed-header");
				var n = e(t.customFixedHeader).clone();
				n.css("position", "static");
				var i = e('<div class="' + h + '-custom-top" />');
				n.show().removeClass(h + "-original-custom-fixed-header"), r.prepend(i.append(n)).addClass(h + "-add-padding")
			},
			buildFixedHolder: function() {
				if (t.addToFixedHolder && t.addToFixedHolder.length > 0) {
					d = e('<div id="' + h + '-fixed-holder" />');
					var n = t.addToFixedHolder.replace(/\s/g, "").split(",");
					for (var i in n) d.append(e(n[i]));
					r.prepend(d)
				}
			},
			buildMenu: function() {
				t.hideDefaultMenu && n.hide();
				var i = n.clone().removeAttr("id class");
				i = w.trimMenu(i), t.addHomeLink && i.prepend('<li><a href="http://' + window.location.hostname + '">' + t.addHomeText + "</a></li>"), "UL" === i.prop("tagName") ? i.addClass(h + "-menu-level-0") : i.find("ul").first().addClass(h + "-menu-level-0").siblings("ul").addClass(h + "-menu-level-0"), t.childMenuSelector && t.childMenuSupport ? w.buildChildMenus(i) : w.removeChildMenus(i), t.menuLogo.length > 0 && w.addMenuLogo(i), r.prepend(i), i.wrap('<div id="' + h + '-scroll-container" />'), !w.utils.isIOS() && w.utils.isMobile() || t.disableSlideScaling || i.wrap('<div id="' + h + '-transform-container" />'), i.wrap('<nav id="' + h + '-nav" />').show(), s = e("#" + h + "-nav"), a = e("#" + h + "-scroll-container")
			},
			trimMenu: function(n) {
				var o = t.activeClassSelector ? t.activeClassSelector : "",
					r = t.childMenuSelector ? t.childMenuSelector : "",
					s = t.allowedTags ? t.allowedTags.replace(/\s/g, "").split(",") : i.allowedTags;
				return n.find("*").each(function() {
					var n = e(this),
						i = n.prop("tagName");
					if (-1 === s.indexOf(i) || n.hasClass("skip-link")) return n.remove(), void 0;
					if ("A" === i) {
						var a = n.text().toLowerCase(),
							l = a.charAt(0).toUpperCase() + a.slice(1);
						n.text(l)
					}
					t.wrapTagsInList === i && n.wrap("li"), n.hasClasses(r) ? (n.removeAttr("class id"), n.addClasses(r)) : n.hasClasses(o) ? (n.removeAttr("class id"), n.addClass(h + "-active-class")) : n.removeAttr("class id")
				}), n
			},
			addMenuLogo: function(n) {
				var i = e('<center><img src="' + t.menuLogo + '" id="' + h + '-menu-logo" /></center>');
				n.prepend(i)
			},
			buildChildMenus: function(n) {
				var i = t.childMenuSelector.replace(/\s/g, "").split(",");
				for (var o in i) n.find("." + i[o]).each(function() {
					var n = e(this);
					n.removeAttr("id class"), n.addClass(h + "-child-menu"), n.parent().addClass(h + "-has-child-menu").bind(t.gestures.click, function(i) {
						"A" !== i.target.nodeName && (i.preventDefault(), e(this).toggleClass(h + "-child-menu-open"), n.toggle(), i.stopPropagation())
					})
				}), t.activeClassSelector && w.toggleActiveClasses(n);
				w.countMenuLevel(n)
			},
			countMenuLevel: function(n) {
				n.find("." + h + "-child-menu").each(function() {
					var n = e(this),
						i = n.parents("." + h + "-child-menu").length + 1;
					n.addClass(h + "-menu-level-" + i)
				})
			},
			removeChildMenus: function(n) {
				if (!t.childMenuSupport) {
					if (!t.childMenuSelector || t.childMenuSelector === i.childMenuSelector) return n.find("." + h + "-menu-level-0").children().each(function() {
						e(this).find("ul").remove()
					}), void 0;
					var o = t.childMenuSelector.replace(/\s/g, "").split(",");
					for (var r in o) n.find("." + o[r]).each(function() {
						e(this).remove()
					})
				}
			},
			toggleActiveClasses: function(n) {
				n.find("." + h + "-has-child-menu").each(function() {
					var n = e(this);
					n.find("*").children("." + h + "-active-class").length > 0 && (n.toggleClass(h + "-child-menu-open"), setTimeout(function() {
						n.addClass(h + "-child-menu-open"), n.find("." + h + "-child-menu").first().show()
					}, t.transitionDuration))
				})
			},
			addEvents: function() {
				t.toggleElement && e(t.toggleElement).bind(t.gestures.fastClick, function(e) {
					e.preventDefault(), e.stopPropagation(), v.toggleMenu()
				}), t.enableSwipe && w.utils.isMobile() && w.enableSwipeEvent()
			},
			removeEvents: function() {
				e(t.toggleElement).unbind(), a.unbind()
			},
			enableSwipeEvent: function() {
				var n, i, o, r, s, a = e("#" + h + "-outer-wrap");
				a.bind(t.gestures.start, function(e) {
					o = (new Date).getTime(), n = e.originalEvent.touches[0].pageX, i = e.originalEvent.touches[0].clientY
				}), a.bind(t.gestures.move, function(e) {
					r = e.originalEvent.touches[0].pageX, s = e.originalEvent.touches[0].clientY
				}), a.bind(t.gestures.end, function() {
					var e = r > n ? "right" : "left",
						a = s - i > 40 || -40 > s - i,
						l = r - n > 90 || -90 > r - n,
						d = (new Date).getTime();
					if (!(d - o > 600 || a) && l) switch (e) {
						case "left":
							"left" === t.direction ? v.closeMenu() : v.openMenu();
							break;
						case "right":
							"left" === t.direction ? v.openMenu() : v.closeMenu()
					}
				})
			},
			prevDefault: function(e) {
				e.preventDefault(), e.stopPropagation()
			},
			scrolling: {
				scrollHandlers: {},
				addBouncyScroll: function() {
					c = document.getElementById(h + "-nav"), a.bind(t.gestures.start, function(e) {
						m = w.scrolling.scrollHandlers.getTop(c);
						var n = e.originalEvent.touches[0].pageY;
						u = n
					}), a.bind(t.gestures.move, function(e) {
						e.preventDefault(), w.scrolling.checkTouchMove(e)
					}), a.bind(t.gestures.end, function() {
						w.scrolling.checkScrollEffect()
					})
				},
				checkTouchMove: function(e) {
					var n = e.originalEvent.touches[0].pageY;
					m = w.scrolling.scrollHandlers.getTop(), w.scrolling.scrollHandlers.setTop(n), u = n
				},
				checkScrollEffect: function() {
					w.scrolling.setScrollData(), w.scrolling.scrollHandlers.bounceBack()
				},
				setScrollHandlers: function() {
					w.scrolling.scrollHandlers = !w.utils.hasTranslate3d() || w.utils.androidVersionIsBelow(t.supportAndroidAbove) || w.utils.isIE() ? {
						getTop: function() {
							return parseInt(getComputedStyle(c).top, 10)
						},
						setTop: function(e) {
							c.style.top = u >= e ? m + 1.1 * (e - u) + "px" : m - 1.1 * (u - e) + "px"
						},
						bounceBack: function(e, n, i) {
							if (w.scrolling.isAtBottom()) {
								var i = w.utils.isAndroid() ? 15 : 20;
								s.animate({
									top: -(l.navHeight - l.windowHeight - i)
								}, t.transitionDuration)
							} else w.scrolling.isAtTop() && s.animate({
								top: 0
							}, t.transitionDuration)
						}
					} : {
						getTop: function() {
							return new WebKitCSSMatrix(window.getComputedStyle(c).webkitTransform).m42
						},
						setTop: function(e) {
							c.style.webkitTransform = u >= e ? "translateY(" + (m + (e - u) * t.scrollSpeed) + "px)" : "translateY(" + (m - (u - e) * t.scrollSpeed) + "px)"
						},
						bounceBack: function(e, n, i) {
							if (w.scrolling.isAtBottom()) {
								s.addClass(h + "-add-transition");
								var i = w.utils.isAndroid() ? 15 : 20;
								c.style.webkitTransform = "translateY(" + -(l.navHeight - l.windowHeight - i) + "px)", w.scrolling.removeTransitionClass(t.transitionDuration)
							} else w.scrolling.isAtTop() && (s.addClass(h + "-add-transition"), c.style.webkitTransform = "translateY(0px)", w.scrolling.removeTransitionClass(t.transitionDuration))
						}
					}
				},
				setScrollData: function() {
					l = {
						navHeight: s.height(),
						windowHeight: e(window).height()
					}
				},
				isAtTop: function() {
					return m > 0 || 0 > m && l.navHeight < l.windowHeight
				},
				isAtBottom: function() {
					return l.navHeight + m < l.windowHeight && l.navHeight > l.windowHeight
				},
				removeTransitionClass: function(e) {
					setTimeout(function() {
						s.removeClass(h + "-add-transition")
					}, e)
				}
			},
			utils: {
				reset: function() {
					e("." + h + "-custom-top").hide(), e("#" + h + "-top").hide(), r.removeClass(h + "-add-padding"), n.show(), w.removeEvents(), v.closeMenu(), e("." + h + "-original-custom-fixed-header").show(), e(document).trigger("menufication-reset", ["done"])
				},
				reapply: function() {
					e("." + h + "-custom-top").show(), e("#" + h + "-top").show(), r.addClass(h + "-add-padding"), t.hideDefaultMenu && n.hide(), w.addEvents(), e("." + h + "-original-custom-fixed-header").hide(), e(document).trigger("menufication-reapply", ["done"])
				},
				checkTriggerWidth: function(e) {
					t.triggerWidth >= e && !f ? (p ? w.utils.reapply() : w.init(), f = !0) : e > t.triggerWidth && f && (f = !1, w.utils.reset())
				},
				wrapBody: function(n) {
					for (var i in n) {
						var t = document.createElement("div");
						for (t.id = n[i]; document.body.firstChild;) t.appendChild(document.body.firstChild);
						document.body.appendChild(t)
					}
					e("body").show(), o = e("#" + h + "-inner-wrap"), r = e("#" + h + "-outer-wrap")
				},
				hasTranslate3d: function() {
					var e, n = document.createElement("p"),
						i = {
							webkitTransform: "-webkit-transform",
							OTransform: "-o-transform",
							msTransform: "-ms-transform",
							MozTransform: "-moz-transform",
							transform: "transform"
						};
					document.body.insertBefore(n, null);
					for (var t in i) void 0 !== n.style[t] && (n.style[t] = "translate3d(1px,1px,1px)", e = window.getComputedStyle(n).getPropertyValue(i[t]));
					return document.body.removeChild(n), void 0 !== e && e.length > 0 && "none" !== e
				},
				isMobile: function() {
					return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
				},
				isAndroid: function() {
					return navigator.userAgent.match(/Android/i)
				},
				isIOS: function() {
					return navigator.userAgent.match(/iPhone|iPad|iPod/i)
				},
				isIE: function() {
					return navigator.userAgent.match(/IEMobile/i) || -1 != navigator.appVersion.indexOf("MSIE")
				},
				isBB: function() {
					return navigator.userAgent.match(/BlackBerry|BB10|RIM/i)
				},
				isOldIE: function(e) {
					var n = -1 != navigator.appVersion.indexOf("MSIE");
					return n && e > parseFloat(navigator.appVersion.split("MSIE")[1])
				},
				androidVersionIsBelow: function(e) {
					var n = navigator.userAgent;
					if (n.indexOf("Android") >= 0) {
						var i = parseFloat(n.slice(n.indexOf("Android") + 8));
						if (e > i) return !0
					}
					return !1
				}
			}
		}
})(jQuery);