import React, { useEffect } from 'react'
import Assets from '../../constants/images'
import { useGetChatUsersQuery } from '../../store/apis/chatApi'
import Loader from '../loader/Loader'
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'
import { getChatTime, getImageUrl, getUnReadCount } from '../../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../store/slices/chatSlice'

const ChatUsersList = ({ searchText }) => {
    const currUser = GetAuthUserLocalStorage()
    const dispatch = useDispatch()
    const { selectedChat } = useSelector((state) => state?.chat)
    const { isLoading, data } = useGetChatUsersQuery()

    const filteredData = () => {
        if (searchText) {
            return data?.data?.filter((item) => item?.receiver?.fullname?.toLowerCase()?.includes(searchText?.toLowerCase()) || item?.sender?.fullname?.toLowerCase()?.includes(searchText?.toLowerCase()))
        }
        else {
            return data?.data
        }
    }

    const getChatListInfo = (data) => {
        let url = ""
        let name = ""
        let user = ""

        if (data?.isGroupChat) {
            url = getImageUrl(data?.groupImage, true)
            name = data?.groupName
        }
        else {
            user = data?.sender?._id == currUser?._id ? data?.receiver : data?.sender
            url = getImageUrl(user?.profileImage, true)
            name = user?.fullname
        }

        return { url, name, user }
    }

    return (
        <div className='chat-users-list'>
            <ul>
                {
                    isLoading ?
                        <Loader /> :
                        filteredData()?.map((item, index) => {
                            let user = item?.sender?._id == currUser?._id ? item?.receiver : item?.sender

                            return (
                                <li
                                    className={selectedChat?.data?._id == item?._id ? "active" : ""}
                                    key={index}
                                    onClick={() => {
                                        if (item?.isGroupChat) {
                                            dispatch(setSelectedChat({ data: item, user: null }))
                                        }
                                        else {
                                            dispatch(setSelectedChat({ data: item, user: user }))
                                        }
                                    }}
                                >
                                    <div className="d-flex align-items-center cursor">
                                        <div className="img-wrapper">
                                            <img src={getChatListInfo(item)?.url} alt="" onError={(e) => e.target.src = Assets.ProfilePlaceholder} />
                                            {
                                                item?.isGroupChat &&
                                                <div className={`status ${user?.isOnline ? 'online' : 'offline'}`}></div>
                                            }
                                        </div>

                                        <div className="content ms-3 w-100">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <p className='name fw-700 text-capitalize'>{getChatListInfo(item)?.name}</p>
                                                <span className='time'>{getChatTime(item?.updatedAt)}</span>
                                            </div>

                                            <div className="mt-1 d-flex align-items-center justify-content-between">
                                                <span className='message'>{item?.lastMessage}</span>
                                                <span className='counter '>{getUnReadCount(currUser?._id, item?.unReadCount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )
}

export default ChatUsersList