import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {
        keyword: '',
        location: 'Ottawa',
        response: null
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    alert('We are currently working on making your search query for ' + this.state.user.keyword + ' come to life! Adding magic now....');

    console.log(this.state.user);


  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ user: {response: res.express }}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div onSubmit={this.handleSubmit} className="search-bar">
        <form>
          <label>
            What are you searching for today? {this.state.user.response}
          </label>
          <input placeholder="Begin your search..." className="search-textfield" name="keyword" type="text" value={this.state.value} onChange={this.handleChange} />
          <input className="search-submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
