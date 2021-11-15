
const httpStatus = require("http-status");
const { Participant, Occupation, Company } = require("../config/sequelize");
const APIError = require("../helpers/api_error");

async function getAll(req, res, next) {
    const participants = await Participant.findAll({
        include: [Occupation, Company],
    });

    return res.status(httpStatus.OK).send(participants);
}

async function create(req, res, next) {
    let participant;
    try {
        participant = await Participant.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }, {
            include: [Occupation, Company],
        });
    }
    catch (err) {
        const apiErr = new APIError(err.toString(), httpStatus.BAD_REQUEST);
        return next(apiErr);
    }

    if (req.body.occupation) {
        const [newOccupation, created] = await Occupation.findOrCreate({
            where: {
                name: req.body.occupation,
            },
            defaults: {
                name: req.body.occupation,
            },
        });

        await participant.setOccupation(newOccupation);
    }

    if (req.body.company) {
        const [newCompany, created] = await Company.findOrCreate({
            where: {
                name: req.body.company,
            },
            defaults: {
                name: req.body.company,
            },
        });

        await participant.setCompany(newCompany);
    }

    return res.status(httpStatus.OK).send(await participant.reload());
}

async function update(req, res, next) {
    const participant = await Participant.findByPk(req.body.id, {
        include: [Occupation, Company],
    });

    if (!participant) {
        const err = new APIError("Invalid participant", httpStatus.BAD_REQUEST);
        return next(err);
    }

    if (req.body.occupation && (participant.Occupation || {}).name !== req.body.occupation) {
        const [newOccupation, created] = await Occupation.findOrCreate({
            where: {
                name: req.body.occupation,
            },
            defaults: {
                name: req.body.occupation,
            },
        });

        await participant.setOccupation(newOccupation);
    }

    if (req.body.company && (participant.Company || {}).name !== req.body.company) {
        const [newCompany, created] = await Company.findOrCreate({
            where: {
                name: req.body.company,
            },
            defaults: {
                name: req.body.company,
            },
        });

        await participant.setCompany(newCompany);
    }

    await participant.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    return res.status(httpStatus.OK).send(await participant.reload());
}

async function destroy(req, res, next) {
    const deleted = !!await Participant.destroy({
        where: {
            id: req.body.id,
        },
    });

    if (deleted) {
        return res.status(httpStatus.OK).send();
    }
    else {
        return res.status(httpStatus.BAD_REQUEST).send();
    }
}

module.exports = {
    create,
    getAll,
    update,
    destroy,    
};
