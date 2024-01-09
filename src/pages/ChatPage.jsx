import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MyProfile from '../components/chat/MyProfile'
import Search from '../components/chat/Search'
import ChatUsersList from '../components/chat/ChatUsersList'
import ChatHeader from '../components/chat/ChatHeader'
import MessagesWrapper from '../components/chat/MessagesWrapper'
import MessageInput from '../components/chat/MessageInput'
import UploadedFiles from '../components/chat/UploadedFiles'
import NoChatSelected from '../components/chat/NoChatSelected'
import { useDispatch, useSelector } from 'react-redux'
import { getOfflineUser, getOnlineUser, groupCreated, onMessage, deleteMessage, startChat } from '../services/chat/chat'
import { useLazyGetChatUsersQuery } from '../store/apis/chatApi'
import { errorMsg } from '../constants/msg'
import { setChatsUserList } from '../store/slices/chatSlice'
import { io } from "socket.io-client"
import { constant } from "../utils/constants"
import { GetAuthUserLocalStorage } from '../services/localStorage/localStorage'

const ChatPage = ({ socket }) => {
    const currUser = GetAuthUserLocalStorage()
    const dispatch = useDispatch()
    const { selectedChat, chatsUserList, messages } = useSelector((state) => state?.chat)
    const [getChatUsers, { isLoading }] = useLazyGetChatUsersQuery()
    const [message, setMessage] = useState("")
    const [searchText, setSearchText] = useState("")
    const [files, setFiles] = useState([])

    useEffect(() => {
        socket.emit("joinRoom", currUser)
        const getAllChatUsers = async () => {
            const { data, error } = await getChatUsers(currUser)
            if (data) {
                dispatch(setChatsUserList({ data: data?.data, pagination: null }))
                socket.on("getOnlineUser", (userData) => {
                    getOnlineUser(dispatch, data, userData)
                })
            }
            else {
                errorMsg(error.data.message)
            }
        }

        getAllChatUsers()
    }, [])

    useEffect(() => {

        socket.on("getOnlineUser", (userData) => {
            getOnlineUser(dispatch, chatsUserList, userData)
        })

        socket.on("getOfflineUser", (userData) => {
            getOfflineUser(dispatch, chatsUserList, userData)
        })

        socket.on("startChat", (data) => {
            socket.emit('joinRoom', currUser)
            startChat(dispatch, chatsUserList, data)
        })

        socket.on("groupCreated", (data) => {
            socket.emit('joinRoom', currUser)
            groupCreated(dispatch, chatsUserList, data)
        })

        socket.on("message", (data) => {
            onMessage(dispatch, messages, data)
        })

        socket.on("deleteMessage", (data) => {
            deleteMessage(dispatch, messages, data)
        })

        return () => {
            socket.off("getOnlineUser")
            socket.off("getOfflineUser")
            socket.off("groupCreated")
            socket.off("message")
            socket.off("deleteMessage")
        }
    }, [dispatch, messages])

    return (
        <div className='pages chat-page'>
            <Container fluid>
                <Row>
                    <Col xs={12} md={5} lg={4} xl={3} className='pe-0'>
                        <div className="left-panel">
                            <MyProfile socket={socket} />
                            <Search searchText={searchText} setSearchText={setSearchText} />
                            <ChatUsersList searchText={searchText} isLoading={isLoading} />
                        </div>
                    </Col>

                    <Col xs={12} md={7} lg={8} xl={9} className='px-0'>
                        <div className="right-panel">
                            {
                                selectedChat?.data ?
                                    <>
                                        <ChatHeader />
                                        <MessagesWrapper files={files} socket={socket} />
                                        <UploadedFiles files={files} setFiles={setFiles} />
                                        <MessageInput
                                            message={message}
                                            setMessage={setMessage}
                                            files={files}
                                            setFiles={setFiles}
                                            socket={socket}
                                        />
                                    </>
                                    :
                                    <NoChatSelected />
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ChatPage