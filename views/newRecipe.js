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
                <h3>Twitter Login</h3>
                <i
                  className="fab fa-twitter"
                  title="sign in"
                  onClick={this.twitterHandler}
                />
              </header>
              <div id="signin-info">
                <p>Welcome to the Recipe Locker!</p>
                <p>
                  If would like to add, create and edit or delete your own
                  recipes, we ask that you sign in with Twitter. This will also
                  prevent others from modifying or deleting your recipes. To do
                  this, just click on the Twitter icon in the upper corner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default newRecipe;
