<?php

// HomeController
Route::get('/', 'HomeController@index');

// AuthController
Route::get('/login', 'AuthController@login');
Route::get('/login/return_to', 'AuthController@return_to');
Route::get('/logout', 'AuthController@logout');

?>
