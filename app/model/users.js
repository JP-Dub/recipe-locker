var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipes = new Schema({
     twitter : {
       username   : String,
       displayName: String,
       id         : String
     },
     local : {
       username: String,
       id      : String
     },
     recipes : [{
       name: String,
       ingredients: Array,
       directions : Array
     }]
});

module.exports = mongoose.model('Recipes', Recipes);