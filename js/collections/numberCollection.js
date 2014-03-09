/**
 * numberCollection
 *
 * This collection contains all valid keno numbers (1-80)
 * The collection is never fully "reset" as keno is always played with numbers 1-80.
 * Instead the models data is flushed and repopulated. This collection is populated
 * via the update method instead of being fetched from an endpoint, which is a bit unusual.
 * The reason for this is that the data needed must be compiled by looping through the drawCollection.
 *
 * This collection also contains hot/cold logic.
 */

define([
    'jquery',
    'underscore',
    'backbone',

    '../models/numberModel'
],
function(
     $,
     _,
     Backbone,

     NumberModel
){
    return Backbone.Collection.extend({

        model: NumberModel,
        coldSpots: 7,
        hotSpots: 7,

        initialize: function(){
            var keno_numbers = [];
            for(var i=1;i<=80;i++){
                var numVal = i.toString();
                if(i<10){
                    numVal = "0"+i;
                }
                var num = new NumberModel({
                    id: numVal,
                    value: numVal
                });

                keno_numbers.push(num);
            }
            this.add(keno_numbers);
        },

        update: function(frequencyObject){

            this.reset();
            var maxDraw = _.max(frequencyObject);

            this.each(function(numModel){
                var draws = frequencyObject[numModel.id];
                numModel.set('draws',(_.isUndefined(draws))?0:draws);
                numModel.set('opacity',draws/maxDraw);
            });
            this.sort();

        },

        comparator:function(number){
            return number.get('draws');
        },

        reset:function(){
            this.each(function(numModel){
                numModel.set({
                    draws:0,
                    opacity:0,
                    hot:false,
                    cold:false
                });
            });
        },

        resetHotCold:function(){
            this.each(function(numModel){
                numModel.set({
                    hot:false,
                    cold:false
                });
            });
        },

        setAllCold:function(){
            var coldCount = 0;
            var _this = this;
            _.each(this.models,function(numModel){
                if(numModel.get('draws') > 0 && coldCount< _this.coldSpots){
                    coldCount++;
                    numModel.set({hot:false,cold:true});
                }
            });
        },

        setAllHot:function(){
            _.each(this.last(this.hotSpots),function(numModel){
                numModel.set({hot:true,cold:false});
            });
        }

    });
});