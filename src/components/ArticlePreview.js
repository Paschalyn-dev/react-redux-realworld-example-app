import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../redux-toolkit-example/agent';
import { connect, useDispatch, useSelector } from 'react-redux';
// import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';
import { articleFavorited } from '../reducers/articleList';
import { articleUnfavorited } from '../reducers/articleList';
const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

// const mapDispatchToProps = dispatch => ({
//   favorite: slug => dispatch({
//     type: ARTICLE_FAVORITED,
//     payload: agent.Articles.favorite(slug)
//   }),
//   unfavorite: slug => dispatch({
//     type: ARTICLE_UNFAVORITED,
//     payload: agent.Articles.unfavorite(slug)
//   })
// });


function ArticlePreview(props) {
  const article = props.article;
  const dispatch = useDispatch();
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      dispatch(articleUnfavorited(article.slug));
    } else {
      dispatch(articleFavorited(article.slug));
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;

// export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
