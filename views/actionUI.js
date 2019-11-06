import React, { Component } from "react";
import ErrorBoundary from '../views/errorboundary';
import ajax from '../views/index';
import "../public/actionUI.css";

class ActionUI extends Component {
  constructor(props) {
    super(props);
    // this.twitterHandler = this.twitterHandler.bind(this);
    //this.renderUI = this.renderUI.bind(this);
    this.state = {};
  }
  componentDidMount() {}

  componentWillUnMount() {}

  // twitterHandler(evt) {
  //   evt.preventDefault();
  //   window.location.href = "/api/auth/twitter";
  // }
  
  renderUI () {
   
    if(this.props.actionName === 'User Account') {
      return (<Login />)
    } else {
      return (<DeleteRecipe
                recipeName={this.props.recipeName}
              />)
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div id="subframe-mount">
          <div id="subframe" className="frame radius">
            <header id="actionUI-header" className="ua-header">
              <h3>{this.props.actionName}</h3>
              <i
                id="icon-close"
                className="fas fa-window-close"
                title="Close Window"
                onClick={this.props.userLogin}
              />
            </header>
            { this.renderUI() }
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

class Login extends Component {
    constructor(props) {
      super(props);
      this.twitterHandler = this.twitterHandler.bind(this);
      this.state = {};
    }
    componentDidMount() {}
  
    componentWillUnMount() {}
  
    twitterHandler(evt) {
      evt.preventDefault();
      window.location.href = "/api/auth/twitter";
    }
  
    render() {
      return (
        <ErrorBoundary>
              <div id="inner-subframe" className="flex-container radius">
                <header id="actionUI-subheader" className="ua-header headr">
                  <h3>Twitter Login</h3>
                  <i
                    id='twitter'
                    className="fab fa-twitter"
                    title="User Login"
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
        </ErrorBoundary>
      );
    }
  }
  
  
  class DeleteRecipe extends Component {
    constructor(props) {
      super(props);
      this.deleteRecipe = this.deleteRecipe.bind(this);
      this.state = {};
    }
    
    deleteRecipe() {
      console.log('delete the recipe')
      console.log('hash=',window.location.hash, ' search=', window.location.search, ' pathname=',window.location.pathname)
      let data = {
        name : this.props.recipeName,
      }
      ajax.ready(ajax.request('DELETE', '/recipe-locker', data, () => {
        console.log("success")
      }))
    }
    
    render() {
      console.log(this.props)
      return (
           <ErrorBoundary>
              <div id="inner-subframe" className="flex-container radius">
                <header id="actionUI-subheader" className="ua-header headr">
                  <h3>{this.props.recipeName}</h3>
                  <i
                    id="delete"
                    className="fas fa-trash"
                    title="Confirm Delete"
                    onClick={this.deleteRecipe}
                  />
                </header>
                <div id="signin-info">
                  <p>Attention: You are about to permenantly delete your recipe!</p>
                  <p>              
                    If would like to continue with this action, confirm by clicking 
                    on the trash can icon in the upper right hand corner. Otherwise, 
                    please cancel by closing window.
                  </p>
                </div>
              </div>
        </ErrorBoundary>
      )
    }
  }



export default ActionUI;