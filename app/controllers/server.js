const Recipes = require('../model/users.js');

function ClickHandler() {
  
  this.loadRecipes = (req, res) => {
    console.log('load recipes')
  }
  
  this.createRecipe = (req, res) => {
    console.log('req.body', req.body)
    let mess = JSON.stringify({message: 'nailed it!'})
    res.json({message: 'nailed it!'})
  }
  
  this.editRecipe = (req, res) => {
    console.log()
  }
  
  this.deleteRecipe = (req, res) => {
    console.log('delete', req.body, req.user)
    res.json({message: "deleted it!"})
  }
  
}

module.exports = ClickHandler;