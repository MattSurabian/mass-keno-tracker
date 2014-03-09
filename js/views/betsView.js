/**
 * betsView
 *
 * This view houses all of the users favorited bets. Each bet has its own betView and betModel
 * This view also contains helper methods for handling user interactions responsible for
 * creating new bets and canceling existing ones.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',

    'models/betModel',

    'collections/betCollection',
    'views/betView'
],
    function(
        $,
        _,
        Backbone,
        Mustache,

        BetModel,

        BetCollection,
        BetView
    ){
        return Backbone.View.extend({

            openBet: null,

            initialize:function(){
                this.collection = new BetCollection();

                this.betCanceled = _.bind(this.betCanceled,this);

                $('.saveBet').on('click', _.bind(function(){
                    this.saveOpenBet();
                },this));
            },

            /**
             * handleNumberClick
             *
             * The visualizer passes off clicks detected on the board to this method
             * which attempts to determine the user intention and take action.
             *
             * @param numberModel
             */
            handleNumberClick:function(numberModel){
                var val = String(numberModel.get('value'));

                if(_.isNull(this.openBet)){
                    numberModel.setFavorite(true);
                    this.addToOpenBet(val);
                    return;
                }

                if(!_.isNull(this.openBet) && this.isNumInSavedBets(val)){
                    if(this.openBet.getDrawArr().indexOf(val) === -1){
                        numberModel.setFavorite(true);
                        this.addToOpenBet(val);
                    }else{
                        this.removeFromOpenBet(val);
                    }
                }else{
                    if(this.openBet.getDrawArr().indexOf(val) === -1){
                        numberModel.setFavorite(true);
                        this.addToOpenBet(val);
                    }else{
                        numberModel.setFavorite(false);
                        this.removeFromOpenBet(val);
                    }
                }


            },

            /**
             * addToOpenBet
             *
             * Adds an individual number to the current open bet
             * @param num
             */
            addToOpenBet:function(num){
                if(_.isNull(this.openBet)){
                    this.openBet = new BetModel({
                        bet_draw: String(num),
                        bet_spots: 1,
                        bet_draw_arr: [num]
                    });
                    $('.saveBet').show();
                }else{
                    this.openBet.addToDraw(num);
                }
            },

            /**
             * removeFromOpenBet
             *
             * Removes an individual number from the current open bet
             *
             * @param num
             */
            removeFromOpenBet:function(num){
                var curBet = this.openBet.removeFromDraw(num);

                if(curBet.length === 0){
                    this.openBet = null;
                    $('.saveBet').hide();
                }
            },

            /**
             * saveOpenBet
             *
             * Save the current open bet to the bet collection.
             */
            saveOpenBet:function(){
                this.collection.add(this.openBet);
                var newBet = new BetView({model:this.openBet});
                newBet.on('cancel-bet',this.betCanceled);
                this.$el.append(newBet.render());
                this.openBet = null;
                $('.saveBet').hide();

                this.trigger('new-bet-saved');
            },

            /**
             * isNumInSavedBets
             *
             * Helper method
             *
             * @param num
             * @return {Boolean}
             */
            isNumInSavedBets:function(num){
                var numFound = false;
                this.collection.each(function(bet){
                    if(bet.drawContains(num)){
                        numFound = true;
                    }
                });
                return numFound;
            },

            /**
             * betCanceled
             *
             * Cancel
             *
             * @param spots
             */
            betCanceled:function(spots){
                var spotsArr = spots.split('-');
                _.each(spotsArr, _.bind(function(spot){
                    if(!this.isNumInSavedBets(spot)){
                        this.trigger('spot-favorite-off',spot);
                    }
                },this));
            },

            /**
             * evaluateBets
             *
             * Pass through helper method
             *
             * @param draws
             */
            evaluateBets:function(draws){
                this.collection.evaluateBets(draws);
            }

        });
    });
