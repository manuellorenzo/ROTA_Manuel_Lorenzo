const express = require('express');
const workerController = require('../controllers/Worker');
const authController = require('../controllers/Auth');
let router = express.Router();

router.post('/new',authController.checkJWT, workerController.addWorker);
router.get('/list', authController.checkJWT, workerController.listWorker);
router.put('/edit',authController.checkJWT, workerController.editWorker);
router.put('/delete/:id',authController.checkJWT, workerController.deleteWorker);
router.put('/addOnCallWorker/:id',authController.checkJWT, workerController.addOncallWorker);
router.put('/removeOnCallWorker/:id',authController.checkJWT, workerController.removeOncallWorker);
router.get('/findWorker/:_id',authController.checkJWT, workerController.findOneWorker);
router.get('/findWorkerOnCall',authController.checkJWT, workerController.findWorkerOnCall);
router.get('/findWorkerAndCompensation/:year/:month',authController.checkJWT, workerController.findWorkerAndCompensation);
router.get('/calcularMedia/:year/:month',authController.checkJWT, workerController.calcularMedia);

module.exports = router;