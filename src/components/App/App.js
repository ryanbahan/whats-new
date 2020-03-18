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
      currentTopic: "all",
      articles: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getArticlesByTopic();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentTopic !== prevState.currentTopic) {
      this.setState({ isLoading: true });
      this.getArticlesByTopic();
    }
  }

  getArticlesByTopic() {
    fetch(`http://newsapi.org/v2/everything?q=${this.state.currentTopic}&pageSize=100&apiKey=0c233b7671024689a5e269b225a9122e`)
      .then(response => response.json())
      .then(data => this.setState({articles: data.articles, isLoading: false}))
  }

  changeTopicView = (e) => {
    this.setState({currentTopic: e.target.className});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const articles = this.state.articles;
    const searchResults = articles.filter(
      item => {
        return item.title.match(
        new RegExp(e.target.children[0].value, 'i')
      )}
  );
    this.setState({articles: searchResults});
  }

  resetPage = (e) => {
    this.setState({currentTopic: "all", isLoading: true});
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
              <SearchForm handleSubmit={this.handleSubmit} />
              <NewsContainer articles={this.state.articles} />
            </div>
          </div>
        );
      }
  }
}

export default App;
