## Synopsis

This code is part of the technical test of Oktara
And it was written by Roy Corella Sánchez (corellasanchez@gmail.com)

## Software Requirements

Apache or Nginx server runing PHP ^5.6.0
Composer https://getcomposer.org/download/
mongodb/mongodb library for PHP http://php.net/manual/en/mongodb.tutorial.library.php

## Installation

Open folder with terminal and run this command: composer install, the "vendor" folder will appear with all the dependencies that your server needs.

## Configuration

This test has two main folders /api (PHP - MONGO backend) and /app (Angularjs frontend).

In this file /api/config/settings.php you will find the configuration of the database, by default is conected to my test mongodb database:

host: ds127802.mlab.com
database: oktara
username: oktara_usr
password: 0kT4rA2017
por: 27802

## Tests

To run this code on your local server just go to yourhost/app/ 
or try it on my test server http://oktara.herokuapp.com/app/
