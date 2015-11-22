requirejs.config({
    packages: [
        {
            name: 'group-list',
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

var defaultObj = {
    name: 'kevin',
    email: 'kevin@email',
    groups: [{
        name: '6b',
        members: [
            {
                name: 'sergey',
                email: 'sergey@email'
            },{
                name: 'artur',
                email: 'artur@email'
            }
        ],
        owner: {
            name: 'kevin',
            email: 'kevin@email'
        }
    },{
        name: 'hackaton',
        members: [
            {
                name: 'anna',
                email: 'anna@email'
            },{
                name: 'artur',
                email: 'artur@email'
            }
        ],
        owner: {
            name: 'kevin',
            email: 'kevin@email'
        }
    }]
};

require(['group-list'], function (group_list) {
    group_list.createPanel($('#main'), defaultObj);
});


