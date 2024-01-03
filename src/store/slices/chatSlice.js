import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import { constant } from '../../utils/constants'
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'

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
            state.chatsUserList.data = action?.payload?.data
            state.chatsUserList.pagination = action?.payload?.pagination
        },
        setMessages: (state, action) => {
            state.messages.data = action?.payload?.data
            state.messages.pagination = action?.payload?.pagination
        },
        setSearchUsers: (state, action) => {
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
    setSelectedChat,
} = chatSlice.actions

export default chatSlice.reducer