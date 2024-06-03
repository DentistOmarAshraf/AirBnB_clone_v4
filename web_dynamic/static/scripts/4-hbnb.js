/**
 * arrage_data - function to arrange all places in place.section
 */
function arrange_data (data) {
  for (x = 0; x < data.length; x++) {
	      const articale = $('<article></article>');
    const title_box = $('<div class="title_box"></div>');
    const place_name = $(`<h2>${data[x].name}</h2>`);
    const price = $(`<div class="price_by_night">${data[x].price_by_night}</div>`);
    const info = $('<div class="information"></div>');
    const max_guest = $(`<div class="max_guest">${data[x].max_guest} Guests</div>`);
    const num_rooms = $(`<div class="number_rooms">${data[x].number_rooms} Bedroom</div>`);
    const num_bath = $(`<div class="number_bathrooms">${data[x].number_bathrooms} Bathroom</div>`);
    const user = $('<div class="user"></div>');
    const owner = $('<b>Owner:</b> Omar Ashraf');
    const desc = $(`<div class="description">${data[x].description}</div>`);
    user.append(owner);
    info.append(max_guest);
    info.append(num_rooms);
    info.append(num_bath);
    title_box.append(place_name);
    title_box.append(price);
    articale.append(title_box);
    articale.append(info);
    articale.append(user);
    articale.append(desc);
    $('section.places').append(articale);
  }
}
/**
 * fetching with POST to api (/api/v1/places_search)
 */
function getdata (data={}) {
  fetch('http://localhost:5001/api/v1/places_search', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => {
      return (data.json());
    })
    .then(data => {
      arrange_data(data);
    })
    .catch(err => {
      console.error(err);
    });
}

$(document).ready(function () {
  let amen = [];
  let amen_ids = [];
  $('li input').change(function () {
    if ($(this).is(':checked')) {
      amen.push($(this).data('name'));
      amen_ids.push($(this).data('id'));
    } else {
      amen = amen.filter(name => name !== $(this).data('name'));
      amen_ids = amen_ids.filter(ids => ids !== $(this).data('id'));
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

  $('button').click(function () {
	  place_section = document.querySelector('section.places');
	  while (place_section.firstChild) {
		  place_section.removeChild(place_section.firstChild);
	  }
	  if (amen_ids.length == 0) {
		  getdata();
	  } else {
		  getdata({ amenities: amen_ids });
	  }
  });

  fetch('http://localhost:5001/api/v1/status')
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      if (data.status == 'OK') {
        $('div#api_status').addClass('available');
      }
    })
    .catch(error => {
      console.error(error);
    });

  getdata();
});
