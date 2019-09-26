import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../public/style.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);
    // this.twitterHandler = this.twitterHandler.bind(this);
    
    this.state = {
      locked : 1,
      create : '', 
      edit   : '',
      delete : '',
      unlocked: 'fas fa-lock-open',
      user : 'fas fa-lock'
    }
  }
  
  componentDidMount() {
     
  }
  
  componentWillUnMount() {}
  
  userLogin(evt) {
    evt.preventDefault();
    // window.location.href = '/api/auth/twitter';  
    
    if(this.state.locked) {
      this.setState({
        user: 'fas fa-unlock',
        locked : 0, 
        create : 'fas fa-plus-square',
        edit : 'far fa-edit',
        delete : 'fas fa-trash'
      })
    } else {
      this.setState({
        user: 'fas fa-lock',
        locked: 1,
        create : '',
        edit : '',
        delete : ''
      })
    }
  }
  
  createRecipe() {
    
  }
  
  editRecipe() {
    
  }
  
  deleteRecipe() {
    
  }
  
  render() {
    return (
      <ErrorBoundary>
        <div id ="main" className='main-container'>
          <header id='locker-header' className='main-header'>
            <h2 className='lckr hdr-div' />
            <h2 className='lckr hdr-div'>The Recipe Locker</h2>          
            <h2 className='lckr hdr-div'>
              <i id='main-lock' className={this.state.user} onClick={this.userLogin} title='user login'/>
            </h2>
          </header>
          <div id='food-columns' className='flex'>
            <div id='index' className='flex-container'>
              <header id='index-header' className='flex-header'>
                <h3 className='idx hdr-div'/>
                <h3 className='idx hdr-div'>Recipe Name</h3>
                <h3 className='idx hdr-div'>
                  <i className={this.state.create} title='add recipe'/>
                </h3>
              </header>
              <div id='index-table'>
                <table>
                  <tbody>
                    <tr><td>foo gartarum</td></tr>
                    <tr><td>lipsum chiken</td></tr>
                    <tr><td>roast modicum</td></tr>
                    <tr><td>Yum Yum Chicken</td></tr>
                    <tr><td>goo fartarum</td></tr>
                    <tr><td>cipsum lhiken</td></tr>
                    <tr><td>moast rodicum</td></tr>
                    <tr><td>cranium</td></tr>
                    <tr><td>foo gartarum</td></tr>
                    <tr><td>lipsum chiken</td></tr>
                    <tr><td>roast modicum</td></tr>
                    <tr><td>cranium</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id='recipe' className='flex-container'>
              <header id='recipe-header' className='flex-header'>
                <h3 className='rcp hdr-div' />
                <h3 className='rcp hdr-div'>Yum Yum Chicken</h3>
                <h3 className='rcp hdr-div'>
                  <i className={this.state.edit} title='edit recipe'/>
                  <i className={this.state.delete} title='delete recipe'/>
                </h3>
              </header>
              <article id='recipe-ingredients'>
                <ul>Ingredients:
                  <li>2lbs Chicken Breast</li>
                  <li>1 can of diced tomatoes</li>
                  <li>1 pinch of salt</li>
                  <li>1/2 teaspoon white pepper</li>
                </ul>
              </article>       
            </div>
          </div>
        </div>
        {!this.state.locked? <Login /> : <div/>}
      </ErrorBoundary>
      );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {}
  
  componentWillUnMount() {}
  
  render() {
    return (
      <ErrorBoundary>
        <div id='main-center'>
        <div id="main-account" className="main-container">
          <header id='account-header' className='ua-header'>
            <h3>User Account</h3>         
            <i id='account-close' className='fas fa-window-close lckr' title='close'/>
          </header>
          <div id='twitter' className='flex-container'>
            <header id='twitter-header' className='ua-header'>
              <h3>Twitter Login</h3>
              <i class='fab fa-twitter' title='add recipe' />
            </header>
            <div id='signin-info'>
              <p>Welcome to the Recipe Locker!</p>
              <p> If would like to add, create and edit or delete your own recipes, we ask that you sign in with Twitter. This will also prevent others from modifying or deleting your recipes. To do this, just click on the Twitter icon in the upper corner.</p>
            </div>
          </div>
        </div>
        </div>
      </ErrorBoundary>
    )
  }
}

	// Error class React Component
class ErrorBoundary extends Component {	
		constructor(props) {
			super(props);
			this.state = { hasError: false };
		}
    
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
		
    componentDidCatch(error, info) {
			// Display fallback UI
			this.setState({ hasError: true });
			console.log(error, info);   
		}
    
		render() {
			if (this.state.hasError) {
				return <h3>Um...Something went wrong.</h3>;
			}
			return this.props.children;
		};
}; 

// configure ajax call
const ajax = {
  ready: function ready(fn) {
        
    if (typeof fn !== 'function') return;
    if (document.readyState === 'complete') return fn();

    document.addEventListener('DOMContentLoaded', fn, false);
  },
  request: function ajaxRequest(method, path, data, callback) {
    let xmlhttp = new XMLHttpRequest(),
        url     = '../api' + path,        
        params  = typeof data === 'string' ? data 
                  : Object.keys(data).map( k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) ).join('&');  

    xmlhttp.open(method, url, true);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          let res = JSON.parse(xmlhttp.response);
              
          if(res.statusCode === 400) return alert(res.response.body)
             
          callback(res);
        }
    };

    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xmlhttp.send(params);
    return xmlhttp;
  }
};

// render to DOM
ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);

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