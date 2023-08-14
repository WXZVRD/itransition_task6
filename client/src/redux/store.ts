import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "./slices/messageSlice";
import tagReducer from "./slices/tagSlice";



const store = configureStore({
    reducer: {
        messages: messageReducer,
        tags: tagReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store