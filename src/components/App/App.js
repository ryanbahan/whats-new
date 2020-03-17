import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import NewsContainer from '../NewsContainer/NewsContainer';
import SearchForm from '../SearchForm/SearchForm';
import entertainment from '../../data/entertainment';
import health from '../../data/health';
import local from '../../data/local';
import science from '../../data/science';
import technology from '../../data/technology';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      news: {
        entertainment,
        health,
        local,
        science,
        technology
      }
    }
  }

  render () {
    return (
      <div className="app">
        <Menu items={Object.keys(this.state.news)}/>
        <div className="main-content-wrapper">
          <SearchForm />
          <NewsContainer articles={this.state.news}/>
        </div>
      </div>
    );
  }
}

export default App;
