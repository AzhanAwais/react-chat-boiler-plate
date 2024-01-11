import React, { useState } from 'react'
import Assets from '../../constants/images'
import { BsThreeDotsVertical } from "react-icons/bs";
import { DropdownButton } from 'react-bootstrap';
import UnblockUserPopup from '../popup/UnblockUserPopup';
import BlockUserPopup from '../popup/BlockUserPopup';
import DeleteChatPopup from '../popup/DeleteChatPopup';
import { useSelector } from 'react-redux';
import { getBlockStatus, getImageUrl } from '../../utils/helper';
import { MdOutlineCall } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage';
import { useCreateRoomCodesMutation, useCreateRoomMutation } from '../../store/apis/ms100Api';
import { errorMsg } from '../../constants/msg';
import { useHMSActions } from '@100mslive/react-sdk';
import { roles100ms, templates } from '../../utils/constants';

const ChatHeader = () => {
    const hmsActions = useHMSActions()
    const currUser = GetAuthUserLocalStorage()
    const { selectedChat } = useSelector((state) => state?.chat)
    const [blockUserPopup, setBlockUserPopup] = useState(false)
    const [unblockUserPopup, setUnblockUserPopup] = useState(false)
    const [deleteChatPopup, setDeleteChatPopup] = useState(false)
    const [createRoom] = useCreateRoomMutation()
    const [createRoomCode] = useCreateRoomCodesMutation()

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

    const startAudioCall = async () => {
        try {
            const { data, error } = await createRoom({
                name: selectedChat?.data?._id,
                template_id: templates?.audioTemplate,
                description: ""
            })
            if (data) {
                const roomId = data?.id
                const { data: roomCodeData, error: roomCodeError } = await createRoomCode(roomId)
                if (roomCodeData) {
                    const [speaker] = roomCodeData?.data.filter((item) => item?.role == roles100ms.speaker)
                    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode: speaker?.code })
                    const res = await hmsActions.join({ userName: currUser?.fullname, authToken })
                }
                else {
                    errorMsg(roomCodeError.data.message)
                }
            }
            else {
                errorMsg(error.data.message)
            }
        }
        catch (e) {
            errorMsg(e)
        }
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

                    <div className='d-flex align-items-center'>
                        <span onClick={startAudioCall}><MdOutlineCall className='text-grey me-3 cursor' size={24} /></span>
                        <span><IoVideocamOutline className='text-grey me-3 cursor' size={24} /></span>
                        <DropdownButton title={<BsThreeDotsVertical size={24} />}>
                            <ul >
                                {
                                    !selectedChat?.data?.isGroupChat &&
                                    <>
                                        {
                                            getBlockStatus(selectedChat) ?
                                                <li className='cursor mb-1' onClick={() => setUnblockUserPopup(true)}>
                                                    <span>Unblock User</span>
                                                </li>
                                                :
                                                <li className='cursor mb-1' onClick={() => setBlockUserPopup(true)}>
                                                    <span>Block User</span>
                                                </li>
                                        }
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