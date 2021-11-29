/**
 * OrdreinterventionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  
    createOrdreintervention: async (req, res) => {
        console.log(req.body)

        let date=req.body.date;
        let nature_de_travaux=req.body.nature_de_travaux;
        let technicien=req.body.technicien;
        let degre_urgence=req.body.degre_urgence;
        let intervention=req.body.intervention;
        let demandeintervention=req.body.demandeintervention;
        let description=req.body.description;
        let dateestimation=req.body.dateestimation ;
        let debutprevu=req.body.debutprevu;
        let etat='initiale';
        let periodeEtim=req.body.pe;
        console.log("**************"+demandeintervention)
       
            ordreintervention = await Ordreintervention.create(
                { debutprevu:debutprevu,dateestimation:periodeEtim,description:description,etat:etat,date:date,nature_de_travaux:nature_de_travaux,demandeintervention:demandeintervention,
                degre_urgence:degre_urgence,intervention:intervention,technicien:technicien
            }).fetch()
            
                    const status='initiale';
                  console.log( req.body.status )
                  console.log( "statusss demande" )
                  
                 demandeintervention = await Demandeintervention.update({id:demandeintervention},{status:'valider'})
                            //  if(etat=="annuler"){
                            //     let demande = await Demandeintervention.update({id:demandeintervention},{status:'reinitialiser'})

                            // }
                             if(etat=="bien reçu"){
                                let demande = await Demandeintervention.update({id:demandeintervention},{status:'valider'})

                            }
                            // else if(etat=="rejetee"){
                            //     let demande = await Demandeintervention.update({id:demandeintervention},{status:'reinitialiser'})

                            // }
                 
                                                                              res.json({ordreintervention :'MAJ etat create ordre intervention Successfully '})
                                                                              console.log(ordreintervention);
                         
    
},

/*************** ordre affecté par nom technicien préciser selon le user connecté ****************/

