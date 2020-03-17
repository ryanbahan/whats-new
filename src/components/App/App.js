import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import NewsContainer from '../NewsContainer/NewsContainer';
import SearchForm from '../SearchForm/SearchForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      news: {},
      activeItems: {},
    }
  }

  componentDidMount() {
    fetch('https://whats-new-api.herokuapp.com/api/v1/news')
      .then(response => response.json())
      .then(data => this.setState({news: data, activeItems: data}))
  }

  changeTopicView = (e) => {
    this.setState({activeItems: this.state.news[e.target.className]});
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
