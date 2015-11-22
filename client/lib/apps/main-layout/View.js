/*jshint multistr: true, eqnull:true */

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

            var user = this.model.get('user');
            var groups = user.groups;
            if ( Array.isArray(groups) && groups.length ) {
                var emails = groups[0].members.map(function (user) {
                    return user.email;
                });

                var $el = this.$el;

                $.post(AntGroup.baseurl + '/schedules', {emails: emails}, function (res) {
                    var email;
                    res.forEach(function (obj, idx) {
                        email = obj.email;
                        obj.user = {
                            email: email,
                            color: AntGroup.CSS_COLOR_NAMES[idx]
                        };
                    });
                    calender.render($el.find('div#calender'), res);
                });
            }


            AntGroup.emitter.on('updateCallender', calender.render.bind(null, $('div#calender')));

            groupListControler.destroyPanel(true);
            groupListControler.createPanel(this.$el.find('div#groups-ui'), user);
            return this;
        }
    });
});