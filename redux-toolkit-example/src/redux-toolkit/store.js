import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import { createBrowserHistory } from "history";
import commonReducer from "./reducers/common";
import articleReducer from "./reducers/article";
import authReducer from "./reducers/auth";
import articleListReducer from "./reducers/articleList";
import editorReducer from "./reducers/editor";
import homeReducer from "./reducers/home";
import profileReducer from "./reducers/profile";
import settingsReducer from "./reducers/settings";
import { localStorageMiddleware, promiseMiddleware } from "../middleware";
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux'
import {thunk} from "redux-thunk";


export const history = createBrowserHistory();


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
        counter: counterReducer,
    },
    // middleware: [thunk],
    // devTools: process.env.NODE_ENV !== 'production',
})