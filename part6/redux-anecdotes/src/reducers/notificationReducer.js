import { createSlice } from "@reduxjs/toolkit";

const initialState = 'test'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notifReducer(state, action) {
            return action.payload
        }
    }
})

export const { notifReducer } = notificationSlice.actions
export default notificationSlice.reducer