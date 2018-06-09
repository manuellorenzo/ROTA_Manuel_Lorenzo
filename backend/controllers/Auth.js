const config = require('../config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

function getJWT(req, res) {
    console.log("GETJWT")
    var idToken = req.body.idToken;
    if (idToken !== null && idToken !== undefined) {
        admin.auth().verifyIdToken(idToken).then(decodedToken => {
            var token = jwt.sign({ id: decodedToken.uid, date: moment() }, config.secretKey, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        }).catch(err => res.status(500).send({ auth: false, token: '', error: err.message }))
    } else {
        res.status(500).send({ auth: false, token: '', error: 'Invalid id token' });
    }
}

function checkJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        console.log("CHECK JWT TOKEN -- ",token)
        next()
    });
}

module.exports = {
    getJWT,
    checkJWT
}