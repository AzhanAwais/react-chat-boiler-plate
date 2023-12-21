import React from 'react'
import { GetTokenLocalStorage, GetUserRoleLocalStorage } from "../services/localStorage/localStorage"
import { Route, Navigate, Outlet, useNavigate } from "react-router";
import { roles } from '../utils/constants';

const PublicRoute = () => {
    const token = GetTokenLocalStorage()
    const role = GetUserRoleLocalStorage()

    return (
        !token ? <Outlet /> : <Navigate to="/dashboard" />
    )
}

export default PublicRoute