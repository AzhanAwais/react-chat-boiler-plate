import { apiUrl100ms } from '../../utils/constants'
import { apiSlice100ms } from '../../store/apis/index'

export const ms100Api = apiSlice100ms
    .injectEndpoints({
        endpoints: builder => ({
            createRoom: builder.mutation({
                query: (data) => ({
                    url: `${apiUrl100ms.rooms}`,
                    method: 'POST',
                    body: data
                }),
            }),
            createRoomCodes: builder.mutation({
                query: (roomId) => ({
                    url: `${apiUrl100ms.roomCodes}/${roomId}`,
                    method: 'POST',
                }),
            }),
            
        }),
    })

export const {
    useCreateRoomMutation,
    useCreateRoomCodesMutation,
} = ms100Api