export default function line(map, p1, p2) {
    return new google.maps.Polyline({
        path: [p1, p2],
        map: map
    });
}