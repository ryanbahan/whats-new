import React from 'react';
import './SearchForm.css';

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: ""
    }
  }

  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const newQuery = this.state.searchQuery;
    this.props.handleSubmit(newQuery);
    this.setState({searchQuery: ""})
  }

  render() {
    return <form className="search-field-container" onSubmit={this.handleSubmit}>
      <input type="text" onChange={this.handleChange} value={this.state.searchQuery}/>
      <button type="submit">Submit</button>
    </form>
  }
}

export default SearchForm;
