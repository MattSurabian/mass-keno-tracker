/**
 * settingsModel
 *
 * Simple settings model for the visualizer
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
            numberOfGames: null,
            hotCold: true,
            livePoll: true,
            maxDraws: null
        }

    });
});