const express = require('express');
const eventController = require('../controllers/Event');
let router = express.Router();

router.post('/new', eventController.addEvent);
router.get('/list', eventController.listEvent);
router.update('/edit', eventController.editEvent);
router.delete('/delete/:id', eventController.deleteEvent);
router.get('/findEvent/:id', eventController.findOneEvent);

module.exports = router;