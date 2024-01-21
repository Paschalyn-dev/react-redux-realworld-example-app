import { createSlice } from '@reduxjs/toolkit'

const profile = createSlice({
  name: 'profile',
  initialState: [],
  reducers: {
    profilePageLoaded(action){
      return {
        ...action.payload[0].profile
      };
    },
    profilePageUnloaded(){
      return {};
    },
    followUser(){},
    unfollowUser(action){
      return {
        ...action.payload.profile
      };
    }
  }
})

export const {profilePageLoaded, profilePageUnloaded, followUser, unfollowUser} = profile.actions;
export default profile.reducer;


// import {
//   PROFILE_PAGE_LOADED,
//   PROFILE_PAGE_UNLOADED,
//   FOLLOW_USER,
//   UNFOLLOW_USER
// } from '../constants/actionTypes';

// export default (state = {}, action) => {
//   switch (action.type) {
//     case PROFILE_PAGE_LOADED:
//       return {
//         ...action.payload[0].profile
//       };
//     case PROFILE_PAGE_UNLOADED:
//       return {};
//     case FOLLOW_USER:
//     case UNFOLLOW_USER:
//       return {
//         ...action.payload.profile
//       };
//     default:
//       return state;
//   }
// };
