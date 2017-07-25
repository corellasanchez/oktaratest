<?php

// container configuration
$container = $app->getContainer();

// Database connection
$container['db'] = function ($c) {

	//get database config defined in settings.php
	$settings = $c->get('settings')['db'];

	if (!isset($connection)) {

		$connection = new MongoDB\Client("mongodb://" 
										. $settings['username'] 
										.":". $settings['password'] 
										. "@". $settings['host'] 
										. ":" .$settings['port'] 
										. "/" . $settings['database']);

		if (! $connection) {
			echo 'Cannot connect to database server';
			exit;
		}  

	}

	return $connection->$settings['database'];
};

//include routes
$routes = glob("routes/*.php");
foreach($routes as $route){
    require_once $route;
}

