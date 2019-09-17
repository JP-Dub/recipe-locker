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
        <p>The Recipe Locker</p>
        <div id='index' className='contents avgScreen'>#index / .contents avgScreen</div>
        <div id='recipe' className='contents avgScreen'>#recipe / .contents avgScreen</div>
      </div>
      );
  }
}



// render to DOM
ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);