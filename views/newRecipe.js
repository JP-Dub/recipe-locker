import React, { Component } from "react";
import ErrorBoundary from "../views/errorboundary";

class newRecipe extends Component {
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
            <div id="twitter" className="flex-container">
              <header id="twitter-header" className="ua-header">
                <h3>Name of recipe</h3>
                <i
                  className="fab fa-twitter"
                  title="sign in"
                  onClick={this.twitterHandler}
                />
              </header>
              <div id="signin-info">
                <textarea></textarea>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default newRecipe;
