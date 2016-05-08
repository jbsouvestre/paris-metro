export default {
    select(model) {

        if(!model || this.selected === model) {
            return;
        }

        this.deselect();

        this.selected = model;
        this.trigger('select', model);
        model.trigger('select');
    },

    deselect(model) {
        if(!this.selected) {
            return;
        }

        model = model || this.selected;

        if(this.selected !== model) {
            return;
        }

        this.selected = null;
        this.trigger('deselect', model);
        model.trigger('deselect');
    },

    getSelected() {
        return this.selected;
    },

    selectNext() {
        return this._selectAt(1);
    },
    selectPrev() {
        return this._selectAt(-1);
    },

    _selectAt(i) {
        var selected = this.selected;

        if(!selected) {
            return;
        }

        var currentIndex = this.indexOf(selected);

        var toSelect = this.at(currentIndex + i);
        this.select(toSelect);
        return toSelect;
    }
};