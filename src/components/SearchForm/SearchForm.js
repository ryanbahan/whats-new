import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  return <form className="search-field-container" onSubmit={props.handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
}

export default SearchForm;
