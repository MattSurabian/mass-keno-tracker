/**
 * numberView
 *
 * Simple view for numbers on the keno board
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!../../assets/templates/number.html'
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
            'click' : 'handleClick'
        },

        initialize: function(){
            this.model.bind('change',this.refresh,this);
            this.setElement(Mustache.render(template,{
                value: this.model.get('value')
            }));
        },

        render: function(){
            return this.$el;
        },

        refresh: function(){
           this.$el.css('opacity',this.model.get('opacity'));
           this.$el.attr('title',this.model.get('draws'));
           if(this.model.get('hot')){
               this.$el.addClass('hot');
           }else{
               this.$el.removeClass('hot');
           }
           if(this.model.get('cold')){
                this.$el.addClass('cold');
            }else{
               this.$el.removeClass('cold');
           }
           if(this.model.get('favorite')){
               this.$el.addClass('fav');
           }else{
               this.$el.removeClass('fav');
           }
        },

        handleClick: function(e){
            this.trigger('number-clicked',this.model);
        }
    });
});