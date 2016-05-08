import { ItemView } from 'marionette';
import ConfirmMoveTemplate from 'templates/game/confirm-move.hbs';

import GameChannel, { SELECTED_MODEL } from 'radio/game'; 

export default ItemView.extend({
    template: ConfirmMoveTemplate,
    ui: {
        'confirmMove': '.game-confirm-move'
    },
    events: {
        'click @ui.confirmMove': "onClickConfirmMove"
    },
    templateHelpers() {
        var model = GameChannel.request(SELECTED_MODEL);
        console.log(model);
        return {
            'station_name': model.name()
        };
    }
});