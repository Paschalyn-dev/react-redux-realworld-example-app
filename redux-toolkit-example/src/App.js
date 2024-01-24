import logo from './logo.svg';
import agent from './agent';
import { push } from 'react-router-redux';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { appLoad, redirect} from "./redux-toolkit/reducers/common"
import { Route, Router, Routes } from 'react-router';
import Home from './components/home/index';
import Login from './components/general/Login';
import Register from './components/general/Register';
import Editor from './components/general/Editor';
import Article from './components/article/index';
import Settings from './components/general/Settings';
import ProfileFavorites from './components/general/ProfileFavourite';
import { Profile } from './components/general/Profile';
import { useEffect } from 'react';
import { store } from "../src/redux-toolkit/store"
import Header from '../src/components/general/Header';


function App() {
  const common = useSelector((state) => ({
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }))
  const dispatch = useDispatch();
  useEffect(() => {
    if (common.redirectTo) {
      // this.context.router.replace(common.redirectTo);
      store.dispatch(push(common.redirectTo));
      dispatch(redirect());
    }
  },[common]);

  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    dispatch(appLoad(token ? agent.Auth.current() : null, token));
  },[])

  if (common.appLoaded) {
  return (
    <div className="App">
      <h1>gfghcddrsressresese</h1>
      <Router>
        <Routes>
          <Route exact path="/" element={Home}/>
          <Route path="/login" element={Login} />
          <Route path="/register" element={Register} />
          <Route path="/editor/:slug" element={Editor} />
          <Route path="/editor" element={Editor} />
          <Route path="/article/:id" element={Article} />
          <Route path="/settings" element={Settings} />
          <Route path="/@:username/favorites" element={ProfileFavorites} />
          <Route path="/@:username" element={Profile} />
        </Routes>
      </Router>
    </div>
  );
};
return (
  <div>
    <Header
      appName={common.appName}
      currentUser={common.currentUser} />
  </div>
);
}

export default App;
