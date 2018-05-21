'use strict'

var path = require('path');
var fs = require('fs');

var Configuration = require('../models/Configuration');

function addConfiguration(req, res){
    let config=new Configuration({
        nightStartTime:req.body.nightStartTime,
        nightEndTime: req.body.nightEndTime,
        onCallWeekMoney:req.body.onCallWeekMoney,
        onCallWeekendMoney:req.body.onCallWeekendMoney,

        bfNtWeekMoneyMult:req.body.bfNtWeekMoneyMult,
        bfNtWeekTimeMult:req.body.bfNtWeekTimeMult,
        bfNtWeekendMoneyMult:req.body.bfNtWeekendMoneyMult,
        bfNtWeekendTimeMult:req.body.bfNtWeekendTimeMult,

        afNtWeekMoneyMult:req.body.afNtWeekMoneyMult,
        afNtWeekTimeMult:req.body.afNtWeekTimeMult,
        afNtWeekendMoneyMult:req.body.afNtWeekendMoneyMult,
        afNtWeekendTimeMult:req.body.afNtWeekendTimeMult
    })

    config.save((err, result)=>{
        if (err){
            return res.status(500).jsonp({error: 500, message: `${err.message}`});
        }
        return res.status(201).jsonp(result);

    })


}

function getConfiguration(req, res){
    Configuration.find().select().exec((err, result)=>{
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

function getOneConfiguration(req, res){
    var configId=req.params.id;

    Configuration.findById(configId, (err, config)=>{
        if (err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if (!compensation){
                res.status(404).send({message:'La config no existe.'})
            }else{
                res.status(200).send({config});
            }
        }
    })
}

function removeConfiguration(req, res){
    var configId=req.params.id;

    Configuration.findByIdAndRemove(configId, (err, configRemoved)=>{
        if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!configRemoved){
				res.status(404).send({message: 'No se ha borrado la configuracion'});
			}else{
				res.status(200).send({compensation: configRemoved});
			}
		}
    })

}

function editConfig(req, res){
    Configuration.findByIdAndUpdate(req.body._id, req.body, {new:true}, function(err, config){
        if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!config){
				res.status(404).send({message: 'No se ha actualizado la config'});
			}else{
				res.status(200).send({config: config});
			}
		}
    });
}

module.exports={
    getConfiguration,
    addConfiguration,
    getOneConfiguration,
    editConfig,
    removeConfiguration
}

