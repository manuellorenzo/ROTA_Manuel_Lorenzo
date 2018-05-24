const express = require('express');
const workerController = require('../controllers/Worker');
let router = express.Router();

router.post('/new', workerController.addWorker);
router.get('/list', workerController.listWorker);
router.put('/edit', workerController.editWorker);
router.put('/delete/:id', workerController.deleteWorker);
router.put('/addOnCallWorker/:id', workerController.addOncallWorker);
router.put('/removeOnCallWorker/:id', workerController.removeOncallWorker);
router.get('/findWorker/:_id', workerController.findOneWorker);
router.get('/findWorkerOnCall', workerController.findWorkerOnCall);
router.get('/findWorkerAndCompensation/:year/:month', workerController.findWorkerAndCompensation);

module.exports = router;