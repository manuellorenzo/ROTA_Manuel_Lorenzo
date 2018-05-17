const express = require('express');
const workerController = require('../controllers/Worker');
let router = express.Router();

router.post('/new', workerController.addWorker);
router.get('/list', workerController.listWorker);
router.put('/edit', workerController.editWorker);
router.delete('/delete/:id', workerController.deleteWorker);
router.get('/findWorker/:id', workerController.findOneWorker);

module.exports = router;