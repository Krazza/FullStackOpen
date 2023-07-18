import { createSlice } from "@reduxjs/toolkit";

const initialState = "hello world";

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotification(state, action) {
            state = action.payload;
			return state;
        }
    }
})

export const { createNotification } = notificationSlice.actions;
export default notificationSlice.reducer;