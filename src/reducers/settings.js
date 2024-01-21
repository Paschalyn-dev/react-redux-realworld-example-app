import { createSlice } from '@reduxjs/toolkit'

const settings = createSlice({
  name: 'settings',
  initialState: [],
  reducers: {
    settingsSaved(action, state){
      state.push({
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      })
    },
    settingsPageUnloaded(){
      return {};
    }
  },
  asyncStart(action, state){
    state.push({
      inProgress: true
    })
  }
})

export const {settingsSaved, settingsPageUnloaded, asyncStart} = settings.actions;
export default settings.reducer;


// import {
//   SETTINGS_SAVED,
//   SETTINGS_PAGE_UNLOADED,
//   ASYNC_START
// } from '../constants/actionTypes';

// export default (state = {}, action) => {
//   switch (action.type) {
//     case SETTINGS_SAVED:
//       return {
//         ...state,
//         inProgress: false,
//         errors: action.error ? action.payload.errors : null
//       };
//     case SETTINGS_PAGE_UNLOADED:
//       return {};
//     case ASYNC_START:
//       return {
//         ...state,
//         inProgress: true
//       };
//     default:
//       return state;
//   }
// };
