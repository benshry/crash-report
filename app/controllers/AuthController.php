<?php

class AuthController extends BaseController {

    public function login()
    {
        if (Session::has('user')) {
            return Redirect::to('/');
        }

        if (User::authenticate(Input::get('username'), Input::get('password')) === false) {
            Session::flash('error', 'Invalid username or password!');
            Session::flash('username', Input::get('username'));
        }

        return Redirect::to('/');
    }

    public function logout()
    {
        Session::flush();
        return Redirect::to('/');
    }

}

?>
