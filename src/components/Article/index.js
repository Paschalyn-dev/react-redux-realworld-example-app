import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import React, { useEffect } from 'react';
import agent from '../../../redux-toolkit-example/agent';
import { connect, useDispatch, useSelector } from 'react-redux';
import marked from 'marked';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
import { articlePageLoaded, articlePageUnloaded } from '../../reducers/article';

// const mapStateToProps = state => ({
//   ...state.article,
//   currentUser: state.common.currentUser
// });

// const mapDispatchToProps = dispatch => ({
//   onLoad: payload =>
//     dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
//   onUnload: () =>
//     dispatch({ type: ARTICLE_PAGE_UNLOADED })
// });


function Article() {
  const article = useSelector((state) => ({
    ...state.article, 
    currentUser: state.common.currentUser
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(articlePageLoaded((Promise.all([
      agent.Articles.get(article.match.params.id),
      agent.Comments.forArticle(article.match.params.id)
    ]))));
  }, []) 

  // componentWillUnmount() {
  //   dispatch(articlePageUnloaded());
  // }

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

// export default connect(mapStateToProps, mapDispatchToProps)(Article);
