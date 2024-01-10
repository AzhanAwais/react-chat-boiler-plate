import React, { useEffect, useRef, useState } from 'react'
import InputEmoji from "react-input-emoji"
import { IoMdSend } from "react-icons/io";
import { messageTypes } from '../../utils/constants';
import FileIconBox from './FileIconBox';
import Loader from '../loader/Loader';
import { useSendMessageMutation } from '../../store/apis/chatApi';
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage';
import { useSelector } from 'react-redux';
import { useUploadFileMutation } from '../../store/apis/uploadFileApi';
import { Button } from 'react-bootstrap';
import { errorMsg } from '../../constants/msg'
import { getBlockStatus } from '../../utils/helper';
import { PiMicrophone } from "react-icons/pi";
import { BsStopCircle } from "react-icons/bs"

const MessageInput = ({ message, setMessage, files, setFiles, socket }) => {
    const mediaRecorder = useRef(null)
    const [audioChunks, setAudioChunks] = useState([])
    const [isRecording, setIsRecording] = useState(false)
    const [timer, setTimer] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [show, setShow] = useState(false)
    const [messageType, setMessageType] = useState(messageTypes.text)
    const currUser = GetAuthUserLocalStorage()
    const [sendMessage, { isLoading }] = useSendMessageMutation()
    const [uploadFile] = useUploadFileMutation()
    const { selectedChat } = useSelector((state) => state?.chat)

    const handleFileChange = (e, messageType) => {
        setFiles([...files, ...e.target.files])
        setMessageType(messageType)
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

        console.log(messageType)

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
            // dispatch(setMessages({ data: [...messages?.data, data?.data], pagination: null }))
            socket.emit("message", {
                chatId: selectedChat?.data?._id,
                messageData: data?.data,
                currUser: currUser
            })
            resetForm()
        }
        else {
            errorMsg(error.data.message)
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, "0");
        const seconds = (time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    const startTimer = () => {
        setIsRunning(true)
        setTimer(0)
    }

    const stopTimer = () => {
        setIsRunning(false)
        setTimer(0)
    }

    const startRecording = async () => {
        setIsRecording(true)
        const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        })
        const media = new MediaRecorder(streamData, { type: "audio/webm" })
        mediaRecorder.current = media
        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return
            if (event.data.size === 0) return
            localAudioChunks.push(event.data)
        }
        setAudioChunks(localAudioChunks)
    }

    const stopRecording = () => {
        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/mp3" })
            const audioUrl = URL.createObjectURL(audioBlob)
            const file = blobToFile(audioBlob)
            setFiles([...files, file])
            setAudioChunks([])
            setIsRecording(false)
        }
    }

    const blobToFile = (audioBlob) => {
        const file = new File([audioBlob], "audio.mp3", { type: "audio/mp3" })
        return file
    }

    useEffect(() => {
        if (files?.length <= 0) {
            setMessageType(messageTypes.text)
        }
    }, [files])

    useEffect(() => {
        let interval
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1)
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [isRunning])

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
                                <Button disabled={isLoading} className="mx-2" onClick={handleSendMessage}>
                                    {isLoading ? <Loader /> : <IoMdSend className='icon' />}
                                </Button>

                                <div className="">
                                    {isRecording ?
                                        <span className='d-flex align-items-center cursor me-1' onClick={() => {
                                            stopRecording()
                                            stopTimer()
                                        }}>
                                            <span className='me-2'>{formatTime(timer)}</span>
                                            <BsStopCircle size={22} className='icon' />
                                        </span>
                                        :
                                        <span className='d-flex align-items-center me-1 cursor' onClick={() => {
                                            startRecording()
                                            startTimer()
                                        }}>
                                            <PiMicrophone size={22} className='icon' />
                                        </span>
                                    }
                                </div>

                                <div onClick={() => setShow(!show)}>
                                    <FileIconBox
                                        handleFileChange={handleFileChange}
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