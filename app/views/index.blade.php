<!DOCTYPE html>
<html>
    @include('templates.head')
    <body>
        <div id="wrapper">
            <div id="container">
                @include('templates.page-landing')
                @include('templates.page-add')
                @include('templates.page-browse')
            </div>
        </div>
        <div id="map-canvas" style="height:100%"></div>
    <body>
</html>
