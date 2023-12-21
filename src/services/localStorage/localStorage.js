import {constant} from "../../utils/constants"

const storageToken = constant.LOCAL_STORAGE_TOKEN;
const storageUser = constant.LOCAL_STORAGE_USER;
const storageRole = constant.LOCAL_STORAGE_ROLE;

export const SetTokenLocalStorage = (token) => {
    localStorage.setItem(storageToken, token)
}

export const GetTokenLocalStorage = () => {
    if (localStorage.getItem(storageToken)) {
        return localStorage.getItem(storageToken)
    } else {
        return null;
    }
}

export const SetAuthUserLocalStorage = (user) => {
    localStorage.setItem(storageUser, JSON.stringify(user))
}

export const GetAuthUserLocalStorage = () => {
    if (localStorage.getItem(storageUser)) {
        return JSON.parse(localStorage.getItem(storageUser))
    } else {
        return null;
    }
}

export const SetUserRoleLocalStorage = (role) => {
    localStorage.setItem(storageRole, JSON.stringify(role))
}

export const GetUserRoleLocalStorage = () => {
    if (localStorage.getItem(storageRole)) {
        return JSON.parse(localStorage.getItem(storageRole))
    } else {
        return null;
    }
}

export const EmptyLocalStorage = () => {
    localStorage.removeItem(storageUser)
    localStorage.removeItem(storageToken)
    localStorage.removeItem(storageRole)
}
