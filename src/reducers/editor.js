import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';
import { createSlice } from '@reduxjs/toolkit'

const editor = createSlice({
  name: 'editor',
  initialState: [],
  reducers: {
    editorPageLoaded(action, state){
      state.push({
        articleSlug: action.payload ? action.payload.article.slug : '',
        title: action.payload ? action.payload.article.title : '',
        description: action.payload ? action.payload.article.description : '',
        body: action.payload ? action.payload.article.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.article.tagList : []
      })
    },
    editorPageUnloaded(){
      return {}
    },
    articleSubmitted(state, action){
      state.push({
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      })
    },
    asyncStart(state, action){
      if (action.subtype === ARTICLE_SUBMITTED) {
        state.push({
          inProgress: true
        }) 
      }
    },
    addTag(state, action){
      state.push({
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      })
    },
    removeTag(state, action){
      state.push({
        tagList: state.tagList.filter(tag => tag !== action.tag)
      })
    },
    updateFieldEditor(state, action){
      state.push({
        [action.key]: action.value
      })
    },
  },
})

export const {editorPageLoaded, editorPageUnloaded, articleSubmitted, asyncStart, addTag, removeTag, updateFieldEditor} = editor.actions;
export default editor.reducer;



// export default (state = {}, action) => {
//   switch (action.type) {
//     case EDITOR_PAGE_LOADED:
//       return {
//         ...state,
//         articleSlug: action.payload ? action.payload.article.slug : '',
//         title: action.payload ? action.payload.article.title : '',
//         description: action.payload ? action.payload.article.description : '',
//         body: action.payload ? action.payload.article.body : '',
//         tagInput: '',
//         tagList: action.payload ? action.payload.article.tagList : []
//       };
//     case EDITOR_PAGE_UNLOADED:
//       return {};
//     case ARTICLE_SUBMITTED:
//       return {
//         ...state,
//         inProgress: null,
//         errors: action.error ? action.payload.errors : null
//       };
//     case ASYNC_START:
//       if (action.subtype === ARTICLE_SUBMITTED) {
//         return { ...state, inProgress: true };
//       }
//       break;
//     case ADD_TAG:
//       return {
//         ...state,
//         tagList: state.tagList.concat([state.tagInput]),
//         tagInput: ''
//       };
//     case REMOVE_TAG:
//       return {
//         ...state,
//         tagList: state.tagList.filter(tag => tag !== action.tag)
//       };
//     case UPDATE_FIELD_EDITOR:
//       return { ...state, [action.key]: action.value };
//     default:
//       return state;
//   }

//   return state;
// };
