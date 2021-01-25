const movieService = {};
const customError = require('../../core/common/errorHander');
const movieModel = require('./index');
const schemavalidate = require('./validationSchema');
const Constants = require('../../Constants');

movieService.movieList = async function (reqObj, res) {
    const { userId } = reqObj;
    try {
        const movieData = await movieModel.find({
            is_active: Constants.active
        })
            .select({ "__v": 0 })
            .lean()
        return res.json({ status: Constants.statusOK_code, message: Constants.statusOK_msg, data: movieData });
    } catch (err) {
        const errmsg = `Some error occured in movie.movieList for user ${userId || 0} with data ${reqObj.body.mobileEmail} `
        let error = customError.customError(Constants.statusissue_code, new Error(Constants.issue_msg), errmsg, err);
        return res.json(error);
    }
}

movieService.createMovie = async function (reqObj, res) {
    try {
        const { name, img, summary } = reqObj.body;
        let checkmsg = null;
        await schemavalidate.createMovie.validate(reqObj.body).catch(async (err) => {
            checkmsg = err.message;
        });
        if (checkmsg) {
            const errmsg = `In movie.createMovie error occured while yup validation ${checkmsg}`;
            let error = customError.customError(Constants.statusvalidation_code, new Error(checkmsg), errmsg, null);
            return res.json(error);
        } else {
            let movieData = new movieModel({
                name,
                img,
                summary,
                is_active: Constants.active,
                created_by: "createMovie"
            });
            await movieData.save()
                .then(() => {
                    return res.json({ status: Constants.statusOK_code, message: Constants.statusOK_msg });
                })
        }
    } catch (err) {
        const errmsg = `Some error occured in movie.createMovie for user ${userId || 0} with data ${JSON.stringify(reqObj.body)} `
        let error = customError.customError(Constants.statusissue_code, new Error(Constants.issue_msg), errmsg, err);
        return res.json(error);
    }
}


module.exports = movieService;
