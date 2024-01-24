import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import agent from '../../../redux-toolkit-example/agent';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import { applyTagFilter, homePageLoaded } from '../../reducers/articleList';
import { homePageUnloaded } from '../../reducers/home';

const Promise = global.Promise;

// const mapStateToProps = state => ({
//   ...state.home,
//   appName: state.common.appName,
//   token: state.common.token
// });

// const mapDispatchToProps = dispatch => ({
//   onClickTag: (tag, pager, payload) =>
//     dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
//   onLoad: (tab, pager, payload) =>
//     dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
//   onUnload: () =>
//     dispatch({  type: HOME_PAGE_UNLOADED })
// });

const home = useSelector((state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
}))

const dispatch = useDispatch();

class Home extends React.Component {
  componentWillMount() {
    const tab = home.token ? 'feed' : 'all';
    const articlesPromise = home.token ?
      agent.Articles.feed :
      agent.Articles.all;

    dispatch(homePageLoaded(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()])));
  }

  componentWillUnmount() {
    dispatch(homePageUnloaded());
  }

  render() {
    return (
      <div className="home-page">

        <Banner token={home.token} appName={home.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={home.tags}
                  onClickTag={dispatch(applyTagFilter())} />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
