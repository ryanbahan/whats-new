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

  changeTopic = (e) => {
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

  getLocation() {
    if ("geolocation" in navigator) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
      /* geolocation IS NOT available */
    }
  }

  render () {
    this.getLocation();
    
    if (this.state.isLoading) {
      return <p>loading</p>
    } else {
        return (
          <div className="app">
            <Menu
              items={this.state.defaultTopics}
              clickHandler={this.changeTopic}
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
