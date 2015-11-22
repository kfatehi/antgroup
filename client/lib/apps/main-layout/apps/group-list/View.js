/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', './GroupRow', './GroupRowView', 'css!./stylesheets/style'], function (Backbone, _, GroupRow, GroupRowView) {
    return Backbone.View.extend({
        className: 'group-list',

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
            var groups = this.model.get('groups');

            if ( Array.isArray(groups) ) {
                var $el = this.$el;
                $el.empty();
                var groupRowModel, groupRowView;
                groups.forEach(function (group) {
                    groupRowModel = new GroupRow(group);
                    groupRowView = new GroupRowView({model: groupRowModel});
                    $el.append(groupRowView.render().el);
                });
            }
            return this;
        }
    });
});