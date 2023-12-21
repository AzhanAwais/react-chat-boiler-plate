export const constant = {
    DEVICE_TYPE: "web",
    DEVICE_TOKEN: "",
    LOCAL_STORAGE_TOKEN: "CHAT_TOKEN",
    LOCAL_STORAGE_USER: "CHAT_USER",
    LOCAL_STORAGE_ROLE: "",
    BASE_URL: "http://localhost:4000/api",
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

export const apiUrl = {
    login: '/auth/login',
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

