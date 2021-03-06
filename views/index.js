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
    // this.userLogin = this.userLogin.bind(this);
    // this.addRecipe = this.addRecipe.bind(this);
    // this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editorUI = this.editorUI.bind(this);
    this.actionUI = this.actionUI.bind(this);
    
    this.state = {
      editorUI  : 0,
      actionUI  : 0,
      editorName: '',
      actionName: '',
      recipeName: '',
      isLoggedIn: 0,
      lockIcon  : "fas fa-lock"
    };
  }

  componentDidMount() {
    this.main = document.getElementById('main');
    this.recipeName = document.getElementById('recipe-name');
    this.userPath = RegExp("^/login/.*").test(window.location.pathname);
    
    if (this.userPath) {   
      this.setState({
        lockIcon : "fas fa-lock-open",
        isLoggedIn: 1
      });
      
    }
    
    const idx_header = document.getElementById('index-header'),
          table  = document.getElementsByClassName('table'),
          index  = document.getElementById('index'),
          recipe = document.getElementById('recipe');
    
    const adjHeight = () => {
      let height = index.clientHeight - Math.round(idx_header.clientHeight);
      //console.log(height, {width: document.body.clientWidth, height: window.innerHeight})
      
      if(height >= 72 ) {
        table[0].style.height = height + 'px';
      }
      
      // expands #recipe to full screen height
      if(document.body.clientWidth <= 850) {
        recipe.style.height = recipe.clientHeight + (window.innerHeight - this.main.clientHeight) + 'px';
      } else {
        recipe.style.height = '60vh';
      }
      
      // maintain height of #recipe-table
      table[1].style.height = recipe.clientHeight - Math.round(idx_header.clientHeight) + 'px';

    }

    adjHeight();
    window.addEventListener('resize', adjHeight);
    
//     ajax.ready(ajax.request('GET', '/recipe-locker', {}, (book) => {}));
  
  }
  
  componentDidUpdate() {
    let mainLock = document.getElementById('main-lock');
    if(this.state.lockIcon === 'fas fa-lock-open') {
      changeStyle.flip(mainLock.classList, 'add');
    } else {
      changeStyle.flip(mainLock.classList, 'remove');
    }
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.adjHeight);
  }

  actionUI(evt) {
    if(evt.target.title === 'Logout') return window.location.href = "/api/logout";
    
    let set = 'remove',
        actionUI = 0,
        actionName = '',
        recipeName = '',
        lockIcon = this.userPath ? 'fas fa-lock-open' : 'fas fa-lock' ;

   
    if(evt.target.title === 'Login' ) {
      set = 'add';
      actionUI = 1;
      actionName = 'User Account';
      lockIcon = 'fas fa-unlock'
    }  
    
    if(evt.target.title === 'Delete Recipe') {
      set = 'add';
      actionUI = 1;
      actionName = 'Delete Recipe';
      recipeName = this.recipeName.innerHTML;
    }       

    this.setState({
      actionUI: actionUI,
      actionName: actionName,
      recipeName: recipeName,
      lockIcon : lockIcon
    });      

    changeStyle.blur(this.main.classList, set)
  }  
  
  editorUI(evt) {
    let set = 'remove',
        editorUI = 0,
        editorName = '',
        recipeName = '';

    if( evt.target.title !== 'close') {
      set = 'add';
      editorUI = 1;
      editorName = evt.target.title;
      recipeName = this.recipeName.innerHTML;
    }

    this.setState({
      editorUI: editorUI,
      editorName: editorName,
      recipeName: recipeName
    });
    
    changeStyle.blur(this.main.classList, set)        
  }  
  
  renderUI() {
   //console.log('locked', this.state.locked, !this.state.locked ? true: false)
    if(this.state.actionUI) {
      return(
       <ActionUI 
         userLogin={this.actionUI}
         actionName={this.state.actionName}
         recipeName={this.state.recipeName}
       /> 
     );
    } else
    if(this.state.editorUI) {
      return(
        <EditorUI 
          userLogin={this.editorUI} 
          editorName={this.state.editorName}
          recipeName={this.state.recipeName}
          />
      )
    } else {
      return( <div id='reserveUI'/> );
    }
                        
  }

  render() {
    
    return (
      <ErrorBoundary>
        <div id="main" className="frame shadow radius">
          <header className="main-header">
            <h2 className="hdr-div" />
            <h2 className="hdr-div">The Recipe Locker</h2>
            <h2 className="hdr-div">
              <i
                id="main-lock"
                className={this.state.lockIcon}
                onClick={this.actionUI}
                title={this.state.isLoggedIn? 'Logout' : 'Login'}
              />
            </h2>
          </header>
          <div id="food-columns" className="flex">
            <div id="index" className="flex-container">
              <header id="index-header" className="flex-header">
                <h3 className="hdr-div" />
                <h3 className="hdr-div">Recipe Name</h3>
                <h3 className="hdr-div">
                  <i className={this.state.isLoggedIn? 'fas fa-plus-square' : ''} 
                     onClick={this.editorUI}
                     title="New Recipe" />
                </h3>
              </header>
              <div id="index-table" className='table'>
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
                <h3 className="hdr-div" />
                <h3 id='recipe-name' className="hdr-div">Yum Yum Chicken</h3>
                <h3 className="hdr-div">
                  <i className={this.state.isLoggedIn? 'far fa-edit' : ''} title="Edit Recipe" onClick={this.editorUI}/>
                  <i className={this.state.isLoggedIn? 'fas fa-trash': ''} title="Delete Recipe" onClick={this.actionUI} />
                </h3>
              </header>
              <div id='recipe-table' className='table'>
              <section id="recipe-ingredients">
                <ul>
                  <span className='recipe-font'>Ingredients:</span>
                  <li>1/2 c. all-purpose flour</li>
                  <li>1 tbsp. lemon pepper seasoning</li>
                  <li>2 lemons, divided</li>
                  <li>1 tsp. kosher salt</li>
                  <li>1 lb. boneless skinless chicken breasts, halved</li>
                  <li>2 tbsp. extra virgin olive oil</li>
                  <li>2 tbsp.butter</li>
                  <li>2 cloves garlic, minced</li>
                  <li>freshly chopped parsley</li>
                </ul>
                </section>
                <section id='recipe-directions'>
                  <ol>
                    <span className='recipe-font'>Directions:</span>
                    <li>Preheat oven to 400°. In a medium bowl, whisk together flour, lemon pepper, salt, and zest of 1 lemon. Toss chicken breasts in the flour mixture until fully coated. Slice remaining lemon into thin rounds.</li>
                    <li>In a large ovenproof skillet over medium-high heat, heat oil. Add chicken in a single layer and cook until golden on bottom, about 5 minutes, then flip chicken breasts.</li>
                    <li>To skillet, add broth, butter, garlic, and lemon slices and bake until chicken is cooked through and sauce has reduced slightly, 15 minutes.</li>
                    <li>Spoon sauce on top of chicken and garnish with parsley.</li>
                  </ol>
                </section>
              </div>
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
        url = "../api" + path;
    
      let params = data ?
        typeof data === "string"
          ? data
          : Object.keys(data)
              .map(
                k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
              )
              .join("&")
      : null;
      

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

const changeStyle = {
  blur: (style, set) => { style[set]('blur') },
  flip: (style, set) => { style[set]('flip-lock') }
};

export default ajax;

// render to DOM
ReactDOM.render(<Main />, document.getElementById("root"));