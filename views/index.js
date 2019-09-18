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
<div id ="main" className="container">
  <header id='locker'>
    <p>The Recipe Locker</p>
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
            <tr><td>cranium</td></tr>
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