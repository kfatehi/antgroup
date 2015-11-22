/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', './GroupRow', './GroupRowView', 'css!./stylesheets/style'], function (Backbone, _, GroupRow, GroupRowView) {
    return Backbone.View.extend({
        template: _.template("\
            <div class='panel panel-default'>\
                <div class='panel-heading'>Groups</div>\
                <div class='panel-body group-list'></div>\
                <div class='panel-footer'>\
                    <button class='btn btn-success add-group'>Add Group</button>\
                    <button class='btn btn-default remove-group'>Remove Group</button>\
                </div>\
            </div>\
        "),
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
                $el.html(this.template());
                var $body = $el.find('div.group-list');
                var groupRowModel, groupRowView;
                groups.forEach(function (group) {
                    groupRowModel = new GroupRow(group);
                    groupRowView = new GroupRowView({model: groupRowModel});
                    $body.append(groupRowView.render().el);
                });
            }
            return this;
        }
    });
});