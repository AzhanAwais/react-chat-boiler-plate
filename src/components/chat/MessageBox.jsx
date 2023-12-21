import React from 'react'
import { messageTypes } from '../../utils/constants'
import Assets from '../../constants/images'
import { MdDownloadForOffline } from "react-icons/md"

const MessageBox = () => {
    const getMessage = {
        [messageTypes.text]: <TextMessage />,
        [messageTypes.image]: <ImageMessage />,
        [messageTypes.video]: <VideoMessage />,
        [messageTypes.audio]: <AudioMessage />,
        [messageTypes.doc]: <DocMessage />,
    }

    return (
        <>
            {getMessage[messageTypes.text]}
        </>
    )
}

const TextMessage = () => {
    return (
        <div className="text-message">
            <div className='message-box'>
                <p>lorem ipsum...</p>
            </div>
            <span className='text-grey mt-1'>12:00 pm</span>
        </div>
    )
}

const ImageMessage = () => {
    return (
        <div className="image-message">
            <div className="message-box">
                <div className="img-wrapper">
                    <img src={Assets.UserImg1} onError={(e) => e.target.src = Assets.GeneralPlaceholder} alt="" />
                </div>
                <p className='mt-2'>lorem ipsum ...</p>
            </div>
            <span className='text-grey mt-1'>12:00 pm</span>
        </div>
    )
}

const AudioMessage = () => {
    return (
        <div className="audio-message">
            <audio src="" controls></audio>
            <span className='text-grey mt-1'>12:00 pm</span>
        </div>
    )
}

const VideoMessage = () => {
    return (
        <div className="video-message">
            <div className="message-box">
                <video controls>
                    <source src='' />
                </video>
            </div>
            <span className='text-grey mt-1'>12:00 pm</span>
        </div>
    )
}

const DocMessage = () => {
    return (
        <div className="doc-message">
            <div className='message-box'>
                <div className='d-flex align-items-center'>
                    <div className='download-wrapper me-2'>
                        <MdDownloadForOffline className='download-icon' />
                    </div>
                    <span>Document</span>
                </div>
            </div>
            <span className='text-grey mt-1'>12:00 pm</span>
        </div>
    )
}

export default MessageBox