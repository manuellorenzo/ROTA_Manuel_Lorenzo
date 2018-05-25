const express = require('express');
const eventController = require('../controllers/Event');
let router = express.Router();

router.post('/new', eventController.addEvent);
router.get('/list', eventController.listEvent);
router.put('/edit', eventController.editEvent);
router.delete('/delete/:id', eventController.deleteEvent);
router.get('/findEvent/:_id', eventController.findOneEvent);
<<<<<<< HEAD
router.post('/prueba', eventController.prueba);
router.get('/findEventByWorker/:workerId', eventController.findEventByWorker);
=======
router.post('/autoSchedule', eventController.autoSchedule);
>>>>>>> 70877d67e171f969ba13be6e956cfc14a78cffd0

module.exports = router;