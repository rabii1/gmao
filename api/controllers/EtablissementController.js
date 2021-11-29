/**
 * EtablissementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    createEtablissement: async (req, res) => {
        let nomEtab = req.body.nomEtab;
        let numtelephone=req.body.numtelephone;
        let activite = req.body.activite;
        let techniciens= req.body.techniciens;
        let superAdmins= req.body.superAdmins;
        let Admins= req.body.Admins;
        try{
             etablissement = await Etablissement.create(
                    {nomEtab:nomEtab,numtelephone:numtelephone, 
                    activite:activite,techniciens:techniciens,
                    superAdmins:superAdmins,Admins:Admins})
            
                res.send( {
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(etablissement);
                
        }  
        catch(error){
            console.log(etablissement);
            res.send(500, {error:'Database error'});
            res.status(status).send(body)
        }
    },
    
    add: function(req, res){
        res.json(etablissement);            
    
    },
    
                /*****************get all **************************/ 
    
       
        getAllEtablissement:function(req, res){
            //res.view('list');
            Etablissement.find({}).exec(function(err, etablissement){
                if(err){
                    res.send(500, {error:'Database Error'});
                }
                res.send({
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(etablissement)
    
            });
        },
                /*****************get by id **************************/ 
    
    getEtablissementById: (req, res) => {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Etablissement.findOne({id: req.param('id')}).exec((error, etablissement) => {
                res.send(etablissement);
                return;
            });
        } else {
            res.send({
                success: false,
                status: 500,
                message: 'Error in request'
            });
            return;
        }
    },
    
                /*****************update Etablissement by id **************************/ 
    
    updateEtablissement: async(req, res) => {
      
       
        const nomEtab = req.body.nomEtab;
        const numtelephone=req.body.numtelephone;
        const activite = req.body.activite;
        try{
            console.log(req.body)
            etablissemen = await Etablissemen.update(   { id: req.body.id }, 
                                                    {nomEtab: req.body.nomEtab ,
                                                     numtelephone:req.body.numtelephone,
                                                     activite: req.body.activite,
                                         })
            res.send({
                success: true,
                status: 200,
                message: 'Successfully updated 1 row in database'
            });
        }
        catch(error){
            res.send({
                success: false,
                status: 500,
                message: 'Wrong data'
            });
        }
    },
                 /*****************delete  Etablissemen by id **************************/ 
    
    deleteEtablissemen: function(req, res) {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Etablissemen.destroy({id: req.param('id')}).exec((error) => {
                res.send({
                    success: true,
                    status: 200,
                    message: 'Successfully deleted 1 row in database'
                });
                return;
            });
        } else {
            res.send({
                success: false,
                status: 500,
                message: 'Unable to delete'
            });
            return;
        }
    }
    

};

