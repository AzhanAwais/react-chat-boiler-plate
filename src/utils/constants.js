export const constant = {
    DEVICE_TYPE: "web",
    DEVICE_TOKEN: "",
    LOCAL_STORAGE_TOKEN: "CHAT_TOKEN",
    LOCAL_STORAGE_USER: "CHAT_USER",
    LOCAL_STORAGE_ROLE: "",
    BASE_URL: "http://localhost:4000",
    MS100_BASE_URL: "https://api.100ms.live/v2",
    IMAGE_DIR_NAME: "images",
    VIDEO_DIR_NAME: "videos",
    TOKEN_100_MS: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDQ5NTQ0ODEsImV4cCI6MTcwNTA0MDg4MSwianRpIjoiand0X25vbmNlIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3MDQ5NTQ0ODEsImFjY2Vzc19rZXkiOiI2NTlmOGE0YjY3MjYxNjMzMWViYWFmY2YifQ.BqLy_kEuM1C4IiHol9YO4d7fax36Mj35myEzCZzGM-4"
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

export const templates = {
    audioTemplate: "659f8a97cd666ed1654e1f02"
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

export const apiUrl100ms = {
    rooms: "/rooms",
    roomCodes: "/room-codes/room"
}

export const roles100ms = {
    speaker: "speaker",
    listner: "listner",
    moderator: "moderator"
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

