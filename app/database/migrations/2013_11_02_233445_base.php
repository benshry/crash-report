<?php

use Illuminate\Database\Migrations\Migration;

class Base extends Migration {

        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('crashes', function($table)
            {
                $table->bigIncrements('id');
                $table->string('case');
                $table->string('description', 8191);
                $table->string('damage', 8191);
                $table->string('car_damage');
                $table->string('location');
                $table->string('department');
                $table->string('municipality');
                $table->string('officer_name');
                $table->string('badge_number');
                $table->string('map_data', 2048);
                $table->integer('injured')->nullable();
                $table->integer('killed')->nullable();
                $table->date('date');
                $table->timestamps();
            });

            Schema::create('licenses', function($table)
            {
                $table->bigIncrements('id');
                $table->string('dlid')->unique();
                $table->string('first');
                $table->string('initial');
                $table->string('last');
                $table->string('street');
                $table->string('city');
                $table->string('state');
                $table->string('zip');
                $table->string('sex');
                $table->string('eyes');
                $table->timestamps();
            });

            Schema::create('users', function($table)
            {
                $table->bigIncrements('id');
                $table->boolean('admin');
                $table->string('username');
                $table->string('hash');
                $table->string('name');
                $table->string('badge');
                $table->string('email');
                $table->string('phone');
                $table->timestamps();
            });

            Schema::create('vehicles', function($table)
            {
                $table->bigIncrements('id');
                $table->bigInteger('crash_id');
                //$table->foreign('crash_id')->references('id')->on('crashes');
                $table->string('vin');
                $table->string('expires');
                $table->string('driver_first');
                $table->string('driver_initial');
                $table->string('driver_last');
                $table->string('driver_street');
                $table->string('driver_city');
                $table->string('driver_state');
                $table->string('driver_zip');
                $table->string('driver_sex');
                $table->string('driver_eyes');
                $table->string('license_state');
                $table->string('license_number');
                $table->string('license_dob');
                $table->string('license_expires');
                $table->boolean('same_owner');
                $table->string('owner_first')->nullable();
                $table->string('owner_initial')->nullable();
                $table->string('owner_last')->nullable();
                $table->string('owner_street')->nullable();
                $table->string('owner_city')->nullable();
                $table->string('owner_state')->nullable();
                $table->string('owner_zip')->nullable();
                $table->timestamps();
            });

            Schema::create('vins', function($table)
            {
                $table->bigIncrements('id');
                $table->string('vin')->unique();
                $table->string('make');
                $table->string('model');
                $table->string('year');
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::drop('crashes');
            Schema::drop('licenses');
            Schema::drop('users');
            Schema::drop('vehicles');
            Schema::drop('vins');
        }

}

