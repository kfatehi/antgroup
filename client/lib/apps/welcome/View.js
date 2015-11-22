/*jshint multistr: true, eqnull:true */

define(['Backbone', 'underscore', './apps/login/main', './apps/register/main', 'css!./stylesheets/style'], function (Backbone, _, login, register) {
    return Backbone.View.extend({
        template: _.template('\
            <div id="welcome" class="wrapper">\
                <div class="switch-wiew">\
                    <ul class="nav nav-tabs nav-justified">\
                        <li><a class="login" href="#">Login</a></li>\
                        <li><a class="register" href="#">Register</a></li>\
                    </ul>\
                </div>\
                <form class="form-login-register">\
                </form>\
            </div>\
        '),

        events: {
            'click a.login' : 'renderLoginForm',
            'click a.register' : 'renderRegisterForm'
        },

        _curPanel: null,

        initialize: function () {
            this._loginController = login;
            this._registerController = register;
        },

        renderLoginForm: function () {
            if ( this._curPanel !== 'login') {
                this._registerController.destroyPanel(true);
                this._loginController.createPanel(this.$el.find('.form-login-register'));
                this._curPanel = 'login';
            }
        },

        renderRegisterForm: function () {
            if ( this._curPanel !== 'register') {
                this._loginController.destroyPanel(true);
                this._registerController.createPanel(this.$el.find('.form-login-register'));
                this._curPanel = 'register';
            }
        },

        register : function (e) {
            e.preventDefault();
            var values = {};
            values.email = this.$el.find("input[name='email']").val();
            values.password = this.$el.find("input[name='password']").val();

            this.model.register(values);
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
            this.renderLoginForm();
            return this;
        }
    });
});