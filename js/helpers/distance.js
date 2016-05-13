export default function distanceFormat(distance){
    if(distance > 1000) {
        let d = distance / 1000;
        return `${d.toFixed(2)} km`;
    } else {
        return `${Math.ceil(distance)} m`;
    }
}