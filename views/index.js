import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../public/style.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  componentDidMount() {}
  
  componentWillUnMount() {}
  
  render() {
    return (
      <ErrorBoundary>
        <div id ="main" className="container">
          <header id='locker'>
            <p>The Recipe Locker<span id='edit'>&#xf044;</span></p>
          </header>
          <div id='flex'>
            <div id='index' className='contents'>
              <header id='index-name'>Recipe Name</header>
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
              <header id='recipe-name'>Yum Yum Chicken</header>
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

	// Error class React Component
class ErrorBoundary extends React.Component {	
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