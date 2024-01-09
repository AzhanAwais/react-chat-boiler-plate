import { setChatsUserList, setMessages } from "../../store/slices/chatSlice";

export const getOnlineUser = (dispatch, chatsUserList) => {
    dispatch(setChatsUserList({ data: chatsUserList, pagination: null }))
}

export const getOfflineUser = (dispatch, chatsUserList, data) => {
    const offlineUserId = data?.userId
    let chats = chatsUserList?.data.map(obj => JSON.parse(JSON.stringify(obj)));

    for (let i = 0; i < chats?.length; i++) {
        if (!chats[i]?.isGroupChat) {
            if (chats[i]?.sender?._id == offlineUserId) {
                chats[i].sender.isOnline = false
            }
            else if (chats[i]?.receiver?._id == offlineUserId) {
                chats[i].receiver.isOnline = false
            }
        }
    }
    dispatch(setChatsUserList({ data: chats, pagination: null }))
}

export const groupCreated = (dispatch, chatsUserList, data) => {
    let chats = chatsUserList?.data.map(obj => JSON.parse(JSON.stringify(obj)));
    chats.splice(0, 0, data?.group)
    dispatch(setChatsUserList({ data: chats, pagination: null }))
}

export const startChat = (dispatch, chatsUserList, data) => {
    let chats = chatsUserList?.data.map(obj => JSON.parse(JSON.stringify(obj)))
    chats.splice(0, 0, data?.chat)
    dispatch(setChatsUserList({ data: chats, pagination: null }))
}

export const onMessage = (dispatch, messages, data) => {
    let chatUsersList = data?.chatUsersList
    let message = data?.message
    let temp = [...messages?.data]
    temp?.push(message)

    dispatch(setChatsUserList({ data: chatUsersList, pagination: null }))
    dispatch(setMessages({ data: temp, pagination: null }))
}

export const deleteMessage = (dispatch, messages, data) => {
    let chatUsersList = data?.chatUsersList
    let message = data?.message
    let temp = [...messages?.data]
    const deletedMsgIndex = temp?.findIndex((item)=> item?._id == message?._id)
    temp[deletedMsgIndex] = { ...temp[deletedMsgIndex], isDeleted: true }
    dispatch(setChatsUserList({ data: chatUsersList, pagination: null }))
    dispatch(setMessages({ data: temp, pagination: null }))
}
