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
      },
      activeTopic: null
    }
  }

  changeTopicView = (e) => {
    return this.setState({activeTopic: e.target.className});
  }

  displaySearchResults(e) {
    const regex = new RegExp(e.target.value, 'i')
    console.log(regex);
  }

  getActiveArticles(e) {
    if (this.state.activeTopic) {
      return this.state.news[this.state.activeTopic]
    } else {
      return this.state.news
    }
  }

  render () {
    return (
      <div className="app">
        <Menu
          items={Object.keys(this.state.news)}
          clickHandler={this.changeTopicView}
        />
        <div className="main-content-wrapper">
          <SearchForm displaySearchResults={this.displaySearchResults}/>
          <NewsContainer articles={this.getActiveArticles()}/>
        </div>
      </div>
    );
  }
}

export default App;
