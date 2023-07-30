function showCurrentTime(event) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentTime = document.querySelector("#currentTime");
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = `${days[now.getDay()]}, ${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
  if (now.getMinutes() < 10) {
    currentTime.innerHTML = `${now.getHours()}:0${now.getMinutes()} hs`;
  } else {
    currentTime.innerHTML = `${now.getHours()}:${now.getMinutes()} hs`;
  }
}

function getCurrentLocationData(event) {
  navigator.geolocation.getCurrentPosition(getData2CurrentLocation);
}

function getData2CurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d54f597e2ee8a9abfe6d0edcf1727b8d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(UpdateData2Location);
}

function getForecastData4Location(coordinates) {
  let units = "metric";
  let apiKey = "1a0183e48otc14e8f23dafc91d33dbab";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  https: axios.get(url).then(addForecastData);
}

function getData4city(event) {
  event.preventDefault();
  let city = document.querySelector("#city-to-search");
  if (city.value.length > 0) {
    let apiKey = "d54f597e2ee8a9abfe6d0edcf1727b8d";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(UpdateData2Location);
  } else {
    alert("Please type a city");
  }
}

function updating2default(city) {
  let apiKey = "d54f597e2ee8a9abfe6d0edcf1727b8d";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(UpdateData2Location);
}

function UpdateData2Location(response) {
  let currentLocation = document.querySelector("#currentLocation");
  let currentTemperature = document.querySelector("#currentTemperature");
  let minTemp = document.querySelector("#minTemp");
  let maxTemp = document.querySelector("#maxTemp");
  let weatherDescription = document.querySelector("#weatherDescription");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feels_like = document.querySelector("#feels_like");
  let weatherImage = document.querySelector("#weatherImage");
  let fahr = document.querySelector("#fahr");
  let celsius = document.querySelector("#celsius");

  fahr.innerHTML = `°F`;
  celsius.innerHTML = `<strong>°C<strong/>`;

  currentLocation.innerHTML = `📍${response.data.name}, ${response.data.sys.country}`;
  celsiusTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = `Min temp ${Math.round(response.data.main.temp_min)}°C`;
  maxTemp.innerHTML = `Max temp ${Math.round(response.data.main.temp_max)}°C`;
  weatherDescription.innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  feels_like.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  //``
  weatherImage.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecastData4Location(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function addForecastData(response) {
  let forecast_data = response.data.daily;
  let forecastvar = document.querySelector("#FutureDays");
  let forecast_concat = "";
  forecast_data.forEach(function (forecast_day, index) {
    if (index < 5) {
      forecast_concat =
        forecast_concat +
        `<div class="row card mb-2 pb-0 pt-1 card-body">
        <div class="col">
    <h3>${formatDay(forecast_day.time)}</h3>
    <div class="row">
    <div class="col" id="minTempForecast">${Math.round(
      forecast_day.temperature.minimum
    )}°</div>
    <div class="col" id="maxTempForecast">${Math.round(
      forecast_day.temperature.maximum
    )}°</div>
    </div>
    <img
      src="${forecast_day.condition.icon_url}"
      alt="${formatDay(forecast_day.time)} weather icon"
    />
  </div>
  </div>`;
    }
  });
  forecastvar.innerHTML = forecast_concat;
}
function update2celsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemperature");
  currentTemp.innerHTML = celsiusTemperature;
  let celsius = document.querySelector("#celsius");
  let fahr = document.querySelector("#fahr");
  fahr.innerHTML = `°F`;
  celsius.innerHTML = `<strong>°C<strong/>`;
}

function update2fahr(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemperature");
  currentTemp.innerHTML = Math.round(
    (parseFloat(celsiusTemperature) * 9) / 5 + 32
  );
  let fahr = document.querySelector("#fahr");
  let celsius = document.querySelector("#celsius");
  fahr.innerHTML = `<strong>°F<strong/>`;
  celsius.innerHTML = `°C`;
}

showCurrentTime();
updating2default("Asuncion");
let searchForm = document.querySelector("#search-form");
let celsius = document.querySelector("#celsius");
let fahr = document.querySelector("#fahr");
let currentButton = document.querySelector("#currentButton");
let celsiusTemperature = 23;
celsius.addEventListener("click", update2celsius);
fahr.addEventListener("click", update2fahr);
searchForm.addEventListener("submit", getData4city);
currentButton.addEventListener("click", getCurrentLocationData);
