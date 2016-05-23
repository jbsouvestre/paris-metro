import { Model } from 'backbone';

export default Model.extend({
    defaults: {
        score: 0
    },
    add(score) {
        this.set('score', this.get('score') + score);
        if(DEBUG) {
            console.info('[SCORE] Score is now', this.get('score'));
        }
    }
});