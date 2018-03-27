import React, { Component } from 'react';
import './SearchBar.css';
import Interweave from 'interweave';
var Buffer = require('buffer/').Buffer;
var toArrayBuffer = require('to-arraybuffer');

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
      data: 'When you go in search of honey you must expect to be stung by bees. - J.J.',
      buffer: null
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

    this.setState({
      response: 'Searching the corners of the web!',
      message: 'Loading....'
    });


    this.callApi()
      .then((res) => {

        // console.log(res.buffer);
        // toArrayBuffer(res.buffer);
        if(res.buffer != null){
          var xbe = Buffer.from(JSON.parse(res.buffer).data);
        }


        this.setState({
          response: res.status,
          message: res.message,
          data: res.data,
          buffer: res.buffer
        });

        // console.log(this.state.user);
        // console.log(this.state.message);
        // console.log(this.state.data);
        // console.log(this.state.buffer);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {


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
      <div className="search-app">
        <div onSubmit={this.handleSubmit} className="search-bar">
          <form>
            <label>
              What are you searching for today?
            </label>
            <input placeholder="Begin your search..." className="search-textfield" name="keywords" type="text" value={this.state.value} onChange={this.handleChange} />
            <input className="search-submit" type="submit" value="Submit" />
          </form>
          <p className="message-status">{this.state.response}</p>
          <div className="message-results">{this.state.message}</div>
        </div>
        <div className="message-data">
          <Interweave
            className="message-data"
            tagName="div"
            content={this.state.data}
          />
        </div>
        {/* <div className="message-data">
            {this.state.data.map((arrs) => <div>
            <Interweave
                className="message-data"
                tagName="div"
                content={arrs}
              />

            </div> )}
        </div> */}
      </div>
    );
  }
}

export default SearchBar;
