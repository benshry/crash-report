$(function() {

    /*
     * LANDING PAGE EVENT HANDLERS
     */
    $('#landing').on('click', '.option', function() {
        var page = $(this).attr('data-page');

        // new report
        if (page == 1) {
            $.post('/crash/new', function(data) {
                data = JSON.parse(data);
                if (data.success === false) {
                    // XXX
                    alert('uh oh');
                }
                var margin = -100 * page;
                $('#container').css('margin-left', margin + "%");
            });
        }
        else {
            var margin = -100 * page;
            $('#container').css('margin-left', margin + "%");
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
        new_option.find('h1').html('Vehicle ' + vehicleNum);

        var plus = $('#plus-img');
        $('#plus-img').remove();
        plus.appendTo(row);
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
    });

    $('body').on('change', '.crash-updater', function() {
        var data = {};
        data[$(this).attr('name')] = $(this).val();
        $.post('/crash/update', data, function(response) {
            response = JSON.parse(response);
            if (response.success === false) {
                // XXX
                alert('uh oh');
            }
        });
    });

    $('body').on('shown.bs.modal', function(e) {
        if (e.target.id === 'modal-crashinfo' || e.target.id === 'modal-officer') {
            $.get('/crash', function(data) {
                data = JSON.parse(data);
                if (data.success === false) {
                    // XXX
                    alert('uh oh');
                }

                // poopulate the text boxes
                for (var i in data) {
                    $('[name="' + i + '"]').val(data[i]);
                }
            });
        }
    });

});
