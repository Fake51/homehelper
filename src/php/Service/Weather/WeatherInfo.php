<?php
declare(strict_types=1);

namespace App\Service\Weather;


class WeatherInfo
{
    private array $current = [];

    private array $forecast = [];

    /**
     * @param float $temperature
     * @param float $windSpeed
     * @param float $uv
     * @param float $rain
     * @param string $icon
     * @return $this
     */
    public function setCurrent(float $temperature, float $windSpeed, float $uv, float $rain, string $icon = '') : self
    {
        $this->current['temp'] = round($temperature);
        $this->current['wind'] = round($windSpeed);
        $this->current['uv'] = ceil($uv);
        $this->current['rain'] = round($rain);
        $this->current['icon'] = $icon;

        return $this;
    }

    /**
     * @param float $dayTemperature
     * @param float $nightTemperature
     * @param float $windSpeed
     * @param float $uv
     * @param float $rain
     * @param string $icon
     * @return $this
     */
    public function addForecastDay(float $dayTemperature, float $nightTemperature, float $windSpeed, float $uv, float $rain, string $icon = '') : self
    {
        $this->forecast[] = [
            'day' => [
                'temp' => round($dayTemperature),
                'wind' => round($windSpeed),
                'uv' => ceil($uv),
                'rain' => round($rain),
                'icon' => $icon,
            ],
            'night' => [
                'temp' => round($nightTemperature),
            ]
        ];

        return $this;
    }

    /**
     * @return string
     */
    public function toJson() : string
    {
       return json_encode([
           'now' => $this->current,
           'forecast' => $this->forecast,
       ]);
    }
}
/*
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
*/