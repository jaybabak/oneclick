import React, { Component } from 'react';
import './SearchBar.css';
import SearchResults from './SearchResults';
var Buffer = require('buffer/').Buffer;

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {
        keywords: '',
        location: 'Ottawa'
      },
      response: '',
      message: 'No Search Performed Yet.',
      data: '...',
      buffer: null,
      isLoading: 'hidden',
      query: 'hidden'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.callApi = this.callApi.bind(this);
  }

  handleChange(e){

    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }

  handleSubmit(event){

    event.preventDefault();
    // alert('We are currently working on making your search query for ' + this.state.user.keywords + ' come to life! Adding magic now....');

    // console.log(this.state.user);
    // document.querySelector('.search-textfield').value = '';

    this.setState({
      response: 'Searching the corners of the web!',
      message: 'Loading....',
      isLoading: 'active',
      query: 'hidden'
    });


    this.callApi()
      .then((res) => {

        // console.log(res.buffer);
        // toArrayBuffer(res.buffer);
        // console.log('----------------------------------------------');
        console.log(res);
        // var xbe = null;
        if(res.buffer != null){
          // xbe = Buffer.from(JSON.parse(res.buffer).data)
          // console.log(xbe.toString('utf8'));
        }

        // console.log(res);

        this.setState({
          response: res.status,
          message: res.message,
          data: res.data,
          buffer: res.buffer,
          isLoading: res.loading,
          query: 'active'
        });

        // console.log(this.state.user);
        // console.log(this.state.message);
        // console.log(this.state.data);
        // console.log(this.state.buffer);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {


      var clearBtn = document.querySelector('#clear-button');
      var resultsWrapper = document.querySelector('.message-data');
      // console.log(resultsWrapper);

      clearBtn.addEventListener('click', function (e) {
        //
        //
        //
        var name = "slideUp";
        var name2 = "slided";

        var arr = resultsWrapper.className.split(" ");
        if (arr.indexOf(name) === -1) {
            resultsWrapper.className += " " + name;
            // resultsWrapper.className += " " + name2;
            setTimeout(function(){ window.location.reload(); }, 700);
        }

      });
  }

  callApi = async () => {

    const keyword = encodeURIComponent(this.state.user.keywords);
    const location = encodeURIComponent(this.state.user.location);
    const formData = `keywords=${keyword}&location=${location}`;

    const response = await fetch('/api/hello?'+formData);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div>
      <div className="search-app">
        <div onSubmit={this.handleSubmit} className="search-bar">
          <form>
            <label>
              What are you searching for today?
            </label>
            <input autoComplete="off" placeholder="Begin your search..." className="search-textfield" name="keywords" type="text" value={this.state.value} onChange={this.handleChange} autofocus="autofocus" />
            <input className="search-submit" type="submit" value="Submit" />
            <span id="clear-button" className={this.state.query}>Clear</span>
          </form>
          <p className="message-status">{this.state.response}</p>
          <div className="message-results">{this.state.message}</div>
        </div>
        <div id="overlay" className={this.state.isLoading}><div className="loader"></div>Panda is finding your things...</div>
      </div>
      <div className="message-data">
        <SearchResults data={this.state.data}/>
      </div>
    </div>
    );
  }
}

export default SearchBar;
