define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            email: null,
            password: null
        },

        register: function (values) {
            this.set(values);

            $.ajax({
                url: "http://107.170.244.250/session",
                type: "POST",
                data: this.toJSON(),
                cotentType: 'application/json',
                success: this.processSuccessResponse.bind(this),
                error: this.processErrorResponse.bind(this)
            });
        },

        processSuccessResponse : function (user) {
            console.log('register success ', user);
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