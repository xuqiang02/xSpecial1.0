var pluginArr = [];
var pluginIndex = 0;
var dragelement = {};
var coderplugin = {};
var selectdom = {};
var hasSelectDom = false;
var viewmood = false;
var gridbasevalue=100;
$(document).ready(function() {
	restoreData();
	//右键菜单
	$(document).bind('contextmenu',function(e){ 
		if(e.target.nodeName.match(/UL|LI/)){
			return false;
		}

		else if(e.pageX>selectdom.posleft && e.pageX<selectdom.posright && e.pageY>selectdom.postop && e.pageY<selectdom.posbottom){
			creatContextMenu(e.pageX,e.pageY,e.target);
		}
		return false;
	});

	//容器hover效果
	// $('body').on('mouseover', '.gridSystemContainer>.container,.gridSystemContainer>.section', function(event) {
	// 	event.preventDefault();
	// 	$(this).addClass('hover');
	// 	// console.log("container in");
	// });
	// $('body').on('mouseout', '.gridSystemContainer>.container,.gridSystemContainer>.section', function(event) {
	// 	event.preventDefault();
	// 	$(this).removeClass('hover');
	// 	// console.log("container out");
	// });
	// $('body').on('mouseover', '[class*="span"],[class*="col"]', function(event) {
	// 	event.preventDefault();
	// 	$(this).addClass('hover');
	// 	// console.log("span in");
	// 	event.stopPropagation();
	// });
	// $('body').on('mouseout', '[class*="span"],[class*="col"]', function(event) {
	// 	event.preventDefault();
	// 	$(this).removeClass('hover');
	// 	// console.log("span out");
	// });



	// $('body').on('click', '#gridControlInsertBefore', function(event) {
	// 	event.preventDefault();
	// 	gridControlInsertBefore(selectdom.dom);
	// 	event.stopPropagation();
	// });
	// $('body').on('click', '#gridControlInsertAfter', function(event) {
	// 	event.preventDefault();
	// 	gridControlInsertAfter(selectdom.dom);
	// 	event.stopPropagation();
	// });
	// $('body').on('click', '#gridControlMoveBefore', function(event) {
	// 	event.preventDefault();
	// 	gridControlMoveBefore(selectdom.dom);
	// 	event.stopPropagation();
	// });
	// $('body').on('click', '#gridControlMoveAfter', function(event) {
	// 	event.preventDefault();
	// 	gridControlMoveAfter(selectdom.dom);
	// 	event.stopPropagation();
	// });
	// $('body').on('click', '#gridControlDeleteGrid', function(event) {
	// 	event.preventDefault();
	// 	gridControlDeleteGrid(selectdom.dom);
	// 	event.stopPropagation();
	// });
	$('body').on('click', '#comcontrolEdit', function(event) {
		event.preventDefault();
		comcontrolEdit(selectdom.dom);
		event.stopPropagation();
	});
	$('body').on('click', '#comcontrolDelete', function(event) {
		event.preventDefault();
		comcontrolDelete(selectdom.dom);
		event.stopPropagation();
	});
	$('body').on('click', '#comcontrolEditText', function(event) {
		event.preventDefault();
		comcontrolEditText(selectdom.dom);
		event.stopPropagation();
	});
	// $('body').on('click', '#gridControlChangeWidth', function(event) {
	// 	event.preventDefault();
	// 	gridControlChangeWidth(selectdom.dom);
	// 	event.stopPropagation();
	// });
	
	$('body').on('click', '.changeComClass', function(event) {
		event.preventDefault();
		changeComClass(selectdom.dom, $(this).attr("classvalue"));
		event.stopPropagation();
	});
	$('body').on('click', '#gridControlAll', function(event) {
		event.preventDefault();
		parent.getcomstar();
		parent.makegridcontrol(selectdom.dom);
		deleteContextMenu();
		event.stopPropagation();
	});



	//网格的拆分
	// $('body').on('click', '.gridcutbefore', function(event) {
	// 	event.preventDefault();
	// 	var dom=$(this).parent().parent();
	// 	if(dom.siblings('div').length>4){
	// 		parent.photowebMessage("在一行当中最多添加6列，已达到上线，不能插入");
	// 		return false;
	// 	}
	// 	else{
	// 		$('<div class="span0"><div class="gridhandle"><div class="griddelete"></div><div class="gridcutbefore"></div><div class="gridcutafter"></div></div></div>').droppable({
	// 			accept: ".tempComContainer",
	// 			activeClass: "ui-state-highlight",
	// 			hoverClass: "ui-state-hover",
	// 			// handle: ".gridmove",
	// 			drop: function(event, ui) {
	// 				ui.draggable.css({"top":"0px","left":"0px"});
	// 				$(this).append(ui.draggable);
	// 			}
	// 		}).insertBefore(dom);
	// 		switch(dom.siblings('div').length){
	// 			case 1: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"span6"))});break;
	// 			case 2: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"span4"))});break;
	// 			case 3: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"span3"))});break;
	// 			case 4: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"col3"))});break;
	// 			case 5: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"span2"))});break;
	// 		}
	// 	}
	// 	event.stopPropagation();
	// });
	// $('body').on('click', '.gridcutafter', function(event) {
	// 	event.preventDefault();
	// 	var dom=$(this).parent().parent();
	// 	if(dom.siblings('div').length>4){
	// 		parent.photowebMessage("在一行当中最多添加6列，已达到上线，不能插入");
	// 		return false;
	// 	}
	// 	else{
	// 		$('<div class="span0"><div class="gridhandle"><div class="griddelete"></div><div class="gridcutbefore"></div><div class="gridcutafter"></div></div></div>').droppable({
	// 			accept: ".tempComContainer",
	// 			activeClass: "ui-state-highlight",
	// 			hoverClass: "ui-state-hover",
	// 			// handle: ".gridmove",
	// 			drop: function(event, ui) {
	// 				ui.draggable.css({"top":"0px","left":"0px"});
	// 				$(this).append(ui.draggable);
	// 			}
	// 		}).insertAfter(dom);
	// 		switch(dom.siblings('div').length){
	// 			case 1: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"span6"))});break;
	// 			case 2: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"span4"))});break;
	// 			case 3: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"span3"))});break;
	// 			case 4: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"col3"))});break;
	// 			case 5: dom.parent().children().each(function(index, el) {$(this).attr("class",$(this).attr("class").replace(/span\d+|col\d+/,"span2"))});break;
	// 		}
	// 	}
	// 	event.stopPropagation();
	// });



	//网格和组件选择
	$('body').on('click', '.row>[class*="span"],.row>[class*="col"],.row-fluid>[class*="span"],.row-fluid>[class*="col"],.tempComContainer', function(event) {
		event.preventDefault();
		if (!viewmood) {
			updateDragAssistLine($(this));
		}
		event.stopPropagation();
	});
	//直接网格和组件右键
	// $('body').on('contextmenu', '.row>[class*="span"],.row>[class*="col"],.row-fluid>[class*="span"],.row-fluid>[class*="col"],.tempComContainer', function(event) {
	$('body').on('contextmenu', '.tempComContainer', function(event) {
		event.preventDefault();
		if (!viewmood) {
			if (event.target.nodeName.match(/UL|LI/)) {
				return false;
			} else {
				updateDragAssistLine($(this));
				creatContextMenu(event.pageX, event.pageY, event.target);
			}
			event.stopPropagation();
		} else {
			return false;
		}
	});
	$('body').click(function(event) {
		deleteDragAssistLine();
	});

	//容器删除
	$('body').on('click', '.containerdelete', function(event) {
		event.preventDefault();
		$(this).parent().parent().remove();
	});



	//html5拖拽进入
	$('#gridSystemContainer').bind("dragenter", function(ev) {
		// console.log('我被拖拽了：');
		// console.log($(ev.target));
		// updateDragAssistLine($(ev.target));
	});



	//html5拖拽移动
	$('#gridSystemContainer').bind("dragover", function(ev) {
		ev.preventDefault();
		// console.log('我被移动了：');
		// console.log($(ev.target));
	});



	//html5拖拽移出
	$('#gridSystemContainer').bind("dragleave", function(ev) {
		// console.log('我被移出了：');
		// console.log($(ev.target));
		// hideDragAssistLine($(ev.target));
	});



	//html5拖拽放置
	$('#gridSystemContainer').bind("drop", function(ev) {
		// console.log(dragelement.dom);
		if (dragelement.dom) {
			var type = dragelement.type;
			var name = dragelement.name;
			var targetclass = $(ev.target).attr('class');
			var acceptclassLen = null;
			if ((typeof targetclass) == "string") {
				acceptclassLen = targetclass.match(/span\d{1,2}|col\d{1,2}/);
			}
			if (acceptclassLen) {
				$.get('com/' + type + '/' + name + '/code.html', function(data) {
					data = data.replace(/%compath%[\/]*/gi, "com/" + type + "/" + name + "/images/");
					if ($(data).hasClass('sbplugin') || $(data).find('.sbplugin').length > 0) {
						var tempComContainer = $('<div class="tempComContainer pluginrec"><div class="comcover"></div><div class="tempcode"></div></div>');
						tempComContainer.attr("pluginIndex", pluginIndex);
						tempComContainer.data('code', data).find(".tempcode").append(data).find('.sbplugin').sbPlugin();
						var json = {
							name: name,
							type: type,
							code: data
						}
						pluginArr[pluginIndex] = json;
						pluginIndex++;
					} else {
						var tempComContainer = $('<div class="tempComContainer"><div class="comcover"></div><div class="tempcode"></div></div>');
						tempComContainer.data('code', data).find(".tempcode").append(data);
					}
					for (var i in dragelement) {
						tempComContainer.data(i, dragelement[i]);
					}
					$(ev.target).append(tempComContainer);
					// console.log(dragelement.usejs);
					if (dragelement.usejs) {
						var sbplugin=tempComContainer.find('.sbplugin');
						console.log("含有插件，开始架子啊");
						if (sbplugin.length > 0) {
							var sbint=setInterval(function(){
								console.log("开始等待");
								if (tempComContainer.find('.sbplugin').attr("pluginloading")=="done"){
									console.log("等到了");
									// $.getScript('com/' + type + '/' + name + '/control.js');
									var link = $("script#script_" + type + "_" + name);
									if (link.length > 0) {
										link.attr("scriptindex", parseInt(link.attr("scriptindex")) + 1);
									} else {
										var scripttag = document.createElement('script');
										scripttag.setAttribute('type', 'text/javascript');
										scripttag.setAttribute('id', "script_" + type + "_" + name);
										scripttag.setAttribute('plugin', tempComContainer.find('.sbplugin').data('name'));
										scripttag.setAttribute('path', "com/" + type + "/" + name + "/control.js");
										scripttag.setAttribute('class', "newcomscript");
										scripttag.setAttribute('scriptindex', "1");
										$("head")[0].appendChild(scripttag);
									}
									window.clearInterval(sbint);
									console.log("停止");
								}
							},500);
						}
						else{
							$.getScript('com/' + type + '/' + name + '/control.js');
							var link = $("script#script_" + type + "_" + name);
							if (link.length > 0) {
								link.attr("scriptindex", parseInt(link.attr("scriptindex")) + 1);
							} else {
								var scripttag = document.createElement('script');
								scripttag.setAttribute('type', 'text/javascript');
								scripttag.setAttribute('id', "script_" + type + "_" + name);
								scripttag.setAttribute('path', "com/" + type + "/" + name + "/control.js");
								scripttag.setAttribute('class', "newcomscript");
								scripttag.setAttribute('scriptindex', "1");
								$("head")[0].appendChild(scripttag);
								console.log(scripttag);
							}
						}
					}
					if (dragelement.usestyle) {
						var link = $("link#" + type + "_" + name);
						if (link.length > 0) {
							link.attr("cssindex", parseInt(link.attr("cssindex")) + 1);
						} else {
							var csstag = document.createElement('link');
							csstag.setAttribute('type', 'text/css');
							csstag.setAttribute('rel', 'stylesheet');
							csstag.setAttribute('id', type + "_" + name);
							csstag.setAttribute('href', "com/" + type + "/" + name + "/style.css");
							csstag.setAttribute('class', "newcomstyle");
							csstag.setAttribute('cssindex', "1");
							$("head")[0].appendChild(csstag);
						}
					}

					initcom(tempComContainer, tempComContainer.data());
					dragelement = {};
					deleteDragAssistLine();
				});
			} else {
				parent.photowebMessage("亲，您只能将组件拖拽到网格内");
				dragelement = {};
			}
		}
	});
});

