import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../public/style.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);
    this.state = {
      locked : 1,
      //locked : 'fas fa-lock',
      unlocked: 'fas fa-lock-open',
      user : 'fas fa-lock'
    }
  }
  
  componentDidMount() {
    
    
  }
  
  componentWillUnMount() {}
  
  userLogin () {
    
    if(this.state.locked) {
      this.setState({
        user: 'fas fa-unlock',
        locked : 0 
      })
    } else {
      this.setState({
        user: 'fas fa-lock',
        locked: 1
      })
    }
  }
  
  render() {
    return (
      <ErrorBoundary>
        <div id ="main" className="container">
          <header id='locker-header'>
            <h2 id='locker-left' className='locker-div' />
            <h2 id='locker-title' className='locker-div'>The Recipe Locker</h2>          
            <h2 id='locker-right' className='locker-div'>
              <i id='locker-lock' className={this.state.user} onClick={this.userLogin} title='user login'/>
            </h2>
          </header>
          <div id='flex'>
            <div id='index' className='contents'>
              <header id='index-header'>
                <h3 id='index-left' className='index-div'></h3>
                <h3 id='index-title' className='index-div'>Recipe Name</h3>
                <h3 id='index-right' className='index-div'>
                  <a href="" target='_self' title='add new recipe'><i className='fas fa-plus-square'></i></a>
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
            <div id='recipe' className='contents'>
              <header id='recipe-header'>
                <h3 id='recipe-left' className='recipe-div' />
                <h3 id='recipe-title' className='recipe-div'>Yum Yum Chicken</h3>
                <h3 id='recipe-icons' className='recipe-div'>
                  <a href="" target='_self' title='edit recipe'><i className='far fa-edit' /></a>
                  <a href="" target='_self' title='delete recipe'><i className='fas fa-trash'/></a>
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
      <div>What up dude</div>
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

// render to DOM
ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);

// <p id='left'><i className='fas fa-archive'/></p><p id='locker-title'>The Recipe Locker</p><p id='edit'><i className='far fa-edit'></i></p>