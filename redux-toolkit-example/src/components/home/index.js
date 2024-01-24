import Banner from './Banner';
import MainView from './MainView';
import React, { useEffect } from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { homePageLoaded, homePageUnloaded } from '../../redux-toolkit/reducers/home';
import { applyTagFilter } from '../../redux-toolkit/reducers/articleList';

const Promise = global.Promise;

function Home() {
    const home = useSelector(state => ({
        ...state.home,
        appName: state.common.appName,
        token: state.common.token
    }));
    const dispatch = useDispatch();
  useEffect(() => {
    const tab = home.token ? 'feed' : 'all';
    const articlesPromise = home.token ?
      agent.Articles.feed :
      agent.Articles.all;

    dispatch(homePageLoaded(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()])));
  }, [])

  useEffect(() => {
    return () => dispatch(homePageUnloaded());
  }, [])

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

export default Home;