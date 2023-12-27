import React, { useEffect, useState } from 'react'
import InputEmoji from "react-input-emoji"
import { IoAttachSharp } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { messageTypes } from '../../utils/constants';
import FileIconBox from './FileIconBox';
import Loader from '../loader/Loader';
import { useSendMessageMutation } from '../../store/apis/chatApi';
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage';
import { setMessages } from '../../store/slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadFileMutation } from '../../store/apis/uploadFileApi';
import { Button } from 'react-bootstrap';
import { errorMsg } from '../../constants/msg'
import { getBlockStatus } from '../../utils/helper';

const MessageInput = ({ message, setMessage, files, setFiles }) => {
    const [show, setShow] = useState(false)
    const [messageType, setMessageType] = useState(messageTypes.text)
    const dispatch = useDispatch()
    const currUser = GetAuthUserLocalStorage()
    const [sendMessage, { isLoading }] = useSendMessageMutation()
    const [uploadFile] = useUploadFileMutation()
    const { selectedChat, messages } = useSelector((state) => state?.chat)

    const handleFileChange = (e) => {
        setFiles([...files, ...e.target.files])
        setShow(false)
    }

    const uploadFiles = async (formData) => {
        let images = []
        let videos = []
        let docs = []
        let audio = null

        for (let i = 0; i < files?.length; i++) {
            let formdata = new FormData()
            formdata.append("file", files[i])

            const { data, error } = await uploadFile(formdata)
            if (data) {
                if (messageType == messageTypes.image) {
                    images?.push(data?.data)
                }
                else if (messageType == messageTypes.video) {
                    videos?.push(data?.data)
                }
                else if (messageType == messageTypes.doc) {
                    videos?.push({
                        name: files[i]?.name,
                        url: data?.data
                    })
                }
                else if (messageType == messageTypes.audio) {
                    audio = data?.data
                }
            }
        }

        if (messageType == messageTypes.image) {
            formData.images = images
        }
        else if (messageType == messageTypes.video) {
            formData.videos = videos
        }
        else if (messageType == messageTypes.doc) {
            formData.docs = docs
        }
        else if (messageType == messageTypes.audio) {
            formData.audio = audio
            delete formData?.message
        }

        return formData
    }

    const resetForm = () => {
        setFiles([])
        setMessage('')
        setMessageType(messageTypes.text)
    }

    const handleSendMessage = async () => {
        let formData = {
            chatId: selectedChat?.data?._id,
            sender: currUser?._id,
            receiver: selectedChat?.user?._id,
            messageType: messageType,
            message: message
        }

        if (selectedChat?.data?.isGroupChat) {
            delete formData.receiver
        }

        if (files?.length > 0) {
            formData = await uploadFiles(formData)
        }

        const { data, error } = await sendMessage(formData)
        if (data) {
            let temp = [...messages?.data]
            temp?.push(data?.data)
            dispatch(setMessages({ data: temp, isLoading: false }))
            resetForm()
        }
        else {
            errorMsg(error.data.message)
        }
    }

    useEffect(() => {
        if (files?.length <= 0) {
            setMessageType(messageTypes.text)
        }
    }, [files])

    return (
        <div className={`message-input ${getBlockStatus(selectedChat) ? 'p-0' : ''}`}>
            <div className="d-flex align-items-center">
                {
                    getBlockStatus(selectedChat) ?
                        <div className='bg-danger w-100 p-4 text-white'>You have blocked this user. Please unblock to continue chat.</div>
                        :
                        <>
                            <div className='w-100'>
                                <InputEmoji
                                    value={message}
                                    onChange={setMessage}
                                    placeholder="Type a message"
                                />
                            </div>

                            <div className="d-flex align-items-center">
                                <Button disabled={isLoading} className="mx-3" onClick={handleSendMessage}>
                                    {isLoading ? <Loader /> : <IoMdSend className='icon' />}
                                </Button>

                                <div onClick={() => setShow(!show)}>
                                    <FileIconBox
                                        handleFileChange={handleFileChange}
                                        setMessageType={setMessageType}
                                        show={show}
                                    />
                                </div>
                            </div>
                        </>
                }

            </div>
        </div>
    )
}

export default MessageInput