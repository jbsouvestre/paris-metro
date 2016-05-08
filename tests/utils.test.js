import keyMirror from 'utils/key-mirror';

describe('utils', function() {
    describe('#key-mirror', function() {

        it('should keyMirror an object', function() {
            var obj = {
                ONE: null, 
                TWO: null, 
                THREE: null
            };

            var keyMirrored = keyMirror(obj);

            expect(keyMirrored.ONE).toBe('ONE');
        });
    });
});