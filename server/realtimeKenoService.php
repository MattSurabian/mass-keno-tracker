<?php

require 'KenoBucketService.php';

$kenoBucketService = new KenoBucketService();

// wrap the data in a callback, jsonp style
$todays_data = "setData(".file_get_contents('http://www.masslottery.com/data/json/search/dailygames/todays/keno.json').");";


$kenoBucketService->upload('todays-keno.js', $todays_data);

