import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import NewsContainer from '../NewsContainer/NewsContainer';
import SearchForm from '../SearchForm/SearchForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      defaultTopics: ["entertainment", "local", "health", "technology", "science"],
      articles: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.getArticlesByTopic();
  }

  getArticlesByTopic(topic = "all") {
    this.setState({ isLoading: true });

    fetch(`http://newsapi.org/v2/everything?q=${topic}&pageSize=100&apiKey=0c233b7671024689a5e269b225a9122e`)
      .then(response => response.json())
      .then(data => this.setState({articles: data.articles, isLoading: false}))
  }

  changeTopicView = (e) => {
    this.getArticlesByTopic(e.target.className);
  }

  searchArticles = (newQuery) => {
    const searchResults = this.state.articles.filter(
      item => {
        return item.title.match(
        new RegExp(newQuery, 'i')
      )}
  );
    this.setState({articles: searchResults});
  }

  resetPage = (e) => {
    this.getArticlesByTopic();
  }

  render () {
    if (this.state.isLoading) {
      return <p>loading</p>
    } else {
        return (
          <div className="app">
            <Menu
              items={this.state.defaultTopics}
              clickHandler={this.changeTopicView}
              resetPage={this.resetPage}
            />
            <div className="main-content-wrapper">
              <SearchForm handleSubmit={this.searchArticles} />
              <NewsContainer articles={this.state.articles} />
            </div>
          </div>
        );
      }
  }
}

export default App;
