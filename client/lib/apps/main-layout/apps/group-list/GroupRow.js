define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            name: null, //group name
            owner: null, //group owner
            members: []
        }
    });
});
