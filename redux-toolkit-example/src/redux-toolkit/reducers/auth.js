import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: [],
    reducers: {
        login: () => {},
        register: (state, action) => {
          state.push({
            inProgress: false,
            errors: action.error ? action.payload.errors : null
          })
        },
        loginPageUnloaded: () => {},
        asyncStart: (state, action) => {
          if (action.subtype === login.type || action.subtype === register.type) {
            return { ...state, inProgress: true };
          }
        },
        asyncEnd: () => {}, //I added this reducer myself
        updateFieldAuth: (state, action) => {
          return { ...state, [action.key]: action.value };
        },
        registerPageUnloaded: () => {
          return {};
        }
    }
})

export const { register, login, loginPageUnloaded, asyncStart, asyncEnd, updateFieldAuth, registerPageUnloaded } = authSlice.actions
export default authSlice.reducer;