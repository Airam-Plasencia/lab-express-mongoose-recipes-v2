const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));
require('./db')

const express = require("express")

const logger = require("morgan")

const app = express()

app.use(logger("dev"))
app.use(express.static("public"))
app.use(express.json())


//Instance model
const Recipe = require('./models/Recipe.model')


//Create Recipe
app.post('/api/recipes', (req, res) => {
    Recipe
    .create(req.body)
    .then(createRecipe => res.json(createRecipe))
    .catch(err => console.log(err))
})


//All Recipes
app.get('/api/recipes', (req, res) => {
    Recipe
    .find()
    .then(allRecipes => res.json(allRecipes))
    .catch(err => console.log(err))
})


//Get 
app.get('/api/recipes/:id', (req, res) => {
    Recipe
    .findById(req.params.id)
    .then(recipeDetails => res.json(recipeDetails))
    .catch(err => console.log(err))
})


//Update 
app.put('/api/recipes/:id', (req, res) => {
    Recipe
    .findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    .then(recipeUpdate => res.json(recipeUpdate))
    .catch(err => console.log(err))
})


//Delete 
app.delete('/api/recipes/:id', (req, res) => {
    Recipe
    .findByIdAndDelete(req.params.id)
    .then(removedRecipe => res.json(removedRecipe))
    .catch(err => console.log(err))
})


// Routes
app.get('*', (req, res) => {
    res.sendStatus(404)
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));


//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;