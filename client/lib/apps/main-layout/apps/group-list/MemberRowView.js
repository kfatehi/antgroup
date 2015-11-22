/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', 'css!./stylesheets/style'], function (Backbone, _) {
    return Backbone.View.extend({
        tagName: 'tr',

        events: {
            'click button[type="submit"]' : 'register',
            'click input[type="checkbox"]' : 'filter'
        },

        initialize: function () {
            this.listenTo(this.model, 'error', this.renderError);
        },

        filter: function () {
            console.log('filter');
            this.model.filterOut();
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
            this.$el.append('<td style="width: 40px; background-color:' + this.model.get('color') + ' " class="color-code-td"></td>');
            this.$el.append('<td class="info-td"></td>');
            var $td = this.$el.find('.info-td');
            $td.append('<span class="member-name">' + this.model.get('name') + '</span>');
            $td.append('<input class="select-user" type="checkbox">');
            $td.find('input').prop('checked', true);
            return this;
        }
    });
});