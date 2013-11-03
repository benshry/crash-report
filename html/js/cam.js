function error(errorId, errorMsg) {
    alert(errorId);
}


function snapshot() {
    var img = $.scriptcam.getFrameAsBase64();
    $.post('/decode', { image: img }, function(data) {
        data = JSON.parse(data);

        var map = {
            'first': 'driver_first',
            'middle': 'driver_initial',
            'last': 'driver_last',
            'street': 'driver_street',
            'city': 'driver_city',
            'state': 'driver_state',
            'postal': 'driver_zip',
            'sex': 'driver_sex',
            'eyes': 'driver_eyes',
            'dob': 'license_dob',
            'id': 'license_number',
            'expires': 'license_expiration'
        }

        var post_data = {};

        for (var i in map) {
            $('[name="' + map[i] + '"]').val(data.user[i]);
            post_data[map[i]] = data.user[i];
        }

        $('[name="license_state"]').val(data.head.state);
        post_data['license_state'] = data.head.state;

        $.post('/vehicle/update', post_data, function(data) {
        });

    });
}



function initializeCamera() {
    $("#webcam").scriptcam({
        path: '/js/scriptcam/',
        onError: error,
        width: 400,
        height: 300
    });

    $('#webcam').after($('<button id="take-picture">Scan</button>'));
    $('#take-picture').on('click', function() {
        snapshot();
    });
}
