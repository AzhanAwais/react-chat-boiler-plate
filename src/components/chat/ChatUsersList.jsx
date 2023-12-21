import React from 'react'
import Assets from '../../constants/images'

const ChatUsersList = () => {
    return (
        <div className='chat-users-list'>
            <ul>
                <li className='active'>
                    <div className="d-flex align-items-center">
                        <div className="img-wrapper">
                            <img src={Assets.UserImg1} alt="" onError={(e) => e.target.src = Assets.ProfilePlaceholder} />
                            <div className="status online"></div>
                        </div>

                        <div className="content ms-3 w-100">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='name fw-700'>John Doe</p>
                                <span className='time'>1 hours ago</span>
                            </div>

                            <div className="mt-1 d-flex align-items-center justify-content-between">
                                <span className='message'>Lo rabul fec jawta fe.</span>
                                <span className='counter '>2</span>
                            </div>
                        </div>
                    </div>
                </li>

                <li className=''>
                    <div className="d-flex align-items-center">
                        <div className="img-wrapper">
                            <img src={Assets.UserImg2} alt="" onError={(e) => e.target.src = Assets.ProfilePlaceholder} />
                            <div className="status online"></div>
                        </div>

                        <div className="content ms-3 w-100">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='name fw-700'>John Doe</p>
                                <span className='time'>1 hours ago</span>
                            </div>

                            <div className="mt-1 d-flex align-items-center justify-content-between">
                                <span className='message'>Lo rabul fec jawta fe.</span>
                                <span className='counter '>2</span>
                            </div>
                        </div>
                    </div>
                </li>

                <li className=''>
                    <div className="d-flex align-items-center">
                        <div className="img-wrapper">
                            <img src={Assets.UserImg3} alt="" onError={(e) => e.target.src = Assets.ProfilePlaceholder} />
                            <div className="status offline"></div>
                        </div>

                        <div className="content ms-3 w-100">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='name fw-700'>John Doe</p>
                                <span className='time'>1 hours ago</span>
                            </div>

                            <div className="mt-1 d-flex align-items-center justify-content-between">
                                <span className='message'>Lo rabul fec jawta fe.</span>
                                <span className='counter '>2</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ChatUsersList