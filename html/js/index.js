$(function() {

    /*
     * BROWSE PAGE EVENT HANDLERS
     */
    $('#browse').on('click', '.option', function() {
        var report = { crash_id: $(this).data('report') };

        $.post('/crash/set', report, function(data) {
            data = JSON.parse(data);
            $('#container').css('margin-left', "-100%");
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
                var margin = -100 * page;
                $('#container').css('margin-left', margin + "%");
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
                                Report Icon\
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

    // sorry for the global
    var vehicleNum = 1;
    $('#plus').on('click', '#plus-img', function() {
        var row = $(this).closest('.row');
        var new_option = $('#option-add-vehicle').clone().appendTo(row);

        vehicleNum++;
        new_option.attr('data-vehicle-num', vehicleNum);
        new_option.removeAttr('id');
        new_option.find('h1').html('Vehicle ' + vehicleNum);

        var plus = $('#plus-img');
        $('#plus-img').remove();
        plus.appendTo(row);
    });

    $('#plus').on('click', '.vehicle', function() {
        $('#container').css('margin-left', "-300%");
    });

    $('#plus').on('click', '.remove-option-abs', function() {
        var option = $(this).closest('.option');
        if (parseInt(option.attr('data-vehicle-num')) != 1)
            $(this).closest('.option').remove();
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

    $('body').on('shown.bs.modal', function(e) {
        if (e.target.id === 'modal-crashinfo' || e.target.id === 'modal-officer') {
            $.get('/crash', function(data) {
                data = JSON.parse(data);

                // poopulate the text boxes
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

});
