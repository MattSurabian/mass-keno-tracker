/**
 * settingsView
 *
 * Ugly view responsible for basic visualizer settings.
 * TODO: Clean up the UI and the settings stack code! Ugh!
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'moment',

    'models/settingsModel',

    'text!../../assets/templates/settings.html'
],
function(
    $,
    _,
    Backbone,
    Mustache,
    moment,

    SettingsModel,

    template
){

    return Backbone.View.extend({

        events:{
            "keyup input.set-number-of-games" : "updateDraws",
            "change input.set-show-hot-cold" : "updateHotCold",
            "change input.set-live-poll" : "updatePolling"
        },

        initialize: function(){
            this.model = new SettingsModel();
            this.setNumberOfGamesInput = 'input.set-number-of-games';

            this.model.on('change',this.render,this);
        },

        /**
         * updateHotCold
         *
         * Checks the input state on the view, sets the model appropriately and fires events
         * so any other views can be updated (I'm lookin' at you kenoBoardView!)
         */
        updateHotCold: function(){
            if(this.model.get('hotCold')){
                this.model.set('hotCold',false);
                this.trigger('hide-hot-cold');
            }else{
                this.model.set('hotCold',true);
                this.trigger('show-hot-cold');
            }
        },

        /**
         * handleIncrementalMode
         *
         * Incremental mode checks to see if the app is set to pull less than the
         * maximum number of games and increments the amount by one if it is.
         *
         * This method is called when new data is set on the draw collection
         */
        handleIncrementalMode: function(){
            if(this.model.get('numberOfGames') < this.model.get('maxDraws')){
                var newNumberOfGames = parseInt(this.model.get('numberOfGames'),10)+1;
                this.model.set('numberOfGames', newNumberOfGames);
            }
        },

        /**
         * updateDraws
         *
         * Checks the input state on the view, sets the model and triggers events.
         * The numberOfGames value determines how many games' data should be used
         * in the visualizer.
         */
        updateDraws:function(){
            var userInput = $(this.setNumberOfGamesInput).val();
            if(userInput > this.model.get('maxDraws')){
                userInput = this.model.get('maxDraws');
            }
            this.model.set('numberOfGames',userInput);
            this.trigger('update-num-draws');
        },

        /**
         * updatePolling
         *
         * Checks the input state on the view, sets the model and triggers events.
         */
        updatePolling:function(){
            if(this.model.get('livePoll')){
                this.model.set('livePoll',false);
                this.trigger('stop-live-polling');
            }else{
                this.model.set('livePoll',true);
                this.trigger('start-live-polling');
            }
        },

        /**
         * getNumberOfGames
         *
         * Pass through helper method to get the number of games to evaluate
         */
        getNumberOfGames: function(){
            if(_.isNull(this.model.get('numberOfGames'))){
                this.model.set('numberOfGames',this.model.get('maxDraws'));
            }

            return this.model.get('numberOfGames');
        },

        render: function(){
            this.$el.html(Mustache.render(template,{
                numberOfGames: this.getNumberOfGames(),
                hotCold: this.model.get('hotCold'),
                livePoll: this.model.get('livePoll'),
                maxDraws: this.model.get('maxDraws'),
                lastDrawId: this.model.get('lastDrawId'),
                date: moment().format("MMMM Do YYYY")
            }));

            return this.$el;
        }

    });
});