/**
 * betCollection
 *
 * This collection holds all of the users configured favorite bets.
 * It is populated by the betsView.
 *
 * It also houses the logic to evaluate the bets, it retrieves a JSONp object that
 * defines the payouts on a one dollar bet given the spots picked and spots matched.
 */

define([
    'jquery',
    'underscore',
    'backbone',

    '../models/betModel'
],
function(
    $,
    _,
    Backbone,

    betModel
){
    return Backbone.Collection.extend({

        model: betModel,
        payouts: null,

        initialize: function(){

            // get current payout info from the server
            $.ajax({
                type : "GET",
                dataType : "jsonp",
                url : 'https://s3.amazonaws.com/keno-tracker-ma/payouts.js',
                jsonpCallback: 'setPayouts',
                success: _.bind(function(payoutData){
                    this.payouts = payoutData;
                },this)
            });

        },

        /**
         * evaluateBets
         *
         * Evaluates the current saved bets' value given a collection of draws
         *
         * @param draws
         */
        evaluateBets: function(draws){

            var _this = this;

            if(_.isNull(this.payouts)){
                return;
            }

            this.each(function(bet){
                bet.setWins(0);
                bet.setTotalPayout(0);

                var spots = bet.getDrawArr();

                _.each(draws,function(drawModel){

                    var drawMatches = 0;
                    _.each(spots,function(spot){
                        if(drawModel.drawContains(spot)){
                            drawMatches++;
                        }
                    });

                    var curPayout = bet.getTotalPayout();
                    var betSpots = bet.getSpots();

                    var netPayout = -bet.getBet() + _this.payouts[betSpots][drawMatches];

                    if(netPayout > 0){
                        bet.incrWins();
                    }

                    bet.setTotalPayout(parseFloat(netPayout+curPayout));
                });
            });
        }
    });
});