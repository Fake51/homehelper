<?php
declare(strict_types=1);

namespace App\Controller;


use App\Exception\ServiceNotFoundException;
use App\Service\Weather\DMI;
use Psr\Http\Client\ClientExceptionInterface;
use Psr\Http\Message\ResponseInterface;
use App\Service\Weather\OpenWeatherMap;

class Weather extends AbstractController
{
    /**
     * @param array $queryParams
     * @throws ServiceNotFoundException
     * @throws ClientExceptionInterface
     * @return ResponseInterface
     */
    public function index(array $queryParams) : ResponseInterface
    {
        $weatherServiceRequest = $queryParams['service'] ?? 'openWeatherMap';

        switch ($weatherServiceRequest) {
            case 'openWeatherMap';
                $weatherService = new OpenWeatherMap($queryParams);
                break;

            case 'dmi':
                $weatherService = new DMI($queryParams);
                break;

            default:
                throw new ServiceNotFoundException('Could not create service for ' . $weatherServiceRequest);
        }

        $content = $weatherService->gatherInformation();

        return $this->respondJson(200, $content->toJson());
    }
}