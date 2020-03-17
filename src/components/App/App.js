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
      activeItems: {
        entertainment,
        health,
        local,
        science,
        technology
      },
    }
  }

  changeTopicView = (e) => {
    this.setState({activeItems: this.state.news[e.target.className]});
  }

  getSearchResults = (activeItems) => {
    const articles = Array.from(Object.values(this.state.activeItems)).flat();

    const matches = articles.filter(article => {
      return article.headline.match(this.state.searchQuery)
    })

    return matches;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const articles = Array.from(Object.values(this.state.activeItems)).flat();
    const searchResults = articles.filter(
      item => item.headline.match(
        new RegExp(e.target.children[0].value, 'i')
      )
    );

    this.setState({activeItems: searchResults});
  }

  resetPage = (e) => {
    this.setState({activeItems: this.state.news});
  }

  render () {
    return (
      <div className="app">
        <Menu
          items={Object.keys(this.state.news)}
          clickHandler={this.changeTopicView}
          resetPage={this.resetPage}
        />
        <div className="main-content-wrapper">
          <SearchForm handleSubmit={this.handleSubmit} />
          <NewsContainer articles={this.state.activeItems} />
        </div>
      </div>
    );
  }
}

export default App;
