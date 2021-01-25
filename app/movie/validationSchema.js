const yup = require('yup');
const Constants = require('../../Constants');

const schemavalidate = {};

schemavalidate.createMovie = yup.object().shape({
  name: yup.string()
    .typeError(`Movie Name${Constants.string_error}`)
    .trim()
    .required(`Movie Name${Constants.required_error}`),
});
module.exports = schemavalidate;