//网格系统添加
function addContainer() {
	// var containerhtml=$('<div class="container"><div class="containerhandle"><div class="containerdelete"></div><div class="containermove"></div></div></div>');
	var containerhtml = $('<div class="container photowebcontainer photowebcontainerouter"></div>');
	var gridhtml = $('<div class="row-fluid"><div class="span12"></div></div>');
	gridhtml.find('[class*="span"],[class*="col"]').each(function(index, el) {
		// var gridhandle = $('<div class="gridhandle"><div class="griddelete"></div><div class="gridcutbefore"></div><div class="gridcutafter"></div></div>');
		// $(this).prepend(gridhandle);
		initgrid($(this));
	});
	containerhtml.append(gridhtml).appendTo($('#gridSystemContainer'));

}

function initgrid(obj) {
	obj.droppable({
		accept: ".tempComContainer",
		activeClass: "ui-state-highlight",
		hoverClass: "ui-state-hover",
		drop: function(event, ui) {
			ui.draggable.css({
				"top": "0px",
				"left": "0px"
			});
			$(this).append(ui.draggable);
		}
	});
}

function initcom(obj, comdata) {
	obj.find('[data-spy="scroll"]').each(function() {
		var $spy = $(this)
		$spy.superbirdscrollspy($spy.data())
	})
	obj.find('[data-spy="affix"]').each(function() {
		var $spy = $(this),
			data = $spy.data()

			data.offset = data.offset || {}

		data.offsetBottom && (data.offset.bottom = data.offsetBottom)
		data.offsetTop && (data.offset.top = data.offsetTop)
		$spy.superbirdaffix(data)
	})
	obj.draggable({
		handle: ".comcover",
		revert: "invalid",
		appendTo: "body",
		distance: 50,
		cursorAt: {
			left: 60,
			top: 60
		},
		iframeFix: true,
		scroll: true,
		start: function(event, ui) {
			$(this).parent().removeClass('hover');
			if ($(this).data("hasicon")) {
				$(this).find(".comcover").css("backgroundImage", "url('com/" + comdata.type + "/" + comdata.name + "/icon.png')");
			} else {
				$(this).find(".comcover").css("backgroundImage", "url('com/defaulticon.png')");
			}
			deleteDragAssistLine();
		},
		stop: function(event, ui) {
			$(this).find(".comcover").css("backgroundImage", "");
		}
	});
}

