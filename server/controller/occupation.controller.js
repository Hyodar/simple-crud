
const httpStatus = require("http-status");
const { Occupation } = require("../config/sequelize");
const APIError = require("../helpers/api_error");

async function getAll(req, res, next) {
    const occupations = await Occupation.findAll();

    return res.status(httpStatus.OK).send(occupations);
}

async function create(req, res, next) {
    let occupation;
    try {
        occupation = await Occupation.create({
            name: req.body.name,
        });
    }
    catch (err) {
        const apiErr = new APIError(err.toString(), httpStatus.BAD_REQUEST);
        return next(apiErr);
    }

    return res.status(httpStatus.OK).send(occupation);
}

async function update(req, res, next) {
    const occupation = await Occupation.findByPk(req.body.id);

    if (!occupation) {
        const err = new APIError("Invalid occupation ID", httpStatus.BAD_REQUEST);
        return next(err);
    }

    try {
        occupation.update({
            name: req.body.name,
        });
    }
    catch (err) {
        const apiErr = new APIError(err.toString(), httpStatus.BAD_REQUEST);
        return next(apiErr);
    }

    return res.status(httpStatus.OK).send(occupation);
}

async function destroy(req, res, next) {
    const occupation = await Occupation.findByPk(req.body.id);

    if (!occupation) {
        const err = new APIError("Invalid occupation ID", httpStatus.BAD_REQUEST);
        return next(err);
    }

    occupation.destroy();

    return res.status(httpStatus.OK).send();
}

module.exports = {
    getAll,
    create,
    update,
    destroy,
};
