function isBootsrapCssIncluded () {
    var bsre = /\/|\\bootstrap.css$/;
    return _.some(document.styleSheets, function (cssStyleSheet) {
        return bsre.test(cssStyleSheet.href);
    });
}

define(
    ['underscore', 'jquery', 'Backbone', './Controller'],
    function (underscore, jquery, Backbone, Controller) {
        var libs = {
            'underscore' : underscore,
            'jquery' : jquery,
            'Backbone' : Backbone
        };

        for (var name in libs) {
            if ( libs.hasOwnProperty(name) && !libs[name]) {
                throw new Error(name + ' is undefined');
            }
        }

        if (!isBootsrapCssIncluded()) {
            throw new Error('bootsrap.css is not loaded');
        }

        return Controller;
    }
);