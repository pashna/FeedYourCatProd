define([
    'backbone',
    'tmpl/game',
    'mechanics',
    'views/ViewManager',
    'serverConnection',
    'modernizr'
], function(
    Backbone,
    tmpl,
    Mechanics,
    ViewManager,
    serverHelper,
    Modernizr
){

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#game",
        _name: "game",
        mechanics: Mechanics,
        events: {
            'click #replay-button_win':'repeatLevel',
            'click #next-level':'nextLevel'
        },

        nextLevel: function() { 
            this.mechanics.levelUp();
            this.mechanics.startGame();
            server.send(({
            type: "hide_iconc",
            }), function(answer){
                console.log(answer);
                }
            );
        },

        repeatLevel: function() {
            this.mechanics.startGame();
            server.send(({
                type: "hide_iconc",
                }), function(answer){
                    console.log(answer);
                    }
            );
        },

        initialize: function () {
            this.render();
            this.hide();
            $(document).on("startGame", function(event) {
                Mechanics.startGame();
            });
            var self = this;
            server.on('message', function(data, answer){
                if (data.type == 'click') {
                    switch(data.value) {
                        case 'replay':
                            self.repeatLevel();
                            break
                        case 'next':
                            self.nextLevel();
                            break
                    }
                    server.send(({
                        type: "hide_iconc",
                        }), function(answer){
                            console.log(answer);
                        }
                    );
                }
            });
            server.on('message', function(data, answer) {
                if (data.type == "orient") {
                    if (data.value == "p") {
                        $(".warning").css("display", "block");
                        $("#warning").text("Be careful! Orientation was changed! You should use album orientation!");
                    } else {
                        $(".warning").css("display", "none");
                        $("#warning").empty();
                    }
                }
            });
        },

        render: function () {
            this.$el.html(this.template);
        },

        show: function () {
            $.event.trigger({type: "show",_name: this._name}); 
            this.$el.show();
            if (this.verifyBrouser()) {
                serverHelper.init();
            } else {
                $(".token").hide();
            }
        },  

        hide: function () {
            this.$el.hide();
            $(window).off('keydown');
        },

        verifyBrouser: function() {
            if (Modernizr) {
                if (!Modernizr.canvas || !Modernizr.canvastext || !Modernizr.localstorage
                    || !Modernizr.audio || !Modernizr.csstransforms) {
                    $(".warning").css("display", "block");
                    $("#warning").text("I'm so sorry, my friend! We can't play together becouse of your browser! Good luck!");
                    return false;
                }
            }
            return true;
        },

    });

    return new View();
});