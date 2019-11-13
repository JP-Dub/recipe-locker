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
    this.userLogin = this.userLogin.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editorUI = this.editorUI.bind(this);
    
    this.state = {
      editorUI : 0,
      editorName: '',
      recipeName: '',
      newRecipe: 0,
      locked   : 1,
      addIcon  : "",
      editIcon : "",
      trashIcon: "",
      lockIcon : "fas fa-lock",
      actionName: "",
      account : 'userLogin',
      showIcons : 0
    };
  }

  componentDidMount() {
    this.main = document.getElementById('main');
    this.recipeName = document.getElementById('recipe-name');
    this.userPath = RegExp("^/login/.*").test(window.location.pathname);
    
    if (this.userPath) {   
      this.setState({
        locked   : 1,
        addIcon  : "fas fa-plus-square",
        editIcon : "far fa-edit",
        trashIcon: "fas fa-trash",
        lockIcon : "fas fa-lock-open",
        account  : 'userLogout'
      });
      
    }
    
    this.table = document.getElementsByClassName('table');
    this.idx_header = document.getElementById('index-header');
    this.index  = document.getElementById('index');
    this.recipe = document.getElementById('recipe');
    this.main   = document.getElementById('main');
    
    this.adjHeight = () => {
      let height = this.index.clientHeight - Math.round(this.idx_header.clientHeight);
      //console.log(height, {width: document.body.clientWidth, height: window.innerHeight})
      
      if(height >= 72 ) {
        this.table[0].style.height = height + 'px';
      }
      
      // expands #recipe to full screen height
      if(document.body.clientWidth <= 850) {
        this.recipe.style.height = this.recipe.clientHeight + (window.innerHeight - this.main.clientHeight) + 'px';
      } else {
        this.recipe.style.height = '60vh';
      }
      
      // maintain height of #recipe-table
      this.table[1].style.height = this.recipe.clientHeight - Math.round(this.idx_header.clientHeight) + 'px';

    }
    
    this.adjHeight();
    
    window.addEventListener('resize', this.adjHeight);
    
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

  userLogin(evt) {
    // evt.preventDefault();
    let set;
    if(!this.userPath) {
      if( evt.target.id === 'main-lock' ) {
        set = 'add';
        this.setState({
          locked: 0,
          lockIcon: 'fas fa-unlock',
          actionName: 'User Account'
        })
      } else {
        set = 'remove';
        this.setState({
          locked: 1,
          lockIcon: 'fas fa-lock',
          actionName: ''
        })
      }
      changeStyle.blur(this.main.classList, set)
    }
      
  }
  
  userLogout() {
    window.location.href = "/api/logout";
  }
  
  deleteRecipe(evt) {
    let set;
    let value = document.getElementById('recipe-name')
    //console.log(value.innerHTML)
    this.name = value.innerHTML;
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
    changeStyle.blur(this.main.classList, set)
  }

  addRecipe(evt) {
    let set;
    console.log(evt.target.title)
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
    changeStyle.blur(this.main.classList, set)    
  }
  
  editorUI(evt) {
    let set,
        editorUI = 0,
        editorName = '',
        recipeName = '';
    //this.name = document.getElementById('recipe-name').innerHTML;
    console.log(this.recipeName.innerHTML)
    //this.name = value.innerHTML;
    if( evt.target.id === 'icon-close') {
      set = 'remove';
    } else {
      set = 'add';
      editorUI = 1;
      editorName = evt.target.title;
      recipeName = this.recipeName.innerHTML;
    }

    this.setState({
      editorUI: editorUI,
      editorName: editorName,
      recipeName: recipeName
    })
    changeStyle.blur(this.main.classList, set)        
  }  
  
  renderUI() {
   //console.log('locked', this.state.locked, !this.state.locked ? true: false)
    if(!this.state.locked) {
      return(
       <ActionUI 
         userLogin={this.state.actionName === 'User Account'? this.userLogin : this.deleteRecipe}
         actionName={this.state.actionName}
         recipeName={this.name}
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
                onClick={this[this.state.account]}
                title={this.state.account === 'userLogin'? 'User Login' : 'User Logout'}
              />
            </h2>
          </header>
          <div id="food-columns" className="flex">
            <div id="index" className="flex-container">
              <header id="index-header" className="flex-header">
                <h3 className="hdr-div" />
                <h3 className="hdr-div">Recipe Name</h3>
                <h3 className="hdr-div">
                  <i className={this.state.addIcon} 
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
                  <i className={this.state.editIcon} title="Edit Recipe" onClick={this.editorUI}/>
                  <i className={this.state.trashIcon} title="Delete Recipe" onClick={this.deleteRecipe} />
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