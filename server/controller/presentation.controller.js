
const httpStatus = require("http-status");
const { Presentation, Participant } = require("../config/sequelize");
const APIError = require("../helpers/api_error");

async function getAll(req, res, next) {
    const presentations = await Presentation.findAll({
        include: [Participant],
    });

    return res.status(httpStatus.OK).send(presentations);
}

async function create(req, res, next) {
    let presentation;
    try {
        presentation = await Presentation.create({
            title: req.body.title,
        });
    }
    catch (err) {
        const apiErr = new APIError(err.toString(), httpStatus.BAD_REQUEST);
        return next(apiErr);
    }

    const participants = await Participant.findAll({
        where: {
            id: req.body.participants || [],
        },
    });

    await presentation.setParticipants(participants);

    return res.status(httpStatus.OK).send(await Presentation.findByPk(presentation.id, { include: [Participant] }));
}

async function update(req, res, next) {
    const presentation = await Presentation.findByPk(req.body.id, {
        include: [Participant],
    });

    if (!presentation) {
        const err = new APIError("Invalid presentation ID", httpStatus.BAD_REQUEST);
        return next(err);
    }

    try {
        presentation.update({
            title: req.body.title,
        });
    }
    catch (err) {
        const apiErr = new APIError(err.toString(), httpStatus.BAD_REQUEST);
        return next(apiErr);
    }

    const participants = await Participant.findAll({
        where: {
            id: req.body.participants || [],
        },
    });

    await presentation.setParticipants(participants);

    return res.status(httpStatus.OK).send(presentation);
}

async function destroy(req, res, next) {
    const presentation = await Presentation.findByPk(req.body.id);

    if (!presentation) {
        const err = new APIError("Invalid presentation ID", httpStatus.BAD_REQUEST);
        return next(err);
    }

    presentation.destroy();

    return res.status(httpStatus.OK).send();
}

module.exports = {
    getAll,
    create,
    update,
    destroy,
};
