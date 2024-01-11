import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { constant } from "../../utils/constants"
import { EmptyLocalStorage, GetTokenLocalStorage } from "../../services/localStorage/localStorage"

// **************** OWN ENDPOINT ******************
const baseQuery = fetchBaseQuery({
    baseUrl: constant.BASE_URL,
    prepareHeaders: async (headers) => {
        headers.set('authorization', `Bearer ${GetTokenLocalStorage()}`)
        headers.set('Accept', '*/*')
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status == 401) {
        EmptyLocalStorage()
        // window.location.href = '/'

    }
    return result
}

// **************** 100MS ENDPOINT ******************

const baseQuery100ms = fetchBaseQuery({
    baseUrl: constant.MS100_BASE_URL,
    prepareHeaders: async (headers) => {
        headers.set('authorization', `Bearer ${constant.TOKEN_100_MS}`)
        headers.set('Accept', '*/*')
        return headers
    }
})

const baseQueryWithReauth100ms = async (args, api, extraOptions) => {
    let result = await baseQuery100ms(args, api, extraOptions)
    if (result.error && result.error.status == 401) {
        EmptyLocalStorage()
        // window.location.href = '/'
    }
    return result
}


export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

export const apiSlice100ms = createApi({
    reducerPath: 'apiSlice100ms',
    baseQuery: baseQueryWithReauth100ms,
    endpoints: builder => ({})
})