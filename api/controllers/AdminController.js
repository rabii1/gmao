/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  /*****************create Admin **************************/ 

  createAdmin: async (req, res) => {
    let nom = req.body.nom;
    let prenom=req.body.prenom;
    let email = req.body.email;
    let password=req.body.password;
    let adresse=req.body.adresse;
    let tel=req.body.tel;
    let etablissement =req.body.etablissement;
    let demandeinterventions=req.body.demandeinterventions
    try{
      admin = await Admin.create(
            {nom:nom,prenom:prenom, email:email,demandeinterventions:demandeinterventions,
            password:password, adresse:adresse,tel:tel,
            etablissement:etablissement})
        
            res.send( {
                success: true,
                status: 200,
                message: 'Successfully created 1 row in database'
            });
            console.log(admin);
            
    }  
    catch(error){
        console.log(admin);
        res.send(500, {error:'Database error'});
        res.status(status).send(body)
    }
},

add: function(req, res){
    res.json(admin);            

},

            /*****************get all **************************/ 

   
    getAllAdmin:function(req, res){
        //res.view('list');
        Admin.find({}).exec(function(err, admin){
            if(err){
                res.send(500, {error:'Database Error'});
            }
            res.send({
                success: true,
                status: 200,
                message: 'Successfully created 1 row in database'
            });
            console.log(admin)

        });
    },
            /*****************get by id **************************/ 

getAdminById: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Admin.findOne({id: req.param('id')}).exec((error, admin) => {
            res.send(admin);
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

            /*****************update Admin by id **************************/ 

updateAdmin: async(req, res) => {
  
    const nom = req.body.nom;
    const prenom=req.body.prenom;
    const email = req.body.email;
    const password=req.body.password;
    const adresse=req.body.adresse;
    const tel=req.body.tel;
    const demandeinterventions=req.body.demandeinterventions;
    try{
        console.log(req.body)
        admin = await Admin.update(   { id: req.body.id }, 
                                      {nom: req.body.nom ,
                                      prenom:req.body.prenom,
                                      email: req.body.email,
                                      password:req.body.password,
                                      adresse:req.body.adresse,
                                      tel:req.body.tel,
                                      demandeinterventions:req.body.demandeinterventions
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
             /*****************delete Admin by id **************************/ 

deleteAdmin: function(req, res) {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Admin.destroy({id: req.param('id')}).exec((error) => {
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

