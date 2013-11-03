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
        <!--<div id="map-canvas" style="height:100%"></div>-->
        <!--<div id="webcam" style="height:500px"></div>-->
        @include('templates.modal-crashinfo')
        @include('templates.modal-cardamage')
        @include('templates.modal-crashdiagram')
        @include('templates.modal-officer')

        @if ($open_crash)
            <script>
                // hackishly go to second page if we have an active crash
                $(document).on('ready', function() {
                    $('#container').css('margin-left', "-100%");
                });
            </script>
        @endif
    <body>
</html>
