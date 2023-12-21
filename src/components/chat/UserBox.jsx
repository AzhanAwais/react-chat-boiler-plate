import React from 'react'
import Assets from '../../constants/images'

const UserBox = () => {
    return (
        <div className="box d-flex align-items-center">
            <div className="img-wrapper">
                <img src={Assets.UserImg1} onError={(e) => e.target.src = Assets.ProfilePlaceholder} alt="" />
            </div>

            <div className='ms-2'>
                <span>User name</span>
            </div>
        </div>
    )
}

export default UserBox