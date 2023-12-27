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
            sendMessage: builder.mutation({
                query: (data) => ({
                    url: `${apiUrl.sendMessage}`,
                    method: 'POST',
                    body: data
                })
            }),
            deleteMessage: builder.mutation({
                query: (id) => ({
                    url: `${apiUrl.deleteMessage}/${id}`,
                    method: 'DELETE',
                })
            }),
        }),
    })


export const {
    useGetChatUsersQuery,
    useLazyGetMessagesQuery,
    useLazySearchUsersQuery,
    useStartChatMutation,
    useCreateGroupMutation,
    useSendMessageMutation,
    useDeleteMessageMutation,
} = chatApi