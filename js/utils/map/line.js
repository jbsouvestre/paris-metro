export default function line(p1, p2) {
    return new google.maps.Polyline({
        path: [p1, p2]
    });
}