import React, { useState } from 'react'
import InputEmoji from "react-input-emoji"
import { IoAttachSharp } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";

const MessageInput = ({ message, setMessage, files, setFiles, onSubmit }) => {
    const handleFileChange = (e) => {
        setFiles([...files, ...e.target.files])
    }

    const sendMessage = async () => {

    }

    return (
        <div className='message-input'>
            <div className="d-flex align-items-center">
                <div className='w-100'>
                    <InputEmoji
                        value={message}
                        onChange={setMessage}
                        placeholder="Type a message"
                    />
                </div>

                <div className="d-flex align-items-center">
                    <div className="ms-3" onClick={onSubmit}>
                        <IoMdSend className='icon' />
                    </div>

                    <label className='icon-wrapper ms-1' htmlFor="file">
                        <input className='d-none' multiple type="file" id='file' onChange={handleFileChange} />
                        <IoAttachSharp className='icon' />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default MessageInput