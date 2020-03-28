const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngControllers = require('./controllers/ongsControllers');
const IncidentControllers = require('./controllers/incidentControllers');
const ProfileControllers = require('./controllers/profileControllers');
const SessionControllers = require('./controllers/sessionControllers');

const routes = express.Router();

routes.get("/ongs", OngControllers.index);

routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngControllers.create);

routes.get("/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentControllers.index);

routes.post("/incidents", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), IncidentControllers.create);

routes.delete("/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentControllers.delete);

routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileControllers.index);

routes.post("/sessions", SessionControllers.create);

module.exports = routes;