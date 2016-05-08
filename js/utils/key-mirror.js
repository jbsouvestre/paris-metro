export default function keyMirror(obj) {
    let ret = {};
    let key;

    if(!(obj instanceof Object && !Array.isArray(obj))){
        throw new Error(`keyMirror: Argument must be an object`);
    }

    for(key in obj) {
        if(obj.hasOwnProperty(key)) {
            ret[key] = key;
        }
    }
    return ret;
}