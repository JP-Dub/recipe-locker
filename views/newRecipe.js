import React, { Component } from "react";
import ErrorBoundary from "../views/errorboundary";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
   
    this.state = {};
  }
  componentDidMount() {}

  componentWillUnMount() {}

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
            <form>
              <div id="" className="flex-container brder">
                <header id="" className="ua-header headr">
                  <h3>Name</h3>
                </header>
                <input id="name" />        
              </div>
              <div id="" className="flex-container brder">
                <header id="" className="ua-header headr">
                  <h3>Ingredients</h3>
                </header>
                <textarea id="ingredients" />        
              </div>
              <div id="" className="flex-container brder">
                <header id="" className="ua-header headr">
                  <h3>Directions</h3>
                </header>
                <textarea id="directions" />        
              </div> 
            </form>           
          </div>         
        </div>
      </ErrorBoundary>
    );
  }
}

export default NewRecipe;
