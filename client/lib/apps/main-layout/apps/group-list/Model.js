define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            name: null,
            email: null,
            groups: []
        },

        initialize: function () {

        },


    });
});