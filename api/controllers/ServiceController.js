/**
 * ServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    createService: async (req, res) => {
        let nom_service = req.body.nom_service;
        let techniciens=req.body.techniciens;
        let equipements =req.body.equipements;
        
        try{
          service = await Service.create(
                {nom_service:nom_service,techniciens:techniciens, equipements:equipements})
            
                res.send( {
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(service);
                
        }  
        catch(error){
            console.log(service);
            res.send(500, {error:'Database error'});
            res.status(status).send(body)
        }
    },
    
    add: function(req, res){
        res.json(service);            
    
    },
      /*****************get all **************************/ 
    
       
      getAllService:function(req, res){
        //res.view('list');
        Service.find({}).exec(function(err, service){
            if(err){
                res.send(500, {error:'Database Error'});
            }
            res.send({
                success: true,
                status: 200,
                message: 'Successfully getall row in database'
            });
            console.log(service)

        });
    },
            /*****************get by id **************************/ 

getServiceById: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Service.findOne({id: req.param('id')}).exec((error, service) => {
            res.send(service);
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

            /*****************update Service **************************/ 

updateService: async(req, res) => {
  
    const nom_service = req.body.nom_service;
    const techniciens=req.body.techniciens;
    const equipements = req.body.equipements;



    //const etablissement=req.body.etablissement;
    try{
        console.log(req.body)
        service = await Service.update(   { id: req.body.id }, 
                                      {nom_service: req.body.nom_service ,
                                        techniciens:req.body.techniciens,
                                        equipements: req.body.equipements,
                                
                                      //etablissement:req.body.etablissement
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
             /*****************delete  Service by id **************************/ 

deleteService: function(req, res) {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Service.destroy({id: req.param('id')}).exec((error) => {
            res.send({
                success: true,
                status: 200,
                message: 'Successfully deleted 1 row in database'
            });
        });
    } else {
        res.send({
            success: false,
            status: 500,
            message: 'Unable to delete'
        });
    }
},


    
deleteServicerWithequipementNoPermitted: function(req, res) {
    console.log(req.param('id'))
if (req.method == 'GET' && req.param('id', null) != null) {
    Equipement.find({service:req.param('id')}).exec((error, service) => {
        console.log(service);
         if (service.length == 0) {

            console.log('This service  has no associated Equipement');
            // Service.destroy({id:req.param('id')}).exec(function(service) {
            // }); 
            res.json({action:"oui"})
       }
       else {
 
            console.log('This service  has  associated piece rechange');
             res.json({action:"non",data:service})
              return true;        
            

        }  
    } )
 }
       
},  
       
};

