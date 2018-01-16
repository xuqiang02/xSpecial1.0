var pluginArr=[];
var pluginIndex=0;
var dragelement={
	dom:null,
	type:null,
	name:null
};
$(document).ready(function() {
	$('body').on('click', '.tempComContainer .handle .comdelete', function(event) {
		event.preventDefault();
		var dom=$(this).parentsUntil(".tempComContainer").parent();
		pluginArr[dom.attr("pluginIndex")]=null;
		$(this).parentsUntil(".tempComContainer").parent().remove();
	});
	$('body').on('click', '.tempComContainer .handle .comedit', function(event) {
		event.preventDefault();
		var dom=$(this).parentsUntil(".tempComContainer").parent();
		var name=dom.data("name");
		var type=dom.data("type");
		var code=dom.data("code");
		console.log(name+type+code);
		// 
		cef_edit.ProcessEditAction( "carousel" );
	});
	$('body').on('click', '.griddelete', function(event) {
		event.preventDefault();
		var dom=$(this).parent().parent();
		if(dom.siblings().length==0){
			$(this).parentsUntil("code").parent().remove();
		}
		else{
			dom.remove();
		}
	});
	$('body').on('click', '.containerdelete', function(event) {
		event.preventDefault();
		$(this).parent().parent().remove();
	});

	$('#gridSystemContainer').bind("dragover", function(ev) {
		// console.log("dragover");
		ev.preventDefault();
	});

	$('#gridSystemContainer').bind("drop", function(ev) {
		// console.log("drop");
		if(dragelement.dom){
			var type=dragelement.type;
			var name=dragelement.name;
			var targetclass=$(ev.target).attr('class');
			var acceptclassLen=null;
			if((typeof targetclass)=="string"){
				acceptclassLen=targetclass.match(/span\d{1,2}|col\d{1,2}|container|section/);
			}
			if(type=="container"){
				
				if(targetclass.match(/gridSystemContainer/)){
					$.get('com/'+type+'/'+name+'.xml', function(data) {
						var xmldom=null;
						if (window.ActiveXObject) {   
							xmldom=$(data).find('code')[0].xml;
						} else {   
							xmldom= new XMLSerializer().serializeToString($(data).find('code')[0]);
						}
						xmldom = $(xmldom).find('.container,.section');
						var gridhandle = $('<div class="containerhandle"><div class="containerdelete"></div><div class="containermove"></div></div>');
						xmldom.append(gridhandle);
						$(ev.target).append(xmldom);
						xmldom.parent().sortable({
							handle: ".containerhandle .containermove",
							revert: true
						}).disableSelection();
					});
				}
				else{
					parent.photowebMessage("亲，您只能将容器组件拖拽到页面空白处");
				}
			}
			else if(type=="grid"){
				if(targetclass.match(/span\d{1,2}|col\d{1,2}|container|section/)){
					$.get('com/'+type+'/'+name+'.xml', function(data) {
						if (window.ActiveXObject) {   
							var html=$(data).find('code')[0].xml;
						} else {   
							var html= new XMLSerializer().serializeToString($(data).find('code')[0]);
						}
						var gridsys = $(html);
						var grid = gridsys.find('[class*="span"],[class*="col"]');
						var row = gridsys.find('.row,.row-fluid');
						$(ev.target).append(gridsys);
						grid.each(function(index, el) {
							var gridhandle = $('<div class="gridhandle"><div class="griddelete"></div><div class="gridmove"></div></div>');
							$(this).prepend(gridhandle);
							$(this).droppable({
								accept: ".tempComContainer",
								activeClass: "ui-state-highlight",
								hoverClass: "ui-state-hover",
								handle: ".gridmove",
								drop: function(event, ui) {
									var code=ui.draggable.data("code");
									var name=ui.draggable.data("name");
									var type=ui.draggable.data("type");
									var tempComContainer=$('<div class="tempComContainer" type="'+type+'"><div class="handle"><div class="comdelete"></div><div class="comedit"></div><div class="commove"></div></div></div>');
									if (type=="plugin") {
										tempComContainer.attr("pluginIndex",ui.draggable.attr("pluginIndex"));
									};
									tempComContainer.data({code:code,name:name,type:type}).append(code);
									$(this).append(tempComContainer).find('.sbplugin').sbPlugin();
									tempComContainer.draggable({
										handle: ".handle .commove",
										revert: "invalid",
										appendTo: "body",
										opacity: 0.35,
										cursorAt: {
											left: 45
										},
										iframeFix: true,
										scroll: true
										// helper: "clone"
									});
									ui.draggable.remove();
								}
							});
						});
						row.sortable({
							handle: ".gridmove",
							revert: true
						});
					});
				}
				else{
					parent.photowebMessage("亲，您只能将网格组件拖拽到容器内");
				}
			}
			else{
				if(acceptclassLen){
					$.get('com/'+type+'/'+name+'.xml', function(data) {
						if (window.ActiveXObject) {   
							var html=$(data).find('code')[0].xml;
						} else {   
							var html= new XMLSerializer().serializeToString($(data).find('code')[0]);
						}
						var haveplugin=$(html).find('.sbplugin');
						var tempComContainer=$('<div class="tempComContainer" type="'+type+'"><div class="handle"><div class="comdelete"></div><div class="comedit"></div><div class="commove"></div></div><div class="comcover"></div></div>');
						if(haveplugin){
							tempComContainer.attr("pluginIndex",pluginIndex);
							tempComContainer.data({code:html,name:name,type:type}).append(html).find('.sbplugin').sbPlugin();
							var json={
								name:name,
								type:type,
								code:html,
								// options:$(html).find('.sbplugin').attr("options")||""
							}
							pluginArr[pluginIndex]=json;
							pluginIndex++;
						}
						else{
							tempComContainer.data({code:html,name:name,type:type}).append(html);
						}
						$(ev.target).append(tempComContainer);
						tempComContainer.draggable({
							handle: ".handle .commove",
							revert: "invalid",
							appendTo: "body",
							opacity: 0.35,
							cursorAt: {
								left: 45
							},
							iframeFix: true,
							scroll: true,
							// helper: "clone"
						});
					});
				}
				else{
					parent.photowebMessage("亲，您只能将组件拖拽到网格内");
				}
			} 
		}
	});

	function getxmlcode(name,type){
		$.get('com/'+type+'/'+name+'.xml', function(data) {
			var html=null;
			if (window.ActiveXObject) {   
				html=$(data).find('code')[0].xml;
			} else {   
				html= new XMLSerializer().serializeToString($(data).find('code')[0]);
			}
			return $(html);
		});
	}
});

