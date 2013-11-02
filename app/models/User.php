<?php

class User extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    public static function add($data) {
    }

    public static function authenticate($username, $password) {
        $user = self::where('username', '=', $username)->first();
        if ($user === null) {
            return false;
        }

        if (crypt($password, $user->hash) === $user->hash) {
            Session::put('user', $user);
            return true;
        }

        return false;
    }


    public static function password($plaintext) {
        return crypt($plaintext);
    }
}

?>
