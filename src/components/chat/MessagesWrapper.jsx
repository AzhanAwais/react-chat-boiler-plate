import React, { useEffect } from 'react'
import MessageBox from './MessageBox'
import { useLazyGetMessagesQuery } from '../../store/apis/chatApi'
import Loader from '../loader/Loader'
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../store/slices/chatSlice'
import { errorMsg } from '../../constants/msg'

const MessagesWrapper = ({ files }) => {
    const dispatch = useDispatch()
    const currUser = GetAuthUserLocalStorage()
    const { selectedChat, messages } = useSelector((state) => state?.chat)
    const [getMessages, { isLoading }] = useLazyGetMessagesQuery()

    useEffect(() => {
        const getAllMessages = async () => {
            const { data, error } = await getMessages(selectedChat?.data?._id)
            if (data) {
                dispatch(setMessages({ data: data?.data, isLoading: false }))
            }
            else {
                errorMsg(error?.message)
            }
        }

        getAllMessages()
    }, [selectedChat])

    return (
        <div className={`messages-wrapper ${files?.length > 0 ? "is-file" : ""}`}>
            {
                isLoading ?
                    <Loader />
                    :
                    messages?.data?.map((item, index) => (
                        <div
                            key={index}
                            className={`${item?.sender == currUser?._id ? 'my-message' : 'other-message'} mb-3`}
                        >
                            <MessageBox data={item} />
                        </div>
                    ))
            }
        </div>
    )
}

export default MessagesWrapper