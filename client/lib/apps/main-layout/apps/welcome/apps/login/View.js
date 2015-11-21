/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', 'css!./stylesheets/style'], function (Backbone, _) {
    return Backbone.View.extend({
        template: _.template('\
            <div id="login" class="wrapper">\
                <form class="form-register">\
                  <h2 class="form-register-heading">Enter your information</h2>\
                  <input type="text" class="form-control" name="name" placeholder="Name" required="" autofocus="" />\
                  <input type="text" class="form-control" name="email" placeholder="Email Address" required="" autofocus="" />\
                  <input type="text" class="form-control" name="ant-planer-id" placeholder="AntPlaner ID" required=""/>\
                  <input type="password" class="form-control" name="password" placeholder="Password" required=""/>\
                  <input type="password" class="form-control" name="confirm-password" placeholder="Confirm Password" required=""/>\
                  <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>\
                </form>\
            </div>\
        '),

        events: {
            'click button[type="submit"]' : 'register'
        },

        initialize: function () {

        },

        register : function () {
            console.log('registering')
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
            this.$el.append(this.template());
            return this;
        }
    });
});