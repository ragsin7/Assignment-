const userService = {};
const bcrypt = require("bcrypt");
const logger = require('../../core/common/logger');
const customError = require('../../core/common/errorHander');
const userModel = require('./index');
const schemavalidate = require('./validationSchema');
const authManager = require("../auth/auth");
const mongoose = require('mongoose');
const Constants = require('../../Constants');

userService.login = async function (reqObj, res) {
    try {
        const { mobileEmail, password } = reqObj.body;
        let checkmsg = null;
        await schemavalidate.login.validate(reqObj.body).catch(async (err) => {
            checkmsg = err.message;
        });
        if (checkmsg) {
            const errmsg = `In user.login error occured for data ${mobileEmail} while yup validation ${checkmsg}`;
            let error = customError.customError(Constants.statusvalidation_code, new Error(checkmsg), errmsg, null);
            return res.json(error);
        } else {
            const userData = await userModel.findOne({
                $and: [{ $or: [{ email: mobileEmail }, { mobile: mobileEmail }] },
                { is_active: Constants.active }]
            })
                .select({ "otp": 0, "__v": 0, "file_path": 0 })
                .lean()

            if (userData) {
                const correctPass = await bcrypt.compareSync(password || "b", userData.password || "a"); // bcrypt Comparing password with hashpwd
                if (correctPass) {
                    // return true if matched or else return false
                    delete userData.password; // Not required fields
                    const token = await authManager.generateToken(userData, {});
                    userData.token = token;
                    return res.json({ status: Constants.statusOK_code, message: Constants.statusOK_msg, data: userData });

                } else {
                    const errmsg = `In user.login ${mobileEmail}  was invalid user(Password not matched)`;
                    let error = customError.customError(Constants.statusvalidation_code, new Error(Constants.Incorrectpassword_msg), errmsg, null);
                    return res.json(error);
                }
            } else {
                const errmsg = `In user.login  ${mobileEmail} was invalid user(User does not exist) `;
                let error = customError.customError(Constants.statusinvaliduser_code, new Error(Constants.Invalid_user_msg), errmsg, null);
                return res.json(error);
            }
        }
    } catch (err) {
        const errmsg = `Some error occured in user.login for data ${reqObj.body.mobileEmail} `
        let error = customError.customError(Constants.statusissue_code, new Error(Constants.issue_msg), errmsg, err);
        return res.json(error);
    }
}

userService.createUser = async function (reqObj, res) {
    try {
        const { first_name, last_name, email, mobile, password, roleType } = reqObj.body;
        let checkmsg = null;
        await schemavalidate.createUser.validate(reqObj.body).catch(async (err) => {
            checkmsg = err.message;
        });
        if (checkmsg) {
            const errmsg = `In user.createUser error occured while yup validation ${checkmsg}`;
            let error = customError.customError(Constants.statusvalidation_code, new Error(checkmsg), errmsg, null);
            return res.json(error);
        } else {
            let hash = bcrypt.hashSync(password, Constants.saltRounds);
            let roleId = roleType == 1 ? new mongoose.Types.ObjectId(Constants.roleIdUser) : new mongoose.Types.ObjectId(Constants.roleIdAdmin);
            const userExistCheck = await userModel.findOne({
                $and: [{ $or: [{ email }, { mobile }] },
                { is_active: Constants.active }, { role: roleId }]
            })
                .select("-__v").select({ "otp": 0 })
                .lean()
            if (userExistCheck) {
                const errmsg = `In user.createUser user already exist with data ${JSON.stringify(reqObj.body)} `
                let error = customError.customError(Constants.statusissue_code, new Error(`User ${Constants.alreadyExist} with this email/mobile and role`), errmsg, null);
                return res.json(error);
            }
            else {
                let userData = new userModel({
                    role: roleId,
                    first_name,
                    last_name,
                    email,
                    mobile,
                    password: hash,
                    is_active: Constants.active,
                    created_by: "createUser"
                });
                await userData.save()
                    .then(() => {
                        return res.json({ status: Constants.statusOK_code, message: Constants.statusOK_msg });
                    })
            }
        }
    } catch (err) {
        const errmsg = `Some error occured in user.createUser for data ${JSON.stringify(reqObj.body)} `
        let error = customError.customError(Constants.statusissue_code, new Error(Constants.issue_msg), errmsg, err);
        return res.json(error);
    }
}

userService.userList = async function (reqObj, res) {
    try {
        const { roleId } = reqObj;
        const { firstName, lastName, email, mobile, } = reqObj.body;
        let filterCondition = [{ is_active: Constants.active },
        { role: roleId == Constants.roleIdUser ? new mongoose.Types.ObjectId(Constants.roleIdAdmin) : new mongoose.Types.ObjectId(Constants.roleIdUser) }];

        if (firstName)
            filterCondition.push({ first_name: { $regex: `^${firstName}`, $options: 'i' } })
        if (lastName)
            filterCondition.push({ last_name: { $regex: `^${lastName}`, $options: 'i' } })
        if (email)
            filterCondition.push({ email: { $regex: `^${email}`, $options: 'i' } })
        if (mobile)
            filterCondition.push({ mobile: { $regex: `^${mobile}`, $options: 'i' } })
        const userData = await userModel.find({
            $and: filterCondition
        })
            .select({ "otp": 0, "__v": 0, "role": 0, "password": 0 })
            .lean()
        return res.json({ status: Constants.statusOK_code, message: Constants.statusOK_msg, data: userData });


    } catch (err) {
        const errmsg = `Some error occured in user.userList for data ${reqObj.body.mobileEmail} `
        let error = customError.customError(Constants.statusissue_code, new Error(Constants.issue_msg), errmsg, err);
        return res.json(error);
    }
}

module.exports = userService;
