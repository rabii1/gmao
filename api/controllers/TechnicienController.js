/**
 * TechnicienController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
              /*****************create Technicien **************************/ 

  createTechnicien: async (req, res) => {
    let nom = req.body.nom;
    let prenom=req.body.prenom;
    let email = req.body.email;
    let password=req.body.password;
    let grade=req.body.grade;
    let etablissement=req.body.etablissement;
    let service=req.body.service;
    let ordreinterventions=req.body.ordreinterventions;
    let tel=req.body.tel;

    try{
         technicien = await Technicien.create(
            {nom:nom,prenom:prenom, email:email,password:password,grade:grade,ordreinterventions:ordreinterventions,
                etablissement:etablissement,service:service,tel:tel})
        
            res.send( {
                success: true,
                status: 200,
                message: 'Successfully created 1 row in database'
            });
            console.log(technicien);

            
    }  
    catch(error){
        console.log(error);
        res.send(500, {error:'Database error'});
        res.status(status).send(body)
    }
},

add: function(req, res){
    res.json(technicien);            

},

            /*****************get all **************************/ 

   
    getAllTechnicien:function(req, res){
        //res.view('list');
        Technicien.find({}).exec(function(err, technicien){
            if(err){
                res.send(500, {error:'Database Error'});
            }
            res.send({
                success: true,
                status: 200,
                message: 'Successfully created 1 row in database'
            });
            console.log(technicien)

        });
    },
            /*****************get by id **************************/ 

getTechnicienById: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Technicien.findOne({id: req.param('id')}).populate('service').exec((error, technicien) => {
            res.send(technicien);
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





            /*****************update technicien by id **************************/ 

updateTechnicien: async(req, res) => {
  
    const nom = req.body.nom;
    const prenom=req.body.prenom;
    const email = req.body.email;
    const password=req.body.password;
    const grade=req.body.grade;
    const service=req.body.service;
    const tel=req.body.tel;
    const ordreinterventions=req.body.ordreinterventions;
    
    // const interventions=req.body.interventions;

    try{
        console.log(req.body)
        technicien = await Technicien.update(   { id: req.body.id }, 
                                      {nom: req.body.nom,
                                      prenom:req.body.prenom,
                                      email: req.body.email,
                                      password:req.body.password,
                                      grade:req.body.grade,
                                      service:req.body.service,
                                      tel:req.body.tel,
                                      ordreinterventions:req.body.ordreinterventions,

                                    
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
             /*****************delete  technicien by id **************************/ 

deleteTechnicien: function(req, res) {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Technicien.destroy({id: req.param('id')}).exec((error) => {
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





deleteTechnicienWithOrdreNoPermitted: function(req, res) {
    console.log(req.param('id'))
    if (req.method == 'GET' && req.param('id', null) != null) {
        Ordreintervention.find({technicien:req.param('id')}).exec((error, technicien) => {
            console.log(technicien);
           
             if (technicien.length == 0) {
    
                console.log('This Ordre intervention  has no associated technicien');
                res.json({action:"oui"})
                /*   Technicien.destroy({id:req.param('id')}).exec(function(technicien) {
    
                  
    
                });*/
              //  return true;   
           }
           else {
     
                console.log('This technicien  has  associated Ordre intervention');
                 res.json({action:"non",data:technicien})
              //    return true;        
                
    
            }  
        } )
     }
           
    },  

};

