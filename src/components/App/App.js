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
      activeTopic: null,
      searchQuery: null
    }
  }

  changeTopicView = (e) => {
    return this.setState({activeTopic: e.target.className});
  }

  getSearchResults = (activeItems) => {
    let articles = Object.keys(activeItems);
    articles = articles.map(article => activeItems[article]).flat();

    let matches = articles.filter(article => {
      return article.headline.match(this.state.searchQuery)
    })

    return matches;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({searchQuery: new RegExp(e.target.children[0].value, 'i')})
  }

  getActiveArticles() {
    let articles;

    if (this.state.activeTopic) {
      articles = this.state.news[this.state.activeTopic]
    } else {
      articles = this.state.news
    }

    if (this.state.searchQuery) {
      articles = this.getSearchResults(articles);
    }

    return articles;
  }

  render () {
    return (
      <div className="app">
        <Menu
          items={Object.keys(this.state.news)}
          clickHandler={this.changeTopicView}
        />
        <div className="main-content-wrapper">
          <SearchForm handleSubmit={this.handleSubmit} />
          <NewsContainer articles={this.getActiveArticles()} />
        </div>
      </div>
    );
  }
}

export default App;
