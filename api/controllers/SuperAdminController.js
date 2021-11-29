/**
 * SuperAdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

                  /*****************create SuperAdmin **************************/ 

    createSupAdmin: async (req, res) => {
        let nom = req.body.nom;
        let prenom=req.body.prenom;
        let email = req.body.email;
        let password=req.body.password;
        let tel=req.body.tel;
        let fax=req.body.fax;
        let etablissement=req.body.etablissement;
        try{
             superadmin = await SuperAdmin.create(
                {nom:nom,prenom:prenom, email:email,
                password:password,tel:tel,fax:fax,
                etablissement:etablissement})
            
                res.send( {
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(superadmin);
                console.log("request successful");

        }  
        catch(error){
            console.log(superadmin);
            res.send(500, {error:'Database error'});
            res.status(status).send(body)
        }
    },
    
    add: function(req, res){
        res.json(superAdmin);            
    
    },
    
                /*****************get all **************************/ 
    
       
        getAllSupAdmin:function(req, res){
            //res.view('list');
            SuperAdmin.find({}).exec(function(err, superadmin){
                if(err){
                    res.send(500, {error:'Database Error'});
                }
                res.send({
                    success: true,
                    status: 200,
                    message: 'Successfully getall row in database'
                });
                console.log(superadmin)
    
            });
        },
                /*****************get by id **************************/ 
    
    getSuperAdminById: (req, res) => {
        if (req.method == 'GET' && req.param('id', null) != null) {
            SuperAdmin.findOne({id: req.param('id')}).exec((error, superadmin) => {
                res.send(superadmin);
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
    
                /*****************update SuperAdmin by id **************************/ 
    
    updateSuperAdmin: async(req, res) => {
      
        const nom = req.body.nom;
        const prenom=req.body.prenom;
        const email = req.body.email;
        const password=req.body.password;
        const fax=req.body.fax;
        const tel=req.body.tel;


        //const etablissement=req.body.etablissement;
        try{
            console.log(req.body)
            superadmin = await SuperAdmin.update(   { id: req.body.id }, 
                                          {nom: req.body.nom ,
                                          prenom:req.body.prenom,
                                          email: req.body.email,
                                          password:req.body.password,
                                          fax:req.body.fax,
                                          tel:req.body.tel,
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
                 /*****************delete  SuperAdmin by id **************************/ 
    
    deleteSuperAdmin: function(req, res) {
        if (req.method == 'GET' && req.param('id', null) != null) {
            SuperAdmin.destroy({id: req.param('id')}).exec((error) => {
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
    },
   
    
    

};

