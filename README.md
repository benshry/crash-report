# Installation

*Assumes [CS50 Appliance 17](https://manual.cs50.net/CS50_Appliance_17).*

Inside appliance as `jharvard`:

    cd ~/vhosts
    git clone git@github.com:cs50/market50.git market.cs50.net
    cd market.cs50.net
    ./bin/chmod
    php lib/laravel/artisan migrate # to import database tables

Outside appliance (assuming Mac):

    sudo su -
    echo "w.x.y.z market.cs50.net" >> /etc/hosts # where w.x.y.z is appliance's IP address
    exit

# Troubleshooting

## Fixing Permissions

    chmod 700 ~/vhosts/market.cs50.net/bin/chmod
    ~/vhosts/market.cs50.net/bin/chmod

# Deployment

*requires that your SSH key be added to `build.x.cs50.net`*

    git remote add production ssh://ec2-user@build.x.cs50.net/home/ec2-user/var/market50.git # once
    git push production master # thereafter

# Notes

* If `lib/laravel/vendor/composer/autoload_classmap.php` is out-of-date, run `cd lib/laravel ; ../../bin/composer.phar update`

# References

* [Laravel](http://laravel.com/docs)

# Notes

How Laravel's directory structure was altered:

    cd portal50
    mkdir {lib,var}
    cd lib
    ../bin/composer.phar create-project laravel/laravel laravel --prefer-dist
    cd lib/laravel
    # edit paths in composer.json
    # edit bootstrap/{paths,start}.php
    # mv app/storage ../../var
    # mv app ../..
    # mv public ../html
    ../../bin/composer.phar update
