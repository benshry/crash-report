<?php

// HomeController
Route::get('/', 'HomeController@index');

// AuthController
Route::post('/login', 'AuthController@login');
Route::get('/logout', 'AuthController@logout');

// BarcodeController
Route::post('/decode', 'BarcodeController@decode');

// CrashController
Route::get('/crash', 'CrashController@get');
Route::post('/crash/set', 'CrashController@set');
Route::get('/crashes', 'CrashController@getAll');
Route::post('/crash/update', 'CrashController@update');
Route::post('/crash/new', 'CrashController@create');

// VehicleController
Route::get('/vehicle', 'VehicleController@get');
Route::post('/vehicle/set', 'VehicleController@set');
Route::get('/vehicles', 'VehicleController@getAll');
Route::post('/vehicle/update', 'VehicleController@update');
Route::post('/vehicle/delete', 'VehicleController@delete');
Route::post('/vehicle/new', 'VehicleController@create');

Route::get('/crash/pdf', 'CrashController@pdf');
?>
