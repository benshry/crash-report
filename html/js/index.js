$(function() {

    /*
     * LANDING PAGE EVENT HANDLERS
     */
    $('#landing').on('click', '.option', function() {
        var page = $(this).attr('data-page')
        var margin = -100 * page;
        $('#container').css('margin-left', margin + "%");
    });

});
