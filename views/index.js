import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../public/style.css';

const Main = () => {
  return <h1>Hello World</h1>
}

// render to DOM
ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);