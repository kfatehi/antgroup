define(['Backbone', 'underscore'], function(Backbone, _) {

    var Router = Backbone.Router.extend({
        routes: {
            "index": "renderWelcomeScreen",
            "schedules/:id" : "renderMainLayout"
        },

        renderWelcomeScreen: function () {
            // user welcome controller to render welcome screen
           window.AntGroup.welcome.createPanel(window.AntGroup.mainContainer);
            $.ajax({
                url: AntGroup.baseurl + "/session",
                type: "GET",
                cotentType: 'application/json',
                success: function(user) {
                  window.AntGroup.router.navigate('schedules/' + user.id, {trigger: true});
                },
                error: function() {
                  // then stay here and log in
                }
            });
        },

        renderMainLayout: function (id) {
            // use main-layout controller to render main layout
            $.ajax({
                url: AntGroup.baseurl + "/session",
                type: "GET",
                cotentType: 'application/json',
                success: function(user) {
                  console.log(user);
                  window.AntGroup.mainContainer.empty();
                  window.AntGroup.welcome.destroyPanel(true);
                  window.AntGroup.mainLayout.destroyPanel(true); // just in case
                  window.AntGroup.mainLayout.createPanel(window.AntGroup.mainContainer, user);
                },
                error: function(err) {
                  alert(err)
                }
            });

        }
    });

    return new Router();
});


// router.navigate('index', {trigger: true});

// Backbone.history.start();
