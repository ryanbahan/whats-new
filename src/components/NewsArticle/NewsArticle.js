import React from 'react';
import './NewsArticle.css';

class NewsArticle extends React.Component {

  render() {
    return <article className="news-article-card">
      <a href={this.props.url}><img src={this.props.img} alt="image"/></a>
      <h3>{this.props.headline}</h3>
      <p>{this.props.description}</p>
      <a href={this.props.url} className="bottom-link">See more ></a>
    </article>
  }
}

export default NewsArticle;
