const Event = require('../models/Event');
const Worker = require('../models/Worker');
const Activity = require('../models/Activity');

module.exports.addEvent = (req, res) => {
    Worker.findOne({_id: req.body.workerId}, function (err, worker) {
        if (err) {
            return res.status(500).jsonp({error:500, message: `${err.message}`});
        }

        Activity.findOne({_id: req.body.activityId}, function (err, activity) {
            if (err) {
                return res.status(500).jsonp({error: 500, message: `${err.message}`});
            }

            let event = new Event({
                start: req.body.start,
                end: req.body.end,
                title: req.body.title,
                type: req.body.type,
                workerId: worker,
                activities: activity
            });
            event.save((err, result) => {
                if (err)
                    return res.status(500).jsonp({error: 500, message: `${err.message}`});

                res.status(200).jsonp(result);
            })
        })


    });

};

module.exports.listEvent = (req, res) => {
    Event.find().exec((err, result) => {
        if (err)
            return res.status(500).jsonp({error: 500, message: `${err.message}`});

        if (result && result.length) {
            res.status(200).jsonp(result);
        } else {
            res.sendStatus(404);
        }
    })
};

module.exports.editEvent = (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, event) {
        if (err) {
            return res.status(400).jsonp({error: 500, message: `${err.message}`})
        }
    });

    return res.status(200).jsonp({
        start: req.body.start,
        end: req.body.end,
        title: req.body.title,
        type: req.body.type,
        workerId: req.body.workerId,
        activities: req.body.activities
    })
};

module.exports.deleteEvent = (req, res) => {
    Event.findById(req.params.id, function (err, event) {
        if (event === undefined)
            return res.sendStatus(404);

        event.remove((err) => {
            if (err)
                return res.status(500).jsonp({
                    error: 500,
                    message: `${err.message}`
                });
            res.sendStatus(204)
        })
    })
};

module.exports.findOneEvent = (req, res) => {
    Event.findById(req.params.id, function (err, event) {
        if (err)
            return res.status(500).jsonp({error: 500, message: `${err.message}`});
        res.status(200).jsonp(event);
    })
};