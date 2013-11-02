<?php

// HomeController
Route::get('/landing', 'HomeController@landing');

// AuthController
Route::get('/login', 'AuthController@login');
Route::get('/login/return_to', 'AuthController@return_to');
Route::get('/logout', 'AuthController@logout');

?>
