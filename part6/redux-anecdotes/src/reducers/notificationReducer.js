import { createSlice } from "@reduxjs/toolkit";

const initialState = "hello world";

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        updateNotification(state, action) {
            state = action.payload;
			return state;
        },
        removeNotification(state, payload) {
            state = "";
            return state;
        }
    }
})

export const { updateNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;