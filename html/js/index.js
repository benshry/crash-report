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

});
