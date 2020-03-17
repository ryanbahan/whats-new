import React from 'react';
import './NewsArticle.css';

class NewsArticle extends React.Component {

  render() {
    return <article className="news-article-card">
    <img src={this.props.img} />
    <h3>{this.props.headline}</h3>
    <p>{this.props.description}</p>
    <a href={this.props.url}>See more ></a>
    </article>
  }
}

export default NewsArticle;
