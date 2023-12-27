import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useUnblockUserMutation } from '../../store/apis/chatApi'
import { useDispatch, useSelector } from 'react-redux'
import { errorMsg, successMsg } from '../../constants/msg'
import Loader from '../loader/Loader'
import { setSelectedChat } from '../../store/slices/chatSlice'
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'

const UnblockUserPopup = ({ unblockUserPopup, setUnblockUserPopup }) => {
    const dispatch = useDispatch()
    const currUser = GetAuthUserLocalStorage()
    const [unblockUser, { isLoading }] = useUnblockUserMutation()
    const { selectedChat } = useSelector((state) => state?.chat)

    const handleUnblockUser = async () => {
        const userId = selectedChat?.user?._id
        const apiData = {
            userId: userId
        }
        const { data, error } = await unblockUser(apiData)
        if (data) {
            let user = data?.data?.sender?._id == currUser?._id ? data?.data?.receiver : data?.data?.sender
            dispatch(setSelectedChat({ data: data?.data , user: user }))
            setUnblockUserPopup(false)
            successMsg(data.message)
        }
        else {
            errorMsg(error.data.message)
        }
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
                        <Button
                            className='btn-solid btn-danger'
                            onClick={handleUnblockUser}
                        >
                            {isLoading ? <Loader /> : "Yes"}
                        </Button>
                        <Button className='btn-solid ms-2' onClick={() => setUnblockUserPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UnblockUserPopup