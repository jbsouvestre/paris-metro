import { ItemView } from 'marionette';

import GameEndedTemplate from 'templates/game/game-ended.hbs';

export default ItemView.extend({
    template: GameEndedTemplate,
    className: 'modal fade'
});