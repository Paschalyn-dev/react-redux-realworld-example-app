import agent from '../agent';
import Header from './Header';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
// import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from './Article';
import Editor from './Editor';
import Home from './Home';
import Login from './Login';
import {Profile} from './Profile';
import ProfileFavorites from './ProfileFavorites';
import Register from './Register';
import Settings from './Settings';
import { store } from '../store';
import { push } from 'react-router-redux';
import { appLoad, redirect } from '../reducers/common';

// const mapStateToProps = state => {
//   return {
//     appLoaded: state.common.appLoaded,
//     appName: state.common.appName,
//     currentUser: state.common.currentUser,
//     redirectTo: state.common.redirectTo
//   }};

// const mapDispatchToProps = dispatch => ({
//   onLoad: (payload, token) =>
//     dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
//   onRedirect: () =>
//     dispatch({ type: REDIRECT })
// });


export default function App(){
  const app = useSelector((state) => ({
      appLoaded: state.common.appLoaded,
      appName: state.common.appName,
      currentUser: state.common.currentUser,
      redirectTo: state.common.redirectTo
  }))
  const dispatch = useDispatch();
  useEffect(() => {
    if (app.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(app.redirectTo));
      dispatch(redirect());
    }
  }, [app])

  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    dispatch(appLoad(token ? agent.Auth.current() : null, token));
  },[]);

    if (app.appLoaded) {
      return (
        <div>
          <Header
            appName={app.appName}
            currentUser={app.currentUser} />
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
            </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={app.appName}
          currentUser={app.currentUser} />
      </div>
    );
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
