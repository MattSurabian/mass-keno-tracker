/**
 * numberModel
 *
 * This model is what makes up the numberCollection and is the driving
 * force behind everything seen in the kenoBoardView.
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
            value: 0,
            draws: 0,
            lastDraw: 0,
            hot: false,
            cold: false,
            favorite: false
        }
    });

});