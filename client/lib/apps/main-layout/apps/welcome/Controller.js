define(['underscore', './Model', './View'], function(_, Model, View) {
    function Controller () {
        this._view = null;
        this._model = null;
        this.createPanel = function (container) {
            if (this._view) {
                throw new Error('Destroy the old panel before createing a new one (call destroyPanel before calling createPanel second time)');
            }

            this._model = new Model({});


            this._view = new View({
                el: container.get(0),
                model: this._model
            });

            this._view.render();
        },
        this.destroyPanel = function (empty) {
            if (this._view) {
                this._view.remove(empty);
                this._view = null;
                this._model = null;
            }
        }
    }

    _.extend(Controller.prototype, Backbone.Events);
    return new Controller();
});