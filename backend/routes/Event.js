const express = require('express');
const eventController = require('../controllers/Event');
let router = express.Router();

router.post('/new', eventController.addEvent);
router.get('/list', eventController.listEvent);
router.put('/edit', eventController.editEvent);
router.delete('/delete/:id', eventController.deleteEvent);
router.get('/findEvent/:_id', eventController.findOneEvent);
router.post('/autoSchedule', eventController.autoSchedule);

module.exports = router;