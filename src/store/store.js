import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apis/index'
import { setupListeners } from '@reduxjs/toolkit/query'
import chatSlice from './slices/chatSlice'

export const store =  configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        chat: chatSlice,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
})

setupListeners(store.dispatch)
