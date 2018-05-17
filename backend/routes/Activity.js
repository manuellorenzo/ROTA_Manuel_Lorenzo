const express = require('express');
const activityController = require('../controllers/Activity');
let router = express.Router();

router.post('/new', activityController.addActivity);
router.get('/list', activityController.listActivities);
router.put('/edit', activityController.editActivity);
router.delete('/delete/:id', activityController.deleteActivity);
router.get('/findActivity/:id', activityController.findOneActivity);

module.exports = router;