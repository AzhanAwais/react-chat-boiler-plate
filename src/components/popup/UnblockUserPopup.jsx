import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const UnblockUserPopup = ({ unblockUserPopup, setUnblockUserPopup }) => {
    const unblockUser = async () => {

    }

    return (
        <Modal
            className='theme-popup block-unblock-popup'
            show={unblockUserPopup}
            onHide={() => setUnblockUserPopup(false)}
            size="md"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Body>
                <div>
                    <p>Are you sure you want to unblock this user</p>
                    <div className="mt-4 d-flex align-items-center">
                        <Button onClick={unblockUser}>Yes</Button>
                        <Button onClick={() => setUnblockUserPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UnblockUserPopup