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

?>
