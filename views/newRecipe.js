import React, { Component } from "react";
import ErrorBoundary from "../views/errorboundary";
import ajax from '../views/index';
import "../public/create.css";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    
    this.state = {
      name: ""
    };
  }
  componentDidMount() {}

  componentWillUnMount() {}

  submitForm() {
    console.log(document.newRecipeForm)
  }  
  
  render() {
    console.log(this.props)
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
                <input id="name" value="" onChange={this.state.name} required />        
              </div>
              <div className="flex-container brder">
                <header className="ua-header headr">
                  <h3>Ingredients</h3>
                </header>
                <textarea id="ingredients" value="" required/>        
              </div>
              <div className="flex-container brder">
                <header className="ua-header headr">
                  <h3>Directions</h3>
                </header>
                <textarea id="directions" value="" required/>        
              </div> 
              <div id='bttn-div'>
                <input id='save' value='Save' type='submit' onClick={this.submitForm}/>
              </div>
            </form>           
          </div>         
        </div>
      </ErrorBoundary>
    );
  }
}

export default NewRecipe;
