import React from 'react'
import { Button, Modal } from "react-bootstrap"

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
                <div>
                    <p>Are you sure you want to delete this chat</p>
                    <div className="mt-4 d-flex align-items-center">
                        <Button onClick={deleteChat}>Yes</Button>
                        <Button onClick={() => setBlockUserPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteChatPopup