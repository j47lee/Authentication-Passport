var mongoose = require('mongoose');

// recipe schema
var recipeSchema = mongoose.Schema({
    title: String,
    description: String,
    directions: String,
    ingredients: String,
    imageurl: String,
    recipeurl: String
});

// create recipe model and export
module.exports = mongoose.model('Recipe', recipeSchema)
