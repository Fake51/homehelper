<?php
declare(strict_types=1);

namespace App\Controller;
use App\Service\Weather;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class WeatherController extends AbstractController {
    /**
     * returns current weather
     *
     * @Route("/weather/current", name="weather_current")
     *
     * @access public
     * @return Response
     */
    public function current(Request $request, Weather $weather) :Response
    {
        $currentWeather = $weather->getCurrentForPosition('10.11', '56.15');
        return new JsonResponse($currentWeather, 200, ['Access-Control-Allow-Origin' => '*']);
    }
}
