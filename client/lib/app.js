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
            deps: ['jquery-weekcalendar', 'css!./calender.css']
        }
    }
});

var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

require(['welcome', './router', 'main-layout'], function (welcome, router, mainLayout) {
    //welcome.createPanel($('#main'));
    window.AntGroup = window.AntGroup || {};
    AntGroup.mainContainer = $('#main');
    AntGroup.welcome = welcome;
    AntGroup.mainLayout = mainLayout;
    AntGroup.router = router;
    AntGroup.baseurl = window.location.origin;
    AntGroup.CSS_COLOR_NAMES = CSS_COLOR_NAMES;

    AntGroup.emitter  = _.extend({}, Backbone.Events);

    Backbone.history.start();
    router.navigate('index', {trigger: true});
});
