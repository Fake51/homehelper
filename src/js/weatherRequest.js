const convertDay = day => {
  return {
    temp: `${Math.round(day.temp.max)}°`,
    wind: `${day.wind_speed}m/s`,
    uv: Math.ceil(day.uvi),
    rain: Math.round(day.rain)
  };
};

const convert = data => {
  const { current, daily } = data;

  return {
    now: {
      temp: `${Math.round(current.temp)}°`,
      wind: `${Math.round(current.wind_speed)} m/s`,
      uv: Math.ceil(current.uvi),
      rain: current.rain ? current.rain["1h"] : 0
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

const weatherRequest = callback => {
  const request = new Request(
    "https://api.openweathermap.org/data/2.5/onecall?lat=56.2375&lon=10.23778&appid=f4de34ad3646ea561570f2f689ff0a4f&units=metric"
  );
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      return response.json()
    })
    .then(data => callback(convert(data)))
    .catch(e => {
    });
};

export default weatherRequest;
