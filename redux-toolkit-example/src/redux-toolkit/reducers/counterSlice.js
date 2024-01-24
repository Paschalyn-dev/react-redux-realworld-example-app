import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        increaseByNumber: (state, action) => {
            state.count += action.payload
        }
    }
}) 

export const { increment, increaseByNumber, decrement } = counterSlice.actions;
export default counterSlice.reducer; 