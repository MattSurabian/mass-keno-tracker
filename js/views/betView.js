/**
 * betView
 *
 * Simple view for a saved bet
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',

    'text!../../assets/templates/bet.html'
],
function(
    $,
    _,
    Backbone,
    Mustache,

    template
){
    return Backbone.View.extend({

        events:{
            "click": "removeBet"
        },

        initialize: function(){
            this.model.bind('change',this.refresh,this);
        },

        render: function(){
            this.setElement(Mustache.render(template,{
                draw: this.model.parseDraw()
            }));

            return this.$el;
        },

        refresh: function(){
            this.$el.find('.payout').html("$"+this.model.getTotalPayout());
        },

        /**
         * removeBet
         *
         * Removes the bet view from the DOM, destroys the model, and triggers
         * a cancel-bet event that the visualizer can respond to so the board
         * is up to date.
         */
        removeBet: function(){
            var draw = this.model.parseDraw();
            this.model.destroy();
            this.$el.remove();
            this.trigger('cancel-bet',draw);
        }

    });
});