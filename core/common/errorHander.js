const logger = require('./logger');
exports.customError = (customcode, err, errmsg, logerr) => {
    const errorCode = Math.floor(100000 + Math.random() * 90000);
    logger.error(`Error no =># ${errorCode} # Msg=> ${errmsg} --- `, logerr);
    return {
        status: customcode,
        message: err.message,
        API_code: errorCode,
    }
}