/**
 * betModel
 *
 * Simple model class for a user defined bet. Lots of helper methods to avoid string dependency.
 *
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
            bet_draw: null,
            bet_bet: 1,
            bet_wins: 0,
            bet_total_payout: "$0",
            bet_spots: 0
        },

        drawContains: function(num){
            return (this.get('bet_draw').indexOf(num) !== -1);
        },

        parseDraw: function(){
            return this.get('bet_draw').split('-');
        },

        getTotalPayout: function(){
            return this.get('bet_total_payout');
        },

        setTotalPayout: function(payout){
          this.set('bet_total_payout',payout);
        },

        setWins: function(wins){
          this.set('bet_wins',wins);
        },

        incrWins: function(){
            this.set('bet_wins',this.get('bet_wins')+1);
        },

        getSpots: function(){
            return this.get('bet_spots');
        },

        incrSpots: function(){
            this.set('bet_spots',this.get('bet_spots')+1);
        },

        decrSpots: function(){
            this.set('bet_spots',this.get('bet_spots')-1);
        },

        getBet: function(){
            return this.get('bet_bet');
        },

        getDraw: function(){
            return this.get('bet_draw');
        },

        setDraw: function(draw){
            this.set('bet_draw',draw);
        }

    });
});