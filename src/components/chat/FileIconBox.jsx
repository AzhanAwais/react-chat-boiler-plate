import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { IoAttachSharp } from "react-icons/io5"
import { FaImage } from "react-icons/fa6"
import { FaVideo, FaRegFileAlt } from "react-icons/fa"
import { messageTypes } from '../../utils/constants'

const FileIconBox = ({ handleFileChange, setMessageType, show }) => {
    return (
        <div className='file-icon-box'>
            <DropdownButton show={show} id="dropdown-basic-button" title={<IoAttachSharp size={22} className='text-grey' />}>
                <label
                    className='mb-3 circle blue'
                    htmlFor="file"
                    onClick={() => setMessageType(messageTypes.image)}
                >
                    <input accept="image/*" className='d-none' multiple type="file" id='file' onChange={handleFileChange} />
                    <FaImage size={16} className='icon text-white' />
                </label>

                <label
                    className='mb-3 circle green'
                    htmlFor="file"
                    onClick={() => setMessageType(messageTypes.video)}
                >
                    <input accept='video/*' className='d-none' multiple type="file" id='file' onChange={handleFileChange} />
                    <FaVideo size={16} className='icon text-white' />
                </label>

                <label
                    className='mb-3 circle orange'
                    htmlFor="file"
                    onClick={() => setMessageType(messageTypes.doc)}
                >
                    <input  accept=".xlsx .xls .doc, .docx .ppt .pptx .txt .pdf" className='d-none' multiple type="file" id='file' onChange={handleFileChange} />
                    <FaRegFileAlt size={16} className='icon text-white' />
                </label>
            </DropdownButton>
        </div>
    )
}

export default FileIconBox