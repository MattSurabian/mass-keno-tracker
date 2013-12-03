define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',

    'views/kenoBoardView',
    'views/betsView',

    'collections/drawCollection',
    'collections/numberCollection',

    'views/settingsView',
    'text!../assets/templates/playfield.html'
],
function(
    $,
    _,
    Backbone,
    Mustache,

    KenoBoard,
    BetsView,

    DrawCollection,
    NumberCollection,

    SettingsView,

    template

){
    return Backbone.View.extend({

        initialize:function(){

            this.$el.append(Mustache.render(template));

            this.draws = new DrawCollection();

            this.kenoBoard = new KenoBoard({
                el: '.keno-board',
                collection: new NumberCollection()
            });
            this.settingsView = new SettingsView({
                el: '.settings'
            });
            this.betsView = new BetsView({
                el: '.bets'
            });

            var _this = this;

            /**
             * betsView event bindings
             */

            // evalBets needs a draw collection to evaluate the current bets against,
            // so we bind here instead of hooking it up within the betsView
            this.betsView.on('new-bet-saved', function(){
                _this.betsView.evaluateBets(_this.draws.last(_this.settingsView.getNumberOfGames()));
            });

            this.betsView.on('spot-favorite-off', function(spot){
                _this.kenoBoard.collection.get(spot).set('favorite',false);
            });

            /**
             * settingsView event bindings
             */
            this.settingsView.on('show-hot-cold', function(){
                _this.kenoBoard.showHotCold();
            });

            this.settingsView.on('hide-hot-cold', function(){
                _this.kenoBoard.hideHotCold();
            });

            this.settingsView.on('update-num-draws', function(){
                _this.updateKenoBoard();
            });

            /**
             * kenoBoard event bindings
             */
            this.kenoBoard.on('number-clicked', function(model){
                _this.betsView.handleNumberClick(model);
            });

            $('.spinner').show();

            this.doLivePoll = _.bind(this.doLivePoll,this);

            // If our first fetch is successful we can start live polling realtime data
            this.draws.fetch().done(this.doLivePoll);

            this.draws.on('reset', function(data){

                if(_this.draws.previousLength < _this.draws.length){
                    // there's new data!
                    _this.settingsView.model.set({
                        maxDraws: _this.draws.length,
                        lastDrawId: _this.draws.last(1)[0].get('draw_id')
                    });
                    _this.settingsView.handleIncrementalMode();
                    _this.updateKenoBoard();
                }

                $('.spinner').hide();

            });
        },

        updateKenoBoard:function(){

            var numberOfGames = this.settingsView.getNumberOfGames();

            this.kenoBoard.showFrequency(this.draws.last(numberOfGames));

            if(this.settingsView.model.get('hotCold')){
                this.kenoBoard.showHotCold();
            }

            this.betsView.evaluateBets(this.draws.last(this.settingsView.getNumberOfGames()));
        },

        doLivePoll:function(){
            var _this = this;
            setInterval(function(){
                _this.draws.fetch();
            }, 30000);
        }
    });
});