function addSelectDom(dom) {
	var x = dom.offset().left;
	var y = dom.offset().top;
	var height = dom.outerHeight();
	var width = dom.width();
	selectdom.dom = dom;
	selectdom.postop = y;
	selectdom.posright = x + width;
	selectdom.posbottom = y + height;
	selectdom.posleft = x;
	if (dom.attr("class").match(/span\d{1,2}|col\d{1,2}/)) {
		selectdom.domtype = "grid";
	} else {
		selectdom.domtype = "com";
	}

}

function deleteSelectDom() {
	selectdom = {};
	hasSelectDom = false;
}
//更新辅助线
function updateDragAssistLine(dom) {
	// if (!hasSelectDom) {
	// 	$('<div class="dragassistline" id="dragassistline_top"><div class="dragassistControl"></div></div><div class="dragassistline" id="dragassistline_right"><div class="dragassistControl"></div></div><div class="dragassistline" id="dragassistline_bottom"><div class="dragassistControl"></div></div><div class="dragassistline" id="dragassistline_left"><div class="dragassistControl"></div></div>').appendTo('body');
	// 	hasSelectDom = true;
	// }
	if(! hasSelectDom){
		$('<div class="dragassistline" id="dragassistline_top"></div><div class="dragassistline" id="dragassistline_right"></div><div class="dragassistline" id="dragassistline_bottom"></div><div class="dragassistline" id="dragassistline_left"></div>').appendTo('body');
		hasSelectDom=true;
	}
	var x = dom.offset().left;
	var y = dom.offset().top;
	var height = dom.outerHeight();
	var width = dom.outerWidth();
	addSelectDom(dom);
	deleteContextMenu();
	// if(parent.photoweb.isComContainerOpen){
	// 	if(selectdom.domtype=="grid"){
	// 		if($(parent).find(".controlpanalcontainer").length>0){
	// 			parent.getcomstar();
	// 			parent.makegridcontrol(selectdom.dom);
	// 		}
	// 	}
	// 	else if(selectdom.domtype=="com"){
	// 		parent.controlpanelclose();
	// 	}
	// }
	if(selectdom.domtype=="grid"){
		parent.getcomstar();
		parent.makegridcontrol(selectdom.dom);
	}
	else if(selectdom.domtype=="com"){
		parent.controlpanelclose();
	}
	$('#dragassistline_top').width(width).css({
		top: y + "px",
		left: x + "px"
	});
	$('#dragassistline_bottom').width(width).css({
		top: y + height + "px",
		left: x + "px"
	});
	$('#dragassistline_left').height(height).css({
		top: y + 1 + "px",
		left: x + "px"
	});
	$('#dragassistline_right').height(height).css({
		top: y + 1 + "px",
		left: x + width + "px"
	});
}
//删除辅助线
function deleteDragAssistLine() {
	$('.dragassistline').remove();
	deleteSelectDom();
	deleteContextMenu();
	if(parent.photoweb.isComContainerOpen){
		parent.controlpanelclose();
	}
}
//添加右键菜单
function creatContextMenu(x, y, domtarget) {
	deleteContextMenu();
	if (domtarget.className.match(/comcover/)) {
		var contextmenu = $('<ul id="contextmenu"></ul>');
		contextmenu.css({
			top: y,
			left: x
		});
		var classoption = selectdom.dom.find('[classoption]');
		if (classoption.length > 0) {
			var classarr = classoption.attr('classoption').split(",");
			var html = "<li>类型选择<ul>";
			for (var i in classarr) {
				var result = classarr[i].match(/\[[A-Za-z0-9_\-\u4e00-\u9fa5]+\]/);
				if (result != null) {
					html += '<li class="changeComClass" classvalue="' + classarr[i].replace(/\[[A-Za-z0-9_\-\u4e00-\u9fa5]+\]/, "") + '">' + result[0] + '</li>';
				} else {
					html += '<li class="changeComClass" classvalue="' + classarr[i] + '">' + classarr[i] + '</li>';
				}
			}
			html += "</ul></li>";

			$(html).appendTo(contextmenu);

		}
		// 临时注释
		// if (selectdom.dom.data("usesass")) {
		// 	$('<li id="comcontrolEdit">编辑样式</li>').appendTo(contextmenu);
		// }
		// if (selectdom.dom.data("type") == "text") {
			$('<li id="comcontrolEditText">编辑文本</li>').appendTo(contextmenu);
		// }
		$('<li id="comcontrolDelete">删除</li>').appendTo(contextmenu);
		contextmenu.appendTo('body');
	}
}
//删除右键菜单
function deleteContextMenu() {
	$('#contextmenu').remove();
}
//向前添加网格
function gridControlInsertBefore(obj) {
	var dom = $(obj);
	if (dom.siblings('div').length > 4) {
		parent.photowebMessage("在一行当中最多添加6列，已达到上线，不能插入");
		return false;
	} else {
		$('<div class="span0"></div>').droppable({
			accept: ".tempComContainer",
			activeClass: "ui-state-highlight",
			hoverClass: "ui-state-hover",
			// handle: ".gridmove",
			drop: function(event, ui) {
				ui.draggable.css({
					"top": "0px",
					"left": "0px"
				});
				$(this).append(ui.draggable);

			}
		}).insertBefore(dom);
		switch (dom.siblings('div').length) {
			case 1:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "span6"))
				});
				break;
			case 2:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "span4"))
				});
				break;
			case 3:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "span3"))
				});
				break;
			case 4:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "col3"))
				});
				break;
			case 5:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "span2"))
				});
				break;
		}
	}
	deleteContextMenu();
	updateDragAssistLine(dom);

}
// 向后添加网格
function gridControlInsertAfter(obj) {
	var dom = $(obj);
	if (dom.siblings('div').length > 4) {
		parent.photowebMessage("在一行当中最多添加6列，已达到上线，不能插入");
		return false;
	} else {
		$('<div class="span0"></div>').droppable({
			accept: ".tempComContainer",
			activeClass: "ui-state-highlight",
			hoverClass: "ui-state-hover",
			// handle: ".gridmove",
			drop: function(event, ui) {
				ui.draggable.css({
					"top": "0px",
					"left": "0px"
				});
				$(this).append(ui.draggable);

			}
		}).insertAfter(dom);
		switch (dom.siblings('div').length) {
			case 1:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "span6"))
				});
				break;
			case 2:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "span4"))
				});
				break;
			case 3:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "span3"))
				});
				break;
			case 4:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "col3"))
				});
				break;
			case 5:
				dom.parent().children().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d+|col\d+/, "span2"))
				});
				break;
		}
	}
	deleteContextMenu();
	updateDragAssistLine(dom);

}
//向上添加网格
function gridControlInsertTop(obj){
	var dom=$('<div class="container photowebcontainer photowebcontainerouter"><div class="row-fluid"><div class="span12"></div></div></div>');
	dom.find('[class*="span"],[class*="col"]').each(function(index, el) {
		initgrid($(this));
	});
	dom.insertBefore(obj.parentsUntil(".photowebcontainer").parent());
	updateDragAssistLine(obj);
}
//向下添加网格
function gridControlInsertBottom(obj){
	var dom=$('<div class="container photowebcontainer photowebcontainerouter"><div class="row-fluid"><div class="span12"></div></div></div>');
	dom.find('[class*="span"],[class*="col"]').each(function(index, el) {
		initgrid($(this));
	});
	dom.insertAfter(obj.parentsUntil(".photowebcontainer").parent());
	updateDragAssistLine(obj);
}
// 网格前移
function gridControlMoveBefore(obj) {
	if (obj.prev().length) {
		obj.insertBefore(obj.prev());
	} else {
		parent.photowebMessage("已经移动到当前行的起始位置，不能继续移动")
	}
	deleteContextMenu();
	updateDragAssistLine(selectdom.dom);

}
// 网格后移
function gridControlMoveAfter(obj) {
	if (obj.next().length) {
		obj.insertAfter(obj.next());
	} else {
		parent.photowebMessage("已经移动到当前行的末尾位置，不能继续移动")
	}
	deleteContextMenu();
	updateDragAssistLine(selectdom.dom);

}
//内部插入
function gridControlInsertInner(obj){
	var dom=$('<div class="photowebcontainer photowebcontainerinner"><div class="row-fluid notfullrow"><div class="span6"></div><div class="span6"></div></div></div>');
	dom.find('[class*="span"],[class*="col"]').each(function(index, el) {
		initgrid($(this));
	});
	dom.appendTo(obj);
	updateDragAssistLine(obj);
}
//网格删除
function gridControlDeleteGrid(obj) {
	if (obj.siblings('div').length > 0) {
		switch (obj.siblings('[class*="span"],[class*="col"]').length) {
			case 1:
				obj.siblings().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d|col\d/, "span12"))
				});
				break;
			case 2:
				obj.siblings().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d|col\d/, "span6"))
				});
				break;
			case 3:
				obj.siblings().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d|col\d/, "span4"))
				});
				break;
			case 4:
				obj.siblings().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d|col\d/, "span3"))
				});
				break;
			case 5:
				obj.siblings().each(function(index, el) {
					$(this).attr("class", $(this).attr("class").replace(/span\d|col\d/, "col3"))
				});
				break;
		}
		var newdom=$(obj.siblings('[class*="span"],[class*="col"]')[0]);
		updateDragAssistLine($(obj.siblings('[class*="span"],[class*="col"]')[0]));
		obj.remove();
		updateDragAssistLine(newdom);
	} else if(obj.parent().parent().attr("class").match(/photowebcontainerinner/)){
		var newdom=obj.parentsUntil('[class*="span"],[class*="col"]').parent();
		if(newdom){
			obj.parentsUntil('[class*="span"],[class*="col"]').remove();
			updateDragAssistLine(newdom);
		}
	} else if(obj.parent().parent().attr("class").match(/photowebcontainerouter/)){
		obj.parent().parent().remove();
		deleteDragAssistLine();
	}
}
// 宽度转换
function gridControlChangeWidth(obj) {
	if (obj.parent().parent().attr("class") == "container") {
		obj.parent().parent().attr("class", "section");
		obj.parent().attr("class", "row-fluid");
	} else {
		obj.parent().parent().attr("class", "container");
		obj.parent().attr("class", "row");
	}
	updateDragAssistLine(selectdom.dom);
}
function gridControlChangefull(obj) {
	if(obj.parent().parent().attr("class").match(/photowebcontainerinner/)){
		obj.parent().removeClass('notfullrow');
	}
	else if(obj.parent().parent().attr("class").match(/photowebcontainerouter/)){
		obj.parent().parent().removeClass('container').addClass('section');
	}
	else{
		return false;
	}
	updateDragAssistLine(selectdom.dom);
}
function gridControlChangeauto(obj) {
	if(obj.parent().parent().attr("class").match(/photowebcontainerinner/)){
		obj.parent().addClass('notfullrow');
	}
	else if(obj.parent().parent().attr("class").match(/photowebcontainerouter/)){
		obj.parent().parent().removeClass('section').addClass('container');
	}
	else{
		return false;
	}
	updateDragAssistLine(selectdom.dom);
}
// 组件编辑
function comcontrolEdit(obj) {
	// parent.updatacss(obj.data("type"),obj.data("name"));
	console.log(obj.data("type") + "/" + obj.data("name"));
	try {
		cef_edit.ProcessEditAction(obj.data("type") + "/" + obj.data("name"));
		deleteContextMenu();
	} catch (e) {
		deleteContextMenu();
	}
}
// 组件删除
function comcontrolDelete(obj) {
	if (obj.data('usestyle') == true) {
		var link = $("link#" + obj.data('type') + "_" + obj.data('name'));
		if (parseInt(link.attr("cssindex")) > 1) {
			link.attr("cssindex", parseInt(link.attr("cssindex")) - 1);
		} else {
			link.remove();
		}
	}
	if (obj.data('usejs') == true) {
		var link = $("script#script_" + obj.data('type') + "_" + obj.data('name'));
		if (parseInt(link.attr("scriptindex")) > 1) {
			link.attr("scriptindex", parseInt(link.attr("scriptindex")) - 1);
		} else {
			link.remove();
		}
	}
	obj.find(".sbplugin").each(function(index, el) {
		if ($(el).attr("usecss") == "false") {

		} else {
			var name = $(el).attr("name");
			var link = $('link.newpluginstyle[name=' + name + ']');
			if (parseInt(link.attr("cssindex")) > 1) {
				link.attr("cssindex", parseInt(link.attr("cssindex")) - 1);
			} else {
				link.remove();
			}
		}
	});
	pluginArr[obj.attr("pluginIndex")] = null;
	obj.remove();
	deleteDragAssistLine();

}
//编辑文本
function comcontrolEditText(obj) {
	var code=$(obj.data("code"));
	var codetextarr=[];
	var textarr = [];
	var textarea = ''
	obj.find(".tempcode *").each(function(index, el) {
		if ($(el).context.childElementCount == 0 && $(el).text().length > 0) {
			textarr.push($(el));
			textarea+="<textarea>"+$(el).text()+"</textarea>"
		}
	});
	code.find("*").each(function(index, el) {
		if ($(el).context.childElementCount == 0 && $(el).text().length > 0) {
			codetextarr.push($(el));
		}
	});
	var back
	back = flippant.flip(obj[0], "<div class='flippanthead'><p>数据编辑<img class='sbflippantclose' src='images/toolsicon/softclose.png'/></p></div> <div class='flippantbody'>" + textarea + '</div><div class="flippantfoot"><button class="sbupdatetext">更新</button></div>',"modal")
	back.addEventListener('click', function(e) {
		if (e.target.classList.contains('sbupdatetext')) {
			for(i in textarr){
				textarr[i].text($(back).find("textarea").eq(i).val());
				//codetextarr[i].text($(back).find("textarea").eq(i).val());
			}
			obj.data("code",code.html());
			back.close();
		}
		if (e.target.classList.contains('sbflippantclose')) {
			back.close();
		}
	})
	deleteContextMenu();

}
// 修改组件CLASS
function changeComClass(obj, newclass) {
	obj.find('[classoption]').attr("class", newclass);
	deleteDragAssistLine();

}



