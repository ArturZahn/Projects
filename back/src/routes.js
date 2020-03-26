const express = require('express');
const OngControllers = require('./controllers/ongsControllers');
const IncidentControllers = require('./controllers/incidentControllers');
const ProfileControllers = require('./controllers/profileControllers');
const SessionControllers = require('./controllers/sessionControllers');
const routes = express.Router();

routes.get("/ongs", OngControllers.index);
routes.post("/ongs", OngControllers.create);

routes.get("/incidents", IncidentControllers.index);
routes.post("/incidents", IncidentControllers.create);
routes.delete("/incidents/:id", IncidentControllers.delete);

routes.get("/profile", ProfileControllers.index);

routes.post("/sessions", SessionControllers.create);

module.exports = routes;