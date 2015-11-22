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
        },

        removeGroupHandler: function (groupView) {
            var model = groupView.model;
            var groups = this.get('groups');
            var idx = _.findIndex(groups, function (group) {
                return group.id === model.get('id');
            });

            groups.splice(idx, 1);

            groupView.remove();
            //delete model;

            //var fo = model.get('filterOut');

            if ( groups.length ) {
                var emails = groups[0].members.map(function (member) {
                    return member.email;
                });

                /*emails = emails.filter(function (email) {
                    return fo.indexOf(email) < 0;
                });*/

                $.ajax({
                    url: AntGroup.baseurl + '/group/' + model.get('id'),
                    type: 'DELETE',
                    success: function  (res) {
                        console.log('removed succesfuly', res);
                    }
                })

                $.post(AntGroup.baseurl + '/schedules', {emails: emails}, function (res) {
                    var email;
                    res.forEach(function (obj, idx) {
                        email = obj.email;
                        obj.user = {
                            email: email,
                            color: AntGroup.CSS_COLOR_NAMES[idx]
                        };
                    });

                    AntGroup.emitter.trigger('updateCallender', res);
                });
            }
        }


    });
});