const Worker = require('../models/Worker');

module.exports.addWorker = (req, res) => {

    let worker = new Worker({
        name: req.body.name,
        role: req.body.role
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
    Worker.findByIdAndUpdate(req.params.id, req.body, {new:true}, function (err, worker) {
        if (err) {
            return res.status(400).jsonp({
                error: 500,
                message: `${err.message}`
            })
        }
    });

    return res.status(200).jsonp({
        name: req.body.name,
        role: req.body.role
    })
};

module.exports.deleteWorker = (req, res) => {
    Worker.findById(req.params.id, function (err, worker) {
        if (worker === undefined)
            return res.sendStatus(404);

        worker.remove((err) => {
            if (err)
                return res.status(500).jsonp({error: 500, message: `${err.message}`})
        })
    })
};

module.exports.findOneWorker = (req, res) => {
    Worker.findById(req.params.id, function (err, worker) {
        if (err)
            return res.status(500).jsonp({
                error: 500,
                message: `${err.message}`
            })
        res.status(200).jsonp(worker);
    })
};