// var currentDocument = null;
// var timerSave = 1000;
// var stopsave = 0;
// var startdrag = 0;
// var demoHtml = $("#gridSystemContainer").html();
// var currenteditor = null;
// var layouthistory;
//输出结构
function outputhtml() {
	var web = $("#gridSystemContainer").clone(true);
	web.find(".tempComContainer").each(function(index, el) {
		var html = $("<com></com>");
		for (var i in $(el).data()) {
			html.append("<" + i + ">" + $(el).data(i) + "</" + i + ">");
		}
		html.insertBefore($(el));
		$(el).remove();
	});
	return web.html();
}
//解析输入结构
function inputhtml(str) {
	$("#gridSystemContainer").html(str).appendTo('body').siblings().remove();
	$('.newcomstyle,.newpluginstyle').remove();
	pluginArr = [];
	pluginIndex = 0;
	initContainer();
	$("#gridSystemContainer").find("com").each(function(index, el) {
		var data = $(el).find('code').html();
		var type = $(el).find('type').html();
		var name = $(el).find('name').html();
		var intro = $(el).find('intro').html();
		var css3 = $(el).find('css3').html() == "true" ? true : false;
		var response = $(el).find('response').html() == "true" ? true : false;
		var usestyle = $(el).find('usestyle').html() == "true" ? true : false;
		var usesass = $(el).find('usesass').html() == "true" ? true : false;
		var usejs = $(el).find('usejs').html() == "true" ? true : false;
		var hasicon = $(el).find('hasicon').html() == "true" ? true : false;
		if ($(data).hasClass('sbplugin') || $(data).find('.sbplugin').length > 0) {
			var tempComContainer = $('<div class="tempComContainer pluginrec"><div class="comcover"></div><div class="tempcode"></div></div>');
			tempComContainer.attr("pluginIndex", pluginIndex);
			tempComContainer.data('code', data).find(".tempcode").append(data).find('.sbplugin').sbPlugin();
			var json = {
				name: name,
				type: type,
				code: data
			}
			pluginArr[pluginIndex] = json;
			console.log(json);
			pluginIndex++;
		} else {
			var tempComContainer = $('<div class="tempComContainer"><div class="comcover"></div><div class="tempcode"></div></div>');
			tempComContainer.data('code', data).find(".tempcode").append(data);
		}
		tempComContainer.data({
			'type': type,
			'name': name,
			'intro': intro,
			'css3': css3,
			'response': response,
			'usestyle': usestyle,
			'usesass': usesass,
			'usejs': usejs,
			'hasicon': hasicon
		})
		// for(var i in tempComContainer.data()){
		// 	console.log(i+":"+tempComContainer.data(i))
		// }
		if (usejs) {
			$.getScript('com/' + type + '/' + name + '/control.js');
		}
		if (usestyle) {
			var link = $("link#" + type + "_" + name);
			if (link.length > 0) {
				link.attr("cssindex", parseInt(link.attr("cssindex")) + 1);
			} else {
				var csstag = document.createElement('link');
				csstag.setAttribute('type', 'text/css');
				csstag.setAttribute('rel', 'stylesheet');
				csstag.setAttribute('id', type + "_" + name);
				csstag.setAttribute('href', "com/" + type + "/" + name + "/style.css");
				csstag.setAttribute('class', "newcomstyle");
				csstag.setAttribute('cssindex', "1");
				$("head")[0].appendChild(csstag);
			}
		}

		$(el).before(tempComContainer).remove();
		initcom(tempComContainer, tempComContainer.data());
		dragelement = {};
		deleteDragAssistLine();
	});
}
//输出加密
function jiami(str) {
	var html = escape(str);
	var len = html.length;
	var arr = [];
	for (i = 0; i < len; i++) {
		arr[i] = html.charAt(i);
	}
	arr.reverse();
	return arr.join("");
}
//输入解密
function jiemi(str) {
	var len = str.length;
	var arr = [];
	for (i = 0; i < len; i++) {
		arr[i] = str.charAt(i);
	}
	arr.reverse();
	return unescape(arr.join(""));
}
//判断是否支持存储
function supportstorage() {
	if (typeof window.localStorage == 'object')
		return true;
	else
		return false;
}
//将当前代码保存
function handleSaveLayout() {
	var e = $("#gridSystemContainer").html();
	if (!stopsave && e != window.demoHtml) {
		stopsave++;
		window.demoHtml = e;
		saveLayout();
		stopsave--;
	}
}

