$(function() { 
	
$(".scd_product_img").mouseover(function(){
   $(this).find($(".scd_hoverdiv")).fadeIn();
  })
$(".scd_product_img").mouseleave(function(){
   $(this).find($(".scd_hoverdiv")).fadeOut();
  })
})