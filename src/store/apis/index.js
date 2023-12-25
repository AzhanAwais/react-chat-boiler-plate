import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { constant } from "../../utils/constants"
import { EmptyLocalStorage, GetTokenLocalStorage } from "../../services/localStorage/localStorage"

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
    if (result.error && result.error.status === 401) {
        EmptyLocalStorage()
        // window.location.href = '/'

    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})