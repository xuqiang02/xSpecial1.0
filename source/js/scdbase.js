
function changeIframeBG(){
		event.stopPropagation();
        //切换弹出层的显示状态
        $("#scd_changebg").toggle(500);
	//photoweb.framebody.find("body").css("backgroundColor","#1245ab");
}

jQuery(function($){
	
	 $("#scd_changebg_close").click(function(){
		 $("#scd_changebg").fadeOut();
	 })
	 $("#scd_colorbtn").click(function(){
		 var scd_color = $("#scd_myColorField").val();
		 photoweb.framebody.find("body").css('backgroundColor',scd_color);
		 photoweb.framebody.find("body").css('backgroundImage','none');
	 })
		$(document).bind("click",function(){ 
		document.getElementById('scd_changebg').style.display = 'none';
		}); 
	 $("#scd_changebg").click(function(){
		try{window.event.cancelBubble = true;}catch(e){event.stopPropagation();}
	 })
	 $(".scd_changeimg").click(function(){
		 var scd_img = $(this).attr("src");
		photoweb.framebody.find("body").css('backgroundImage','url('+scd_img+')');
		$(this).parent().siblings().find('.scd_righticon').css('display','none');
		$(this).parent().find('.scd_righticon').css('display','block');
		$("#scd_tab6 #scd_tab6_txt .scd_bgbtn").css('background-color','#00ccff');
		  $(".scd_bgbtn").val("上传图片");
		  $("#scd_tab6_suc").css('display','none');
		// copy_jpge.CopyJpge(scd_img);
		console.log(scd_img);
	 });
	 $("#scd_changebg_font1").click(function(){
		photoweb.framebody.find("body").css('backgroundRepeat','repeat');                  
	 });
	  $("#scd_changebg_font2").click(function(){
		photoweb.framebody.find("body").css('backgroundRepeat','repeat-x');
	 });
	  $("#scd_changebg_font3").click(function(){
		photoweb.framebody.find("body").css('backgroundRepeat','no-repeat');
	 });
	 
	 $("#scd_changebg_font4").toggle( 
		function () { 
		$('#scd_bgfixed').attr("checked",true);
		photoweb.framebody.find("body").css('backgroundAttachment','fixed');
		}, 
		function () { 
		$('#scd_bgfixed').attr("checked",false);
		photoweb.framebody.find("body").css('backgroundAttachment','inherit');
		} 
		);
	 $("#scd_fileField").change(function(){
		 var objUrl = getObjectURL(this.files[0]) ;
		console.log("objUrl = "+objUrl) ;
		if (objUrl) {
		  $("#scd_bgimg").attr("src", objUrl) ;
		  $("#scd_tab6 #scd_tab6_txt .scd_bgbtn").css('background-color','#fff');
		  $(".scd_bgbtn").val("重新上传");
		  $("#scd_tab6_suc").css('display','block');
		  $("#scd_tab6_img").css('backgroundImage','none');
		  
		  $("#scd_smbtn").click(function(){
			  photoweb.framebody.find("body").css('backgroundImage','url('+objUrl+')');
			  $("#scd_changebg").fadeOut();
			  console.log(objUrl);
			 });
		  }
		  
		 }) ;
		 $("#scd_closebtn").click(function(){
		$("#scd_bgimg").attr("src", "") ;
		photoweb.framebody.find("body").css('background','none');
		 });
		 //cef.aaa( objUrl );
});

$(document).ready(function() {
	$("#scd_content .scd_tab").hide();
	$("#scd_tabs li:first").attr("id","scd_current"); 
	$("#scd_content div:first").fadeIn();
    
    $('#scd_tabs a').click(function(e) {
		$(".scd_changeimg").parent().find('.scd_righticon').css('display','none');
        e.preventDefault();        
        $("#scd_content .scd_tab").hide(); 
        $("#scd_tabs li").attr("id","");
        $(this).parent().attr("id","scd_current");
        $('#' + $(this).attr('title')).fadeIn(); 
    });
});



function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
}

function getBgColor(scdbgcolor) {
       	photoweb.framebody.find("body").css('backgroundColor',scdbgcolor);
}

