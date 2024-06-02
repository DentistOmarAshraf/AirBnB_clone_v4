$(document).ready(function () {
  let amen = [];
  $('li input').change(function () {
    if ($(this).is(':checked')) {
      amen.push($(this).data('name'));
    } else {
      amen = amen.filter(name => name !== $(this).data('name'));
    }
    if (amen.length === 0) {
      $('.amenities H4').html('&nbsp;');
    } else {
      $('.amenities H4').text(amen.join(', '));
    }
  });
  $('.amenities H4').css('height', 'max-content');
  $('.amenities H4').css('text-overflow', 'ellipsis');
  $('.amenities H4').css('white-space', 'nowrap');
  $('.amenities H4').css('overflow', 'hidden');
});
