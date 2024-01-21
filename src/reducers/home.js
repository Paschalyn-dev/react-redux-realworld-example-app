import { createSlice } from '@reduxjs/toolkit'

const home = createSlice({
  name: 'home',
  initialState: [],
  reducers: {
    homePageLoaded(state, action){
      state.push({
        tags: action.payload[0].tags
      })
    },
    homePageUnloaded(){
      return {};
    }
  }
})

export const {homePageLoaded, homePageUnloaded} = home.actions;
export default home.reducer;

// import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

// export default (state = {}, action) => {
//   switch (action.type) {
//     case HOME_PAGE_LOADED:
//       return {
//         ...state,
//         tags: action.payload[0].tags
//       };
//     case HOME_PAGE_UNLOADED:
//       return {};
//     default:
//       return state;
//   }
// };
