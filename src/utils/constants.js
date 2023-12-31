export const constant = {
    DEVICE_TYPE: "web",
    DEVICE_TOKEN: "",
    LOCAL_STORAGE_TOKEN: "CHAT_TOKEN",
    LOCAL_STORAGE_USER: "CHAT_USER",
    LOCAL_STORAGE_ROLE: "",
    BASE_URL: "http://localhost:4000",
    IMAGE_DIR_NAME: "images",
    VIDEO_DIR_NAME: "videos"
}

export const messageTypes = {
    text: 1,
    image: 2,
    video: 3,
    audio: 4,
    doc: 5,
}

export const roles = {
    admin: 1,
    user: 2
}

export const apiUrl = {
    uploadFile: '/api/file/upload-file',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    chatUsers: '/api/chat/get-chat-users',
    messages: '/api/chat/get-messages',
    searchUsers: '/api/chat/search-users',
    startChat: '/api/chat/start-chat',
    createGroup: "/api/chat/create-group",
    sendMessage: "/api/chat/send-message",
    deleteMessage: "/api/chat/delete-message",
    deleteMessage: "/api/chat/delete-message",
    blockChatUser: "/api/chat/block-user",
    unblockChatUser: "/api/chat/unblock-user",
    deleteChat: "/api/chat/delete-chat",
}

export const s3Credential = {
    bucketName: "",
    region: "",
    accessKeyId: "",
    secretAccessKey: "",
    s3EndPoint: "",
    fileSize: "",
    dirName: "",
}

export const errorMessages = {
    fileSize: "The file size is too large",
    fileSuccess: "file uploaded successfully",
    fileError: "Error in uploading file",
}

