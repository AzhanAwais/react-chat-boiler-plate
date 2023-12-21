import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'

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
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h6><b>Unblock User</b></h6>
                    <FaTimes className='cursor' onClick={() => setUnblockUserPopup(false)} />
                </div>
                <div>
                    <p>Are you sure you want to unblock this user</p>
                    <div className="mt-4 d-flex align-items-center">
                        <Button className='btn-solid btn-danger' onClick={unblockUser}>Yes</Button>
                        <Button className='btn-solid ms-2' onClick={() => setUnblockUserPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UnblockUserPopup