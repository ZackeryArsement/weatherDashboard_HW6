var city = 'Austin';
var apiKey = '9ffb53b585866877578daabea92018de';
var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude=hourly,minutely&appid=' + apiKey;

var forecastCardArray = $('.forecast-card');
// console.log(forecastCardArray[0].children['card-temp'].innerText);

var dailyTemp = [];

getCityWeather();

function getCityWeather(){
    fetch(apiURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        for(let i=0; i<5; i++){
            forecastCardArray[i].children['card-temp'].innerText = data.daily[(i+1)].temp.day;
        }
        return dailyTemp;
    })
}
