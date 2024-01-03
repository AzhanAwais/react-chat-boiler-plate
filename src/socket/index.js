import { io } from "socket.io-client"
import { GetAuthUserLocalStorage } from "../services/localStorage/localStorage"
import { constant } from "../utils/constants"

export const getChatSocket = ()=>{
    const chatSocket = io(`${constant.BASE_URL}/chat`, { 
        auth: GetAuthUserLocalStorage() ,
    })
    return chatSocket
}