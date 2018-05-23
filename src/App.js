import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log(axios.get('https://blog-example-bm12.herokuapp.com:3000/posts').then(response => console.log(response)));
    console.log(axios.get('https://blog-example-bm12.herokuapp.com/posts').then(response => console.log(response)));
  }

  render() {
    console.log('render');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
