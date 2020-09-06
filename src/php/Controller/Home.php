<?php
declare(strict_types=1);

namespace App\Controller;
use App\Exception\TemplateNotFoundException;
use Psr\Http\Message\ResponseInterface;

class Home extends AbstractController
{
    /**
     * @return ResponseInterface
     * @throws TemplateNotFoundException
     */
    public function index() : ResponseInterface
    {
        return $this->render('Home/index.html.php');
    }

}