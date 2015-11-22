define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            name: null, //group name
            owner: null, //group owner
            id: null,
            members: [],
            filterOut: []
        },

        initialize: function () {
            this.attributes.members = this.attributes.members.slice();
            this.attributes.filterOut = [];
        },

        remove: function () {
            this.trigger('remove');
        },

        sendCalenderRerenderRequest: function () {
            var fo = this.get('filterOut');
            var members = this.get('members');

            var emails = members.map(function (member) {
                return member.email;
            });

            emails = emails.filter(function (email) {
                return fo.indexOf(email) < 0;
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

        },

        handleFilter: function (bool, email) {
            var fo = this.get('filterOut');
            var self = this;
            if (bool) {
                fo.push(email);
            } else {
                var idx = fo.indexOf(email);
                if ( idx >= 0 ) {
                    fo.splice(idx, 1);
                }
            }

            var members = this.get('members');

            var emails = members.map(function (member) {
                return member.email;
            });

            emails = emails.filter(function (email) {
                return fo.indexOf(email) < 0;
            });

            $.post(AntGroup.baseurl + '/schedules', {emails: emails}, function (res) {
                var email;
                res.forEach(function (obj, idx) {
                    email = obj.email;
                    var idx = _.findIndex(members, function (member) {
                        return member.email === email;
                    });
                    obj.user = {
                        email: email,
                        color: AntGroup.CSS_COLOR_NAMES[idx]
                    };
                });

                AntGroup.emitter.trigger('updateCallender', res);
            });

        },

        addMember: function (email) {
            var self = this;
            var members = this.get('members');
            var fo = this.get('filterOut');
            $.post('/group/' + this.get('id') + '/members', {
                email: email
            }, function (res) {
                res.color = AntGroup.CSS_COLOR_NAMES[members.length];
                members.push(res);
                self.trigger('updated');

                var emails = members.map(function (member) {
                    return member.email;
                });

                emails = emails.filter(function (email) {
                    return fo.indexOf(email) < 0;
                });

                $.post(AntGroup.baseurl + '/schedules', {emails: emails}, function (res) {
                    var email;

                    var idx = _.findIndex(members, function (member) {
                        return member.email === email;
                    });

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
