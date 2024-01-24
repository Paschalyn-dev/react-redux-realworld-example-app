import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: [],
  reducers: {
    profilePageLoaded: (action) => {
      return {
        ...action.payload[0].profile
      };
    },
    profilePageUnloaded: () => {
      return {};
    },
    followUser: () => {},
    unfollowUser: (action) => {
      return {
        ...action.payload.profile
      };
    }
  }
})

export const {profilePageLoaded, profilePageUnloaded, followUser, unfollowUser} = profileSlice.actions;
export default profileSlice.reducer;