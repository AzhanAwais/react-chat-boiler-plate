import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { IoAttachSharp } from "react-icons/io5"
import { FaImage } from "react-icons/fa6"
import { FaVideo, FaRegFileAlt } from "react-icons/fa"
import { messageTypes } from '../../utils/constants'

const FileIconBox = ({ handleFileChange, show }) => {
    return (
        <div className='file-icon-box'>
            <DropdownButton show={show} id="dropdown-basic-button" title={<IoAttachSharp size={22} className='text-grey' />}>
                <label
                    className='mb-3 circle blue'
                    htmlFor="image"
                >
                    <input accept="image/*" className='d-none' multiple type="file" id='image' onChange={(e) => handleFileChange(e, messageTypes.image)}
                    />
                    <FaImage size={16} className='icon text-white' />
                </label>

                <label
                    className='mb-3 circle green'
                    htmlFor="video"
                >
                    <input accept='video/*' className='d-none' multiple type="file" id='video' onChange={(e) => handleFileChange(e, messageTypes.video)}
                    />
                    <FaVideo size={16} className='icon text-white' />
                </label>

                <label
                    className='mb-3 circle orange'
                    htmlFor="doc"
                >
                    <input accept=".xlsx .xls .doc .docx .ppt .pptx .txt .pdf" className='d-none' multiple type="file" id='doc' onChange={(e) => handleFileChange(e, messageTypes.doc)}
                    />
                    <FaRegFileAlt size={16} className='icon text-white' />
                </label>
            </DropdownButton>
        </div>
    )
}

export default FileIconBox