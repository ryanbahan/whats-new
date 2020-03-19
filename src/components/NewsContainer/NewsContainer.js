import React from 'react';
import NewsArticle from '../NewsArticle/NewsArticle';
import './NewsContainer.css'

const NewsContainer = (props) => {

  return (<main>
    {props.articles.map(article =>
      <NewsArticle
        key={(Date.now() - (Math.random() * Math.floor(10000)))}
        source={article.source.name}
        headline={article.title}
        img={article.urlToImage}
        description={article.description}
        url={article.url}
      />
    )}
  </main>)
}

export default NewsContainer;
