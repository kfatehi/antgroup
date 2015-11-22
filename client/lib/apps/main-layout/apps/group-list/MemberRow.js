define(['Backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        defaults: {
            name: null, //group name
            email: null, // user email
            color: null
        },

        filterOut: function () {
            this.set('filterOut', !this.get('filterOut'));
            this.trigger('filterOut', this.get('filterOut'), this.get('email') );
        }
    });
});