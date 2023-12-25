import moment from "moment"
import { roles, constant } from "./constants"
import Assets from "../constants/images"

export const createImagePreview = (file) => {
    return URL.createObjectURL(file)
}

export const getUserRole = (role) => {
    if (role == roles.admin) {
        return "Admin"
    }
    else if (role == roles.user) {
        return "User"
    }
}

export const getChatTime = (timestamp) => {
    return moment(timestamp).fromNow();
}

export const getMessageTime = (timestamp) => {
    const formattedTime = moment.utc(timestamp).local().format("h:mm A");
    return formattedTime
}

export const getImageUrl = (url, isProfileImg = false) => {
    if (url) {
        return `${constant.BASE_URL}${url}`
    }
    else {
        return isProfileImg ? Assets.ProfilePlaceholder : Assets.GeneralPlaceholder
    }
}

export const getAudioAndVideoUrl = (url) => {
    return `${constant.BASE_URL}${url}`
}

export const getUnReadCount = (userId, unReadCount) => {
    const [userData] = unReadCount?.filter((item) => item?.user == userId)
    return userData?.count
}