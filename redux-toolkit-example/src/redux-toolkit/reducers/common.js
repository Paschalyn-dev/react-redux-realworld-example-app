import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appName: 'Conduit',
    token: null,
    viewChangeCounter: 0
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        appLoad: (state, action) => {
            state.push({
              token: action.token || null,
              appLoaded: true,
              currentUser: action.payload ? action.payload.user : null
            })
        },
        redirect: (state) => {
            state.push({
            redirectTo: null
            }) 
        },
        logout: (state) => {
            state.push({
            redirectTo: '/',
            token: null,
            currentUser: null
            })
        },
        articleSubmitted: (action, state) => {
        const redirectUrl = `/article/${action.payload.article.slug}`;
            state.push({
            redirectTo: redirectUrl
            }) 
        },
        settingsSaved: (action, state) => {
            state.push({
            redirectTo: action.error ? null : '/',
            currentUser: action.error ? null : action.payload.user
            })
        },
        login: () => {},
        register: (action, state) => {
            state.push({
            redirectTo: action.error ? null : '/',
            token: action.error ? null : action.payload.user.token,
            currentUser: action.error ? null : action.payload.user
            })
        },
        deleteArticle: (state) => {
            state.push({
            redirectTo: '/'
            }) 
        },
        articlePageUnloaded: () => {},
        editorPageUnloaded: () => {},
        homePageUnloaded: () => {},
        profilePageUnloaded: () => {},
        profileFavouritesPageUnloaded: () => {},
        settingsPageUnloaded: () => {},
        loginPageUnloaded: () => {},
        registerPageUnloaded: (state) => {
            state.push({
            viewChangeCounter: state.viewChangeCounter + 1 
            })
        }
    }
})

export const { appLoad, articlePageUnloaded, editorPageUnloaded, homePageUnloaded, profileFavouritesPageUnloaded, profilePageUnloaded, settingsPageUnloaded, loginPageUnloaded, redirect, logout, articleSubmitted, settingsSaved, register, deleteArticle, login, registerPageUnloaded } = commonSlice.actions;
export default commonSlice.reducer;