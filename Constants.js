
module.exports = Object.freeze({
    Invalid_user_msg: 'Invalid user',
    statusOK_msg: 'Success',
    fail_msg: 'Opeartion failed',
    issue_msg: 'Technical issue',
    access_denied_msg: 'Access Denied',
    invalidtoken_msg: 'Invalid token',
    notoken_msg: 'Token not provided',
    Incorrectpassword_msg: "Password is not correct",
    invalid_input_msg: 'Invalid Input ',
    oldPassIncorrect: 'Incorrect Old password',
    alreadyExist: 'Already Exist',
    uploadError: "Error while uploading file ",
    maxFile: "Maximum 5 file can be uploaded",

    statusOK_code: 200,
    statusinvaliduser_code: 313,
    statusfail_code: 501,
    statusissue_code: 502,
    statusvalidation_code: 311,
    statusinvalidinput_code: 312,

    //roleName
    roleUser: "user",
    roleAdmin: "admin",

    //roleId
    roleIdUser: "5fe4a09d5b80e012fea43fde",
    roleIdAdmin: "5fe4a0efcf0a7214682229bd",

    secret: "Nitesh",
    issuer: "baseNode",
    saltRounds: 12,

    active: 1,
    inactive: 0,
    reject: 2,
    pending: 3,

    //Length validation
    otpLength: 4,
    passLength: 6,
    maxpassLength: 15,

    otp_msg: 'OTP to change password is <<otp>>. ',
    otp: 'OTP generated Successfully',

    dbUrl: "mongodb://127.0.0.1:27017/demoDb",
    saltRounds: 10,
    // Validation messages(Yup)
    integer_error: ' Must be a integer',
    string_error: ' Must be a string',
    required_error: ' is required',
    otpLength_error: 'Otp length must be 4',
    passLength_error: ' Minimun password length is 6',
    passmaxLength_error: ' Maximum password length is 9999999',
    mobileLength_error: ' Mobile length must be 10',
    compLength_error: ' Minimun Comp Name length is 3',
    compmaxLength_error: ' Maximum Comp Name length is 50',
    fcmTokenMaxLength_error: 'Maximum FcmToken length is 250',
    langMaxLength_error: 'Maximum lang length is 3',
    emailformat_error: ' Must be in a valid format',
    number_error: ' Must be a number',
    alphanumeric_error: ' Must be a alphanumeric character',
    typeLength_error: ' Type value must be 1 or 2',
    dateformat_error: 'Must be in a valid date format',
    date_error: 'Must be a date'
});
