define(['Backbone', 'underscore'], function(Backbone, _) {

    var Router = Backbone.Router.extend({
        routes: {
            "index": "renderWelcomeScreen",
            "schedules/:id" : "renerMainLayout"
        },

        renderWelcomeScreen: function () {
            // user welcome controller to render welcome screen
        },

        renderMainLayout: function (id) {
            // use main-layout controller to render main layout
        }
    });

    return new Router();
});


// router.navigate('index', {trigger: true});

// Backbone.history.start();