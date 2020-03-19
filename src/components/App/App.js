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
      location: null
    }
  }

  async componentDidMount() {
    this.getArticlesByTopic();
    await this.getCity();
  }

  getArticlesByTopic(topic = "all") {
    this.setState({ isLoading: true });

    fetch(`http://newsapi.org/v2/everything?q=${topic}&pageSize=100&apiKey=0c233b7671024689a5e269b225a9122e`)
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
    fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=NKOBALGUOCANiz2Y4vAhG6D8nDli2aVI&location=${lat},${long}`)
      .then(res => res.json())
      .then(data => this.setState({location: data.results[0].locations[0].adminArea5}))
  }

  render () {
    console.log(this.state.articles);
    if (this.state.isLoading) {
      return <p>loading</p>
    } else {
        return (
          <div className="app">
            <div className="main-content-wrapper">
              <div class="nav-wrapper">
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
