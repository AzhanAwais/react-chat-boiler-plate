import { apiSlice } from '../services/apiSlice'

export const chatApi = apiSlice
    .injectEndpoints({
        endpoints: builder => ({
            getUsers: builder.query({
                query: () => 'users',
            })
        })
    })


export const {
    useAboutUsQuery
} = chatApi