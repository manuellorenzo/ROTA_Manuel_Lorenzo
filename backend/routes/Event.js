const express = require('express');
const eventController = require('../controllers/Event');
let router = express.Router();
const authController = require('../controllers/Auth');

router.post('/new',authController.checkJWT, eventController.addEvent);
router.get('/list',authController.checkJWT, eventController.listEvent);
router.put('/edit',authController.checkJWT, eventController.editEvent);
router.delete('/delete/:id',authController.checkJWT, eventController.deleteEvent);
router.get('/findEvent/:_id',authController.checkJWT, eventController.findOneEvent);
router.get('/findEventByWorker/:workerId',authController.checkJWT, eventController.findEventByWorker);
router.post('/autoSchedule',authController.checkJWT, eventController.autoSchedule);
router.get('/findCompensationById/:compensationId',authController.checkJWT, eventController.findEventByCompensation);

module.exports = router;