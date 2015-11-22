define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            name: null, //group name
            owner: null, //group owner
            id: null,
            members: []
        },

        sendCalenderRerenderRequest: function () {
            var emails = this.members.map(function (member) {
                return member.email;
            });

            $.post('/schedules', {
                email: emails
            }, function (res) {
                console.log('Sent schedules request adn got response from server', res);
                console.log('send rerender request')
            });

        },

        addMember: function (email) {
            $.post('/group/' + this.get('id') + '/members', {
                email: email
            }, function (res) {
                console.log('Send add member request and got response from server', res);
            });
        }
    });
});
