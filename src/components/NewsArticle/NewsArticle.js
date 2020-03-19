import React from 'react';
import './NewsArticle.css';

class NewsArticle extends React.Component {

  openLink(link) {
    window.open(link);
  }

  render() {
    return <article className="news-article-card" onClick={() => this.openLink(this.props.url)}>
      <img src={this.props.img} alt={this.props.headline}/>
      <p className="article-source">{this.props.source}</p>
      <h3>{this.props.headline}</h3>
      <p className="article-description">{this.props.description}</p>
    </article>
  }
}

export default NewsArticle;
