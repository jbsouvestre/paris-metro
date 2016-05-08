import Marionette from 'marionette';
import Radio from 'backbone.radio';
import _ from 'underscore';

// Use Backbone.Radio instead of Backbone.Wreqr
Marionette.Application.prototype._initChannel = function() {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
};