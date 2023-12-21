import React, { useState } from 'react'
import Assets from '../../constants/images'
import { DropdownButton } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import StartChatPopup from '../popup/StartChatPopup'
import CreateGroupPopup from '../popup/CreateGroupPopup'

const MyProfile = () => {
    const [startChatPopup, setStartChatPopup] = useState(false)
    const [createGroupPopup, setCreateGroupPopup] = useState(false)

    return (
        <>
            <div className='chat-my-profile'>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="img-wrapper">
                            <img src={Assets.UserImg1} alt="" onError={(e) => e.target.src = Assets.ProfilePlaceholder} />
                        </div>

                        <div className="content ms-3">
                            <p className='text-black fw-600'>John Doe</p>
                            <span className='text-grey'>Marketing Manager</span>
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
                        </ul>
                    </DropdownButton>
                </div>
            </div>

            <StartChatPopup startChatPopup={startChatPopup} setStartChatPopup={setStartChatPopup} />
            <CreateGroupPopup createGroupPopup={createGroupPopup} setCreateGroupPopup={setCreateGroupPopup} />
        </>
    )
}

export default MyProfile