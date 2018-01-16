$(function() {
	$('.userNavWrap li').on('click',  function(event) {
		event.preventDefault();
		var $self=$(this),
			index=$self.index();
		$self.addClass('active').siblings().removeClass('active');
		$('.userAppraise .userCon:eq('+index+')').show().siblings('.userCon').hide();
	});
});