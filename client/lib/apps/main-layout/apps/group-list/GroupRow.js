define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            name: null, //group name
            owner: null, //group owner
            id: null,
            members: []
        },

        sendCalenderRerenderRequest: function () {

            var members = this.get('members');

            var emails = members.map(function (member) {
                return member.email;
            });

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

           /* $.post('/schedules', {
                email: emails
            }, function (res) {
                console.log('Sent schedules request adn got response from server', res);
                console.log('send rerender request')
            });*/

        },

        addMember: function (email) {
            var self = this;
            var members = this.get('members');
            $.post('/group/' + this.get('id') + '/members', {
                email: email
            }, function (res) {
                res.color = AntGroup.CSS_COLOR_NAMES[members.length];
                members.push(res);
                self.trigger('updated');

                var emails = members.map(function (member) {
                    return member.email;
                });

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

            });
        }
    });
});
