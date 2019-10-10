const Recipes = require('../model/users.js');

function ClickHandler() {
  
  this.createRecipe = (req, res) => {
    console.log(req.body)
    res.json(req.body)
  }
  
}

module.exports = ClickHandler;