// var sortable = {
// 	yes: function() {
// 		$('.row').sortable({
// 			connectWith: ".row",
// 			revert: true,
// 			disabled: false
// 		});
// 		$('.row div[class*="span"],.row div[class*="col"]').droppable({
// 			accept: ".tempComContainer",
// 			activeClass: "ui-state-highlight",
// 			hoverClass: "ui-state-hover",
// 			// scope:"test",//分组
// 			drop: function(event, ui) {
// 				var a = ui.draggable.detach();
// 				a.attr("style", "");
// 				$(this).append(a);
// 			}
// 		});
// 	},
// 	no: function() {
// 		$('body').sortable({
// 			disabled: true
// 		});
// 		$('.row').sortable({
// 			disabled: true
// 		});
// 	}
// }
// var initgrid = function(obj) {
// 	var gridsys = $(obj);
// 	var grid = gridsys.find('[class*="span"],[class*="col"]');
// 	var row = gridsys.find('.row,.row-fluid');
// 	$('body').append(gridsys);
// 	grid.each(function(index, el) {
// 		var gridhandle = $('<div class="gridhandle"><div class="griddelete"></div><div class="gridedit"></div><div class="gridmove"></div></div>');
// 		$(this).prepend(gridhandle);
// 		$(this).droppable({
// 			accept: ".tempComContainer",
// 			activeClass: "ui-state-highlight",
// 			hoverClass: "ui-state-hover",
// 			handle: ".gridmove",
// 			drop: function(event, ui) {
// 				var a = ui.draggable.detach();
// 				a.attr("style", "");
// 				$(this).append(a);
// 			}
// 		});
// 	});
// 	row.sortable({
// 		connectWith: ".row",
// 		handle: ".gridmove",
// 		revert: true,
// 		disabled: false
// 	});
// }
// var initplugin = function(obj) {
// 	var dom = $(obj);
// 	dom.draggable({
// 		handle: ".handle .commove",
// 		revert: "invalid",
// 		appendTo: "body",
// 		opacity: 0.35,
// 		cursorAt: {
// 			left: 45
// 		},
// 		iframeFix: true,
// 		scroll: true,
// 		helper: "clone"
// 	});
// 	dom.find('.sbplugin').sbPlugin();
// }
// var basecom = {
// 	draggable: function(obj) {
// 		$(obj).draggable({
// 			handle: ".handle .commove",
// 			revert: "invalid",
// 			appendTo: "body",
// 			opacity: 0.35,
// 			cursorAt: {
// 				left: 45
// 			},
// 			iframeFix: true,
// 			scroll: true,
// 			helper: "clone"
// 			// scope:"test",//分组
// 			// snap:true,//自动吸附
// 			// snapMode: 'inner',//吸附方式
// 			// snapTolerance: 40//吸附距离
// 		});
// 	}
// }