export const VALIDATIONS = {
    NAME_MIN: 3,
    NAME_MAX: 20,
    EMAIL: 30,
    PASSWORD_MIN: 8,
    PASSWORD_MAX: 15,
    PHONE_MIN: 11,
    PHONE_MAX: 15,
    ADDRESS_MAX: 200,
    DESCRIPTION_MAX: 255,
    VERIFICATION_CODE: 4,
    CARD_NUMBER: 16,
    CVV: 3,
    GROUP_NAME_MIN: 3,
    GROUP_NAME_MAX: 32,
    GROUP_DESCRIPTION_MAX: 120
}

export const VALIDATIONS_TEXT = {
    USER_NAME_REQUIRED: "Username is required",
    USER_NAME_FORMAT: "Username may only contain letters and numbers",

    GROUP_DESCRIPTION_MAX: `Description: Maximum ${VALIDATIONS.GROUP_DESCRIPTION_MAX} characters are allowed`,
    GROUP_NAME_MIN: "Min length is " + VALIDATIONS.GROUP_NAME_MIN,
    GROUP_NAME_MAX: "Min length is " + VALIDATIONS.GROUP_NAME_MAX,
    GROUP_NAME_REQUIRED: "Group name is required",

    NAME_REQUIRED: "Name is required",
    NAME_MIN: "Min length is " + VALIDATIONS.NAME_MIN,
    NAME_MAX: "Max length is " + VALIDATIONS.NAME_MAX,

    FULL_NAME_REQUIRED: "Full name is required",

    EMAIL_REQUIRED: "Email is required",
    EMAIL_MAX: "Max length is " + VALIDATIONS.EMAIL,
    EMAIL_FORMAT: "Invalid email format",

    CONFIRM_NEW_PASSWORD_REQUIRED: "Confirm new password is required",
    CURRENT_PASSWORD_REQUIRED: "Current password is required",
    NEW_PASSWORD_REQUIRED: "New password is required",
    CONFIRM_PASSWORD_REQUIRED: "Confirm password is required",

    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN: "Min length is " + VALIDATIONS.PASSWORD_MIN,
    PASSWORD_MAX: "Max length is " + VALIDATIONS.PASSWORD_MAX,
    PASSWORD_FORMAT: "Password must be at-least 8 characters long with one upper case.",

    PHONE_REQUIRED: "Contact number is required",
    PHONE_MIN: "Min length is " + VALIDATIONS.PHONE_MIN,
    PHONE_MAX: "Max length is " + VALIDATIONS.PHONE_MAX,

    ADDRESS_REQUIRED: "Address is required",
    ADDRESS_MAX: "Max length is " + VALIDATIONS.ADDRESS_MAX,

    DESCRIPTION_REQUIRED: "Description is required",
    DESCRIPTION_MAX: "Max length is " + VALIDATIONS.DESCRIPTION_MAX,

    CARD_NUMBER_REQUIRED: "Card number is required",
    CARD_NUMBER_MIN: "Min length is " + VALIDATIONS.CARD_NUMBER,
    CARD_NUMBER_MAX: "Max length is " + VALIDATIONS.CARD_NUMBER,

    CVV_REQUIRED: "Cvv is requried",
    CVV_MIN: "Min length is " + VALIDATIONS.CVV,
    CVV_MAX: "Max length is " + VALIDATIONS.CVV,

    VERIFICATION_CODE: "Length is " + VALIDATIONS.VERIFICATION_CODE,
    INVALID_FORMAT: "Invalid format",

    FILE_REQUIRED: "File is required",

    SELECT_USER_REQUIRED: "Select a user to continue"
}

export const SPECIAL_CHARACTER_ARRAY = [
    "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", ";", ":", "'", '"', "\\", "|", "<", ",", ">", ".", "?", "/"
]

export const SPECIAL_CHARACTER_ARRAY_FOR_ADDRESS = [
    "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "{", "}", "[", "]", ";", ":", "'", '"', "\\", "|", "<", ">", ".", "?", "/"
]

export const CHARACTER_ARRAY_FOR_NUMBER_INPUT = [
    "e", "E", "-", "+", "."
]