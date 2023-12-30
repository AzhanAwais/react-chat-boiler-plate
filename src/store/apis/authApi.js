import { apiUrl, constant } from '../../utils/constants'
import { apiSlice } from '../apis/index'

export const auhtApi = apiSlice
    .injectEndpoints({
        endpoints: builder => ({
            login: builder.mutation({
                query: (data) => ({
                    url: `${apiUrl.login}`,
                    method: 'POST',
                    body: data
                })
            }),
            logout: builder.query({
                query: () => ({
                    url: `${apiUrl.logout}`,
                    method: 'GET',
                })
            }),
        })
    })


export const {
    useLoginMutation,
    useLazyLogoutQuery,
} = auhtApi