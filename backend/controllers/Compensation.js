'use strict'

const path = require('path');
const fs = require('fs');

const Compensation = require('../models/Compensation');

function addCompensation(req,res){

    let compensation=new Compensation({
        payment:{
            amount: req.body.payment.amount,
            type: req.body.payment.type,
            date: req.body.payment.date
        },
        worker:req.body.worker,
        startTime: req.body.startTime,
        duration: req.body.duration,
        workReference: req.body.workReference
    });
    console.log(compensation)
    compensation.save((err, result)=>{
        if (err){
            return res.status(500).jsonp({error: 500, message: `${err.message}`});
        }
        return res.status(201).jsonp(result);

    })
}

function getCompensation(req, res){
    const compensationId = req.params.id;

    Compensation.findById(compensationId, (err, compensation)=>{
        if (err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if (!compensation){
                res.status(404).send({message:'La compensación no existe.'})
            }else{
                res.status(200).send({compensation});
            }
        }
    })
}

function editCompensation (req, res){
    Compensation.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, compensation){
        if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!compensation){
				res.status(404).send({message: 'No se ha actualizado la compensacion'});
			}else{
				res.status(200).send({compensation: compensation});
			}
		}
    });
}

function removeCompensation(req, res){
    const compensationId = req.params.id;

    Compensation.findByIdAndRemove(compensationId, (err, compensationRemoved)=>{
        if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!compensationRemoved){
				res.status(404).send({message: 'No se ha borrado la compensación'});
			}else{
				res.status(200).send({compensation: compensationRemoved});
			}
		}
    })
}

function getCompensationByWorker(req, res){
    Compensation.find({worker:req.params.workerId}, (err, result)=>{
        console.log(req.params.workerId)
        if (err){
            return res.status(500).jsonp({error:500, message : `${err.message}`})
        }
        if (result && result.length){
            res.status(200).jsonp(result);
        }else{
            res.sendStatus(404);
        }
    })
}

function getCompensationByActivity(req, res){
    Compensation.find({activity:req.params.activityId}, (err, result)=>{
        if (err){
            return res.status(500).jsonp({error:500, message : `${err.message}`})
        }
        if (result && result.length){
            res.status(200).jsonp(result);
        }else{
            res.sendStatus(404);
        }
    })
}

function getCompensations (req, res){
    Compensation.find().select().exec((err, result)=>{
        if (err){
            return res.status(500).jsonp({error:500, message : `${err.message}`})
        }
        if (result && result.length){
            res.status(200).jsonp(result);

        }else{
            res.sendStatus(404);
        }
    })
}

module.exports={
    getCompensation,
    editCompensation,
    removeCompensation,
    getCompensations,
    addCompensation,
    getCompensationByWorker,
    getCompensationByActivity
};