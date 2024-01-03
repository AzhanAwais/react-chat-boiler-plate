import React from 'react'
import { Button, Modal } from "react-bootstrap"
import Loader from '../loader/Loader'
import { useLazyLogoutQuery } from '../../store/apis/authApi'
import { errorMsg } from '../../constants/msg'
import { EmptyLocalStorage, GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getChatSocket } from '../../socket'

const socket = getChatSocket()

const LogoutPopup = ({ logoutPopup, setLogoutPopup }) => {
    const navigate = useNavigate()
    const currUser = GetAuthUserLocalStorage()
    const [logout, { isLoading }] = useLazyLogoutQuery()

    const handleLogout = async () => {
        const { data, error } = await logout()
        if (data) {
            socket.emit('getOfflineUser')
            EmptyLocalStorage()
            navigate("/")
        }
        else {
            errorMsg(error.data.message)
        }
    }

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
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h6><b>Logout</b></h6>
                    <FaTimes className='cursor' onClick={() => setLogoutPopup(false)} />
                </div>

                <div>
                    <p>Are you sure you want to logout?</p>
                    <div className="mt-4 d-flex align-items-center">
                        <Button
                            disabled={isLoading}
                            className='btn-solid btn-danger'
                            onClick={handleLogout}
                        >
                            {isLoading ? <Loader /> : 'Yes'}
                        </Button>
                        <Button className='btn-solid ms-2' onClick={() => setLogoutPopup(false)}>No</Button>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
}

export default LogoutPopup