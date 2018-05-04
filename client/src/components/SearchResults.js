import React, { Component } from 'react';
import './SearchResults.css';
import Interweave from 'interweave';
var Buffer = require('buffer/').Buffer;

class SearchResults extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //
    // }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.callApi = this.callApi.bind(this);
  }


  componentDidMount() {

  }

  render() {
    return (
      <div className="search-results">
          <Interweave
            className="message-data"
            tagName="div"
            content={this.props.data}
          />
        </div>
    );
  }
}

export default SearchResults;
