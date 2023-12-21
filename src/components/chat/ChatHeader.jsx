import React, { useState } from 'react'
import Assets from '../../constants/images'
import { BsThreeDotsVertical } from "react-icons/bs";
import { DropdownButton } from 'react-bootstrap';
import UnblockUserPopup from '../popup/UnblockUserPopup';
import BlockUserPopup from '../popup/BlockUserPopup';
import DeleteChatPopup from '../popup/DeleteChatPopup';

const ChatHeader = () => {
    const [blockUserPopup, setBlockUserPopup] = useState("")
    const [unblockUserPopup, setUnblockUserPopup] = useState("")
    const [deleteChatPopup, setDeleteChatPopup] = useState("")

    return (
        <>
            <div className='chat-header'>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="img-wrapper">
                            <img src={Assets.UserImg1} alt="" onError={(e) => e.target.src = Assets.ProfilePlaceholder} />
                            <div className="status online"></div>
                        </div>

                        <div className="content ms-3">
                            <p className='text-black fw-700'>John Doe</p>
                            <span className='text-grey'>Online</span>
                        </div>
                    </div>

                    <div>
                        <DropdownButton title={<BsThreeDotsVertical size={24} />}>
                            <ul >
                                <li className='cursor mb-1' onClick={() => setBlockUserPopup(true)}>
                                    <span>Block User</span>
                                </li>

                                <li className='cursor mb-1' onClick={() => setUnblockUserPopup(true)}>
                                    <span>Unblock User</span>
                                </li>

                                <li className='cursor' onClick={() => setDeleteChatPopup(true)}>
                                    <span>Delete Chat</span>
                                </li>
                            </ul>
                        </DropdownButton>
                    </div>
                </div>
            </div>

            <BlockUserPopup blockUserPopup={blockUserPopup} setBlockUserPopup={setBlockUserPopup} />
            <UnblockUserPopup unblockUserPopup={unblockUserPopup} setUnblockUserPopup={setUnblockUserPopup} />
            <DeleteChatPopup deleteChatPopup={deleteChatPopup} setDeleteChatPopup={setDeleteChatPopup} />
        </>
    )
}

export default ChatHeader