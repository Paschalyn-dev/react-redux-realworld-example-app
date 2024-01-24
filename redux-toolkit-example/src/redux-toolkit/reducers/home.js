import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: [],
    reducers: {
      homePageLoaded: (state, action) => {
        state.push({
          tags: action.payload[0].tags
        })
      },
      homePageUnloaded: () => {
        return {};
      }
    }
  })
  
  export const {homePageLoaded, homePageUnloaded} = homeSlice.actions;
  export default homeSlice.reducer;