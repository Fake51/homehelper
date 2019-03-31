<?php
declare(strict_types=1);

namespace App\Service;
use Cmfcmf\OpenWeatherMap;
use Cmfcmf\OpenWeatherMap\WeatherForecast;

class Weather
{
    const UNITS = 'metric';
    const API_KEY = 'f4de34ad3646ea561570f2f689ff0a4f';

    /**
     * returns current weather for a lat/lon pair
     *
     * @param string $longitude
     * @param string $latitude
     *
     * @access public
     * @return array
     */
    public function getForPosition(string $longitude, string $latitude) :array
    {
        // Create OpenWeatherMap object. 
        // Don't use caching (take a look into Examples/Cache.php to see how it works).
        $position = [
            'lon' => $longitude,
            'lat' => $latitude,
        ];

        $owm = new OpenWeatherMap(self::API_KEY);
        $current = $owm->getWeather($position, self::UNITS);

        $forecast = $owm->getWeatherForecast($position, self::UNITS, 'en', '', 3);

        $now = new \DateTime();
        $today = new \DateTime($now->format('Y-m-d'));
        $tomorrow = new \DateTime($now->add(new \DateInterval('P1D'))->format('Y-m-d'));

        return [
            'current' => [
                'temperature' => $current->temperature->now->getValue(),
                'rain' => $current->precipitation->getValue(),
                'wind' => sprintf(
                    '%s%s %s',
                    $current->wind->speed->getValue(),
                    $current->wind->speed->getUnit(),
                    $current->wind->direction->getUnit()
                ),
                'description' => $current->weather->description,
            ],
            'today' => $this->parseForecast($forecast, $today),
            'tomorrow' => $this->parseForecast($forecast, $tomorrow),
        ];
    }

    /**
     * parses the forecast object for a given day
     *
     * @param WeatherForecast $forecast
     * @param \DateTime       $day
     *
     * @access private
     * @return array
     */
    private function parseForecast(WeatherForecast $forecast, \DateTime $day)
    {
        $from = new \DateTime($day->format('Y-m-d 06:00:00'));
        $switch = new \DateTime($day->format('Y-m-d 21:00:00'));
        $to = new \DateTime(($day->add(new \DateInterval('P1D')))->format('Y-m-d 05:59'));

        $template = [
            'low' => '',
            'high' => '',
            'night' => [],
            'wind' => 0,
            'description' => [],
            'rain' => 0,
            'humidity' => 0,
        ];

        $day = $night = [];

        $forecast->rewind();

        while ($forecast->valid()) {
            $part = $forecast->current();

            if ($part->time->from >= $from && $part->time->from <= $switch
                || $part->time->to >= $from && $part->time->to <= $switch
                || $part->time->from < $from && $part->time->to > $switch) {
                $day[] = $forecast->current();
            }

            if ($part->time->from >= $night && $part->time->from <= $to
                || $part->time->to >= $night && $part->time->to <= $to
                || $part->time->from < $night && $part->time->to > $to) {
                $night[] = $forecast->current();
            }

            $forecast->next();
        }

        $windUnit = '';
        $humidityUnit = '';
        $windDirections = [];

        foreach ($day as $part) {
            if ('' === $template['low']
                || $template['low'] > $part->temperature->now->getValue()) {
                $template['low'] = $part->temperature->now->getValue();
            }

            if ('' === $template['high']
                || $template['high'] < $part->temperature->now->getValue()) {
                $template['high'] = $part->temperature->now->getValue();
            }

            if ($template['humidity'] < $part->humidity->getValue()) {
                $template['humidity'] = $part->humidity->getValue();
            }

            if ($template['wind'] < $part->wind->speed->getValue()) {
                $template['wind'] = $part->wind->speed->getValue();
            }

            if ($template['rain'] < $part->precipitation->getValue()) {
                $template['rain'] = $part->precipitation->getValue();
            }

            $template['description'][] = $part->weather->description;
            $windUnit = $part->wind->speed->getUnit();
            $humidityUnit = $part->humidity->getUnit();
            $windDirections[] = $part->wind->direction->getUnit();

        }

        foreach ($night as $part) {
            $template['night'][] = $part->temperature->now->getValue();
        }

        $template['night'] = $template['night'] ? array_sum($template['night']) / count($template['night']) : '';
        $template['description'] = implode(', ', array_unique($template['description']));
        $template['wind'] = sprintf('%s %s - %s', $template['wind'], $windUnit, implode(',', array_unique($windDirections)));
        $template['humidity'] .= $humidityUnit;

        return $template;
    }
}
