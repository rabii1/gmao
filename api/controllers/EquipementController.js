/**
 * EquipementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


 const fs = require('fs');


module.exports = {
    upload: async (req, res) => {


    //    console.log(req.file('file'))
        console.log("*************")
         console.log(req.file('file'))
  
 
 
       var fileName;
        try{

            fileName=req.file('file')._files[0].stream.headers['content-disposition'].split('"').reverse()[1];
            console.log(fileName)
        }
        catch(e){
         // fileName="abc.abc";
        }
        req.file('file').upload({
          dirname:'../../assets/images/',
          saveAs:fileName
        },async function  onUploadComplete(err,files){
          if(err){
            console.log(err);
            return res.serverError(err);
          }
          if(!files.length) {
            return res.serverError(new Error('No file Uploaded'))
          }
          fs.copyFile('assets/images/'+fileName, '.tmp/public/images/'+fileName, function(err,stat) {
            if (err) throw err;
            console.log('staaaaaaaaat');     
            console.log(stat);     
            console.log('source.txt was copied to destination.txt');
            res.send( {
                success: true,
                status: 200,
                fileName:fileName,
                message: 'Successfully created 1 row in database'
            });
          })

        

        //  res.ok(files);
             
        }); 


     

        
    },
    
    add:async function(req, res){
        let today=new Date();
        today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()

        try{
     console.log('debut ajout')
            var equipement = await Equipement.create(
                   {libelle:req.body.libelle,image:req.body.image,numero_model:req.body.numero_model,piecerechanges:req.body.piecerechanges,demandeinterventions:req.body.demandeinterventions,
                    numero_serie:req.body.numero_serie,marque:req.body.marque,duree_en_service:req.body.duree_en_service,date_en_service:req.body.date_en_service,
                     date_hors_service:req.body.date_hors_service,service:req.body.service}).fetch()
                    
                     var   etatequipement = await Etatequipement.create
                     ({nometat:"nouveau",dateetat:today,equipement:equipement.id,status:'actuelle'}).fetch();
                     console.log(etatequipement)
                        
                   res.send(equipement)
           }  
           catch(error){
               console.log(error);
               res.send(500, {error:'Database error'});
            //   res.status(status).send(body)
           } 
        
    
    },
     /*****************get all **************************/ 
    
       
     getAllEquipement:function(req, res){
        //res.view('list');
        Equipement.find({}).exec(function(err, equipement){
            if(err){
                res.send(500, {error:'Database Error'});
            }
            res.send({
                success: true,
                status: 200,
                message: 'Successfully getall row in database'
            });
            console.log(equipement)

        });
    },
            /*****************get by id **************************/ 

getEquipementById: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Equipement.findOne({id: req.param('id')}).exec((error, equipement) => {
            res.send(equipement);
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

            /*****************update equipement **************************/ 

updateEquipement: async(req, res) => {
  
 
    const numero_model = req.body.numero_model ;
    const numero_serie=req.body.numero_serie ;
    const marque = req.body.marque ;
    const duree_en_service=req.body.duree_en_service;
    const date_en_service=req.body.date_en_service;
    const date_hors_service=req.body.date_hors_service;
    const service=req.body.service;
    const etatequipements =req.body.etatequipements;
    const libelle =req.body.libelle;
    const image=req.body.image;
    const demandeinterventions=req.body.demandeinterventions;
    const piecerechanges=req.body.piecerechanges
    let today=new Date();
        today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()

    try{
        console.log(req.body)
        equipement = await Equipement.update({ id: req.body.id }, 
                                      { libelle :req.body.libelle,
                                        numero_model: req.body.numero_model ,
                                        numero_serie:req.body.numero_serie,
                                        marque: req.body.marque,
                                        duree_en_service: req.body.duree_en_service,
                                        date_en_service: req.body.date_en_service,
                                        date_hors_service: req.body.date_hors_service,
                                        service: req.body.service,
                                        etatequipements: req.body.etatequipements,
                                        image:req.body.image,
                                        demandeinterventions:req.body.demandeinterventions,
                                        piecerechanges:req.body.piecerechanges
                                     }).fetch()
        var   etatequipement = await Etatequipement.create
                ({nometat:"nouveau",dateetat:today,equipement:equipement.id,status:'actuelle'}).fetch();
                                     console.log(etatequipement)
                                        
                                   res.send(equipement)

    }
    catch(error){
        console.log(error);
        res.send(500, {error:'Database error'});
    }
},
             /*****************delete  Equipement by id **************************/ 

deleteEquipement: function(req, res) {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Equipement.destroy({id: req.param('id')}).exec((error) => {
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
 getAllEquipementByService:function (req,res){

    if (req.method == 'GET' && req.param('id', null) != null) {
        Equipement.find({service: req.param('id')}).exec((error, equipement) => {
            res.send(equipement);
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
deleteEquipementWithdemandeInterventionNoPermitted: function(req, res) {
    console.log(req.param('id'))
    if (req.method == 'GET' && req.param('id', null) != null) {
        Etatequipement.find({equipement:req.param('id')}).exec((error, equipement) => {
            console.log(equipement);
           
           
             if (equipement.length == 0) {
    
                console.log('This Equipement  has no associated Etatequipement');
                Equipement.destroy({id:req.param('id')}).exec(function(equipement) {
                });
                    //res.json({action:"deleted"})
    
              
                res.json({action:true,data:null})

               
    
           }
           else {
     
                console.log('This Equipement  has  associated with Etatequipement');
                 res.json({action:"non",data:equipement})
                  return true;        
                
    
            }  
        } )
     }
           
    },  


};

