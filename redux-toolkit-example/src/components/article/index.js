import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import React, { useEffect } from 'react';
import agent from '../../agent';
import marked from 'marked';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { articlePageLoaded, articlePageUnloaded } from '../../redux-toolkit/reducers/article';

function Article() {
  const dispatch = useDispatch();
  const article = useSelector(state => ({
    ...state.article,
    currentUser: state.common.currentUser
  }))
  useEffect(() => {
    dispatch(articlePageLoaded(Promise.all([
      agent.Articles.get(article.match.params.id),
      agent.Comments.forArticle(article.match.params.id)
    ])));
  }, [])

  useEffect(() => {
    dispatch(articlePageUnloaded());
  })

    if (!article.article) {
      return null;
    }

    const markup = { __html: marked(article.article.body, { sanitize: true }) };
    const canModify = article.currentUser &&
      article.currentUser.username === article.article.author.username;

    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{article.article.title}</h1>
            <ArticleMeta
              article={article.article}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  article.article.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={article.comments || []}
              errors={article.commentErrors}
              slug={article.match.params.id}
              currentUser={article.currentUser} />
          </div>
        </div>
      </div>
    );
}

export default Article;