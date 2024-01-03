import React, { useEffect, useState } from 'react'
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
import { getOfflineUser, getOnlineUser, groupCreated, onMessage } from '../services/chat/chat'
import { useLazyGetChatUsersQuery } from '../store/apis/chatApi'
import { errorMsg } from '../constants/msg'
import { setChatsUserList } from '../store/slices/chatSlice'
import { getChatSocket } from '../socket'

const socket = getChatSocket()

const ChatPage = () => {
    const dispatch = useDispatch()
    const { selectedChat, chatsUserList, messages } = useSelector((state) => state?.chat)
    const [getChatUsers, { isLoading }] = useLazyGetChatUsersQuery()
    const [message, setMessage] = useState("")
    const [searchText, setSearchText] = useState("")
    const [files, setFiles] = useState([])

    useEffect(() => {
        const getAllChatUsers = async () => {
            const { data, error } = await getChatUsers()
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

        socket.on("groupCreated", (data) => {
            groupCreated(dispatch, chatsUserList, data)
        })

        socket.on("message", (data) => {
           onMessage(dispatch, messages, data)
        })
    })

    return (
        <div className='pages chat-page'>
            <Container fluid>
                <Row>
                    <Col xs={12} md={5} lg={4} xl={3} className='pe-0'>
                        <div className="left-panel">
                            <MyProfile />
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
                                        <MessagesWrapper files={files} />
                                        <UploadedFiles files={files} setFiles={setFiles} />
                                        <MessageInput
                                            message={message}
                                            setMessage={setMessage}
                                            files={files}
                                            setFiles={setFiles}
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