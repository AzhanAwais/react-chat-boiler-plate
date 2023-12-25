import { apiUrl } from '../../utils/constants'
import { apiSlice } from '../../store/apis/index'

export const uploadFileApi = apiSlice
    .injectEndpoints({
        endpoints: builder => ({
            uploadFile: builder.mutation({
                query: (data) => ({
                    url: `${apiUrl.uploadFile}`,
                    method: 'POST',
                    body: data
                })
            }),
        }),
    })


export const {
    useUploadFileMutation
} = uploadFileApi