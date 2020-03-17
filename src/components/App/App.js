import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import NewsContainer from '../NewsContainer/NewsContainer';
import SearchForm from '../SearchForm/SearchForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      topics: ["entertainment", "local", "health", "technology", "science"],
      currentTopic: "all",
      articles: []
    }
  }

  componentDidMount() {
    fetch(`http://newsapi.org/v2/everything?q=all&apiKey=0c233b7671024689a5e269b225a9122e`)
      .then(response => response.json())
      .then(data => this.setState({articles: data.articles}))
  }

  componentDidUpdate() {
    fetch(`http://newsapi.org/v2/everything?q=${this.state.currentTopic}&apiKey=0c233b7671024689a5e269b225a9122e`)
      .then(response => response.json())
      .then(data => this.setState({articles: data.articles}))
  }

  changeTopicView = (e) => {
    this.setState({currentTopic: e.target.className});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const articles = Array.from(Object.values(this.state.activeItems)).flat();
    const searchResults = articles.filter(
      item => {
        return item.title.match(
        new RegExp(e.target.children[0].value, 'i')
      )}
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
          items={this.state.topics}
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

export default App;
