const express = require('express');
const configurationController = require('../controllers/Configuration');
let router = express.Router();

router.get('/getConfiguration', configurationController.getConfiguration);
router.get('/getOneConfiguration/:id', configurationController.getConfiguration);
router.post('/addConfiguration', configurationController.addConfiguration);
router.put('/editConfiguration', configurationController.editConfig);
router.delete('/deleteConfiguration/:id', configurationController.removeConfiguration);

module.exports=router;
