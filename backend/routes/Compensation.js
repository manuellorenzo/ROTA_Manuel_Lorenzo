const express = require('express');
const compensationController = require('../controllers/Compensation');
let router = express.Router();

router.post('/addCompensation', compensationController.addCompensation);
router.get('/getCompensations', compensationController.getCompensations);
router.put('/editCompensation', compensationController.editCompensation);
router.delete('/deleteCompensation/:id', compensationController.removeCompensation);
router.get('/getCompensation/:id', compensationController.getCompensation);

module.exports=router;