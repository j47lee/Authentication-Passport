var mongoose = require('mongoose');

// recipe schema
var recipeSchema = mongoose.Schema({
    title: String,
    description: String,
    directions: String,
    ingredients: String
});

// create recipe model and export
module.exports = mongoose.model('Recipe', recipeSchema)
