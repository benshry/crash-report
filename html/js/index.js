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
