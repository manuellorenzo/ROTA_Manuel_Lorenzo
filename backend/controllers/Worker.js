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

module.exports.findWorkerAndCompensation = (req, res) => {
    const startDate = moment([req.params.year, req.params.month - 1]);
    const endDate = moment(startDate).endOf('month');

     Event.find({start: {$gte:startDate, $lte: endDate}}).then((result, err) =>
         Promise.all(result.map(item => Compensation.find({worker: item.workerId})
         )).then((result) => res.status(201).jsonp(result)))
};