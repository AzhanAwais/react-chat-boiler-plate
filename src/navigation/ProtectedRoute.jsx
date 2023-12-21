import React from 'react'
import { GetTokenLocalStorage, GetUserRoleLocalStorage } from "../services/localStorage/localStorage"
import { Route, Navigate, Outlet, useNavigate } from "react-router";

const ProtectedRoute = () => {
    const token = GetTokenLocalStorage()
    const role = GetUserRoleLocalStorage()

    return (
        token ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoute