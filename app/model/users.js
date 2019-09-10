var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipes = new Schema({
   session  : {},

   twitter: {
     id : String,
     recipes : [{
       name: String,
       ingredients : Array,
       directions : Array
     }]
   }
});

module.exports = mongoose.model('Recipes', Recipes);