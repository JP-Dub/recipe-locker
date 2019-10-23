import ReactDOM from "react-dom";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ActionUI from '../views/actionUI';
import EditorUI from '../views/editorUI';
import ErrorBoundary from '../views/errorboundary';

import "../public/style.css";

///login/jdub_piazza

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
    this.userLogin    = this.userLogin.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    
    this.state = {
      newRecipe: 0,
      locked  : 1,
      create  : "",
      edit    : "",
      delete  : "",
      unlocked: "fas fa-lock-open",
      user    : "fas fa-lock",
      actionName : ""
    };
  }

  componentDidMount() {
    this.main = document.getElementById('main');

    let path = window.location.pathname;
    this.userPath = RegExp("^/login/.*").test(path);

    if (this.userPath) {
      this.setState({
        locked: 1,
        create: "fas fa-plus-square",
        edit  : "far fa-edit",
        delete: "fas fa-trash",
        user  : "fas fa-lock-open"
      });
    }
    
 
    this.table = document.getElementById('index-table');
    this.header= document.getElementById('index-header');
    this.index = document.getElementById('index');
    this.adjHeight = () => {
      let height = this.index.clientHeight - Math.round(this.header.clientHeight + 5);
      if(height >= 72 ) this.table.style.height = height + 'px';
    }
      
    window.addEventListener('resize', this.adjHeight);
  
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.adjHeight);
  }

  userLogin(evt) {
    // evt.preventDefault();
    let set;
    if(!this.userPath) {
      if( evt.target.id === 'main-lock') {
        set = 'add';
        this.setState({
          locked: 0,
          user: 'fas fa-unlock',
          actionName: 'User Account'
        })
      } else {
        set = 'remove';
        this.setState({
          locked: 1,
          user: 'fas fa-lock',
          actionName: ''
        })
      }
      blur.change(this.main.classList, set)
    }
   
  }

  createRecipe(evt) {
    let set;
    
    if( evt.target.id === 'icon-close') {
      set = 'remove';
      this.setState({
        newRecipe: 0
      })
    } else {
      set = 'add';
      this.setState({
        newRecipe: 1
      })
    }
    blur.change(this.main.classList, set)
    
  }

  editRecipe() {
    blur.change(this.main.classList);
  }

  deleteRecipe(evt) {
    let set;
    let value = document.getElementById('recipe-name')
    console.log(value.innerHTML)
    
    if( evt.target.title === 'Delete Recipe') {
        set = 'add';
        this.setState({
          locked: 0,
          actionName: 'Delete Recipe'
        })
      } else {
        set = 'remove';
        this.setState({
          locked: 1,
          actionName: ''
        })
      }
    blur.change(this.main.classList, set)
  }
  
  renderUI() {
   console.log('locked', this.state.locked, !this.state.locked ? true: false)
    if(!this.state.locked) {
      return(
       <ActionUI 
         userLogin={this.state.actionName === 'User Account'? this.userLogin : this.deleteRecipe}
         actionName={this.state.actionName}
       /> 
     );
    } else
    if(this.state.newRecipe) {
      return(
        <EditorUI userLogin={this.createRecipe} />
      )
    } else {
      return( <div id='empty'/> );
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
                title="User Login"
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
                     title="Add Recipe" />
                </h3>
              </header>
              <div id="index-table">
                <table id='table'>
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
                <h3 id='recipe-name' className="rcp hdr-div">Yum Yum Chicken</h3>
                <h3 className="rcp hdr-div">
                  <i className={this.state.edit} title="Edit Recipe" />
                  <i className={this.state.delete} title="Delete Recipe" onClick={this.deleteRecipe} />
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
        
        //console.log(xmlhttp.response,  xmlhttp['response'].constructor );
        // let res = JSON.parse(xmlhttp.response);
        // if (res.statusCode === 400) return alert(res.response.body);

        callback(xmlhttp.response);
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

const blur = {
  change: (style, set) => { style[set]('blur') }
};

export default ajax;

// render to DOM
ReactDOM.render(<Main />, document.getElementById("root"));