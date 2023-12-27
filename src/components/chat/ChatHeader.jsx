import React, { useState } from 'react'
import Assets from '../../constants/images'
import { BsThreeDotsVertical } from "react-icons/bs";
import { DropdownButton } from 'react-bootstrap';
import UnblockUserPopup from '../popup/UnblockUserPopup';
import BlockUserPopup from '../popup/BlockUserPopup';
import DeleteChatPopup from '../popup/DeleteChatPopup';
import { useSelector } from 'react-redux';
import { getImageUrl } from '../../utils/helper';

const ChatHeader = () => {
    const { selectedChat } = useSelector((state) => state?.chat)
    const [blockUserPopup, setBlockUserPopup] = useState("")
    const [unblockUserPopup, setUnblockUserPopup] = useState("")
    const [deleteChatPopup, setDeleteChatPopup] = useState("")

    const getChatInfo = () => {
        let url = ""
        let name = ""

        if (selectedChat?.data?.isGroupChat) {
            url = getImageUrl(selectedChat?.data?.groupImage, true)
            name = selectedChat?.data?.groupName
        }
        else {
            url = getImageUrl(selectedChat?.user?.profileImage, true)
            name = selectedChat?.user?.fullname
        }

        return { url, name }
    }

    return (
        <>
            <div className='chat-header'>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="img-wrapper">
                            <img src={getChatInfo()?.url} alt="" onError={(e) => e.target.src = Assets.ProfilePlaceholder} />
                            {
                                !selectedChat?.data?.isGroupChat &&
                                <div className={`status ${selectedChat?.user?.isOnline ? 'online' : 'offline'}`}></div>
                            }
                        </div>

                        <div className="content ms-3">
                            <p className='text-black fw-700 text-capitalize'>{getChatInfo()?.name}</p>
                            {
                                selectedChat?.data?.isGroupChat ?
                                    <span className='text-grey text-capitalize'>{selectedChat?.data?.groupDescription}</span>
                                    :
                                    <span className='text-grey text-capitalize'>{selectedChat?.user?.isOnline ? "Online" : "Offline"}</span>
                            }
                        </div>
                    </div>

                    <div>
                        <DropdownButton title={<BsThreeDotsVertical size={24} />}>
                            <ul >
                                {
                                    !selectedChat?.data?.isGroupChat &&
                                    <>
                                        <li className='cursor mb-1' onClick={() => setBlockUserPopup(true)}>
                                            <span>Block User</span>
                                        </li>

                                        <li className='cursor mb-1' onClick={() => setUnblockUserPopup(true)}>
                                            <span>Unblock User</span>
                                        </li>
                                    </>
                                }
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