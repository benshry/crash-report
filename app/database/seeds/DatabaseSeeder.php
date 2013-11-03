<?php

class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Eloquent::unguard();

        $this->call('UserTableSeeder');
        $this->call('VINTableSeeder');
    }

}

class UserTableSeeder extends Seeder {
    public function run()
    {
        DB::table('users')->delete();

        User::create(array(
            'id' => 1,
            'admin' => 1,
            'username' => 'rbowden91',
            'hash' => '$1$sHD9kJLx$1/0Rmj0I1.BNhF8mrjBbg.',
            'name' => 'Rob Bowden',
            'badge' => '23',
            'department' => 'Fairfield',
            'municipality' => '0707',
            'email' => 'rob@cs.harvard.edu',
            'phone' => '973-459-0732'
        ));
    }
}

class VINTableSeeder extends Seeder {
    public function run()
    {
        DB::table('vins')->delete();

        VIN::create(array(
            'id' => 1,
            'vin' => '1FTSS34P57DA02664',
            'make' => 'Ford',
            'model' => 'Econoline (Super Duty)',
            'year' => '2007'
        ));
    }
}
