<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require '../vendor/autoload.php';

// Instantiate the app
$settings = require 'config/settings.php';
$app = new \Slim\App($settings);

require 'config/dependencies.php';

$app->run();
