import { Collection } from 'backbone';
import { extend } from 'underscore';
import ModelSelectMixin from 'mixins/model-select';

var SelectableCollection = Collection.extend({
    url: 'url'
});
extend(SelectableCollection.prototype, ModelSelectMixin);

describe('Mixins', function() {
    describe('#model-select', function() {

        var collection;
        
        beforeEach(function() {

            collection = new SelectableCollection([
                {id: 1, name: 'JB'},
                {id: 2, name: 'John'},
                {id: 3, name: 'Jessica'}
            ]);
        });

        it('should select a model in a collection', function() {
            var model = collection.get(1);

            var evs = {
                modelEventwasTriggered() {},
                collectionEventWasTriggered() {}
            };

            spyOn(evs, 'modelEventwasTriggered');
            spyOn(evs, 'collectionEventWasTriggered');

            model.on('select', evs.modelEventwasTriggered);
            collection.on('select', evs.collectionEventWasTriggered);

            collection.select(model);


            expect(collection.getSelected()).toBe(model);
            expect(evs.collectionEventWasTriggered).toHaveBeenCalledWith(model);
            expect(evs.modelEventwasTriggered).toHaveBeenCalled();
        });

        it('should select a model in a collection', function() {
            var model = collection.get(1);

            var evs = {
                modelEventwasTriggered() {},
                collectionEventWasTriggered() {}
            };

            collection.select(model);


            spyOn(evs, 'modelEventwasTriggered');
            spyOn(evs, 'collectionEventWasTriggered');
            model.on('deselect', evs.modelEventwasTriggered);
            collection.on('deselect', evs.collectionEventWasTriggered);

            collection.deselect(model);

            expect(collection.getSelected()).toBeNull();
            expect(evs.collectionEventWasTriggered).toHaveBeenCalledWith(model);
            expect(evs.modelEventwasTriggered).toHaveBeenCalled();

        });

        it('should select the next model', function() {
            var currentModel = collection.get(1);
            var next = collection.get(2);
            collection.select(currentModel);

            expect(collection.selectNext()).toBe(next);
        });

        it('should select the next previous model', function() {
            var currentModel = collection.get(2);
            var previous = collection.get(1);
            collection.select(currentModel);

            expect(collection.selectPrev()).toBe(previous);
        });
    });
});