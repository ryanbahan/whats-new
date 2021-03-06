import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import NewsContainer from '../NewsContainer/NewsContainer';
import SearchForm from '../SearchForm/SearchForm';
import LoadingAnimation from '../SpringAnimation/SpringAnimation'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      defaultTopics: ["entertainment", "local", "health", "technology", "science"],
      articles: [],
      isLoading: false,
      location: null
    }
  }

  componentDidMount() {
    this.getArticlesByTopic();
    this.getCity();
  }

  getArticlesByTopic(topic = "all") {
    this.setState({ isLoading: true });

    fetch(`https://newsapi.org/v2/everything?q=${topic}&pageSize=100&apiKey=18eaa4f81613442b9e4c4b90f0d7d69f`)
      .then(response => response.json())
      .then(data => this.setState({articles: data.articles, isLoading: false}))
  }

  changeTopic = (e) => {
    if (e.target.className === 'local' && this.location !== null) {
      this.getArticlesByTopic(this.state.location || 'all')
    } else {
      this.getArticlesByTopic(e.target.className);
    }
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

  getCity() {
    navigator.geolocation.getCurrentPosition(function(position) {
      logCoords(position.coords.latitude, position.coords.longitude);
    });

    const logCoords = (newLat, newLong) => {
      this.getCityFromCoordinates(newLat, newLong)
    }
  }

  getCityFromCoordinates(lat, long) {
    fetch(`https://open.mapquestapi.com/geocoding/v1/reverse?key=NKOBALGUOCANiz2Y4vAhG6D8nDli2aVI&location=${lat},${long}`)
      .then(res => res.json())
      .then(data => this.setState({location: data.results[0].locations[0].adminArea5}))
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingAnimation />
    } else {
        return (
          <div className="app">
            <div className="main-content-wrapper">
              <div className="nav-wrapper">
                <Menu
                  items={this.state.defaultTopics}
                  clickHandler={this.changeTopic}
                  resetPage={this.resetPage}
                  location={this.state.location}
                />
                <SearchForm handleSubmit={this.searchArticles} />
              </div>
              <NewsContainer articles={this.state.articles} />
            </div>
          </div>
        );
      }
  }
}

export default App;
