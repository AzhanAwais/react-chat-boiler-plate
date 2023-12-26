import { apiUrl } from '../../utils/constants'
import { apiSlice } from '../../store/apis/index'

export const chatApi = apiSlice
    .injectEndpoints({
        endpoints: builder => ({
            getChatUsers: builder.query({
                query: () => `${apiUrl.chatUsers}`,
            }),
            getMessages: builder.query({
                query: (chatId) => ({
                    url: `${apiUrl.messages}/${chatId}`,
                }),
            }),
            searchUsers: builder.query({
                query: (params) => ({
                    url: `${apiUrl.searchUsers}`,
                    params: params
                }),
            }),
            startChat: builder.mutation({
                query: (data) => ({
                    url: `${apiUrl.startChat}`,
                    method: 'POST',
                    body: data
                })
            }),
            createGroup: builder.mutation({
                query: (data) => ({
                    url: `${apiUrl.createGroup}`,
                    method: 'POST',
                    body: data
                })
            }),
        }),
    })


export const {
    useGetChatUsersQuery,
    useLazyGetMessagesQuery,
    useLazySearchUsersQuery,
    useStartChatMutation,
    useCreateGroupMutation
} = chatApi