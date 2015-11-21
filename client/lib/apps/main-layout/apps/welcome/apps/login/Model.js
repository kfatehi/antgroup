define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            email: null,
            name: null,
            password: null,
            antPlanerId: null
        },

        initialize: function () {

        }


    });
});