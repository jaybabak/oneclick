import React, { Component } from 'react';
import SearchBar from './components/SearchBar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
          <h1 className="App-title">| BAMBOO |</h1>
        {/* </header> */}
        <section>
          <SearchBar/>
        </section>
        <footer>
          <p>2018 Copyright oneCLIK.co</p>
        </footer>
      </div>
    );
  }
}

export default App;
