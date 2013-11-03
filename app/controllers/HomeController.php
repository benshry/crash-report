<?php

class HomeController extends BaseController {

    public function index()
    {
        if (Session::has('user')) {
            return View::make('index', [
                'user' => Session::get('user'),
                'open_crash' => Session::has('crash_id')
            ]);
        }
        else {
            return View::make('login', Session::all());
        }
    }
}

?>
