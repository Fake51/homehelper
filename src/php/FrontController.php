<?php
declare(strict_types = 1);

namespace App;
use App\Controller\Home;
use App\Controller\Weather;

class FrontController
{
    /**
     * @throws \Exception
     */
    public function execute() : void
    {
        $psr17Factory = new \Nyholm\Psr7\Factory\Psr17Factory();

        $creator = new \Nyholm\Psr7Server\ServerRequestCreator(
            $psr17Factory, // ServerRequestFactory
            $psr17Factory, // UriFactory
            $psr17Factory, // UploadedFileFactory
            $psr17Factory  // StreamFactory
        );

        $serverRequest = $creator->fromGlobals();

        switch ($serverRequest->getUri()->getPath()) {
            case '/weather':
                $controller = new Weather();
                $response = $controller->index($serverRequest->getQueryParams());
                break;

            default:
            case '/':
                $controller = new Home();
                $response = $controller->index();
                break;

        }

        echo $response->getBody();
    }
}