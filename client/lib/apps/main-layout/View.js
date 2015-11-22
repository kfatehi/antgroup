/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', './apps/group-list/main', 'css!./stylesheets/style'], function (Backbone, _, groupListControler) {
    return Backbone.View.extend({
        template: _.template('\
            <div id="calender" class="panel panel-default">\
            </div>\
            <div id="groups-ui" class="panel panel-default">\
            </div>\
        '),

        events: {
        },

        _curPanel: null,

        initialize: function () {

        },

        remove: function (empty) {
            if (empty) {
                this.trigger('remove');
                this.$el.empty().off();
                this.stopListening();
                return this;
            } else {
                return Backbone.View.prototype.remove.call(this);
            }
        },

        render: function () {
            this.$el.append(this.template());
            groupListControler.destroyPanel(true);
            groupListControler.createPanel(this.$el.find('div#groups-ui'), this.model.get('user'));
            return this;
        }
    });
});