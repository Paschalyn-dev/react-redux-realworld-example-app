import { createSlice } from "@reduxjs/toolkit";

export const articleListSlice = createSlice({
    name: 'articleList',
    initialState: [],
    reducers: {
        articleUnfavorited: (state, action) => {
            state.push({
              articles: state.articles.map(article => {
                if (article.slug === action.payload.article.slug) {
                  return {
                    ...article,
                    favorited: action.payload.article.favorited,
                    favoritesCount: action.payload.article.favoritesCount
                  };
                }
                return article;
              })
            })
        },
        articleFavorited: () => {},
        setPage: (action, state) => {
            state.push({
            articles: action.payload.articles,
            articlesCount: action.payload.articlesCount,
            currentPage: action.page
        })
        },
        applyTagFilter: (action, state) => {
            state.push({
            pager: action.pager,
            articles: action.payload.articles,
            articlesCount: action.payload.articlesCount,
            tab: null,
            tag: action.tag,
            currentPage: 0
        })
        },
        homePageLoaded: (action, state) => {
            state.push({
            pager: action.pager,
            tags: action.payload[0].tags,
            articles: action.payload[1].articles,
            articlesCount: action.payload[1].articlesCount,
            currentPage: 0,
            tab: action.tab
        })
        },
        homePageUnloaded: () => {
            return {}
        },
        changeTab: (action, state) => {
            state.push({
            pager: action.pager,
            articles: action.payload.articles,
            articlesCount: action.payload.articlesCount,
            tab: action.tab,
            currentPage: 0,
            tag: null
        })
        },
        profilePageLoaded: () => {},
        profileFavouritesPageLoaded: (action, state) => {
            state.push({
            pager: action.pager,
            articles: action.payload[1].articles,
            articlesCount: action.payload[1].articlesCount,
            currentPage: 0
        })
        },
        profilePageUnloaded: () => {},
        profileFavouritesPageUnloaded: () => {
            return {};
        }
    }
})

export const { articleUnfavorited, articleFavorited, setPage, applyTagFilter, homePageLoaded, homePageUnloaded, changeTab, profilePageLoaded, profileFavouritesPageLoaded, profileFavouritesPageUnloaded, profilePageUnloaded } = articleListSlice.actions;
export default articleListSlice.reducer;
