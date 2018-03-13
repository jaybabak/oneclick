import React, { Component } from 'react';
import SearchBar from './components/SearchBar.js';
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
        <footer>
          <p>Copyright 1Click.co</p>
        </footer>
      </div>
    );
  }
}

export default App;
