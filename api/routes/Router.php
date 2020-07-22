<?php

class Router
{
    private  $routes;

    public function __construct()
    {
        $routesPath = ROOT . '/routes/routes.php';
        $this->routes = include($routesPath);
    }

    private function getURI()
    {
        if (!empty($_SERVER['REQUEST_URI'])) {
            return trim($_SERVER['REQUEST_URI'], '/');
        }
    }

    public function run()
    {
        $uri = $this->getURI();
        $uri = preg_replace("/\?.+/", "", $uri);
        $routFoundFlag = false;
        header('Content-Type: application/json');
        foreach ($this->routes as $uriPattern => $path) {

            if (preg_match("~$uriPattern~", $uri)) {
                $routFoundFlag = true;
                $internalRoute = preg_replace("~$uriPattern~", $path, $uri);

                $segments = explode('/', $internalRoute);
                array_shift($segments);

                $methodName = array_shift($segments);

                $parameters = $segments;

                $controllerFile = ROOT . '\Controller.php';

                if (file_exists($controllerFile)) {
                    include_once($controllerFile);
                }

                $result = call_user_func_array($methodName, $parameters);

                if ($result != null) {
                    break;
                }
            }
        }
        if ($routFoundFlag == false) {
            getResponse404Error('Resouce not Found');
        };
    }
}
