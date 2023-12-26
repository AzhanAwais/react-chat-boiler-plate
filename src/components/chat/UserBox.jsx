import React from 'react'
import Assets from '../../constants/images'
import { getImageUrl } from '../../utils/helper'

const UserBox = ({ data }) => {
    return (
        <div className="box d-flex align-items-center">
            <div className="img-wrapper">
                <img src={getImageUrl(data?.profileImage, true)} onError={(e) => e.target.src = Assets.ProfilePlaceholder} alt="" />
            </div>

            <div className='ms-2'>
                <span>{data?.fullname}</span>
            </div>
        </div>
    )
}

export default UserBox