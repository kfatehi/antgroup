/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', 'css!./stylesheets/style'], function (Backbone, _) {
    return Backbone.View.extend({
        template: _.template('\
            <div class="panel panel-default pgroup-row">\
                <div class="panel-heading">\
                </div>\
                <div class="panel-body">\
                </div>\
            </div>\
        '),

        events: {
            'click button[type="submit"]' : 'register'
        },

        initialize: function () {
            this.listenTo(this.model, 'error', this.renderError);
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
            this.$el.html(this.template());
            return this;
        }
    });
});