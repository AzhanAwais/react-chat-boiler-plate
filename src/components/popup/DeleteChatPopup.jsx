import React from 'react'
import { Button, Modal } from "react-bootstrap"
import { FaTimes } from 'react-icons/fa'
import Loader from '../loader/Loader'
import { errorMsg } from '../../constants/msg'
import { useDispatch, useSelector } from 'react-redux'
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'
import { useDeleteChatMutation } from '../../store/apis/chatApi'
import { setMessages } from '../../store/slices/chatSlice'

const DeleteChatPopup = ({ deleteChatPopup, setDeleteChatPopup }) => {
    const dispatch = useDispatch()
    const currUser = GetAuthUserLocalStorage()
    const [deleteChat, { isLoading }] = useDeleteChatMutation()
    const { selectedChat } = useSelector((state) => state?.chat)

    const handleDeleteChat = async () => {
        const chatId = selectedChat?.data?._id
        const { data, error } = await deleteChat(chatId)
        if (data) {
            dispatch(setMessages({ data: [], pagination: null }))
            setDeleteChatPopup(false)
            successMsg(data.message)
        }
        else {
            errorMsg(error.data.message)
        }
    }

    return (
        <Modal
            className='theme-popup delete-confirm-popup'
            show={deleteChatPopup}
            onHide={() => setDeleteChatPopup(false)}
            size="md"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Body>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h6><b>Delete Chat</b></h6>
                    <FaTimes className='cursor' onClick={() => setDeleteChatPopup(false)} />
                </div>
                <div>
                    <p>Are you sure you want to delete this chat</p>
                    <div className="mt-4 d-flex align-items-center">
                        <Button
                            disabled={isLoading}
                            className='btn-solid btn-danger'
                            onClick={handleDeleteChat}
                        >
                            {isLoading ? <Loader /> : 'Yes'}
                        </Button>
                        <Button className='btn-solid ms-2' onClick={() => setDeleteChatPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteChatPopup