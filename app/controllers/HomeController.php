<?php

class HomeController extends BaseController {

	public function index()
    {
        if (Session::has('user')) {
            return View::make('index', [
                'user' => Session::get('user'),
            ]);
        }
        else {
            return View::make('login');
        }
    }
}

?>
