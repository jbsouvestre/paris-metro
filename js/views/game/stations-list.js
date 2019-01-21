import { ItemView, CollectionView } from 'marionette';

import StationListTemplate from '../../templates/game/station-list-view.hbs';

const StationList = ItemView.extend({
    template: StationListTemplate,
    tagName: 'li',
    modelEvents: {
        'select': 'onSelect',
        'deselect': 'onDeselect'
    },
    onSelect() {
        console.log('selected');
        this.$el.addClass('selected');
    },
    onDeselect() {
        this.$el.removeClass('selected');
    }
});

export default CollectionView.extend({
    tagName: 'ul',
    childView: StationList,
    childEvents: {
        'select': 'onChildSelect'
    },
    onChildSelect(childView, model) {
        this.collection.select(model);
    }
});