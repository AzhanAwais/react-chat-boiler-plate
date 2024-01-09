import React, { useEffect, useRef } from 'react'
import MessageBox from './MessageBox'
import { useLazyGetMessagesQuery } from '../../store/apis/chatApi'
import Loader from '../loader/Loader'
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../store/slices/chatSlice'
import { errorMsg } from '../../constants/msg'

const MessagesWrapper = ({ files, socket }) => {
    const dispatch = useDispatch()
    const currUser = GetAuthUserLocalStorage()
    const { selectedChat, messages } = useSelector((state) => state?.chat)
    const [getMessages, { isLoading }] = useLazyGetMessagesQuery()
    const messageRef = useRef(null)

    useEffect(() => {
        const getAllMessages = async () => {
            const { data, error } = await getMessages(selectedChat?.data?._id)
            if (data) {
                dispatch(setMessages({ data: data?.data, pagination: null }))
            }
            else {
                errorMsg(error?.message)
            }
        }

        getAllMessages()
    }, [selectedChat])

    useEffect(() => {
        const scrollToBottom = () => {
            if (messageRef.current) {
                messageRef.current.scrollTop = messageRef.current.scrollHeight
            }
        }

        scrollToBottom()
    }, [messages])

    return (
        <div ref={messageRef} className={`messages-wrapper ${files?.length > 0 ? "is-file" : ""}`}>
            {
                isLoading ?
                    <Loader />
                    :
                    messages?.data?.map((item, index) => (
                        <div
                            key={index}
                            className={`${item?.sender?._id == currUser?._id ? 'my-message' : 'other-message'} mb-3`}
                        >
                            <MessageBox data={item} index={index} socket={socket} />
                        </div>
                    ))
            }
        </div>
    )
}

export default MessagesWrapper


