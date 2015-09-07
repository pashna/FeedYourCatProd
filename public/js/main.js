require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        jqueryrotate: "lib/jqueryrotate",
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
        "socket.io": "lib/socket.io",
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
        'jqueryrotate': {
            deps: ['jquery'],
            exports: 'JQueryRotate'
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
    'router'
], function(
    router
){
    Backbone.history.start();
});
