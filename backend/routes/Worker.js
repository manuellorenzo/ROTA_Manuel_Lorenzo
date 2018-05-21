const express = require('express');
const workerController = require('../controllers/Worker');
let router = express.Router();

router.post('/new', workerController.addWorker);
router.get('/list', workerController.listWorker);
router.put('/edit', workerController.editWorker);
router.put('/delete/:id', workerController.deleteWorker);
router.get('/findWorker/:_id', workerController.findOneWorker);
router.get('/findWorkerOnCall', workerController.findWorkerOnCall);
router.get('/findWorkerAndCompensation/:values', workerController.findWorkerAndCompensation);

module.exports = router;