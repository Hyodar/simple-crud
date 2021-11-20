
const httpStatus = require("http-status");
const { Occupation } = require("../config/sequelize").getDb();
const APIError = require("../helpers/api_error");

class OccupationController {
    async getAll(req, res, next) {
        const occupations = await Occupation.findAll();

        return res.status(httpStatus.OK).send(occupations);
    }

    async create(req, res, next) {
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

    async update(req, res, next) {
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

    async destroy(req, res, next) {
        const occupation = await Occupation.findByPk(req.body.id);

        if (!occupation) {
            const err = new APIError("Invalid occupation ID", httpStatus.BAD_REQUEST);
            return next(err);
        }

        occupation.destroy();

        return res.status(httpStatus.OK).send();
    }
}

module.exports = OccupationController;
