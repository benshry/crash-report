<!DOCTYPE html>

<html>
    @include('templates.head')
    <body>
        @include('templates.header')
        @if (isset($error))
            <div class="alert alert-danger">
                {{ $error }}
            </div>
        @endif
        <div id="middle">
            <form id="form-login" action="/login" method="post">
                    <h2>Log In</h2>
                    <input type="text" placeholder="Username" name="username"
                        @if (isset($username))
                            value="{{{ $username }}}"
                        @endif
                    >
                    <input type="password" placeholder="Password"
                        @if (isset($username))
                            autofocus
                        @endif
                    >
                    <button type="submit" class="btn">Log In</button>
            </form>
        </div>
    <body>
</html>
