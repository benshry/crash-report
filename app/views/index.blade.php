<!DOCTYPE html>
<html>
    @include('templates.head')
    <body>
        <div id="wrapper">
            <div id="container">
                @include('templates.page-landing')
                @include('templates.page-add')
                @include('templates.page-browse')
                @include('templates.page-vehicle')
            </div>
        </div>
        @include('templates.modal-crashinfo')
        @include('templates.modal-cardamage')
        @include('templates.modal-crashdiagram')
        @include('templates.modal-officer')
        @include('templates.modal-vehicle')
        @include('templates.modal-driver')
        @include('templates.modal-owner')

        @if ($open_crash)
            <script>
                // hackishly go to second page if we have an active crash
                $(document).on('ready', function() {
                    $.get('/vehicles/', function(data) {
                        var page = 1;
                        data = JSON.parse(data);


                        $('#vehicles').empty();
                        vehicleNum = 0;
                        for (var i = 0; i < data.vehicles.length; i++) {
                            addVehicle(data.vehicles[i].id);
                        }
                        var margin = -100 * page;
                        $('#container').css('margin-left', margin + "%");
                    });
                });
            </script>
        @endif
    <body>
</html>
