import React, { Component } from 'react';
import SearchBar from './components/SearchBar.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ONECLICK SEARCH</h1>
        </header>
        <section>
        <SearchBar/>
        </section>
      </div>
    );
  }
}

export default App;
