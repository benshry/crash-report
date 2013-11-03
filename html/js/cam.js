function barcode_upload(b64) {
}

function error(errorId, errorMsg) {
    alert(errorId);
}


function snapshot() {
    var img = $.scriptcam.getFrameAsBase64();
    $.post('/decode', { image: img }, function(data) {
        console.log(data);
    });
}



$(document).ready(function() {
    $("#webcam").scriptcam({
        path: '/js/scriptcam/',
        onError: error,
        width: 800,
        height: 600,
        onPictureAsBase64:barcode_upload
    });

});