function saveLayout() {
	var data = layouthistory;
	if (!data) {
		data = {};
		data.count = 0;
		data.list = [];
	}
	if (data.list.length > data.count) {
		for (i = data.count; i < data.list.length; i++)
			data.list[i] = null;
	}
	data.list[data.count] = window.demoHtml;
	data.count++;
	if (supportstorage()) {
		localStorage.setItem("layoutdata", JSON.stringify(data));
	}
	layouthistory = data;
}
//撤销与重做
function undoLayout() {
	var data = layouthistory;
	//console.log(data);
	if (data) {
		if (data.count < 2) return false;
		window.demoHtml = data.list[data.count - 2];
		data.count--;
		$('#gridSystemContainer').html(window.demoHtml);
		if (supportstorage()) {
			localStorage.setItem("layoutdata", JSON.stringify(data));
		}
		return true;
	}
	return false;
}

function redoLayout() {
	var data = layouthistory;
	if (data) {
		if (data.list[data.count]) {
			window.demoHtml = data.list[data.count];
			data.count++;
			$('#gridSystemContainer').html(window.demoHtml);
			if (supportstorage()) {
				localStorage.setItem("layoutdata", JSON.stringify(data));
			}
			return true;
		}
	}
	return false;
}
//清除
function clearDemo() {
	$(".demo").empty();
	layouthistory = null;
	if (supportstorage())
		localStorage.removeItem("layoutdata");
}

