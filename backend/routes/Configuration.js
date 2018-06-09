const express = require('express');
const configurationController = require('../controllers/Configuration');
let router = express.Router();
const authController = require('../controllers/Auth');

router.get('/getConfiguration',authController.checkJWT, configurationController.getConfiguration);
router.get('/getOneConfiguration/:id',authController.checkJWT, configurationController.getConfiguration);
router.post('/addConfiguration',authController.checkJWT, configurationController.addConfiguration);
router.put('/editConfiguration',authController.checkJWT, configurationController.editConfig);
router.delete('/deleteConfiguration/:id',authController.checkJWT, configurationController.removeConfiguration);

module.exports=router;
