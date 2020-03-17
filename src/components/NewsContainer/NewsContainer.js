import React from 'react';
import NewsArticle from '../NewsArticle/NewsArticle';
import './NewsContainer.css'

const NewsContainer = (props) => {
  const articleTopics = Object.keys(props.articles);

  const articles = articleTopics.reduce(

    (allArticles, articleTopic) => {
    allArticles.push(props.articles[articleTopic]);

    return allArticles;
  }, []).flat();

  return <main>
    {articles.map(article =>
      <NewsArticle
        key={(Date.now() - (Math.random() * Math.floor(10000)))}
        headline={article.title}
        img={article.urlToImage}
        description={article.description}
        url={article.url}
      />
    )}
  </main>
}

export default NewsContainer;
