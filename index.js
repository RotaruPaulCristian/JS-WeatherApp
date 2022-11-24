let longitude;
let latitude;
const temperatureDescription = document.querySelector(
  ".temperature-description"
);
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimezone = document.querySelector(".location-timezone");
const temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&current_weather=true&timezone=auto`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          const { temperature, windspeed, weathercode } = data.current_weather;

          //   Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.children[0].textContent = `Windpeed: ${windspeed} Km/h`;
          locationTimezone.textContent = `Timezone: ${data.timezone}`;

          //   Make a switch statement to cover all weathercodes
          switch (weathercode) {
            case 0:
              temperatureDescription.children[1].textContent = "Clear sky";
              break;
            case 1:
              temperatureDescription.children[1].textContent = "Mainly clear";
              break;
            case 2:
              temperatureDescription.children[1].textContent = "Partly cloudy";
              break;
            case 3:
              temperatureDescription.children[1].textContent = "Overcast";
              break;
            case 45:
              temperatureDescription.children[1].textContent = "Fog";
              break;
            case 48:
              temperatureDescription.children[1].textContent =
                "Depositing rime fog";
              break;
            case 51:
              temperatureDescription.children[1].textContent = "Drizzle: Light";
              break;
            case 53:
              temperatureDescription.children[1].textContent =
                "Drizzle: Moderate";
              break;
            case 55:
              temperatureDescription.children[1].textContent = "Drizzle: Dense";
              break;
            case 56:
              temperatureDescription.children[1].textContent =
                "Freezing Drizzle: Light";
              break;
            case 57:
              temperatureDescription.children[1].textContent =
                "Freezing Drizzle: Dense";
              break;
            case 61:
              temperatureDescription.children[1].textContent = "Rain: Slight";
              break;
            case 63:
              temperatureDescription.children[1].textContent = "Rain: Moderate";
              break;
            case 65:
              temperatureDescription.children[1].textContent = "Rain: Heavy";
              break;
            case 66:
              temperatureDescription.children[1].textContent =
                "Freezing Rain: Light";
              break;
            case 67:
              temperatureDescription.children[1].textContent =
                "Freezing Rain: Heavy";
              break;
            case 71:
              temperatureDescription.children[1].textContent =
                "Snow fall: Slight";
              break;
            case 73:
              temperatureDescription.children[1].textContent =
                "Snow fall: Moderate";
              break;
            case 75:
              temperatureDescription.children[1].textContent =
                "Snow fall: Heavy";
              break;
            case 77:
              temperatureDescription.children[1].textContent = "Snow grains";
              break;
            case 80:
              temperatureDescription.children[1].textContent =
                "Rain showers: Slight";
              break;
            case 81:
              temperatureDescription.children[1].textContent =
                "Rain showers: Moderate";
              break;
            case 82:
              temperatureDescription.children[1].textContent =
                "Rain showers: Violent";
              break;
            case 85:
              temperatureDescription.children[1].textContent =
                "Snow showers slight";
              break;
            case 86:
              temperatureDescription.children[1].textContent =
                "Snow showers heavy";
              break;
            case 95:
              temperatureDescription.children[1].textContent =
                "Thunderstorm: Slight or moderate";
              break;
            case 96:
              temperatureDescription.children[1].textContent =
                "Thunderstorm with slight hail";
              break;
            case 99:
              temperatureDescription.children[1].textContent =
                "Thunderstorm with heavy hail";
              break;
            default:
              temperatureDescription.children[1].textContent =
                "Weather description can't be read";
              break;
          }

          // Formula for Farenheit
          const farenheit = temperature * 1.8 + 32.0;

          // Change temperature to Farenheit/Celsius
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = farenheit;
            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
});
