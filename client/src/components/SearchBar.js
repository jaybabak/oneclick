import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {
        keywords: '',
        location: 'Ottawa'
      },
      response: null

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




    this.callApi()
      .then((res) => {

        this.setState({ response: res.status });

        console.log(this.state.user);
        console.log(this.state.response);
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
      <div onSubmit={this.handleSubmit} className="search-bar">
        <form>
          <label>
            What are you searching for today?
          </label>
          <input placeholder="Begin your search..." className="search-textfield" name="keywords" type="text" value={this.state.value} onChange={this.handleChange} />
          <input className="search-submit" type="submit" value="Submit" />
        </form>
        <p className="message-status">{this.state.response}</p>
      </div>
    );
  }
}

export default SearchBar;
