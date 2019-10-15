const Recipes = require('../model/users.js');

function ClickHandler() {
  
  this.createRecipe = (req, res) => {
    console.log('req.body', req.body)
    let mess = JSON.stringify({message: 'nailed it!'})
    res.json({message: 'nailed it!'})
  }
  
}

module.exports = ClickHandler;