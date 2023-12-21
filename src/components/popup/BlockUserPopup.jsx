import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'

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
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h6><b>Block User</b></h6>
                    <FaTimes className='cursor' onClick={() => setBlockUserPopup(false)} />
                </div>

                <div>
                    <p>Are you sure you want to block this user</p>
                    <div className="mt-4 d-flex align-items-center">
                        <Button className='btn-solid btn-danger' onClick={blockUser}>Yes</Button>
                        <Button className='btn-solid ms-2' onClick={() => setBlockUserPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default BlockUserPopup