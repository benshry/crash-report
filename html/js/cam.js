function error(errorId, errorMsg) {
    alert(errorId);
}


function snapshot() {
    var img = $.scriptcam.getFrameAsBase64();
    $.post('/decode', { image: img }, function(data) {
        console.log(data);
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
