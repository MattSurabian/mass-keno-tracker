/**
 * drawCollection
 *
 * This collection contains all of the days keno draw data.
 * It is populated by parsing a jsonp object stored on s3.
 */

define([
    'jquery',
    'underscore',
    'backbone',

    '../models/drawModel'
],
function(
    $,
    _,
    Backbone,

    drawModel
){
    return Backbone.Collection.extend({

        model: drawModel,
        url: 'https://s3.amazonaws.com/keno-tracker-ma/todays-keno.js',

        fetch: function(options) {
            this.previousLength = this.length;
            return Backbone.Collection.prototype.fetch.call(this, _.extend({
                dataType : "jsonp",
                jsonpCallback: 'setData',
                reset: true
            },options));
        },

        parse : function(response){
            if(response.hasOwnProperty('draws')){
                return response.draws;
            }else{
                throw "Response formatting problem.";
            }
        }

    });
});