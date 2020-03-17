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
    fetch('http://newsapi.org/v2/everything?q=science&apiKey=0c233b7671024689a5e269b225a9122e')
    .then(response => response.json())
    .then(data => {
      const changedTopic = {...this.state.news};
      changedTopic.science = data.articles;
      this.setState({news: changedTopic, activeItems: changedTopic})
    })

    fetch('http://newsapi.org/v2/everything?q=local&apiKey=0c233b7671024689a5e269b225a9122e')
    .then(response => response.json())
    .then(data => {
      const changedTopic = {...this.state.news};
      changedTopic.local = data.articles;
      this.setState({news: changedTopic, activeItems: changedTopic})
    })

    fetch('http://newsapi.org/v2/everything?q=entertainment&apiKey=0c233b7671024689a5e269b225a9122e')
    .then(response => response.json())
    .then(data => {
      const changedTopic = {...this.state.news};
      changedTopic.entertainment = data.articles;
      this.setState({news: changedTopic, activeItems: changedTopic})
    })

    fetch('http://newsapi.org/v2/everything?q=health&apiKey=0c233b7671024689a5e269b225a9122e')
    .then(response => response.json())
    .then(data => {
      const changedTopic = {...this.state.news};
      changedTopic.health = data.articles;
      this.setState({news: changedTopic, activeItems: changedTopic})
    })

    fetch('http://newsapi.org/v2/everything?q=technology&apiKey=0c233b7671024689a5e269b225a9122e')
    .then(response => response.json())
    .then(data => {
      const changedTopic = {...this.state.news};
      changedTopic.technology = data.articles;
      this.setState({news: changedTopic, activeItems: changedTopic})
    })
  }

  changeTopicView = (e) => {
    this.setState({activeItems: this.state.news[e.target.className]});
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
