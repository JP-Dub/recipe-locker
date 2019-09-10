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
      <h1>Hello World</h1>
      );
  }
}



// render to DOM
ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);