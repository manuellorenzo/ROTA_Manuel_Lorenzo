const Activity = require('../models/Activity');

module.exports.addActivity = (req, res) => {

    let activity = new Activity({
        startTime: req.body.startTime,
        duration: req.body.duration,
        workReference: req.body.workReference
    });

    activity.save((err, result) => {
        if (err)
            return res.status(500).jsonp({error: 500, message: `${err.message}`});

        return res.status(201).jsonp(result);
    });
};

module.exports.listActivities = (req, res) => {
    Activity.find().select().exec((err, result) => {
        if (err)
            return res.status(500).jsonp({error: 500, mensaje: `${err.message}`});

        if (result && result.length) {
            res.status(200).jsonp(result);
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.editActivity = (req, res) => {
    Activity.findByIdAndUpdate(req.body.id, req.body, {new:true}, function (err, activity) {
        if (err) {
            return res.status(400).jsonp({error: 500, message: `${err.message}`})
        }

        activity.save((err, result) => {
            if (err)
                return res.status(500).jsonp({error: 500, message: `${err.message}`});

            return res.status(201).jsonp(result);
        });
    });
};

module.exports.deleteActivity = (req, res) => {
    Activity.findById(req.params.id, function (err, activity) {
        if (activity === undefined)
            return res.sendStatus(404);

        activity.remove((err) => {
            if (err)
                return res.status(500).jsonp({error: 500, message: `${err.message}`});
            res.sendStatus(204);
        })
    })
};

module.exports.findOneActivity = (req, res) => {
      Activity.find({_id: req.params._id}, (err, activity) => {
          if (activity === undefined)
              return res.status(500).jsonp({
                  error: 500,
                  message: `${err.message}`
              });
          res.status(200).jsonp(activity);
      })
};

