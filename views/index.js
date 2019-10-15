import ReactDOM from "react-dom";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from '../views/login';
// import NewRecipe from '../views/newRecipe';
import EditorUI from '../views/editorUI';
import ErrorBoundary from '../views/errorboundary';

import "../public/style.css";



// Used with BrowserRouter for React Paths
class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" strict component={App} />
        <Route exact path="/login/:user" component={App} />
      </BrowserRouter>
    );
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);
    this.createRecipe = this.createRecipe.bind(this);

    this.state = {
      newRecipe: 0,
      locked  : 1,
      login   : 0,
      create  : "",
      edit    : "",
      delete  : "",
      unlocked: "fas fa-lock-open",
      user    : "fas fa-lock"
    };
  }

  componentDidMount() {
    let path = window.location.pathname;
    this.userPath = RegExp("^/login/.*").test(path);

    if (this.userPath) {
      this.setState({
        create: "fas fa-plus-square",
        edit  : "far fa-edit",
        delete: "fas fa-trash",
        user  : "fas fa-lock-open"
      });
    }
  }

  componentWillUnMount() {}

  userLogin(evt) {
    evt.preventDefault();
  
    if(!this.userPath) {
      if( evt.target.id === 'main-lock') {
        this.setState({
          locked: 0,
          user: 'fas fa-unlock'
        })
      } else {
        this.setState({
          locked: 1,
          user: 'fas fa-lock'
        })
      }
    }

  }

  createRecipe(evt) {
    // console.log(event.target)
      if( evt.target.id === 'account-close') {
        this.setState({
          newRecipe: 0
        })
      } else {
        this.setState({
          newRecipe: 1
        })
      }
    
  }

  editRecipe() {}

  deleteRecipe() {}
  
  blur(main) {
        
      console.log(main)
      // main.classList.contains('blur') ? main.classList.remove('blur')
      //                                 : main.classList.add('blur');
    
  }
  
  renderUI() {
    let main = document.getElementById('main');
    
    if(!this.state.locked) {
      this.blur(main);
      return(
       <Login userLogin={this.userLogin} /> 
     );
    } else
    if(this.state.newRecipe) {
      this.blur(main);
      return(
        <EditorUI userLogin={this.createRecipe} />
      )
    } else {
      this.blur(main);
      return( <div />);
    }
                        
  }

  render() {
  
    return (
      <ErrorBoundary>
        <div id="main" className="frame shadow radius">
          <header id="locker-header" className="main-header">
            <h2 className="hdr-div" />
            <h2 className="hdr-div">The Recipe Locker</h2>
            <h2 className="hdr-div">
              <i
                id="main-lock"
                className={this.state.user}
                onClick={this.userLogin}
                title="user login"
              />
            </h2>
          </header>
          <div id="food-columns" className="flex">
            <div id="index" className="flex-container">
              <header id="index-header" className="flex-header">
                <h3 className="idx hdr-div" />
                <h3 className="idx hdr-div">Recipe Name</h3>
                <h3 className="idx hdr-div">
                  <i className={this.state.create} 
                     onClick={this.createRecipe}
                     title="add recipe" />
                </h3>
              </header>
              <div id="index-table">
                <table>
                  <tbody>
                    <tr>
                      <td>foo gartarum</td>
                    </tr>
                    <tr>
                      <td>lipsum chiken</td>
                    </tr>
                    <tr>
                      <td>roast modicum</td>
                    </tr>
                    <tr>
                      <td>Yum Yum Chicken</td>
                    </tr>
                    <tr>
                      <td>goo fartarum</td>
                    </tr>
                    <tr>
                      <td>cipsum lhiken</td>
                    </tr>
                    <tr>
                      <td>moast rodicum</td>
                    </tr>
                    <tr>
                      <td>cranium</td>
                    </tr>
                    <tr>
                      <td>foo gartarum</td>
                    </tr>
                    <tr>
                      <td>lipsum chiken</td>
                    </tr>
                    <tr>
                      <td>roast modicum</td>
                    </tr>
                    <tr>
                      <td>cranium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="recipe" className="flex-container">
              <header id="recipe-header" className="flex-header">
                <h3 className="rcp hdr-div" />
                <h3 className="rcp hdr-div">Yum Yum Chicken</h3>
                <h3 className="rcp hdr-div">
                  <i className={this.state.edit} title="edit recipe" />
                  <i className={this.state.delete} title="delete recipe" />
                </h3>
              </header>
              <article id="recipe-ingredients">
                <ul>
                  Ingredients:
                  <li>2lbs Chicken Breast</li>
                  <li>1 can of diced tomatoes</li>
                  <li>1 pinch of salt</li>
                  <li>1/2 teaspoon white pepper</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
        { this.renderUI() }
      </ErrorBoundary>
    );
  }
}

/*
{!this.state.locked ? <Login userLogin={this.userLogin} /> : <div />}
*/
// configure ajax call
const ajax = {
  ready: function ready(fn) {
    if (typeof fn !== "function") return;
    if (document.readyState === "complete") return fn();

    document.addEventListener("DOMContentLoaded", fn, false);
  },
  request: function ajaxRequest(method, path, data, callback) {
    let xmlhttp = new XMLHttpRequest(),
      url = "../api" + path,
      params =
        typeof data === "string"
          ? data
          : Object.keys(data)
              .map(
                k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
              )
              .join("&");

    xmlhttp.open(method, url, true);

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let res = JSON.parse(xmlhttp.response);
        console.log(res, xmlhttp.response)
        if (res.statusCode === 400) return alert(res.response.body);

        callback(res);
      }
    };

    xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xmlhttp.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    xmlhttp.send(params);
    return xmlhttp;
  }
};

export default ajax;

// render to DOM
ReactDOM.render(<Main />, document.getElementById("root"));

/*
            <div id='Login' className='flex-container'>
              <header id='recipe-header2' className='header'>
                <h3 className='rcp hdr-div'></h3>
                <h3 className='rcp hdr-div'>Create A User Account</h3>
                <h3 className='rcp hdr-div'>
                    <i className='far fa-edit'></i>
                    <i className='fas fa-trash'></i>
                </h3>
              </header>              
            </div>   
*/

// <p id='left'><i className='fas fa-archive'/></p><p id='locker-title'>The Recipe Locker</p><p id='edit'><i className='far fa-edit'></i></p>
