import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatsUserList: {
            isLoading: false,
            data: [],
            pagination: null
        },
        messages: {
            isLoading: false,
            data: [],
            pagination: null
        },
        searchUsers: {
            isLoading: false,
            data: [],
            pagination: null
        },
        selectedChat: {
            data: null,
            user: null
        },

    },
    reducers: {
        setChatsUserList: (state, action) => {
            state.chatsUserList.isLoading = action?.payload?.isLoading
            state.chatsUserList.data = action?.payload?.data
        },
        setMessages: (state, action) => {
            state.messages.isLoading = action?.payload?.isLoading
            state.messages.data = action?.payload?.data
        },
        setSearchUsers: (state, action) => {
            state.searchUsers.isLoading = action?.payload?.isLoading
            state.searchUsers.data = action?.payload?.data
            state.searchUsers.pagination = action?.payload?.pagination
        },
        setSelectedChat: (state, action) => {
            state.selectedChat.data = action?.payload?.data
            state.selectedChat.user = action?.payload?.user
        },

    }
})

export const {
    setChatsUserList,
    setMessages,
    setSearchUsers,
    setSelectedChat
} = chatSlice.actions

export default chatSlice.reducer