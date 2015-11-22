/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', 'css!./stylesheets/style'], function (Backbone, _) {
    return Backbone.View.extend({
        template: _.template('\
            <div class="errors"></div>\
            <h2 class="form-login-heading">Enter your information</h2>\
            <input type="text" class="form-control" name="email" placeholder="Email Address" required="" autofocus="" />\
            <input type="password" class="form-control" name="password" placeholder="Password" required=""/>\
            <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>\
        '),

        events: {
            'click button[type="submit"]' : 'register'
        },

        initialize: function () {
            this.listenTo(this.model, 'error', this.renderError);
        },

        register : function (e) {
            e.preventDefault();
            var values = {};
            values.email = this.$el.find("input[name='email']").val();
            values.password = this.$el.find("input[name='password']").val();

            this.model.register(values);
        },

        renderError: function (errs) {
            if ( Array.isArray(errs) ) {
                var $errors = this.$el.find('.errors');
                $errors.empty();
                errs.forEach(function (err) {
                    $errors.append('<p>' + err + '</p>');
                });
            }
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
            this.$el.html(this.template());
            return this;
        }
    });
});