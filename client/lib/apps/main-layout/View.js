/*jshint multistr: true, eqnull:true */
var data = [{
    "user": {
        "email" : 'sergzak022@gmail.com',
        "color" : 'lightblue'
    },
    "events": []
}, {
    "user" : {
        "email" : 'artur@gmail.com',
        "color" : 'pink'
    },
    "events": []
}];


define(['Backbone', 'underscore', 'calender', './apps/group-list/main', 'css!./stylesheets/style'], function (Backbone, _, calender, groupListControler) {
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

            calender.render(this.$el.find('div#calender'), data);

            groupListControler.destroyPanel(true);
            groupListControler.createPanel(this.$el.find('div#groups-ui'), this.model.get('user'));
            return this;
        }
    });
});