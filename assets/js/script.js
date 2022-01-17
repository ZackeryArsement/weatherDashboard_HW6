var city = 'Austin';
var apiKey = '9ffb53b585866877578daabea92018de';
var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude=hourly,minutely&units=imperial&appid=' + apiKey;

var today = moment();

var forecastCardArray = $('.forecast-card');
var forecastTitle = $('.results-list');

var searchButton = $('#search-btn');
var inputCity = $('#input-city');

// List of buttons with recent cities searched
var recentSearchList = $('#recent-search-list');

// Keep track of recent cities searched
var savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || ["","","","",""];

// localStorage.clear();

// On webpage loadup access the current weather and 5 day forecast for Austin, Tx
getData("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&offset=0&minPopulation=100000&namePrefix=" + city);
loadRecents();

// When you press the search button you append a new button to the recently searched column and then find the weather for that city
function searchCity(){
    city = inputCity.val();

    var findCityURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&offset=0&minPopulation=90000&namePrefix=" + city;

    getData(findCityURL);
}

// Get the weather for the longitude and latitude of your searched city
function getCityWeather(){
    fetch(apiURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data){

        // Current Temp
        forecastTitle[0].children['day-temp'].children[0].innerText = 'Temperature: ' + data.daily[0].temp.day + ' \u00B0F '

        // Current Wind
        forecastTitle[0].children['day-wind'].children[0].innerText = 'Wind: ' + data.daily[0].wind_speed + ' mph';
        
        // Current Humidity
        forecastTitle[0].children['day-humidity'].children[0].innerText = 'Humidity: ' + data.daily[0].humidity + '%';

        // Current UV Index
        forecastTitle[0].children['day-uv'].children[0].innerText = 'UV Index: ' + data.daily[0].uvi;

        // Fill in the 5 day forecast
        for(let i=0; i<5; i++){
            var forecastDay = moment(today).add((i+1), 'days').format('MM/DD/YYYY');

            // Date
            forecastCardArray[i].children['card-date'].children[0].innerText = forecastDay;

            // Icon
            forecastCardArray[i].children['card-icon'].children[0].src = ' http://openweathermap.org/img/wn/' + data.daily[(i+1)].weather[0].icon + '.png';

            // Temp
            forecastCardArray[i].children['card-temp'].innerText = data.daily[(i+1)].temp.day + ' \u00B0F ';

            // Wind
            forecastCardArray[i].children['card-wind'].innerText = data.daily[(i+1)].wind_speed + ' mph';

            // Humidity
            forecastCardArray[i].children['card-humidity'].innerText = data.daily[(i+1)].humidity + '%';
        }

        appendSearchButton();
    })
}

// Get the longitude and latitude for your searched city so you can use that in your weather search input
function getData(URL){
    fetch(URL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":"dc52e1306fmsh499b745225e0ed7p1f9230jsnd35ba4c60dc2" //this is the key for the paid subscription
        }
        })
        .then(response => {
            return response.json();
        })
        .then(function(data){
            var userLat = data.data[0].latitude;
            var userLng = data.data[0].longitude;

            var region = data.data[0].region;

            forecastTitle[0].children['day-city'].children[0].innerText = city + ', ' + region + ' (' + today.format('MM/DD/YYYY') + ')';

            apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + userLat + '&lon='+ userLng + '&exclude=hourly,minutely&units=imperial&appid=' + apiKey;

            // Get the weather for the longitude and latitude of your searched city
            getCityWeather();

            return data;
        })
        .catch(err => {
            alert('The city you searched is not in our files. Please search a different city.');
            console.error(err);
        });
}

// If you click a 'recently searched city' list button
function searchRecent(btn){
    city = btn.innerText;

    var findCityURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&offset=0&minPopulation=100000&namePrefix=" + city;

    getData(findCityURL);
}

// On browser start up load in all the recently searched cities into buttons
function loadRecents(){
    for(let i=0; i<savedSearches.length; i++){
        if(savedSearches[i] !== ''){
            var newButton = document.createElement('button');
            newButton.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-block', 'm-2');

            // Every new button has an onclick that searched the city it is attached to
            newButton.onclick = function(event){
                var currentButton = event.target;
                searchRecent(currentButton);
            }

            newButton.innerText = savedSearches[i];
            
            recentSearchList.append(newButton);
        }
    }
}

function appendSearchButton(){
    var savedSearchCount = 0;

    // See how many cities are saved in recent searches
    savedSearches.forEach(search => {
        if(search !== ''){
            savedSearchCount++;
        }
    })

    // If the searched city is not already in the 'recently searched' list then create a button for the input city and save it in local storage
    if(!savedSearches.includes(city)){
        if(savedSearchCount === 5){
            // Remove the oldest searched city button and the city name from saved list
            savedSearches.splice(savedSearches.indexOf(recentSearchList[0].children[0].innerText), 1, '');
            recentSearchList[0].children[0].remove();

            var newButton = document.createElement('button');
            newButton.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-block', 'm-2');
            
            // Every new button has an onclick that searched the city it is attached to
            newButton.onclick = function(event){
                var currentButton = event.target;
                searchRecent(currentButton);
            }
    
            newButton.innerText = city;
            
            recentSearchList.append(newButton);
    
            // Creates new array with values meant to be saved
            savedSearches.splice(savedSearches.indexOf(''), 1, city);
            localStorage.setItem('savedSearches', JSON.stringify(savedSearches));

        }
        else{
            var newButton = document.createElement('button');
            newButton.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-block', 'm-2');
            
            // Every new button has an onclick that searched the city it is attached to
            newButton.onclick = function(event){
                var currentButton = event.target;
                searchRecent(currentButton);
            }
    
            newButton.innerText = city;
            
            recentSearchList.append(newButton);
    
            // Creates new array with values meant to be saved
            savedSearches.splice(savedSearches.indexOf(''), 1, city);
            localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
        }
    }
}