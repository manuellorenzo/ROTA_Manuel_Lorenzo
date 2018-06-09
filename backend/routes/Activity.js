const express = require('express');
const activityController = require('../controllers/Activity');
let router = express.Router();
const authController = require('../controllers/Auth');

router.post('/new',authController.checkJWT, activityController.addActivity);
router.get('/list',authController.checkJWT, activityController.listActivities);
router.put('/edit/:id',authController.checkJWT, activityController.editActivity);
router.delete('/delete/:id',authController.checkJWT, activityController.deleteActivity);
router.get('/findActivity/:_id',authController.checkJWT, activityController.findOneActivity);

module.exports = router;