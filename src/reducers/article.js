import {createSlice} from "@reduxjs/toolkit";

const article = createSlice({
  name: 'article',
  initialState: [],
  reducers: {
    articlePageLoaded(state, action){
      state.push({
        article: action.payload[0].article,
        comments: action.payload[1].comments
      })
    },
    articlePageUnloaded(){
      return {}
    },
    addComment(state, action){
      state.push({
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ?
        null :
        (state.comments || []).concat([action.payload.comment])
      })
    },
    deleteComment(state, action){
      const commentId = action.commentId;
      state.push({
        comments: state.comments.filter(comment => comment.id !== commentId)
      })
    },
  },
})
export const { articlePageLoaded, articlePageUnloaded, addComment, deleteComment } = article.actions;
export default article.reducer;


// import {
//   ARTICLE_PAGE_LOADED,
//   ARTICLE_PAGE_UNLOADED,
//   ADD_COMMENT,
//   DELETE_COMMENT
// } from '../constants/actionTypes';

// export default (state = {}, action) => {
  //   switch (action.type) {
    //     case ARTICLE_PAGE_LOADED:
    //       return {
      //         ...state,
      //         article: action.payload[0].article,
      //         comments: action.payload[1].comments
      //       };
      //     case ARTICLE_PAGE_UNLOADED:
      //       return {};
      //     case ADD_COMMENT:
      //       return {
        //         ...state,
        //         commentErrors: action.error ? action.payload.errors : null,
        //         comments: action.error ?
        //           null :
//           (state.comments || []).concat([action.payload.comment])
//       };
//     case DELETE_COMMENT:
//       const commentId = action.commentId
//       return {
//         ...state,
//         comments: state.comments.filter(comment => comment.id !== commentId)
//       };
//     default:
//       return state;
//   }
// };
