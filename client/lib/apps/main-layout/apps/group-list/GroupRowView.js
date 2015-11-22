/*jshint multistr: true, eqnull:true */
var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
define(['Backbone', 'underscore', './MemberRow', './MemberRowView', 'css!./stylesheets/style'], function (Backbone, _, MemberRow, MemberRowView) {
    return Backbone.View.extend({
        template: _.template('\
            <div class="panel panel-default group-row">\
                <div class="panel-heading">\
                    <button class="btn btn-default btn-xs">Select</button>\
                    <button class="btn btn-success btn-xs">Add Member</button>\
                </div>\
                <div class="panel-body panel-table">\
                    <table class="table table-striped member-table"></table>\
                </div>\
            </div>\
        '),

        events: {
            'click button[type="submit"]' : 'register'
        },

        initialize: function () {
            this.listenTo(this.model, 'error', this.renderError);
        },

        remove: function (empty) {
            if (empty) {
                this.trigger('remove');
                this.$el.empty().off();
                this.stopListening();
                return this;
            } else {
                return Backbone.View.prototype.remove.call(this);
            }
        },

        render: function () {
            this.$el.html(this.template());

            this.$el.find('.panel-heading').prepend(this.model.get('name'));

            var $table = this.$el.find('.panel-body table');

            var members = this.model.get('members');
            var memberRowModel, memberRowView;
            members.forEach(function (member, idx) {
                member.color = CSS_COLOR_NAMES[idx];
                memberRowModel = new MemberRow(member);
                memberRowView = new MemberRowView({
                    model: memberRowModel
                });

                $table.append(memberRowView.render().el);
            });

            return this;
        }
    });
});