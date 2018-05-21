const express = require('express');
const activityController = require('../controllers/Activity');
let router = express.Router();

router.post('/new', activityController.addActivity);
router.get('/list', activityController.listActivities);
router.put('/edit/:id', activityController.editActivity);
router.delete('/delete/:id', activityController.deleteActivity);
router.get('/findActivity/:_id', activityController.findOneActivity);

module.exports = router;