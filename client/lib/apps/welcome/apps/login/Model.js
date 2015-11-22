define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            email: null,
            password: null
        },

        register: function (values) {
            this.set(values);

            $.ajax({
                url: AntGroup.baseurl + "/session",
                type: "POST",
                data: this.toJSON(),
                cotentType: 'application/json',
                success: this.processSuccessResponse.bind(this),
                error: this.processErrorResponse.bind(this)
            });
        },

        processSuccessResponse : function (user) {
            console.log('register success ', user);
            window.AntGroup.router.navigate('schedules/' + user.id, {trigger: true});
        },

        processErrorResponse : function (res) {
            var response;
            try {
                response = JSON.parse(res.responseText);
            } catch (e) {
                response = {errors: []};
            }
            this.trigger('error', response.errors || []);
        }
    });
});
