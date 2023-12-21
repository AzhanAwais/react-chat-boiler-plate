import React from 'react'
import { Button, Modal } from "react-bootstrap"
import { FaTimes } from 'react-icons/fa'

const DeleteChatPopup = ({ deleteChatPopup, setDeleteChatPopup }) => {
    const deleteChat = async () => {

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
                        <Button className='btn-solid btn-danger' onClick={deleteChat}>Yes</Button>
                        <Button  className='btn-solid ms-2' onClick={() => setDeleteChatPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteChatPopup