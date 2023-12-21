import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const BlockUserPopup = ({ blockUserPopup, setBlockUserPopup }) => {
    const blockUser = async () => {

    }

    return (
        <Modal
            className='theme-popup block-unblock-popup'
            show={blockUserPopup}
            onHide={() => setBlockUserPopup(false)}
            size="md"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Body>
                <div>
                    <p>Are you sure you want to block this user</p>
                    <div className="mt-4 d-flex align-items-center">
                        <Button onClick={blockUser}>Yes</Button>
                        <Button onClick={() => setBlockUserPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default BlockUserPopup