requirejs.config({
    packages: [
        {
            name: 'welcome',
            location: 'apps/welcome'
        },
        {
            name: 'main-layout',
            location: 'apps/main-layout'
        }
    ],
    map: {
        '*': {
            'css' : '../bower_components/require-css/css'
        }
    },

    paths: {
        Backbone: '../bower_components/backbone/backbone',
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        "jquery-ui": '../bower_components/jquery-ui/jquery-ui',
        "jquery-weekcalendar" : "../bower_components/jquery-weekcalendar/jquery.weekcalendar",
        'calender' : "./calender"
    },

    shim: {
        underscore: {
            exports: '_'
        },
        Backbone: {
            deps: ['jquery', 'underscore', 'css!../bower_components/bootstrap/dist/css/bootstrap.css'],
            exports: 'Backbone'
        },
        jquery: {
            exports: '$'
        },
        bootstrap: {
            deps: ['jquery', 'css!../bower_components/bootstrap/dist/css/bootstrap.css']
        },
        "jquery-ui": {
            deps: ['jquery', 'css!../bower_components/jquery-ui/jquery-ui.css']
        },
        "jquery-weekcalendar": {
            deps: ['jquery', "jquery-ui", 'css!../bower_components/jquery-weekcalendar/jquery.weekcalendar.css']
        },
        "calender": {
            deps: ['jquery-weekcalendar']
        }
    }
});

require(['welcome', './router', 'main-layout'], function (welcome, router, mainLayout) {
    //welcome.createPanel($('#main'));
    window.AntGroup = window.AntGroup || {};
    AntGroup.mainContainer = $('#main');
    AntGroup.welcome = welcome;
    AntGroup.mainLayout = mainLayout;
    AntGroup.router = router;
    AntGroup.baseurl = window.location.origin;

    Backbone.history.start();
    router.navigate('index', {trigger: true});
});
