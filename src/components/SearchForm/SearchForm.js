import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  return <section className="search-field-container">
      <input type="text" onChange={props.displaySearchResults}/>
      <button type="submit">Submit</button>
    </section>
}

export default SearchForm;
