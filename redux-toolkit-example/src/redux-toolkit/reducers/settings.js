import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: [],
  reducers: {
    settingsSaved: (action, state) => {
      state.push({
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      })
    },
    settingsPageUnloaded: () => {
      return {};
    }
  },
  asyncStart: (state) => {
    state.push({
      inProgress: true
    })
  }
})

export const {settingsSaved, settingsPageUnloaded, asyncStart} = settingsSlice.actions;
export default settingsSlice.reducer;