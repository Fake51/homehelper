import { weatherConfig } from "../../config";

const convertDay = day => {
  return {
    temp: `${Math.round(day.temp.max)}°`,
    wind: `${Math.round(day.wind_speed)}m/s`,
    uv: Math.ceil(day.uvi),
    rain: day.rain ? Math.round(day.rain) : 0,
    icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`
  };
};

const convert = data => {
  const { current, daily } = data;

  return {
    now: {
      temp: `${Math.round(current.temp)}°`,
      wind: `${Math.round(current.wind_speed)} m/s`,
      uv: Math.ceil(current.uvi),
      rain: current.rain ? current.rain["1h"] : 0,
      icon: `http://openweathermap.org/img/wn/${current.weather[0].icon}.png`
    },
    forecast: [
      {
        day: convertDay(daily[0]),
        night: {
          temp: `${Math.round(daily[0].temp.night)}°`
        }
      },
      {
        day: convertDay(daily[1]),
        night: {
          temp: `${Math.round(daily[1].temp.night)}°`
        }
      },
      {
        day: convertDay(daily[2]),
        night: {
          temp: `${Math.round(daily[2].temp.night)}°`
        }
      }
    ]
  };
};

// todo get data from config
// todo parse and save/return hourly data into days
const weatherRequest = callback => {
  const request = new Request(
    `https://www.dmi.dk/NinJo2DmiDk/ninjo2dmidk?cmd=${weatherConfig.command}&id=${weatherConfig.locationId}`
  );
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      return response.json()
    })
    .then(data => {
      window.weatherData = data;
      return callback(convert(data));
    })
    .catch(e => {
    });
};

export default weatherRequest;
