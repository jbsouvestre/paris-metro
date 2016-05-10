import latLngToPoint from './lat-lng-to-point';

function iconPath(filename) {
    return filename == null ? filename : `img/${filename}`;
}

function image(icon) {
    return {
        url: iconPath(icon),
        size: new google.maps.Size(32, 32),
        // origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(25, 25),
        anchor: new google.maps.Point(16, 16)
    };
}

export default function marker(map, lat, lng, icon) {

    var imageData = icon == null ? null : image(icon);

    return new google.maps.Marker({
        map: map, 
        position: latLngToPoint(lat, lng),
        icon: imageData,
        animation: google.maps.Animation.DROP,
    });
}