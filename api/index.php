<?php
    // 1. Общие настройки
    ini_set('display_errors',1);
    error_reporting(E_ALL);

    // 2. Подключение файлов системы
    define('ROOT', dirname(__FILE__));
    require_once (ROOT . '/config/config.php');
    require_once (ROOT . '/routes/Router.php');
    require_once (ROOT . '/db/Db.php');

    // 3. Вызов Router
    $router = new Router();
    $router -> run();
?>