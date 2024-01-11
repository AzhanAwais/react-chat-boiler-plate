import { configureStore } from '@reduxjs/toolkit'
import { apiSlice, apiSlice100ms } from './apis/index'
import { setupListeners } from '@reduxjs/toolkit/query'
import chatSlice from './slices/chatSlice'

export const store =  configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [apiSlice100ms.reducerPath]: apiSlice100ms.reducer,
        chat: chatSlice,
    },
    middleware: getDefaultMiddleware => {
        return  getDefaultMiddleware().concat(apiSlice.middleware, apiSlice100ms.middleware)
    },
})

setupListeners(store.dispatch)
