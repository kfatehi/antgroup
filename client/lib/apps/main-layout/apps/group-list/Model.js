define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            name: null,
            email: null,
            groups: []
        },

        initialize: function () {

        },

        addGroup: function (gName) {
            var groups = this.get('groups');
            var self = this,
                me;
            $.post(AntGroup.baseurl + '/group', {name: gName}, function (res) {
                res.members = [];
                me = self.toJSON();
                delete me.groups;
                AntGroup.CSS_COLOR_NAMES[0];
                res.members.push(me);
                groups.push(res);

                self.trigger('updated');
            });
        }


    });
});