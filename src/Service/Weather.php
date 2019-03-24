<?php
declare(strict_types=1);

namespace App\Service;
use Cmfcmf\OpenWeatherMap;

class Weather {
    /**
     * returns current weather for a lat/lon pair
     *
     * @param string $longitude
     * @param string $latitude
     *
     * @access public
     * @return array
     */
    public function getCurrentForPosition(string $longitude, string $latitude) :array
    {
        // Create OpenWeatherMap object. 
        // Don't use caching (take a look into Examples/Cache.php to see how it works).
        $owm = new OpenWeatherMap('f4de34ad3646ea561570f2f689ff0a4f');
        $weather = $owm->getWeather(['lon' => $longitude, 'lat' => $latitude], 'metric');

        return [
            'today' => [
                'current' => $weather->temperature->now->getValue(),
                'high' => $weather->temperature->max->getValue(),
                'low' => $weather->temperature->min->getValue(),
                'wind' => $weather->wind->speed->getValue(),
                'description' => $weather->weather->description,
                'rain' => $weather->precipitation->getValue(),
                'night' => $weather->temperature->night,
            ],
            'tomorrow' => [
                'current' => $weather->temperature->now->getValue(),
                'high' => $weather->temperature->max->getValue(),
                'low' => $weather->temperature->min->getValue(),
                'wind' => $weather->wind->speed->getValue(),
                'description' => $weather->weather->description,
                'rain' => $weather->precipitation->getValue(),
                'night' => $weather->temperature->night,
            ],
        ];
    }
}
