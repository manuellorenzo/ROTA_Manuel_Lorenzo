const express = require('express');
const compensationController = require('../controllers/Compensation');
let router = express.Router();
const authController = require('../controllers/Auth');

router.post('/addCompensation',authController.checkJWT, compensationController.addCompensation);
router.get('/getCompensations',authController.checkJWT, compensationController.getCompensations);
router.put('/editCompensation',authController.checkJWT, compensationController.editCompensation);
router.delete('/deleteCompensation/:id',authController.checkJWT, compensationController.removeCompensation);
router.get('/getCompensation/:id',authController.checkJWT, compensationController.getCompensation);
router.get('/getCompensationByWorker/:workerId',authController.checkJWT, compensationController.getCompensationByWorker);
router.get('/getCompensationByActivity/:activityId',authController.checkJWT, compensationController.getCompensationByActivity);


module.exports=router;