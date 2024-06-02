$(document).ready(function(){
	amen = [];
	$('li input').change(function(){
		if ($(this).is(':checked')){
			amen.push($(this).data('name'));
		}else {
			amen.pop($(this).data('name'));
		}
		if (amen.length === 0){
			$('.amenities H4').html('&nbsp;')
		}else {
			$('.amenities H4').text(amen.join(', '))
		}
	})
})
