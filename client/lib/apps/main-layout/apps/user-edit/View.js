/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', 'css!./stylesheets/style'], function (Backbone, _) {
    return Backbone.View.extend({
        template: _.template("\
            <div> \
            </div> \
        "),

        _views: {},

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

            return this;
        }
    });
});