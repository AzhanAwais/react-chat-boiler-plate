import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { constant } from "../../utils/constants"
import { GetTokenLocalStorage } from "../../services/localStorage/localStorage"

const baseQuery = fetchBaseQuery({
    baseUrl: constant.BASE_URL,
    prepareHeaders: async (headers) => {
        headers.set('authorization', `Bearer ${GetTokenLocalStorage()}`)
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})