getOrdreSelonUserConnected:function(req,res) { 
    console.log(req.param('idTech'))
    Ordreintervention.find({technicien:req.param('idTech'),etat:{'!=':["annuler","cloturer"]}}).populateAll().exec(function(error, ordreintervention){
       //.find().where({or:[{status :  'cloturer' }]})
        if(error) {
                res.json(500, {error:error});
             }
             for (let i = 0; i < ordreintervention.length; i++) {
                 const el = ordreintervention[i];
                 Equipement.findOne({id:el.demandeintervention.equipement}).exec(function(err, equi){
                    if(err){
                        res.send(500, {error:'Database Error'});
                    }
                    el.demandeintervention.equipement=equi;
                    if(i ===ordreintervention.length-1){
                        res.json(ordreintervention )
                        console.log("hhhhhhhhhhhhhh")
                        console.log(ordreintervention)
                    }
                });
             }  
            });

},

 /**************** get liste ordre non traité SelonUserConnected when etat Ordre intervention =rejetee  **********/
 getListOrdreInterventionNontraite:function (req,res) {
   //Ordreintervention.find().where({technicien:req.param('idTech'),{etat: ['en cours','cloturer','suspenduTech','suspenduAdmin']}})populateAll().exec(function (err, ordreintervention) {
     Ordreintervention.find().where({technicien:req.param('idTech'),etat:'initiale'}).populate('technicien').populate('demandeintervention').populate('intervention').exec(function (err, ordreintervention) {
        if(err){
            res.json(500, {error:err});
        }
        for (let i = 0; i < ordreintervention.length; i++) {
            const el = ordreintervention[i];
            Equipement.findOne({id:el.demandeintervention.equipement}).exec(function(err, equi){
               if(err){
                   res.send(500, {error:'Database Error'});
               }
               el.demandeintervention.equipement=equi;
               if(i ===ordreintervention.length-1){
                   res.json(ordreintervention )
                   console.log("hhhhhhhhhhhhhh")
                   console.log(ordreintervention)
               }
           });
        }
       });
      
    },
  
     /**************** get liste ordre traité when etat Ordre intervention =cloturer **********/

 getListOrdreInterventiontraite:function (req,res){
    Ordreintervention.find().where({technicien:req.param('idTech'),etat:'cloturer'}).populate('technicien').populate('demandeintervention').populate('intervention').exec(function (err, ordreintervention) {
        if(err){
            res.json(500, {error:err});
        }
        for (let i = 0; i < ordreintervention.length; i++) {
            const el = ordreintervention[i];
            Equipement.findOne({id:el.demandeintervention.equipement}).exec(function(err, equi){
               if(err){
                   res.send(500, {error:'Database Error'});
               }
               el.demandeintervention.equipement=equi;
               
               if(i ===ordreintervention.length-1){
                   res.json(ordreintervention)
                   console.log("hhhhhhhhhhhhhh")
   
                   console.log(ordreintervention)
               }
           });
        }
    });
        
        // res.json(ordreintervention )
        // console.log(ordreintervention)

        // });
    },
  


  /***************** update etat ordre  by id valider bien recu **************************/ 
    
  UpdateEtat: async(req, res) => {
    const etat='initiale';
  console.log( req.body.etat )
  let today=new Date();
  //var equipement=req.body.equipement;

  today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
  
           
           if(req.body.etat=="valider"){
            var  ordreintervention = await Ordreintervention.update(
                {id: req.body.id }, 
                {etat: req.body.etat, 
                //description:req.body.description,
                date :req.body.date},
                )
                
                  res.json({action:"valider",date:today,data:ordreintervention,ordreintervention :'MAJ Etat Successfully'} )
                  console.log(req.body.etat) 
                  
                  console.log(req.body.date)
                } 
                else{
                     let oi = await Ordreintervention.update({id:req.body.idOrdre},{etat:'bien reçu'})
                     let demande = await Demandeintervention.update({id:req.body.id},{status:'valider'})
                     //etatequipement = await Etatequipement.create ({nometat:"en panne",dateetat:today,equipement:equipement,status:'actuelle'})
                    res.json({action:"bien reçu",date:today,data:ordreintervention,ordreintervention :'MAJ Etat Successfully'} )
                    console.log(req.body.etat); 
                    console.log(req.body.date)

                } 

            // }
            //     catch(error){
            //         res.send({ordreintervention:error})
                   
            //     }
        // })
      
        },

        /*******************change etat Rejetee ***********************/
 Updatestatus: async(req, res) => {
            const etat='initiale';
          console.log( req.body.etat )
          let today=new Date();

          today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
               
              var  ordreintervention = await Ordreintervention.update({id: req.body.id }, 
                                                                      {etat: req.body.etat, 
                                                                       description:req.body.description,
                                                                       date :req.body.date},)
                        if(req.body.etat=="rejetee"){
                          let oi = await Ordreintervention.update({id:req.body.idOrdre},{etat:'rejetee'})
                          let demande = await Demandeintervention.update({id:req.body.id},{status:'reinitialiser'})
                          res.json({action:"rejetee",date:today,description:req.body.description,data:ordreintervention,ordreintervention :'MAJ Etat Successfully'})
                          console.log(req.body.etat)
                          console.log(req.body.description)
                          console.log(req.body.date)
        
                        }

                },
    
    add: function(req, res){
        res.json(ordreintervention);            
    
    },
      /*****************changer etat reinialiser par admin **************************/ 
      ChangeEtat: async(req, res) => {
        const etat='initiale';
      console.log( req.body.etat )
      let today=new Date();
    
      today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
            try{
                
               if(req.body.etat=="rejetee"){
                //let demande = await Demandeintervention.update({id:req.body.id},{status:'reinitialiser'})
                      res.json({action:"rejetee",ordreintervention :'MAJ Etat Successfully'} )
                      console.log(req.body.etat) 
                    } 
                }
                    catch(error){
                        res.json({error:error})
                    }
            },
/*******************change etat reinialiser in exception ***********************/
ChangeEtatReinialiser: async(req, res) => {
    const etat='initiale';
  console.log( req.body.etat )
  let today=new Date();

  today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
        try{
            
           if(req.body.etat=="rejetee"){
            let demande = await Demandeintervention.update({id:req.body.id},{status:'reinitialiser'})
                  res.json({action:"rejetee",ordreintervention :'MAJ Etat Successfully'} )
                  console.log(req.body.etat) 
                } 
            }
                catch(error){
                    res.json({error:error})
                }
        },

