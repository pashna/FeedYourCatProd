require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "/js/lib/jquery",
        underscore: "/js/lib/underscore",
        backbone: "/js/lib/backbone",
        Connector: "/js/lib/Connector",
        FnQuery: "/js/lib/FnQuery",
        "socket.io": "/socket.io/socket.io",
        modernizr: "lib/modernizr"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        "socket.io": {
            exports: "io"
        },
        'modernizr': {
            exports: 'modernizr'
        }
    }
});

define([
    'Connector',
    'jquery',
    'modernizr'
], function(
    Connector,
    jquery,
    modernizr
){
    /*var message = document.getElementById('message');*/
    var input = document.getElementById('input-token');
    var start, init, reconnect;
    var token_screen = $('#token-screen');
    var joystick = $('#joystick');

    var newGameBtn = $("#newGame_btn")
    var iconc = $('#iconc');
    var cat_block = $('#cat_block');
    var mobile_cat = $('#mobile_cat');
    var errorForm = $('#errorForm');
    var width_of_block;
    var replay = document.getElementById('replay_btn');
    var next = document.getElementById('next_btn');
    var newButton = document.getElementById('newBtn');

    // Создаем связь с сервером
    var server = new Connector({
            server: ['bind'],
            remote: '/player'
        }
    );
    token_screen.hide();
    // Инициализация
    init = function() {
//      message.innerHTML = 'ready';
        // Если id нет
        if (!localStorage.getItem('playerguid')){
            // Ждем ввода токена
            input.parentNode.addEventListener('submit', function(e){
                e.preventDefault();
                // И отправляем его на сервер
                server.bind({token: input.value}, function(data){
                    if (data.status == 'success'){ //  В случае успеха
                        // Стартуем джостик
                        start(data.guid);
                    }
                });
            }, false);

        } else { // иначе
            // переподключаемся к уже созданной связке
            reconnect();
        }
    };

    // Переподключение
    // Используем сохранненный id связки
    reconnect = function(){
        server.bind({guid: localStorage.getItem('playerguid')}, function(data){
            // Если все ок
            if (data.status == 'success'){
                // Стартуем
                start(data.guid);
            // Если связки уже нет
            } else if (data.status == 'undefined guid'){
                // Начинаем все заново
                localStorage.removeItem('playerguid');
                init();
            }
        });
    };


    // Старт игры
    start = function(guid){
        localStorage.setItem('playerguid', guid);
        token_screen.hide();
        joystick.show();
        width_of_block = cat_block.width();
    };

    server.on('reconnect', reconnect);

    if (verifyBrouser()) {
        token_screen.show();
        init();
    } else {
        errorForm.show();
    }

    window.addEventListener('deviceorientation', handleOrientation);
    replay.addEventListener('click', handleClickReplay);
    next.addEventListener('click', handleClickNext);
    next.addEventListener('click', handleClickNext);
    newButton.addEventListener('click', handleClickNewBtn);
    $( window ).on( "orientationchange", handleOrientationChange);

    function handleOrientationChange(event) {
        var orientation = getOrientation();
        if (orientation == "portrait") {
            server.send(({
                type: "orient",
                value: "p"
                }), function(answer){
                    console.log(answer);
                }
            );
        }

        if (orientation == "landscape") {
            server.send(({
                type: "orient",
                value: "l"
                }), function(answer){
                    console.log(answer);
                }
            );
        }
    }

    function checkOrientation() {
        if (getOrientation() === "portrait") {
            
        }
        else {
            hideMessage();
       }
    }

    function handleClickReplay(event) {
        server.send(({
            type: "click",
            value: 'replay'
            }), function(answer){
                console.log(answer);
            }
        );
    }

    function handleClickNext(event) {
        server.send(({
            type: "click",
            value: 'next'
            }), function(answer){
                console.log(answer);
            }
        );
    }

    
    function handleOrientation(event) {
        currentAngle = Math.floor(event.beta);
        if (currentAngle > 75) currentAngle = 75;
        if (currentAngle < -75) currentAngle = -75;
        setCat(currentAngle);
        server.send(({
            type: "angle",
            value: currentAngle
            }), function(answer){
                console.log(answer);
            }
        );
    }

    function handleClickNewBtn() {
        newGameBtn.hide();
        server.send(({
            type: "newGame",
            }), function(answer){
                console.log(answer);
            }
        );
    }

    function setCat(angle){
        var x = (width_of_block/(2*75))*angle;
        mobile_cat.css("left", x+'px');
    }

    function getOrientation() {
        return window.orientation % 180 === 0 ? "portrait" : "landscape";
    }

    function verifyBrouser() {
        if (Modernizr) {
            if (!Modernizr.websockets || !Modernizr.borderradius 
                || !Modernizr.localstorage || !Modernizr.touch) {
                $('.error').show();
                $('#token-screen').hide()
                return false;
            }
        }
        return true;
    }

    window.server = server;

    handleOrientationChange();
            
    server.on('message', function(data, answer) {
        if (data.type == "hide_iconc")
            iconc.hide();
        if (data.type == "show_iconc") {
            iconc.show();
        }
        if (data.type == "show_newGame") {
            newGameBtn.show();
        }

        if (data.type == "hide_newGame") {
            newGameBtn.hide();
        }
    });
});

