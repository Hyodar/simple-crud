
const httpStatus = require("http-status");
const { Company } = require("../config/sequelize").getDb();
const APIError = require("../helpers/api_error");

class CompanyController {
    async getAll(req, res, next) {
        const companies = await Company.findAll();

        return res.status(httpStatus.OK).send(companies);
    }

    async create(req, res, next) {
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

    async update(req, res, next) {
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

    async destroy(req, res, next) {
        const company = await Company.findByPk(req.body.id);

        if (!company) {
            const err = new APIError("Invalid company ID", httpStatus.BAD_REQUEST);
            return next(err);
        }

        company.destroy();

        return res.status(httpStatus.OK).send();
    }
}

module.exports = CompanyController;
