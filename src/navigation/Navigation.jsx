import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import ChatPage from '../pages/ChatPage'
import SigninForm from '../components/auth/SigninForm'
import AuthLayout from '../layouts/auth/AuthLayout'

const Navigation = () => {
    const navigate = useNavigate()
    const location = useLocation()

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

            <Route path='/chat' element={<ChatPage />} ></Route>


            {/* ******* NOTE: PLACE ALL ROUTES BEFORE ERROR ROUTE ******* */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>

    )
}

export default Navigation