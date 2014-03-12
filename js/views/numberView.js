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
            for(var attr in this.model.attributes){
                var val = this.model.get(attr);
                switch (attr){
                    case 'opacity':
                        this.$el.css(attr,val);
                        break;
                    case 'draws':
                        this.$el.attr('title',val);
                        break;
                    case 'hot':
                    case 'cold':
                    case 'favorite':
                        this.$el.toggleClass(attr,val);
                        break;
                }
            }
        },

        handleClick: function(e){
            this.trigger('number-clicked',this.model.get('value'));
        }
    });
});