import React from 'react'
import NoChat from '../../json/noMessage.json'
import Lottie from "lottie-react"

const NoChatSelected = () => {
    return (
        <div className="no-chat-selected h-100">
            <div className="animation-div">
                <Lottie animationData={NoChat} loop={true} />
                <h4 className='fw-800'>Select a chat to start converstaion</h4>
            </div>
        </div>
    )
}

export default NoChatSelected