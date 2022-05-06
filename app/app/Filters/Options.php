<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

Class Options implements FilterInterface
{
    public function before(RequestInterface $request)
    {
        // echo "hej";
        
        // if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        // header('Access-Control-Allow-Headers: token, Content-Type');
        // header('Access-Control-Max-Age: 1728000');
        // header('Content-Length: 0');
        // header('Content-Type: text/plain');
        // die();
        // }

        // header('Access-Control-Allow-Origin: *');
        // header('Content-Type: application/json');
        
        // header('Access-Control-Allow-Origin: *');
        // header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        // header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        // $method = $_SERVER['REQUEST_METHOD'];
        // if ($method == "OPTIONS") {
        // die();
        // }
    }

    public function after(RequestInterface $request, ResponseInterface $response)
    {
      // Do something here
    }
}