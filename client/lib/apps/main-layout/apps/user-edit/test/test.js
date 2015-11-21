requirejs.config({
    packages: [
        {
            name: 'welcome',
            location: '../'
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

require(['welcome'], function (welcom) {
    welcom.createPanel($('#main'));
});
