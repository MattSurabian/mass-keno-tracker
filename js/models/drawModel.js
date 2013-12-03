/**
 * drawModel
 *
 * This model represents a single Keno draw
 */
define([
    'jquery',
    'underscore',
    'backbone'
],
    function(
        $,
        _,
        Backbone
        ){
        return Backbone.Model.extend({

            defaults: {
                winning_num: null
            },

            drawContains: function(n){
                return (this.get('winning_num').indexOf(n) !== -1);
            },

            parseDraw: function(){
                return this.get('winning_num').split('-');
            }

        });
    });