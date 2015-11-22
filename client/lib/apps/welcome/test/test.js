requirejs.config({
    packages: [
        {
            name: 'welcome',
            location: '../'
        },
        {
            name: 'login',
            location: '../apps/login'
        },
        {
            name: 'register',
            location: '../apps/register'
        }
    ],
	map: {
        '*': {
            'css' : '../../../../../../bower_components/require-css/css'
        }
    },

    paths: {
        Backbone: '../../../../../../bower_components/backbone/backbone',
        jquery: '../../../../../../bower_components/jquery/jquery',
        underscore: '../../../../../../bower_components/underscore/underscore',
        bootstrap: '../../../../../../bower_components/bootstrap/dist/js/bootstrap',
        Element: '../../../../../../models/Element',
        ElementsGroup: '../../../../../../models/ElementsGroup',
        ElementsSet: '../../../../../../models/ElementsSet'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        Backbone: {
            deps: ['jquery', 'underscore', 'css!../../../../../../bower_components/bootstrap/dist/css/bootstrap.css'],
            exports: 'Backbone'
        },
        jquery: {
            exports: '$'
        },
        bootstrap: {
            deps: ['jquery', 'css!../../../../../../bower_components/bootstrap/dist/css/bootstrap.css']
        }
    }
});

require(['welcome'], function (welcome) {
    welcome.createPanel($('#main'));
});
