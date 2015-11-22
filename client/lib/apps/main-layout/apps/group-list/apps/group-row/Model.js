define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            name: null, //group name
            owner: null //group owner
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
