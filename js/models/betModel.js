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
            bet_draw_arr:[],
            bet_bet: 1,
            bet_wins: 0,
            bet_total_payout: "$0",
            bet_spots: 0
        },

        drawContains: function(num){
            var drawArr = this.get('bet_draw_arr');
            return (drawArr.indexOf(num) !== -1);
        },

        parseDraw: function(){
            var drawArr = this.get('bet_draw_arr');
            return drawArr.join('-');
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

        getBet: function(){
            return this.get('bet_bet');
        },

        getDrawArr: function(){
            return this.get('bet_draw_arr');
        },

        addToDraw: function(num){
            var drawArr = this.get('bet_draw_arr');
            if(drawArr.indexOf(num) === -1){
                drawArr.push(num);
                this.set('bet_draw_arr', drawArr);
                this.set('bet_spots',drawArr.length);
            }
            return drawArr;
        },

        removeFromDraw: function(num){
            var drawArr = this.get('bet_draw_arr');
            var numIndex = drawArr.indexOf(num);
            if(numIndex !== -1){
                drawArr.splice(numIndex,1);
                this.set('bet_draw_arr', drawArr);
                this.set('bet_spots',drawArr.length);
            }
            return drawArr;
        }

    });
});
