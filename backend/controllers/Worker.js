const Worker = require('../models/Worker');
const Event = require('../models/Event');
const moment = require('moment');

module.exports.addWorker = (req, res) => {

    let worker = new Worker({
        name: req.body.name,
        role: req.body.role,
        onCall: req.body.onCall,
        inactive: req.body.inactive
    });

    worker.save((err, result) => {
        if (err)
            return res.status(500).jsonp({error: 500, message: `${err.message}`});

        return res.status(201).jsonp(result);
    });
};

module.exports.listWorker = (req, res) => {
    Worker.find().select().exec((err, result) => {
        if (err)
            return res.status(500).jsonp({error: 500, message: `${err.message}`});

        if (result && result.length) {
            res.status(200).jsonp(result);
        } else {
            res.sendStatus(404);
        }
    })
};

module.exports.editWorker = (req, res) => {
    Worker.findByIdAndUpdate(req.body._id, req.body, {new:true}, function (err, worker) {
        if (err) {
            return res.status(400).jsonp({
                error: 500,
                message: `${err.message}`
            })
        }

        worker.save((err, result) => {
            if (err)
                return res.status(500).jsonp({error: 500, message: `${err.message}`});

            return res.status(201).jsonp(result);
        });
    });
};

module.exports.deleteWorker = (req, res) => {
    Worker.findByIdAndUpdate(req.params.id,{inactive: true}, function (err, worker) {
        if (worker === undefined){
            return res.sendStatus(404);
        }
        worker.save((err) => {
            if (err)
                return res.status(500).jsonp({
                    error: 500,
                    message: `${err.message}`
                });
            return res.status(201);
        });
    });
};

module.exports.findOneWorker = (req, res) => {
    Worker.find({_id: req.params._id}, (err, worker) => {
        if (worker === undefined)
            return res.status(500).jsonp({
                error: 500,
                message: `${err.message}`
            });
        res.status(200).jsonp(worker);
    })
};

module.exports.findWorkerOnCall = (req, res) => {
    Worker.find({onCall: true}, function (err, worker) {
        if (err)
            return res.status(500).jsonp({
                error: 500,
                message: `${err.message}`
            });
        res.status(200).jsonp(worker);
    })
};

//TODO conseguir buscar por mes y año
module.exports.findWorkerAndCompensation = (req, res) => {
    var startDate = moment(["2018", req.params.month - 1]);
    var endDate = moment(startDate).endOf('month');

    Event.find({start: {$gte:startDate, $lte: endDate}} , function (err, result) {
        if (err)
            return res.status(500).jsonp({error: 500, message: `${err.message}`});

        if (result && result.length) {
            res.status(200).jsonp(result);
        } else {
            res.sendStatus(404);
        }
    });
};