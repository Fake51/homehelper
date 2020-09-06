<?php
declare(strict_types=1);

namespace App\Service\Weather;


use Buzz\Client\Curl;
use Nyholm\Psr7\Factory\Psr17Factory;
use Psr\Http\Client\ClientExceptionInterface;

class OpenWeatherMap implements WeatherQueryInterface
{
    private const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=f4de34ad3646ea561570f2f689ff0a4f&units=%s';
    private string $latitude;
    private string $longitude;
    private string $units;

    /**
     * OpenWeatherMap constructor.
     * @throws \InvalidArgumentException
     * @param array $params
     */
    public function __construct(array $params)
    {
        if (empty($params['latitude']) || empty($params['longitude'])) {
            throw new \InvalidArgumentException('Missing latitude or longitude');
        }

        $this->latitude = $params['latitude'];
        $this->longitude = $params['longitude'];
        $this->units = $params['units'] ?? 'metric';
    }

    /**
     * @return array
     * @throws ClientExceptionInterface
     */
    public function gatherInformation() : WeatherInfo
    {
        $psr17Factory = new Psr17Factory();
        $psr18Client = new Curl($psr17Factory);

        $url = sprintf(self::URL, $this->latitude, $this->longitude, $this->units);
        $request = $psr17Factory->createRequest('GET', $url);
        $response = $psr18Client->sendRequest($request);

        if (200 === $response->getStatusCode()) {
            return json_decode($response->getBody()->getContents(), true);
        }

        return [];
    }
}