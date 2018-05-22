const Worker = require('../models/Worker');
const Event = require('../models/Event');
const Compensation = require('../models/Compensation');
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
            return res.status(200).jsonp(result);
        } else {
            return res.sendStatus(404);

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
<<<<<<< HEAD
        if (worker === undefined)
            return res.status(404).jsonp({
                status: 404,
                message: `${err.message}`
            });
=======
        if (worker === undefined){
            return res.sendStatus(404);
        }
>>>>>>> d12372304eaaf0b9020335006361a72e69e8cf4a
        worker.save((err) => {
            if (err)
                return res.status(500).jsonp({
                    status: 500,
                    message: `${err.message}`
                });
<<<<<<< HEAD
            return res.status(201).jsonp({
                status: 201,
                worker: worker
            });

=======
            return res.status(201);
>>>>>>> d12372304eaaf0b9020335006361a72e69e8cf4a
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
        return res.status(200).jsonp(worker);
    })
};

module.exports.findWorkerOnCall = (req, res) => {
    Worker.find({onCall: true}, function (err, worker) {
        if (err)
            return res.status(500).jsonp({
                error: 500,
                message: `${err.message}`
            });
        return res.status(200).jsonp(worker);
    })
};

module.exports.addOncallWorker = (req, res) => {
    Worker.findByIdAndUpdate(req.params.id, {onCall: true}, function (err, worker) {
        if (worker === undefined)
            return res.status(404).jsonp({
                status: 404,
                message: `${err.message}`
            });
        worker.save((err) => {
            if (err)
                return res.status(500).jsonp({
                    status: 500,
                    message: `${err.message}`
                });
            return res.status(201).jsonp({
                status: 201,
                worker: worker
            });

        });
    })
};

module.exports.removeOncallWorker = (req, res) => {
    Worker.findByIdAndUpdate(req.params.id, {onCall: false}, function (err, worker) {
        if (worker === undefined)
            return res.status(404).jsonp({
                status: 404,
                message: `${err.message}`
            });
        worker.save((err) => {
            if (err)
                return res.status(500).jsonp({
                    status: 500,
                    message: `${err.message}`
                });
            return res.status(201).jsonp({
                status: 201,
                worker: worker
            });

        });
    })
};

//TODO Cambiar y buscar todos los trabajadores con sus compensaciones si tienen
module.exports.findWorkerAndCompensation = (req, res) => {
    const startDate = moment(["2018", req.params.month - 1]);
    const endDate = moment(startDate).endOf('month');
    const workerComp = [];

    Event.find({start: {$gte:startDate, $lte: endDate}} , function (err, result) {
        if (err)
            return res.status(500).jsonp({error: 500, message: `${err.message}`});

        if (result && result.length) {
            for (let i = 0; result.length > i; i++) {
                Compensation.find({worker: result[i].workerId}, function (err, compensation) {
                    //workerComp.push(compensation);
                    console.log(compensation)
                    //return res.status(200).jsonp(compensation);
                })
            }
        } else {
            return res.sendStatus(404);
        }
        //return res.status(200).jsonp(workerComp);
    });
};