import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import reducer from './reducer';
import articleReducer from './reducers/article';
import articleListReducer from "./reducers/articleList";
import authReducer from "./reducers/auth";
import commonReducer from "./reducers/common";
import editorReducer from './reducers/editor';
import homeReducer from './reducers/home';
import profileReducer from './reducers/profile';
import settingsReducer from './reducers/settings';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
  }
};


export const store = configureStore({
  reducer: {
    article: articleReducer,
    articleList: articleListReducer,
    auth: authReducer,
    common: commonReducer,
    editor: editorReducer,
    home: homeReducer,
    profile: profileReducer,
    settings: settingsReducer,
  },
  middleware: composeWithDevTools(getMiddleware())
},
)
// export const store = createStore(
//   reducer, composeWithDevTools(getMiddleware()));

