<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

define('ROOT', dirname(__FILE__));
require_once(ROOT . '/config/config.php');
require_once(ROOT . '/routes/Router.php');
require_once(ROOT . '/db/Db.php');

$router = new Router();
$router->run();
