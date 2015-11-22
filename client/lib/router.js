define(['Backbone', 'underscore'], function(Backbone, _) {

    var Router = Backbone.Router.extend({
        routes: {
            "index": "renderWelcomeScreen",
            "schedules/:id" : "renderMainLayout"
        },

        renderWelcomeScreen: function () {
            // user welcome controller to render welcome screen
            console.log('render welcom screen');
           window.AntGroup.welcome.createPanel(window.AntGroup.mainContainer);
        },

        renderMainLayout: function (id) {
            // use main-layout controller to render main layout
            window.AntGroup.mainContainer.empty();
            window.AntGroup.welcome.destroyPanel(true);
            window.AntGroup.mainLayout.destroyPanel(true); // just in case
            window.AntGroup.mainLayout.createPanel(window.AntGroup.mainContainer, window.AntGroup.user);
            window.AntGroup.user = null;

        }
    });

    return new Router();
});


// router.navigate('index', {trigger: true});

// Backbone.history.start();