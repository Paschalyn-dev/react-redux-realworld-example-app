import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { deleteArticle } from '../../redux-toolkit/reducers/common';
import { useDispatch } from 'react-redux';

const ArticleActions = props => {
  const dispatch = useDispatch();
  const article = props.article;
  const del = () => {
    dispatch(deleteArticle(agent.Articles.del(article.slug)))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default ArticleActions;