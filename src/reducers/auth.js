import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes';
import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
  name: 'auth',
  initialState: [],
  reducers: {
    login(){},
    register(state, action) {
      state.push({
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      })
    },
    loginPageUnloaded(){},
    asyncStart(state, action) {
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
    },
    asyncEnd(){}, //I added this reducer myself
    updateFieldAuth(state, action){
      return { ...state, [action.key]: action.value };
    },
    registerPageUnloaded(){
      return {};
    }
  },
})

export const { register, login, loginPageUnloaded, asyncStart, asyncEnd, updateFieldAuth, registerPageUnloaded } = auth.actions
export default auth.reducer;






// export default (state = {}, action) => {
//   switch (action.type) {
//     case LOGIN:
//     case REGISTER:
//       return {
//         ...state,
//         inProgress: false,
//         errors: action.error ? action.payload.errors : null
//       };
//     case LOGIN_PAGE_UNLOADED:
//     case REGISTER_PAGE_UNLOADED:
//       return {};
//     case ASYNC_START:
//       if (action.subtype === LOGIN || action.subtype === REGISTER) {
//         return { ...state, inProgress: true };
//       }
//       break;
//     case UPDATE_FIELD_AUTH:
//       return { ...state, [action.key]: action.value };
//     default:
//       return state;
//   }

//   return state;
// };
