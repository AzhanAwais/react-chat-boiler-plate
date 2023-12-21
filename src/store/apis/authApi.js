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
        })
    })


export const {
    useLoginMutation
} = auhtApi