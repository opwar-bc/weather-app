var forcastCard = document.querySelector(".weather-box");
var error = document.querySelector(".not-found");
var search = document.querySelector(".search-box button");
var Details = document.querySelector(".weather-details");
var container = document.querySelector(".container");

search.addEventListener("click", () => {
  var city = document.querySelector(".search-box input").value;
  var APIKey = "6b90f8595ff1c01750203d7ae5a76c68";

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        error.style.display = "block";
        forcastCard.style.display = "none";
        Details.style.display = "none";
        error.classList.add("fadeIn");
        container.style.height = "400px";
        return;
      }

      error.style.display = "none";
      error.classList.remove("fadeIn");

      var temp = document.querySelector(".weather-box .temperature");
      var image = document.querySelector(".weather-box img");
      var bio = document.querySelector(".weather-box .description");
      var humidity = document.querySelector(".weather-details .humidity span");
      var wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      bio.innerHTML = `${json.weather[0].bio}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      forcastCard.style.display = "";
      Details.style.display = "";
      forcastCard.classList.add("fadeIn");
      Details.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
