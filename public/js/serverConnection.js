define([
    'backbone',
    'tmpl/game',
    'lib/Connector',
    'views/GameOver',
    'mechanics/startLevel',
], function(
    Backbone,
    tmpl,
    Connector,
    GameOver,
    StartLevel
){
    var Console = Backbone.View.extend({
        template: tmpl,

        // Инициализация
        initialize: function() {
        // Создаем связь с сервером
            this.server = new Connector({
                server: ['getToken', 'bind'],
                remote: '/console'
            });

            window.server = this.server;
            var self = this;
            this.server.on('player-joined', function(data){
                self.start(data.guid);
            });
            this.server.on('reconnect', this.reconnect);
            this.server.on('disconnect', this.disconnect)
        },

        init: function() {
            if (!localStorage.getItem('consoleguid')){
                // Получаем токен
                this.server.getToken(function(token){
                    $('#token').html(token);
                //message.innerHTML = 'token: ' + token;
                });
            } else { // иначе
                // переподключаемся к уже созданной связке
                this.reconnect();
            }
        },

        // Переподключение
        reconnect: function(){
            // Используем сохранненный id связки
            var self = this;
            this.server.bind({guid: localStorage.getItem('consoleguid')}, function(data){
                // Если все ок
                if (data.status == 'success'){
                    // Стартуем
                    $(".warning").hide();
                    $("#warning").empty();
                    self.start(data.guid);
                // Если связки уже нет
                } else if (data.status == 'undefined guid'){
                    // Начинаем все заново
                    localStorage.removeItem('consoleguid');
                    self.init();
                }
            });
        },

        // Старт игры
        start: function(guid) {
            localStorage.setItem('consoleguid', guid);
            $(".token").hide();
            $(".game-screen").show();
            $.event.trigger({type: "startGame"}); 
            server.on('message', function(data, answer){
                answer('answer');
            });
        },

        disconnect: function() {
            $(".warning").show();
            $("#warning").text("Sorry, we lose your game! Don't be upset! You can use keyboard to get score and after level submit result");
        }


    });

    return new Console();
});
