import ArticleList from '../general/ArticleList';
import React from 'react';
import agent from '../../agent';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {changeTab} from "../../redux-toolkit/reducers/articleList"
const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};


const MainView = () => {
    const articleList = useSelector(state => ({
        ...state.articleList,
        tags: state.home.tags,
        token: state.common.token   
    }));
    const dispatch = useDispatch();
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={articleList.token}
            tab={articleList.tab}
            onTabClick={dispatch(changeTab())} />

          <GlobalFeedTab tab={articleList.tab} onTabClick={dispatch(changeTab())} />

          <TagFilterTab tag={articleList.tag} />

        </ul>
      </div>

      <ArticleList
        pager={articleList.pager}
        articles={articleList.articles}
        loading={articleList.loading}
        articlesCount={articleList.articlesCount}
        currentPage={articleList.currentPage} />
    </div>
  );
};

export default MainView;