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
    console.log('mounted');
    fetch(`http://newsapi.org/v2/everything?q=${this.state.currentTopic}&apiKey=0c233b7671024689a5e269b225a9122e`)
      .then(response => response.json())
      .then(data => this.setState({articles: data.articles}))
  }

  componentDidUpdate(prevProps) {
    if (this.state.currentTopic !== tstate.currentTopic) {
      this.loadData(this.props.personId);
    }
  }

  changeTopicView = (e) => {
    this.setState({currentTopic: e.target.className});
    console.log(this.state);
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
  console.log(searchResults);
    this.setState({articles: searchResults});
  }

  resetPage = (e) => {
    this.setState({currentTopic: "all"});
  }

  render () {
    console.log(this.state);
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
