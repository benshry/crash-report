<!DOCTYPE html>

<html>
    <head>
        <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        {{ HTML::script('/js/jquery-1.10.2.min.js') }}
        {{ HTML::script('/js/bootstrap.min.js') }}
        <title>Crashr</title>
    </head>
    <body>
        <div id="top">
        </div>
        <div id="middle">
            <form>
                <fieldset>
                    <legend>Log in.</legend>
                    <label>Username</label>
                    <input type="text" placeholder="Username">
                    <input type="password" placeholder="Password">
                    <button type="submit" class="btn btn-large">Log In</button>
                </fieldset>
            </form>
        </div>
    <body>
</html>
