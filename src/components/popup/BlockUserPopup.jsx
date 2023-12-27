import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useBlockUserMutation } from '../../store/apis/chatApi'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../loader/Loader'
import { errorMsg, successMsg } from '../../constants/msg'
import { setSelectedChat } from '../../store/slices/chatSlice'
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'

const BlockUserPopup = ({ blockUserPopup, setBlockUserPopup }) => {
    const dispatch = useDispatch()
    const currUser = GetAuthUserLocalStorage()
    const [blockUser, { isLoading }] = useBlockUserMutation()
    const { selectedChat } = useSelector((state) => state?.chat)

    const handleBlockUser = async () => {
        const userId = selectedChat?.user?._id
        const apiData = {
            userId: userId
        }
        const { data, error } = await blockUser(apiData)
        if (data) {
            let user = data?.data?.sender?._id == currUser?._id ? data?.data?.receiver : data?.data?.sender
            dispatch(setSelectedChat({ data: data?.data , user: user }))
            setBlockUserPopup(false)
            successMsg(data.message)
        }
        else {
            errorMsg(error.data.message)
        }
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
                        <Button
                            disabled={isLoading}
                            className='btn-solid btn-danger'
                            onClick={handleBlockUser}
                        >
                            {isLoading ? <Loader /> : 'Yes'}
                        </Button>
                        <Button className='btn-solid ms-2' onClick={() => setBlockUserPopup(false)}>No</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default BlockUserPopup