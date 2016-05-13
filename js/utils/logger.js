
const LEVELS = {
    DEBUG: 5,
    INFO: 4,
    WARN: 3,
    ERROR: 2
};

const DEFAULT_LEVEL = LEVELS.DEBUG;

var logLevel = DEFAULT_LEVEL;

console.log(window.console);

const console = (function() {
    var noop = function() {}
    var console = window.console || {};
    var methods = ['log', 'info', 'warn', 'error'];
    var length = methods.length;
    
    while(length --) {
        let method = methods[length];
        if(!console[method]){
            console[method] = method;
        }
    }
    return console;
});

var Logger = (function(TAG){

    function Logger() {
        this.debug = wrapLog('debug');
        this.log = this.debug;
        this.info = wrapLog('info');
        this.warn = wrapLog('warn');
        this.error = wrapLog('error');
    }

    function wrapLog(name) {
        var level = LEVELS[name.toUpperCase()];

        return function(...args) {

            if(logLevel >= level) {
                console.log(name);
                console[name].call(console, `[${TAG}]`, ...args);
            }

        }
    }

    return Logger;
})();

function getLogger(tag){
    return new Logger(tag);
}

function setLevel(level){
    logLevel = LEVELS[level] ? level : logLevel;
}

function getLevel() {
    return logLevel;
}

export { setLevel, getLevel, getLogger, LEVELS }