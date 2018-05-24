const Event = require('../models/Event');
const Worker = require('../models/Worker');
const Activity = require('../models/Activity');
const moment = require('moment');
const workerController = require('../controllers/Worker');

module.exports.addEvent = (req, res) => {
    Worker.findOne({_id: req.body.workerId}, function (err, worker) {
        if (err) {
            return res.status(500).jsonp({error: 500, message: `${err.message}`});
        }

        let event = new Event({
            start: req.body.start,
            end: req.body.end,
            title: req.body.title,
            type: req.body.type,
            workerId: worker,
            compensations: req.body.compensations
        });
        event.save((err, result) => {
            if (err)
                return res.status(500).jsonp({error: 500, message: `${err.message}`});

            return res.status(200).jsonp(result);
        })
    })

};

module.exports.listEvent = (req, res) => {
    Event.find().exec((err, result) => {
        if (err)
            return res.status(500).jsonp({error: 500, message: `${err.message}`});

        if (result.length > 0) {
            return res.status(200).jsonp(result);
        } else {
            return res.sendStatus(404);
        }
    })
};

module.exports.editEvent = (req, res) => {
    Event.findByIdAndUpdate(req.body.id, req.body, {new: true}, function (err, event) {
        if (err) {
            return res.status(400).jsonp({error: 500, message: `${err.message}`})
        }

        event.save((err, result) => {
            if (err)
                return res.status(500).jsonp({error: 500, message: `${err.message}`});

            return res.status(201).jsonp(result);
        })
    });
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
            return res.sendStatus(204)
        });
    });
};

module.exports.findOneEvent = (req, res) => {
    Event.find({_id: req.params._id}, (err, event) => {
        if (event === undefined)
            return res.status(500).jsonp({
                error: 500,
                message: `${err.message}`
            });
        return res.status(200).jsonp(event);
    })
};

module.exports.autoSchedule = function (req, res) {
    let start = moment(req.body.start, 'YYYY-MM-DD');
    let end = moment(req.body.end, 'YYYY-MM-DD');

    let seconds = moment.duration(end.diff(start));
    let event;
    let fechaActual = start;
    let arrayDias = [];
    let addedEvents = [];
    while (fechaActual.format("YYYY-MM-DD") <= end.format("YYYY-MM-DD")) {
        console.log("DE VERDAD", moment(fechaActual))
        arrayDias = [...arrayDias, moment(fechaActual)];
        fechaActual = moment(fechaActual.add(1, 'days'));
    }
    let onCall = [];
    Worker.find({onCall: true, inactive: false}, function (err, worker) {
        if (err)
            return `${err.message}`
        return worker;
    }).then(result => result.length > 0 ? autoScheduleArrays(result) : [])
        .then((result) => {
                let eventos = [];
                let eventoSingle = {};
                let ES = ['Mo', 'Tu', 'We', 'Th'];
                let FS = ['Fr', 'Sa', 'Su'];
                let contadorArray = 0;
                if (result.length >= 3) {
                    Promise.all(arrayDias.map(item => {
                        if (ES.includes(moment(item).format('dd'))) {
                            eventoSingle = {
                                start: moment(item).format("YYYY-MM-DD"),
                                end: moment(item).format("YYYY-MM-DD"),
                                title: result[0][contadorArray].name,
                                type: 'On Call',
                                workerId: result[0][contadorArray]._id,
                                compensation: []
                            };
                            //ADD
                            event = new Event(eventoSingle);
                            event.save();
                            addedEvents.push(eventoSingle);
                        } else {
                            eventoSingle = {
                                start: moment(item).format("YYYY-MM-DD"),
                                end: moment(item).format("YYYY-MM-DD"),
                                title: result[1][contadorArray].name,
                                type: 'On Call',
                                workerId: result[1][contadorArray]._id,
                                compensation: []
                            };
                            //ADD
                            event = new Event(eventoSingle);
                            event.save();
                            addedEvents.push(eventoSingle);
                            if (moment(item).format('dd') === 'Sa') {
                                eventoSingle = {
                                    start: moment(item).format("YYYY-MM-DD"),
                                    end: moment(item).format("YYYY-MM-DD"),
                                    title: result[2][contadorArray].name,
                                    type: 'On Call',
                                    workerId: result[2][contadorArray]._id,
                                    compensation: []
                                }
                                //ADD
                                event = new Event(eventoSingle);
                                event.save();
                                addedEvents.push(eventoSingle);
                            }
                            if (moment(item).format('dd') === 'Su') {
                                if (contadorArray >= result[0].length - 1) {
                                    contadorArray = 0;
                                } else {
                                    contadorArray++;
                                }
                            }
                        }
                    })).then(() => res.status(201).jsonp(addedEvents))
                } else {
                    return res.status(404).jsonp("No se encuentra ningún trabajador on call");
                }
            }
        );


};

function autoScheduleArrays(arrayOnCall) {
    let base = arrayOnCall;
    let entreSemana = [...base];
    let finDeSemana = [...base];
    let SegundoSabado = [...base];
    base.map((itemA, indexA) => {
        if (indexA - 1 < 0) {
            finDeSemana[finDeSemana.length - 1] = itemA;
        } else {
            finDeSemana[indexA - 1] = itemA;
        }
    });
    base.map((itemA, indexA) => {
        if (indexA + 1 >= SegundoSabado.length) {
            SegundoSabado[0] = itemA;
        } else {
            SegundoSabado[indexA + 1] = itemA;
        }
    });
    return [base, finDeSemana, SegundoSabado];
}