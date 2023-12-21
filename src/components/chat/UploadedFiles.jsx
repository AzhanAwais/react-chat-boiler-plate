import React from 'react'
import { MdAttachFile } from "react-icons/md"
import { FaTimes } from "react-icons/fa"

const UploadedFiles = ({files, setFiles}) => {
    const handleRemoveFile = (index) => {
        let temp = [...files]
        temp.splice(index, 1)
        setFiles(temp)
    }

    return (
        <div className={`uploaded-files ${files?.length > 0 ? "d-block" : "d-none"}`}>
            <div className="wrapper">
                {
                    files?.map((item, index) => (
                        <div key={index} className="box d-flex align-items-center justify-content-between mb-2">
                            <div className='d-flex align-items-center'>
                                <div className='me-2'>
                                    <MdAttachFile size={20} />
                                </div>
                                <span>{item?.name}</span>
                            </div>
                            <FaTimes onClick={() => handleRemoveFile(index)} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UploadedFiles