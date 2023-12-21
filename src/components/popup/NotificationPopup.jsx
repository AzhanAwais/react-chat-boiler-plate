import React from 'react'
import { Modal } from "react-bootstrap"

const NotificationPopup = ({ notificationPopup, setNotificationPopup }) => {
    return (
        <Modal
            className='theme-popup notification-popup'
            show={notificationPopup}
            onHide={() => setNotificationPopup(false)}
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

export default NotificationPopup