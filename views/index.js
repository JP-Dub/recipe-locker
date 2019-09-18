import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../public/style.css';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id ="main" className="container">#main / .container
        <header id='locker'>
            <p>The Recipe Locker</p>
          </header>
          <div id='flex'>
            <div id='index' className='contents'>
              <table>
                <tr><td>foo gartarum</td></tr>
                <tr><td>lipsum chiken</td></tr>
                <tr><td>roast modicum</td></tr>
                <tr><td>cranium</td></tr>
              </table>
            </div>
            <div id='recipe' className='contents'>
              <header id='title'>Title</header>
              <article id='ingredients'>
                Ingredients
              </article>
            </div>
          </div>
      </div>
      );
  }
}



// render to DOM
ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);