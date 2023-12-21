import React from 'react'
import MessageBox from './MessageBox'

const MessagesWrapper = ({ files }) => {
    return (
        <div className={`messages-wrapper ${files?.length > 0 ? "is-file" : ""}`}>
            <div className="my-message mb-3">
                <MessageBox />
            </div>

            <div className="other-message mb-3">
                <MessageBox />
            </div>
        </div>
    )
}

export default MessagesWrapper