/*******************change etat annuler ***********************/
ChangeEtat: async(req, res) => {
    const etat='initiale';
  console.log( req.body.etat )
  let today=new Date();
  //var equipement=req.body.equipement;

  today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
        try{
            // let updatedRow=Etatequipement.find({equipement:equipement}).exec( async (err,list)=> {
           
            //     list.forEach( async  (element)   => {
            //      let   demandeintervention = await Etatequipement.update({id:element.id},{status:'ancien'})
            //     });
           
           if(req.body.etat=="annuler"){
           // etatequipement = await Etatequipement.create ({nometat:"en marche",dateetat:today,equipement:equipement,status:'actuelle'})
            let oi = await Ordreintervention.update({id:req.body.idOrdre},{etat:'annuler'})
            let demande = await Demandeintervention.update({id:req.body.id},{status:'reinitialiser'})

                  res.json({action:"annuler",ordreintervention :'MAJ Etat Successfully'} )
                  console.log(req.body.etat) 
                  

                } 
          // })

            }
                catch(error){
                    res.json({error:error})
                   
                }
      
      
        },
       
 getAllordreIntervention:function(req, res){
        //res.view('list');
        Ordreintervention.find({}).populateAll().exec(function(err, ordreintervention){
            
            if(err){
                res.send(500, {error:'Database Error'});
            }

            for (let i = 0; i < ordreintervention.length; i++) {
                const el = ordreintervention[i];


                Equipement.findOne({id:el.demandeintervention.equipement}).exec(function(err, equi){
           
                   if(err){
                       res.send(500, {error:'Database Error'});
                   }
                   el.demandeintervention.equipement=equi;
                   
                   if(i ===ordreintervention.length-1){
                       res.json(ordreintervention)
                       console.log("hhhhhhhhhhhhhh")
       
                       console.log(ordreintervention)
                   }
               });
                
            }


        

        });
    },
            /*****************get by id **************************/ 

getOrdreinterventionById: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Ordreintervention.findOne({id: req.param('id')}).populateAll().exec((error, ordreintervention) => {

            Equipement.findOne({id:ordreintervention.demandeintervention.equipement}).exec(function(err, equi){
            
                if(err){
                    res.send(500, {error:'Database Error'});
                }
                ordreintervention.demandeintervention.equipementx=equi;
                res.send(ordreintervention);

                console.log(ordreintervention)
                return;
            });
           
          
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

updateordreintervention: async(req, res) => {
  
   

    const date=req.body.date
    const nature_de_travaux=req.body.nature_de_travaux;
    const technicien=req.body.technicien;
    const degre_urgence=req.body.degre_urgence;
    const intervention=req.body.intervention;
    const demandeintervention=req.body.demandeintervention;
    const description=req.body.description;
    const dateestimation=req.body.dateestimation ;
    const debutprevu=req.body.debutprevu;
    const periodeEtim=req.body.pe;
    try{
        console.log(req.body)
        ordreintervention = await Ordreintervention.update( 
                                           { id: req.body.id }, 
                                         {
                                          date:req.body.date,
                                          nature_de_travaux:req.body.nature_de_travaux,
                                          degre_urgence:req.body.degre_urgence,
                                          technicien:req.body.technicien,
                                          intervention:req.body.intervention,
                                          demandeintervention:req.body.demandeintervention,
                                          description:req.body.description,
                                          debutprevu:req.body.debutprevu,
                                          periodeEtim:req.body.dateestimation,
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
             /*****************delete  ordre intervention by id **************************/ 

deleteordreintervention: function(req, res) {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Ordreintervention.destroy({id: req.param('id')}).exec((error) => {
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

getInterventionByTechnicienFromDay: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        
    Ordreintervention.find().where({technicien:req.param('id'),etat:'en cours'}).populate('technicien').populate('demandeintervention').exec(function (err, ordreintervention) {
            console.log(ordreintervention)

            res.json(ordreintervention)
          });
     }
}    
};

