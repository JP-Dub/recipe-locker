import React, { Component } from "react";
import ErrorBoundary from "../views/errorboundary";
import ajax from '../views/index';
import "../public/create.css";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
     this.ingredientsHandler = this.ingredientsHandler.bind(this);
     this.directionsHandler = this.directionsHandler.bind(this);
    
    this.state = {
      name: "",
      ingredients: "",
      directions: ""
    };
  }
  componentDidMount() {}

  componentWillUnMount() {}

  submitForm() {
    console.log(this.state)
    ajax.ready(ajax.request('POST', '/createRecipe', this.state, (data) => {
      console.log(data)
    }))
  }  
  
  changeHandler(evt) {
    console.log(evt.target, evt.target.id)
    let id = evt.target.id;
    
    this.setState({
      name : evt.target.value
    })
  }
  
  ingredientsHandler(evt) {
    this.setState({
      ingredients : evt.target.value
    })
  }
  
  directionsHandler(evt) {
    this.setState({
      directions : evt.target.value
    })
  }
  
  render() {
   
    return (
      <ErrorBoundary>
        <div id="main-center">
          <div id="main-account" className="main-container">
            <header id="account-header" className="ua-header">
              <h3>New Recipe</h3>
              <i
                id="account-close"
                className="fas fa-window-close lckr"
                title="close"
                onClick={this.props.userLogin}
              />
            </header>
            <form id="newRecipeForm">
              <div className="flex-container brder">
                <header className="ua-header headr">
                  <h3>Name</h3>
                </header>
                <input id="name" value={this.state.name} onChange={this.changeHandler} required />        
              </div>
              <div className="flex-container brder">
                <header className="ua-header headr">
                  <h3>Ingredients</h3>
                </header>
                <textarea id="ingredients" value={this.state.ingredients} onChange={this.ingredientsHandler} required/>        
              </div>
              <div className="flex-container brder">
                <header className="ua-header headr">
                  <h3>Directions</h3>
                </header>
                <textarea id="directions" value={this.state.directions} onChange={this.directionsHandler} required/>        
              </div> 
              <div id='bttn-div'>
                <input id='save' value='Save' type='button' onClick={this.submitForm}/>
              </div>
            </form>           
          </div>         
        </div>
      </ErrorBoundary>
    );
  }
}

export default NewRecipe;
