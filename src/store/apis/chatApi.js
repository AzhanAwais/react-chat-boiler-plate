import { apiUrl } from '../../utils/constants'
import { apiSlice } from '../../store/apis/index'

export const chatApi = apiSlice
    .injectEndpoints({
        endpoints: builder => ({
            getChatUsers: builder.query({
                query: () => `${apiUrl.chatUsers}`,
                providesTags: ['chatUsers'],
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
            blockUser: builder.mutation({
                query: (data) => ({
                    url: `${apiUrl.blockChatUser}`,
                    method: 'POST',
                    body: data
                }),
            }),
            unblockUser: builder.mutation({
                query: (data) => ({
                    url: `${apiUrl.unblockChatUser}`,
                    method: 'POST',
                    body: data
                }),
            }),
            deleteChat: builder.mutation({
                query: (id) => ({
                    url: `${apiUrl.deleteChat}/${id}`,
                    method: 'DELETE',
                })
            }),

        }),
    })


export const {
    useLazyGetChatUsersQuery,
    useLazyGetMessagesQuery,
    useLazySearchUsersQuery,
    useStartChatMutation,
    useCreateGroupMutation,
    useSendMessageMutation,
    useDeleteMessageMutation,
    useBlockUserMutation,
    useUnblockUserMutation,
    useDeleteChatMutation,
} = chatApi