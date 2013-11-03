function initializeMap() {
    if (!navigator.geolocation)
    {
        return;
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        var mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        map.setTilt(0);
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.MARKER,
                    google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.POLYLINE,
                    google.maps.drawing.OverlayType.RECTANGLE
                ]
            },
            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                //editable: true,
                zIndex: 1,
                type: 'circle'
            },
            rectangleOptions: {
                fillColor: '#ff0000',
                fillOpacity: .8,
                strokeWeight: 5,
                clickable: false,
                //editable: true,
                zIndex: 1,
                type: 'rectangle'
            },
        });
        drawingManager.setMap(map);

        var overlays = [];

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
            if (e.overlay.type === 'rectangle') {
                var keys = ['bounds', 'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'strokeColor',
                        'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible',' zindex', 'type'];
            }
            else if (e.overlay.type === 'circle') {
                var keys = ['center', 'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'radius',
                        'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible',' zindex', 'type'];
            }
            else {
                return;
            }

            var data = {};
            for (var i = 0; i < keys.length; i++) {
                if (typeof e.overlay[keys[i]] !== 'undefined') {
                    var value = e.overlay[keys[i]];
                    if (keys[i] === 'bounds') {
                        var ne = value.getNorthEast();
                        var sw = value.getSouthWest();
                        data['vbounds'] = {
                            ne_lat: ne.lat(),
                            ne_lng: ne.lng(),
                            sw_lat: sw.lat(),
                            sw_lng: sw.lng()
                        };
                    }
                    else if (keys[i] === 'center') {
                        data['vcenter'] = {
                            lat: value.lat(),
                            lng: value.lng()
                        };
                    }
                    else {
                        data[keys[i]] = value;
                    }
                }
            }

            overlays.push(data);

            $.post('/crash/update', { map_data: JSON.stringify(overlays) }, function(response) {
            });
        });

        $.get('/crash', function(data) {
            data = JSON.parse(data);

            try {
                overlays = JSON.parse(data.map_data);
            } catch(e) { return; }

            for (var i = 0; i < overlays.length; i++) {
                overlays[i].map = map;
                switch (overlays[i].type) {
                    case 'rectangle':
                        var bounds = new google.maps.LatLngBounds(
                            new google.maps.LatLng(overlays[i].vbounds.sw_lat, overlays[i].vbounds.sw_lng),
                            new google.maps.LatLng(overlays[i].vbounds.ne_lat, overlays[i].vbounds.ne_lng)
                        );
                        overlays[i].bounds = bounds;
                        new google.maps.Rectangle(overlays[i]);
                        delete overlays[i].bounds;
                        break;
                    case 'circle':
                        var center = new google.maps.LatLng(overlays[i].vcenter.lat, overlays[i].vcenter.lng);
                        overlays[i].center = center;
                        new google.maps.Circle(overlays[i]);
                        delete overlays[i].center;
                        break;
                }
                delete overlays[i].map
            }
        });
    });
}
