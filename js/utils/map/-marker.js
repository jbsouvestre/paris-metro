function latLngToPoint(lat, lng) {
    return new google.maps.LatLng(lat, lng);
}

export default function marker(map, lat, lng, icon) {
    new google.maps.Marler({
        map: map, 
        position: latLngToPoint(lat, lng),
        icon: icon,
        animation: google.maps.Animation.DROP
    });
}