function restoreData() {
	if (supportstorage()) {
		layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
		if (!layouthistory) return false;
		window.demoHtml = layouthistory.list[layouthistory.count - 1];
		if (window.demoHtml) $("#gridSystemContainer").html(window.demoHtml);
	}
}
//初始化网格
function initContainer() {
	$('#gridSystemContainer').find(">*>*>div").each(function(index, el) {
		initgrid($(this));
	});
}
//初始化组件
function configurationElm(e, t) {
	$(".demo").delegate(".configuration > a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel"))
	});
	$(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().parent();
		var n = t.parent().parent().next().next().children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		var r = "";
		t.find("a").each(function() {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
}
//文本编辑
(function(e) {
  if ("function" == typeof bootstrap) bootstrap("flippant", e);
  else if ("object" == typeof exports) module.exports = e();
  else if ("function" == typeof define && define.amd) define(e);
  else if ("undefined" != typeof ses) {
    if (!ses.ok()) return;
    ses.makeFlippant = e
  } else "undefined" != typeof window ? window.flippant = e() : global.flippant = e()
})(function() {
  var define, ses, bootstrap, module, exports;
  return (function(e, t, n) {
    function i(n, s) {
      if (!t[n]) {
        if (!e[n]) {
          var o = typeof require == "function" && require;
          if (!s && o) return o(n, !0);
          if (r) return r(n, !0);
          throw new Error("Cannot find module '" + n + "'")
        }
        var u = t[n] = {
          exports: {}
        };
        e[n][0].call(u.exports, function(t) {
          var r = e[n][1][t];
          return i(r ? r : t)
        }, u, u.exports)
      }
      return t[n].exports
    }
    var r = typeof require == "function" && require;
    for (var s = 0; s < n.length; s++) i(n[s]);
    return i
  })({
    1: [
      function(require, module, exports) {
        exports.flip = flip

        function flip(flipper, content, type, class_name, timeout) {
          var position, back, style_func
            timeout = timeout || 400
            type = type || "card"

          if (type === "modal") {
            class_name = class_name || "flippant-modal-dark"
            position = "fixed"
            style_func = null_styles
          }

          if (type === "card") {
            class_name = class_name || "flippant-modal-light"
            position = "absolute"
            style_func = card_styles
          }

          back = document.createElement('div')
          document.body.appendChild(back)
          set_styles(back, flipper, position)
          back.innerHTML = content

          flipper.classList.add('flippant')
          back.classList.add('flippant-back')
          back.classList.add(class_name)
          if (position == "absolute") {
            style_func(back)
          } else {
            window.setTimeout(function() {
              style_func(back)
            }, 0)
          }
          window.setTimeout(function() {
            back.classList.add('flipper')
            back.classList.add('flipped')
            flipper.classList.add('flipped')
          }, 0)

          back.addEventListener('close', close)
          back.close = close

          function close() {
            set_styles(back, flipper, position)
            back.classList.remove('flipped')
            back.classList.remove('flipped')
            flipper.classList.remove('flipped')
            window.setTimeout(function() {
              back.classList.remove(class_name)
              document.body.removeChild(back)
            }, timeout)
          }

          return back
        }

        function set_styles(back, front, position) {
          back.style.position = position
          back.style.top = front.offsetTop + "px"
          back.style.left = front.offsetLeft + "px"
          back.style['min-height'] = front.offsetHeight + "px"
          back.style.width = front.offsetWidth + "px"
          back.style["z-index"] = 9999
        }

        function null_styles(back) {
          back.style.top = null
          back.style.left = null
          back.style.height = null
          back.style.width = null
        }

        function card_styles(back) {
          back.style.height = 'auto'
        }
      }, {}
    ]
  }, {}, [1])(1)
});;