import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import ChatPage from '../pages/ChatPage'
import SigninForm from '../components/auth/SigninForm'
import AuthLayout from '../layouts/auth/AuthLayout'
import { io } from 'socket.io-client'
import { constant } from '../utils/constants'
import { GetAuthUserLocalStorage } from '../services/localStorage/localStorage'

const chatSocket = io(`${constant.BASE_URL}/chat`, { auth: GetAuthUserLocalStorage() })

const Navigation = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currUser = GetAuthUserLocalStorage()

    useEffect(() => {
        // move to top on page change
        window.scrollTo(0, 0);
    }, [navigate, location])

    return (
        <Routes>
            {/* ************* Authentication Routes ************* */}

            {/* <Route element={<PublicRoute />}> */}
            <Route path='/' element={<AuthLayout children={<SigninForm />} />} ></Route>

            {/* </Route> */}


            {/* ************* Chat Routes ************* */}

            <Route path='/chat' element={<ChatPage socket={chatSocket} />} ></Route>


            {/* ******* NOTE: PLACE ALL ROUTES BEFORE ERROR ROUTE ******* */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>

    )
}

export default Navigation