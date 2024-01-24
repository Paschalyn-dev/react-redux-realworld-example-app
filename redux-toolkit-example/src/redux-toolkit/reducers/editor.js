import { createSlice } from "@reduxjs/toolkit";

export const editorSlice = createSlice({
    name: 'editor',
    initialState: [],
    reducers: {
        editorPageLoaded: (action, state) => {
            state.push({
              articleSlug: action.payload ? action.payload.article.slug : '',
              title: action.payload ? action.payload.article.title : '',
              description: action.payload ? action.payload.article.description : '',
              body: action.payload ? action.payload.article.body : '',
              tagInput: '',
              tagList: action.payload ? action.payload.article.tagList : []
            })
        },
        editorPageUnloaded: () => {
            return {}
        },
        articleSubmitted: (state, action) => {
            state.push({
                inProgress: null,
                errors: action.error ? action.payload.errors : null
            })
        },
        asyncStart: (state, action) => {
            if (action.subtype === articleSubmitted.type) {
                state.push({
                inProgress: true
            }) 
        }
        },
        addTag: (state) => {
            state.push({
                ...state,
                tagList: state.tagList.concat([state.tagInput]),
                tagInput: ''
            })
        },
        removeTag: (state, action) => {
            state.push({
                tagList: state.tagList.filter(tag => tag !== action.tag)
            })
        },
        updateFieldEditor: (state, action) => {
            state.push({
                [action.key]: action.value
            })
        },
    }
})

export const {editorPageLoaded, editorPageUnloaded, articleSubmitted, asyncStart, addTag, removeTag, updateFieldEditor} = editorSlice.actions;
export default editorSlice.reducer;