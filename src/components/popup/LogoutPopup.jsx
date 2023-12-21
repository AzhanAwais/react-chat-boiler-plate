import React from 'react'
import { Modal } from "react-bootstrap"

const LogoutPopup = ({ logoutPopup, setLogoutPopup }) => {
    return (
        <Modal
            className='theme-popup logout-popup'
            show={logoutPopup}
            onHide={() => setLogoutPopup(false)}
            size="md"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Body>
                <div>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LogoutPopup