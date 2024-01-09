import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { messageTypes } from '../../utils/constants'
import Assets from '../../constants/images'
import { MdDownloadForOffline } from "react-icons/md"
import { getAudioAndVideoUrl, getImageUrl, getMessageTime } from '../../utils/helper'
import { Button, Col, DropdownButton, Row } from 'react-bootstrap'
import ImgsViewer from "react-images-viewer"
import { BsThreeDotsVertical } from "react-icons/bs"
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage'
import { useDeleteMessageMutation } from '../../store/apis/chatApi'
import { errorMsg } from '../../constants/msg'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../../store/slices/chatSlice'

const MessageBox = ({ data, index, socket }) => {
    const dispatch = useDispatch()
    const currUser = GetAuthUserLocalStorage()
    const [isOpen, setIsOpen] = useState(false)
    const [deleteMessage, { isLoading }] = useDeleteMessageMutation()
    const { messages, selectedChat } = useSelector((state) => state?.chat)

    const getMessage = {
        [messageTypes.text]: <TextMessage data={data} />,
        [messageTypes.image]: <ImageMessage data={data} setIsOpen={setIsOpen} />,
        [messageTypes.video]: <VideoMessage data={data} />,
        [messageTypes.audio]: <AudioMessage data={data} />,
        [messageTypes.doc]: <DocMessage data={data} />,
    }

    const handleDeleteMessage = async () => {
        const chatId = selectedChat?.data?._id
        const messageId = data?._id

        const { data: resData, error } = await deleteMessage(messageId)
        if (resData) {
            socket.emit("deleteMessage", {
                chatId: chatId,
                message: resData?.data,
                currUser:currUser
            })
            let temp = [...messages?.data]
            temp[index] = { ...temp[index], isDeleted: true };
            dispatch(setMessages({ data: temp, pagination: null }))
        }
        else {
            errorMsg(error.data.message)
        }
    }

    return (
        <>
            {
                data?.isDeleted ?
                    <TextMessage data={{ message: "This message is deleted", createdAt: data?.createdAt }} />
                    :
                    <div className='message-actions'>
                        {getMessage[data?.messageType]}
                        {
                            data?.sender?._id == currUser?._id &&
                            <DropdownButton id="dropdown-basic-button" title={<BsThreeDotsVertical size={22} className='text-grey' />} >
                                <Button className='w-100' disabled={isLoading} onClick={handleDeleteMessage}>Delete Message</Button>
                            </DropdownButton>
                        }
                    </div>
            }

            <ImageViewer isOpen={isOpen} setIsOpen={setIsOpen} images={data?.images} />
        </>
    )
}

const TextMessage = ({ data }) => {
    return (
        <div className="text-message mb-3">
            <div className='message-box'>
                <p>{data?.message}</p>
            </div>
            <span className='text-grey mt-1'>{getMessageTime(data?.createdAt)}</span>
        </div>
    )
}

const ImageMessage = ({ data, setIsOpen }) => {
    return (
        <>
            {
                data?.images?.length >= 4 ?
                    <div className="image-message mb-3">
                        <div className="message-box many-image-wrapper">
                            <Row>
                                {
                                    data?.images?.slice(0, 4)?.map((item, index) => (
                                        <Col key={index} xs={6} className='mb-2' onClick={() => setIsOpen(true)}>
                                            <div className="img-wrapper">
                                                {index == data?.images?.length - 2 && data?.images?.length > 4 && <div className='overlay'> + {data?.images?.length - 4}</div>}
                                                <img src={getImageUrl(item)} onError={(e) => e.target.src = Assets.GeneralPlaceholder} alt="" />
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                    </div>
                    :
                    data?.images?.map((item, index) => (
                        <div key={index} className="image-message mb-3">
                            <div className="message-box">
                                <div className="img-wrapper">
                                    <img src={getImageUrl(item)} onError={(e) => e.target.src = Assets.GeneralPlaceholder} alt="" />
                                </div>
                                <p className='mt-2'>{item?.message}</p>
                            </div>
                            <span className='text-grey mt-1'>{getMessageTime(data?.createdAt)}</span>
                        </div>
                    ))
            }
        </>
    )
}

const AudioMessage = ({ data }) => {
    return (
        <div className="audio-message mb-3">
            <audio src={getAudioAndVideoUrl(data?.audio)} controls></audio>
            <span className='text-grey mt-1'>{getMessageTime(data?.createdAt)}</span>
        </div>
    )
}

const VideoMessage = ({ data }) => {
    return (
        <>
            {
                data?.images?.map((item, index) => (
                    <div key={index} className="video-message mb-3">
                        <div className="message-box">
                            <video controls>
                                <source src={getAudioAndVideoUrl(item)} />
                            </video>
                        </div>
                        <span className='text-grey mt-1'>{getMessageTime(data?.createdAt)}</span>
                    </div>
                ))
            }
        </>
    )
}

const DocMessage = ({ data }) => {
    return (
        <>
            {
                data?.docs?.map((item, index) => (
                    <div key={index} className="doc-message mb-3">
                        <div className='message-box'>
                            <div className='d-flex align-items-center'>
                                <div className='download-wrapper me-2' onClick={() => saveAs(getAudioAndVideoUrl(item?.url), item?.name)}>
                                    <MdDownloadForOffline className='download-icon' />
                                </div>
                                <span>{item?.name}</span>
                            </div>
                        </div>
                        <span className='text-grey mt-1'>{getMessageTime(data?.createdAt)}</span>
                    </div>
                ))
            }
        </>
    )
}

const ImageViewer = ({ isOpen, setIsOpen, images }) => {
    const [currIndex, setCurrIndex] = useState(0)

    return (
        <div className='image-viewer'>
            <ImgsViewer
                imgs={images?.map((url) => ({ src: getImageUrl(url) }))}
                currImg={currIndex}
                isOpen={isOpen}
                onClickPrev={() => setCurrIndex(currIndex - 1)}
                onClickNext={() => setCurrIndex(currIndex + 1)}
                onClose={() => setIsOpen(false)}
                spinnerDisabled={true}

            />
        </div>
    )
}

export default MessageBox