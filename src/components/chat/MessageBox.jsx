import React from 'react'
import { saveAs } from 'file-saver'
import { messageTypes } from '../../utils/constants'
import Assets from '../../constants/images'
import { MdDownloadForOffline } from "react-icons/md"
import { getAudioAndVideoUrl, getImageUrl, getMessageTime } from '../../utils/helper'

const MessageBox = ({ data }) => {
    const getMessage = {
        [messageTypes.text]: <TextMessage data={data} />,
        [messageTypes.image]: <ImageMessage data={data} />,
        [messageTypes.video]: <VideoMessage data={data} />,
        [messageTypes.audio]: <AudioMessage data={data} />,
        [messageTypes.doc]: <DocMessage data={data} />,
    }

    return (
        <>
            {
                data?.isDeleted ?
                    <TextMessage data={{ message: "This message is deleted", createdAt: data?.createdAt }} />
                    :
                    getMessage[data?.messageType]
            }
        </>
    )
}

const TextMessage = ({ data }) => {
    return (
        <div className="text-message">
            <div className='message-box'>
                <p>{data?.message}</p>
            </div>
            <span className='text-grey mt-1'>{getMessageTime(data?.createdAt)}</span>
        </div>
    )
}

const ImageMessage = ({ data }) => {
    return (
        <>
            {
                data?.images?.map((item, index) => (
                    <div key={index} className="image-message">
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
        <div className="audio-message">
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
                    <div key={index} className="video-message">
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
                    <div key={index} className="doc-message">
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

export default MessageBox