const jwt = require('jsonwebtoken');
const Constants = require(`../../Constants`);
const appSecret = Constants.secret;
const tokenIssuer = Constants.issuer;
const logger = require('../../core/common/logger')

exports.generateToken = (userData, options) => {
  const token = jwt.sign({
    userId: userData._id.toString(),
    roleId: userData.role.toString(),
    mobile: userData.mobile,
    userName: userData.first_name
  }, appSecret, {
    // expiresIn : options.expires || tokenExpiresIn,
    issuer: tokenIssuer,
  });
  return token;
};

exports.verifyToken = async (req, res, next) => {
  console.log('Verify token');
  let decoded = false;
  try {
    if (req.headers['access-token']) {
      decoded = await jwt.verify(req.headers['access-token'], appSecret);// Validating token (DECRYPT TOKEN)
    } else {
      logger.error('In verify token token was not provided ');// Token not provided in header
      const resp = {
        status: Constants.statusfail_code,
        message: Constants.notoken_msg,
      };
      return res.json(resp);
    }
  } catch (err) {
    logger.error('In verify token error occured while decoding token ', err);
    const resp = {
      status: Constants.statusfail_code,
      message: Constants.invalidtoken_msg,
    };
    return res.json(resp);
  }
  let isVerified = 0;

  if (decoded) { // Token validated and info was decoded
    try {
      let url = req.originalUrl;
      logger.info(url);
      let userRoleId = decoded.roleId;
      logger.info(userRoleId);
      if (userRoleId == Constants.roleIdAdmin && adminrole.includes(url)) {
        isVerified = 1;
      } else if (userRoleId == Constants.roleIdUser && userrole.includes(url)) {
        isVerified = 1;
      } else {
        isVerified = 0;
      }
    } catch (err) {
      logger.error('In verify token error occured while checking access ', err);
    }
  }

  if (isVerified === 0) {
    logger.error('In verify token access was denied ');
    const resp = {
      status: Constants.statusfail_code,
      message: Constants.access_denied_msg,
    };

    return res.json(resp);
  } if (isVerified === 1) { // all criteria passed and now decoding value from token
    req.roleId = decoded.roleId;
    req.userId = decoded.userId;
    req.mobile = decoded.mobile;
    req.userName = decoded.userName;

    return next();
  } else {
    logger.error('In verify token user was invalid or token was not provided');
    const resp = {
      status: Constants.statusfail_code,
      message: Constants.access_denied_msg,
    };
    return res.json(resp);
  }
};

