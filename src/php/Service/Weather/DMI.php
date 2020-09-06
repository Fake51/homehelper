<?php
declare(strict_types=1);

namespace App\Service\Weather;


use Buzz\Client\Curl;
use Nyholm\Psr7\Factory\Psr17Factory;
use Psr\Http\Client\ClientExceptionInterface;
use function Couchbase\defaultDecoder;

class DMI implements WeatherQueryInterface
{
    private const URL = 'https://www.dmi.dk/NinJo2DmiDk/ninjo2dmidk?cmd=llj&id=%s';
    private string $locationId;

    public function __construct(array $params)
    {
        if (empty($params['locationId'])) {
            throw new \InvalidArgumentException('Location ID');
        }

        $this->locationId = $params['locationId'];
    }
    /**
     * @return array
     * @throws ClientExceptionInterface
     */
    public function gatherInformation() : WeatherInfo
    {
        $psr17Factory = new Psr17Factory();
        $psr18Client = new Curl($psr17Factory);

        $url = sprintf(self::URL, $this->locationId);
        $request = $psr17Factory->createRequest('GET', $url);
        $response = $psr18Client->sendRequest($request);

        $info = new WeatherInfo();

        if (200 === $response->getStatusCode()) {
            $data = json_decode($response->getBody()->getContents(), true);
            $aggregated = $this->parseTimeSeries($data['timeserie'] ?? []);

            if (isset($data['timeserie'][0])) {
                $point = $data['timeserie'][0];

                $info->setCurrent(
                    (float) $point['temp'],
                    (float) $point['windSpeed'],
                    (float) $aggregated[0]['uv'],
                    (float) $point['precip6']
                );
            }

            foreach (array_slice($aggregated, 0, 3) as $day) {
                //$info->addForecastDay($day);
            }
        }
var_dump($info->toJson());
        exit;
        return $info;
    }

    /**
     * @param array $timeSeries
     * @return array
     * @throws \Exception
     */
    private function parseTimeSeries(array $timeSeries) : array
    {
        $aggregated = [];

        $day = [
            'temp' => -50,
            'windSpeed' => 0,
            'rain' => 0
        ];
        $night = ['temp' => 100];
        $dayEnd = new \DateTimeImmutable('tomorrow');
        $nightStart = $dayEnd->sub(new \DateInterval('PT2H'));
        $morningStart = $dayEnd->sub(new \DateInterval('PT1H'));
        $nightEnd = $dayEnd->add(new \DateInterval('PT7H'));
        $dayIndex = $nightIndex = 0;

        foreach (array_filter($timeSeries) as $point) {
            preg_match(
                '/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})/',
                $point['time'],
                $parts
            );

            $dateTime = new \DateTimeImmutable(
                sprintf(
                    '%s-%s-%s %s:%s:%s',
                    $parts['year'],
                    $parts['month'],
                    $parts['day'],
                    $parts['hour'],
                    $parts['minute'],
                    $parts['second']
                )
            );

            if ($dateTime >= $dayEnd) {
                $aggregated[$dayIndex++] = ['day' => $day];
                $day = [
                    'temp' => -50,
                    'windSpeed' => 0,
                    'rain' => 0
                ];
                $dayEnd = $dayEnd->add(new \DateInterval('P1D'));
            }

            // night hours
            if ($dateTime >= $nightStart && $dateTime < $nightEnd) {
                $night['temp'] = min($night['temp'], $point['temp']);
            }

            if ($dateTime >= $nightEnd) {
                $aggregated[$nightIndex++]['night'] = $night;
                $night = ['temp' => 100];
                $nightEnd = $nightEnd->add(new \DateInterval('P1D'));
                $nightStart = $nightStart->add(new \DateInterval('P1D'));
            }

            $day['temp'] = max($day['temp'], $point['temp']);
            $day['windSpeed'] = max($day['windSpeed'], $point['windSpeed']);

            if ($dateTime < $morningStart) {
                $day['rain'] += $point['precip6'] ?: 0;
            }
        }
       var_dump($aggregated);
        exit;
        return $aggregated;
    }
}