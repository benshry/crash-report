$(function() {

    vehicleNum = 0;
    addVehicle = function(id) {
        vehicleNum++;
        var div = $('<div class="option vehicle" data-vehicle-num="'+id+'">\
            <h1>Vehicle '+vehicleNum+'</h1>\
            <div class="remove-option"><div class="remove-option-abs">X</div></div>\
            <div class="option-body">\
                <img src="/img/icon-car.png">\
            </div>\
        </div>');

        $('#vehicles').append(div);

        //var plus = $('#plus-img');
        //$('#plus-img').remove();
        //plus.appendTo(row);
    }

    /*
     * BROWSE PAGE EVENT HANDLERS
     */
    $('#browse').on('click', '.option', function() {
        var report = { crash_id: $(this).data('report') };

        $.post('/crash/set', report, function(data) {
            data = JSON.parse(data);
            $.get('/vehicles/', function(data) {
                data = JSON.parse(data);

                $('#vehicles').empty();
                vehicleNum = 0;
                for (var i = 0; i < data.vehicles.length; i++) {
                    addVehicle(data.vehicles[i].id);
                }
                $('#container').css('margin-left', "-100%");
            });
        });
    });

    /*
     * LANDING PAGE EVENT HANDLERS
     */
    $('#landing').on('click', '.option', function() {
        var page = $(this).attr('data-page');

        // new report
        if (page == 1) {
            $.post('/crash/new', function(data) {
                data = JSON.parse(data);
                $.get('/vehicles/', function(data) {
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
        }
        else {
            $.get('/crashes', function(data) {
                data = JSON.parse(data);
                $('#reports').html('<img class="back-img" src="/img/icon-back.png">');
                for (var i = 0; i < data.crashes.length; i++) {
                    $("#reports").append('\
                        <div class="option" data-report="' + (i+1) + '">\
                            <h1>Report ' + (i + 1) + '</h1>\
                            <div class="option-body">\
                                <img src="/img/icon-document.png">\
                            </div>\
                        </div>');
                }
                var margin = -100 * page;
                $('#container').css('margin-left', margin + "%");
            });
        }
    });

    /*
     * APP PAGE EVENT HANDLERS
     */
    $('.back').on('click', 'img.back-img', function() {
        $('#container').css('margin-left', 0);
    });

    $('.back').on('click', '#back-img', function() {
        $('#container').css('margin-left', '-100%');
    });

    $('#plus').on('click', '#plus-img', function() {
        $.post('/vehicle/new', function(data) {
            data = JSON.parse(data);
            addVehicle(data.id);
        });
    });

    $('#plus').on('click', '.vehicle', function() {

        $.post('/vehicle/set', { vehicle_id: $(this).data('vehicle-num') }, function(data) {
            $('#container').css('margin-left', "-300%");
        });
    });

    $('#plus').on('click', '.remove-option-abs', function(e) {
        var option = $(this).closest('.option');
        if ($('.vehicle').length === 1) {
            return false;
        }
        var vehicle = $(this).closest('.option').data('vehicle-num');
        $.post('/vehicle/delete', { id: vehicle }, function(data) {
            $('[data-vehicle-num="' + vehicle + '"]').remove();
        });
        e.stopPropagation();
    });

    $('#modal-cardamage').on('click', '.nums h1', function() {
        var selected = $(this).attr('data-selected');

        /* TODO: 1 css call */
        if (!selected || selected == 0) {
            $(this).css('background-color', 'red');
            $(this).css('color', 'white');
            $(this).css('text-shadow', 'text-shadow: 0 -1px 1px rgba(0, 0, 0, .5)');
            $(this).attr('data-selected', 1);
        }
        else {
            $(this).css('background-color', '');
            $(this).css('color', '');
            $(this).css('text-shadow', '');
            $(this).attr('data-selected', 0);
        }

        var state = [];
        $('[data-selected=1]').each(function(i, e) {
            state.push($(e).data('num'));
        });

        $.post('/crash/update', { car_damage: JSON.stringify(state) }, function(data) {
        });
    });

    $('#pdf').on('click', '#pdf-view', function() {
        $.get('/crash/pdf', function(data) {
            console.log(data);
        });
    });

    $('body').on('click', '.option', function() {
        var modal = $(this).attr('href');
        $(modal).css('z-index', '1050')
    });

    $('body').on('change', '.crash-updater', function() {
        var data = {};
        data[$(this).attr('name')] = $(this).val();
        $.post('/crash/update', data, function(response) {
            response = JSON.parse(response);
        });
    });

    $('body').on('change', '.vehicle-updater', function() {
        var data = {};
        data[$(this).attr('name')] = $(this).val();
        var self = $(this);
        $.post('/vehicle/update', data, function(response) {
            response = JSON.parse(response);
            if (response.success === false) {
                self.css('background-color', '#FF8888');
                return;
            }
            self.css('background-color', 'white');
            for (var i in response.fields) {
                $('[name="' + i + '"]').val(response.fields[i]);
            }
        });
    });

    $('body').on('shown.bs.modal', function(e) {
        if (e.target.id === 'modal-crashinfo' || e.target.id === 'modal-officer') {
            $.get('/crash', function(data) {
                data = JSON.parse(data);

                // populate the text boxes
                for (var i in data) {
                    $('[name="' + i + '"]').val(data[i]);
                }
            });
        }
        else if (e.target.id === 'modal-driver' || e.target.id === 'modal-vehicle' || e.target.id === 'modal-owner') {
            $.get('/vehicle', function(data) {
                data = JSON.parse(data);

                // populate the text boxes
                for (var i in data) {
                    $('[name="' + i + '"]').val(data[i]);
                }
            });
        }
        else if (e.target.id === 'modal-cardamage') {
            $.get('/crash', function(data) {
                data = JSON.parse(data);
                try {
                    selected = JSON.parse(data.car_damage);
                } catch(e) { return; }

                for (var i = 0; i < selected.length; i++) {
                    var select = $('[data-num="' + selected[i] + '"]').first();
                    select.css('background-color', 'red');
                    select.css('color', 'white');
                    select.css('text-shadow', 'text-shadow: 0 -1px 1px rgba(0, 0, 0, .5)');
                    select.attr('data-selected', 1);
                }
            });
        }
        else if (e.target.id === 'modal-crashdiagram') {
            $('#map-canvas').css('height', '500px');
            initializeMap();
        }
    });

    $('body').on('click', '.open-webcam', function() {
        $(this).closest('.modal-body').css('height', '600px');
        $(this).closest('.modal-body').css('max-height', '600px');
        initializeCamera();
    });

    $('body').on('click', '.copy-from-driver', function() {
        $.get('/vehicle', function(data) {
            data = JSON.parse(data);

            var map = ['first', 'initial', 'last', 'street', 'city', 'state', 'zip'];

            for (var i = 0; i < map.length; i++) {
                $('[name="owner_' + map[i] + '"]').val(data['driver_' + map[i]])
                // XXX
                $('[name="owner_' + map[i] + '"]').trigger('change');
            }
        });
    });

});
