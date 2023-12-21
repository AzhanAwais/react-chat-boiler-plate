import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
      
    },
    reducers: {
        // setIsUsersLoading: (state, action) => {
        //     state.users.isLoading = action.payload
        // }
    }
})

export const {
  
} = chatSlice.actions

export default chatSlice.reducer