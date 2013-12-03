/*****************
 * Keno Visualizer
 ****************/

require.config({
    paths:{
        require: 'libs/require',
        jquery: 'libs/jquery',
        mustache: 'libs/mustache',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        domready: 'libs/domready',
        text: 'libs/text',
        utils: 'libs/utils',
        moment: 'libs/moment',
        keno: 'app/kenoVisualizer'
    },
    shim:{
        underscore:{
            exports: '_'
        },
        backbone:{
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['jquery','underscore','backbone','domready','mustache','keno'],function($,_,Backbone,domready,Mustache,Keno){
    domready(function(){
        var myKenoTracker = new Keno({
            el: '.playfield'
        });
    });
});