$(function() {

    /*
     * LANDING PAGE EVENT HANDLERS
     */
    $('#landing').on('click', '.option', function() {
        var page = $(this).attr('data-page')
        var margin = -100 * page;
        $('#container').css('margin-left', margin + "%");
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

});
