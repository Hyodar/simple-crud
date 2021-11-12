
const httpStatus = require("http-status");
const { Company } = require("../config/sequelize");
const APIError = require("../helpers/api_error");

async function getAll(req, res, next) {
    const companies = await Company.findAll();

    return res.status(httpStatus.OK).send(companies);
}

async function create(req, res, next) {
    let company;
    try {
        company = await Company.create({
            name: req.body.name,
        });
    }
    catch (err) {
        const apiErr = new APIError(err.toString(), httpStatus.BAD_REQUEST);
        return next(apiErr);
    }

    return res.status(httpStatus.OK).send(company);
}

async function update(req, res, next) {
    const company = await Company.findByPk(req.body.id);

    if (!company) {
        const err = new APIError("Invalid company ID", httpStatus.BAD_REQUEST);
        return next(err);
    }

    try {
        company.update({
            name: req.body.name,
        });
    }
    catch (err) {
        const apiErr = new APIError(err.toString(), httpStatus.BAD_REQUEST);
        return next(apiErr);
    }

    return res.status(httpStatus.OK).send(company);
}

async function destroy(req, res, next) {
    const company = await Company.findByPk(req.body.id);

    if (!company) {
        const err = new APIError("Invalid company ID", httpStatus.BAD_REQUEST);
        return next(err);
    }

    company.destroy();

    return res.status(httpStatus.OK).send();
}

module.exports = {
    getAll,
    create,
    update,
    destroy,
};
