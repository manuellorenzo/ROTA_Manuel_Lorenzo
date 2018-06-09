const express = require('express');
const authController = require('../controllers/Auth');
let router = express.Router();

router.post('/createJWT', authController.getJWT);
router.get('/checkJWT', authController.checkJWT);
module.exports = router;