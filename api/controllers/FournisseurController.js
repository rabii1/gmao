/**
 * FournisseurController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    
    createFournisseur: async (req, res) => {
        // let code_fournisseur = req.body.code_fournisseur;
        let nom=req.body.nom;
        let prenom =req.body.prenom;
        let email =req.body.email;
        let tel =req.body.tel;
        let adresse =req.body.adresse;
        let Piecerechanges=req.body.Piecerechanges;
        
        try{
          fournisseur=await Fournisseur.create(
                {nom:nom, 
                prenom:prenom,email:email,tel:tel,adresse:adresse,
                Piecerechanges:Piecerechanges})
                res.json({fournisseur:fournisseur});            

                // console.log(fournisseur);
                
        }  
        catch(error){
            // console.log(fournisseur);
            res.json({error:error});            

            // res.send(500, {error:'Database error'});
            // res.status(status).send(body)
        }
    },
    
    add: function(req, res){
        res.json(fournisseur);            
    
    },
     /*****************get all **************************/ 
    
       
     getAllFournisseur:function(req, res){
        //res.view('list');
        Fournisseur.find({}).exec(function(err, fournisseur){
            if(err){
                res.send(500, {error:'Database Error'});
            }
            res.send({
                success: true,
                status: 200,
                message: 'Successfully getall row in database'
            });
            console.log(fournisseur)

        });
    },
            /*****************get by id **************************/ 

getFournisseurById: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Fournisseur.findOne({id: req.param('id')}).exec((error, fournisseur) => {
            res.send(fournisseur);
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

            /*****************update Fournisseur **************************/ 

updateFournisseur: async(req, res) => {
  
    // const code_fournisseur = req.body.code_fournisseur;
    const nom=req.body.nom;
    const prenom =req.body.prenom;
    const email =req.body.email;
    const tel =req.body.tel;
    const adresse =req.body.adresse;
    const Piecerechanges=req.body.Piecerechanges;
    try{
        console.log(req.body)
        fournisseur= await Fournisseur.update(   { id: req.body.id }, 
                                      {
                                        //   code_fournisseur: req.body.code_fournisseur ,
                                        nom:req.body.nom,
                                        prenom: req.body.prenom,
                                        email:req.body.email,
                                        tel: req.body.tel,
                                        adresse:req.body.adresse,
                                        Piecerechanges:req.body.Piecerechanges,
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
             /*****************delete  Fournisseur by id **************************/ 

deleteFournisseur: function(req, res) {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Fournisseur.destroy({id: req.param('id')}).exec((error) => {
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
      /*****************delete  Fournisseur by id avec son piece de rechange **************************/ 
    
     
},
 deleteFournisseurWithPiecesNoPermitted: function(req, res) {
    console.log(req.param('id'))
if (req.method == 'GET' && req.param('id', null) != null) {
 Piecerechange.find({fournisseur:req.param('id')}).exec((error, fournisseur) => {

         if (fournisseur.length == 0) {

            console.log('This fournisseur  has no associated piece rechange');
            res.json({action:"oui"})
       }
       else {
            console.log('This fournisseur  has  associated piece rechange');
             res.json({action:"non",data:fournisseur})
              return true;        
        }  
    } )
 }
       
},  
  
};

