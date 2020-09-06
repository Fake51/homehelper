<?php
declare(strict_types=1);

namespace App\Service\Weather;
use App\Service\Weather\WeatherInfo;

interface WeatherQueryInterface
{
    public function gatherInformation() : WeatherInfo;
}