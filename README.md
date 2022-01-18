# weatherDashboard_HW6
Title: City Weather Forecast \
Developer: Zackery Arsement \
Deployment Date:  1/17/2022 \
For:  UT JavaScript Coding Bootcamp \
Published: GitHub <https://github.com/ZackeryArsement/weatherDashboard_HW6> \
Published: Webpage <https://zackeryarsement.github.io/weatherDashboard_HW6/> \
Built with: HTML, CSS, Javascript, Bootstrap, Jquery


# Summary: 

![Coding Quiz](https://github.com/ZackeryArsement/weatherDashboard_HW6/blob/main/assets/images/weatherForecast.png)

The city weather forecast provides the user with the current weather for their city of choice! \
Along with the current weather, the user also is provided a 5 day future forecast. \
This weather application saves the most recent 5 city searches you have done. Keeping them saved even during refresh! \
By default the city weather forecast always shows Austin weather on screen load in.

![Coding Quiz](https://github.com/ZackeryArsement/weatherDashboard_HW6/blob/main/assets/images/weatherForecast.gif)

# Development:
The weather forecast dashboard works by taking a user input city and attaching that city to an api url to find its longitude and latitude. With the longitude and latitude acquired, javascript then puts those coordinates into another api that calls for the weather at that specific location. With the current weather determined, javascript inputs the city name, state, current date, temperature, wind, humidity, and uv index into the header card of the webpage. Javascript then uses the same api data to find the temperature, wind, and humidity values for the next 5 day forecast and input those values into the 5 cards below the current weather card.

This webapplication will also store recently searched cities into a list, found below the search input. When a user searches a city a new button is created that appends below the input. If the user refreshes the page then the last 5 cities that were searched will still be available by clicking their button.

By default the web application will load the weather for Austin, Texas on load up.