const yup = require('yup');
const Constants = require('../../Constants');

const schemavalidate = {};

schemavalidate.login = yup.object().shape({
  mobileEmail: yup.string()
    .typeError(`Mobile/Email${Constants.string_error}`)
    .trim()
    .required(`Mobile/Email${Constants.required_error}`),
  password: yup.string()
    .trim()
    .required(`Password${Constants.required_error}`)
    .min(Constants.passLength, Constants.passLength_error),
});

schemavalidate.createUser = yup.object().shape({
  first_name: yup.string()
    .typeError(`First Name${Constants.string_error}`)
    .trim()
    .required(`First Name{Constants.required_error}`),
  last_name: yup.string()
    .typeError(`Last Name${Constants.string_error}`)
    .trim()
    .required(`Last Name{Constants.required_error}`),
  email: yup.string()
    .typeError(`Email${Constants.string_error}`)
    .trim()
    .email(`Email${Constants.emailformat_error}`)
    .required(`Email${Constants.required_error}`),
  mobile: yup.number()
    .typeError(`Mobile${Constants.number_error}`)
    .min(1000000000, Constants.mobileLength_error)
    .max(9999999999, Constants.mobileLength_error)
    .required(`Mobile${Constants.required_error}`),
  password: yup.string()
    .typeError(`Password${Constants.string_error}`)
    .trim()
    .required(`Password${Constants.required_error}`)
    .min(Constants.passLength, Constants.passLength_error),
  roleType: yup.number()
    .typeError(`Role${Constants.number_error}`)
    .min(1, "Role must be 1 or 2")
    .max(2, "Role must be 1 or 2")
    .required(`Role${Constants.required_error}`),
});
module.exports = schemavalidate;
