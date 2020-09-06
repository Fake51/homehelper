<?php
declare(strict_types=1);

namespace App\Controller;


use App\Exception\TemplateNotFoundException;
use Psr\Http\Message\ResponseInterface;

abstract class AbstractController
{
    /**
     * @param string $template
     * @return ResponseInterface
     * @throws TemplateNotFoundException
     */
    public function render(string $template) : ResponseInterface
    {
        $path = __DIR__ . '/../View/' . $template;
        if (!file_exists($path)) {
            throw new TemplateNotFoundException($path . ' could not be found');
        }

        ob_start();
        require($path);
        $body = ob_get_contents();
        ob_end_clean();

        return $this->makeResponse(200, $body);
    }

    public function respondJson(int $statusCode, $content) : ResponseInterface
    {
        return $this->makeResponse($statusCode, json_encode($content))
            ->withAddedHeader('Content-Type', 'application/json; encoding=UTF-8');
    }

    /**
     * @param int $statusCode
     * @param $body
     * @return ResponseInterface
     */
    private function makeResponse(int $statusCode, $body) : ResponseInterface
    {
        $psr17Factory = new \Nyholm\Psr7\Factory\Psr17Factory();

        $responseBody = $psr17Factory->createStream($body);
        return $psr17Factory->createResponse($statusCode)
            ->withBody($responseBody);
    }
}