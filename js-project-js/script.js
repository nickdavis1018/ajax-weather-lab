let weatherData;

const $city = $('#city');
const $temp = $('#temp');
const $feelsLike= $('#feels-like');
const $weather = $('#weather');
const $weatherMoreDetail = $('#details')
const $humidity = $('#humidity')
const $advice = $('#advice')
const $adviceTemp = $("#advice2")
const $input = $('input[type="text"]');

function getWeather (event){
  event.preventDefault();
  
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${$input.val()}&appid=3554d8fa0dbb83f068b51035058a2369&units=imperial`
  }).then(
    function(data){
      weatherData = data;
      render();
      $input.val('');
    },
    function(error){
    $city.html("No match found");
    $temp.text("No match found");
    $feelsLike.text("No match found");
    $humidity.text("No match found")
    $weather.text("No match found");
    $weatherMoreDetail.text("No match found")
    $adviceTemp.html(`Location needs to be exact. <br> '${$input.val()}' is not recognized.`)
    $advice.html("Try searching 'New York' or 'Chicago' to get a feel for it.")
    }
  )
}

function render() {
  $city.text(weatherData.name);
  $temp.text(`${weatherData.main.temp} F`);
  $feelsLike.text(`${weatherData.main.feels_like} F`);
  $humidity.text(`${weatherData.main.humidity} %`);
  $weather.text(weatherData.weather[0].main)
  $weatherMoreDetail.text(weatherData.weather[0].description)
  if(weatherData.weather[0].main === "Haze"){
    $advice.text("Little hazy out there today!")
  }
  else if(weatherData.weather[0].main === "Clouds"){
    $advice.text("Can probably leave the sunscreen at home.")}
  else if(weatherData.weather[0].main === "Rain"|| weatherData.weather[0].main === "Rainy"){
    $advice.text("Might want to bring an umbrella.")}
  else if(weatherData.weather[0].main === "Clear"){
    $advice.text("All clear today!")}
  else if(weatherData.weather[0].main === "Thunderstorm" || weatherData.weather[0].main === "Storm"){
    $advice.text("Looks like a storm is hitting. Be careful out there.")
  }
  else {$advice.text("See 'Weather' and 'Weather Details!' for more info about conditions.")}
  if(weatherData.main.temp >= 80){
    $adviceTemp.text("It's hot out!")}
  else if(weatherData.main.temp <= 40){
    $adviceTemp.text("It's a cold one out there. Bundle up!")}
  else if(weatherData.main.temp <= 80 && weatherData.main.temp >= 60){
    $adviceTemp.text("Can't ask for much better temperatures! Enjoy!")}}
  
$('form').on('submit', getWeather);

function clearValues(){
  $city.html("")
  $temp.html("")
  $feelsLike.html("")
  $humidity.html("")
  $weather.html("")
  $weatherMoreDetail.html("")
  $advice.html("")
  $adviceTemp.html("")
  $input.val("")
}

$('#clear').on('click', clearValues)