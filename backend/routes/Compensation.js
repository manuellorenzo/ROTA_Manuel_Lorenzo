const express = require('express');
const compensationController = require('../controllers/Compensation');
let router = express.Router();

router.post('/addCompensation', compensationController.addCompensation);
router.get('/getCompensations', compensationController.getCompensations);
router.put('/editCompensation/:id', compensationController.editCompensation);
router.delete('/deleteCompensation/:id', compensationController.removeCompensation);
router.get('/getCompensation/:id', compensationController.getCompensation);
router.get('/getCompensationByWorker/:workerId', compensationController.getCompensationByWorker);
router.get('/getCompensationByActivity/:activityId', compensationController.getCompensationByActivity);


module.exports=router;