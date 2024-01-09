import React, { useState } from 'react'
import Assets from '../../constants/images'
import { DropdownButton } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import StartChatPopup from '../popup/StartChatPopup'
import CreateGroupPopup from '../popup/CreateGroupPopup'
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'
import { getImageUrl, getUserRole } from '../../utils/helper'
import LogoutPopup from '../popup/LogoutPopup'

const MyProfile = ({socket}) => {
    const currUser = GetAuthUserLocalStorage()
    const [startChatPopup, setStartChatPopup] = useState(false)
    const [createGroupPopup, setCreateGroupPopup] = useState(false)
    const [logoutPopup, setLogoutPopup] = useState(false)

    return (
        <>
            <div className='chat-my-profile'>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="img-wrapper">
                            <img src={getImageUrl(currUser?.profileImage, true)} alt="" onError={(e) => e.target.src = Assets.ProfilePlaceholder} />
                        </div>

                        <div className="content ms-3">
                            <p className='text-black fw-600 text-capitalize'>{currUser?.fullname}</p>
                            <span className='text-grey'>{getUserRole(currUser?.role)}</span>
                        </div>
                    </div>

                    <DropdownButton title={<BsThreeDotsVertical size={24} />}>
                        <ul >
                            <li className='cursor mb-1' onClick={() => setStartChatPopup(true)}>
                                <span>Start new chat</span>
                            </li>
                            <li className='cursor' onClick={() => setCreateGroupPopup(true)}>
                                <span>Create group</span>
                            </li>
                            <li className='cursor' onClick={() => setLogoutPopup(true)}>
                                <span>Logout</span>
                            </li>
                        </ul>
                    </DropdownButton>
                </div>
            </div>

            <StartChatPopup startChatPopup={startChatPopup} setStartChatPopup={setStartChatPopup} socket={socket} />
            <CreateGroupPopup createGroupPopup={createGroupPopup} setCreateGroupPopup={setCreateGroupPopup} socket={socket} />
            <LogoutPopup logoutPopup={logoutPopup} setLogoutPopup={setLogoutPopup}  socket={socket}/>
        </>
    )
}

export default MyProfile