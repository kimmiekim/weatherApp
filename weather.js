window.useAPI = false;

$(document).ready(function (){
  $('#search-form').submit(function(e){
    e.preventDefault();

    var $results = $('.results'),
        searchCity = $('#city-search').val(),
        cityName = searchCity.split(' ')[0].trim(),
        countryName = searchCity.split(' ')[1],
        searchQuery = countryName ? `${cityName}, ${countryName}` : cityName,
        apiKey = "02be9f4871a8fabfb2e1ffbdfd847370";

    var requestURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?callback=?';

    if (window.useAPI) {
      $.getJSON(requestURL, {
        'apikey' : apiKey,
        'q' : searchQuery,
        'cnt' : 7,
      }, function(data){
        console.log(data);
        renderData($results, data);
      });
    }else {
      renderData($results);
    }
  });
});

function renderData($results, data){
  if (window.cacheData) data = window.cacheData;

  var renderedResults =
  `<div class = "cityInfo">
    <p>${data.city.name}</p>
    <p>${data.city.country}</p>
    <hr />
    </div>`;

   var sum = 0;
   data.list.forEach(function(day, index){
     sum += day.pressure
   });
   var avg = sum / data.list.length;

   renderedResults +=
   `<p>Weekly average pressure is ${avg}</p>`

  data.list.forEach(function(day, index){
    renderedResults +=
    `<p>Temperature: ${day.temp.day} </p>
      <p>Night Temperature: ${day.temp.night} </p>
      <p>Evening Temperature: ${day.temp.eve} </p>`;
  });

  $('.results').html(renderedResults);
}
