import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slices/chatSlice'
import { apiSlice } from './apis/index'

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        chat: chatSlice,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
})
