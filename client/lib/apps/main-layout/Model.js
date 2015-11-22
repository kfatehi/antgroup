define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            user: null
        }
    });
});