<?php

// HomeController
Route::get('/', 'HomeController@index');

// AuthController
Route::post('/login', 'AuthController@login');
Route::get('/logout', 'AuthController@logout');

// BarcodeController
Route::post('/decode', 'BarcodeController@decode');

?>
