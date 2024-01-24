import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
    name: 'article',
    initialState: [],
    reducers: {
        articlePageLoaded: (state, action) => {
            state.push({
            article: action.payload[0].article,
            comments: action.payload[1].comments
        })
        },
        articlePageUnloaded: () => {
        return {}
        },
        addComment: (state, action) => {
            state.push({
            commentErrors: action.error ? action.payload.errors : null,
            comments: action.error ?
            null :
            (state.comments || []).concat([action.payload.comment])
        })
        },
        deleteComment: (state, action) => {
            const commentId = action.commentId;
            state.push({
            comments: state.comments.filter(comment => comment.id !== commentId)
        })
        },
    }
})

export const { articlePageLoaded, articlePageUnloaded, addComment, deleteComment } = articleSlice.actions;
export default articleSlice.reducer;