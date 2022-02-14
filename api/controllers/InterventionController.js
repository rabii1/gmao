/**
 * InterventionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const moment= require('moment'); 
 //cc hal tmchihm hata narja 5alili msg baadika k nji n9olk .. see u <3 wen mechi yehdik raby kamaltli!!
 module.exports = {

    createIntervention: async (req, res) => {
        let demandepieces=req.body.demandepieces;
        let date_debut = req.body.date_debut;
        let observation= req.body.observation;
        let ordreintervention=req.body.ordreintervention;
        let taches=req.body.description;
        let etat=req.body.etat;
        var equipement=req.body.equipement;
        let listTache = req.body.description;
        let demandeint=req.body.demandein;
        var listpiece=req.body.listp

        console.log("**************"+ordreintervention)
        let today=new Date();
        today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
        // try{


            intervention = await Intervention.create(
             {demandepieces:demandepieces,date_debut:date_debut,observation:observation,etat:etat,ordreintervention:ordreintervention}).fetch()

            let updatedRow=Etatequipement.find({equipement:equipement}).exec( async (err,list)=> {
              

                taches.forEach( async  (element)   => {
                    let   tache = await Tache.create({date:element.date,description:element.tache,intervention:intervention.id})
                });

                Pieceintervention.destroy({intervention: req.body.id }).exec((error) => {
                    listpiece.forEach( async  (element)   => {
                 
                        let   peiece = await Pieceintervention.create({piece:element.item_id,intervention:intervention.id})
                                                       });
                });

                list.forEach( async  (element)   => {
                 let   demandeintervention = await Etatequipement.update({id:element.id},{status:'ancien'})
                });
         
                if (etat=="terminer") {

                    etatequipement = await Etatequipement.create
                    ({nometat:"en marche",dateetat:today,equipement:equipement,status:'actuelle'})
                let   oi = await Ordreintervention.update({id: ordreintervention},{etat:'cloturer'})
                let di = await Demandeintervention.update({id:demandeint},{status:'cloturer'})

                }
                 else if (etat=="arreter") {

                    etatequipement = await Etatequipement.create
                    ({nometat:"en panne",dateetat:today,equipement:equipement,status:'actuelle'})  
                    let   oi = await Ordreintervention.update({id: ordreintervention},{etat:'suspenduTech'})
                    let di = await Demandeintervention.update({id:demandeint},{status:'reinitialiser'})
                    // var  demandeintervention = await Demandeintervention.update({id:req.body.id},{status: req.body.status} )
               
                } 
                else if (etat=="en cours"){
                    etatequipement = await Etatequipement.create ({nometat:"sous maintien",dateetat:today,equipement:equipement,status:'actuelle'})
                    let   oi = await Ordreintervention.update({id: ordreintervention},{etat:'en cours'}) 
                    let di = await Demandeintervention.update({id:demandeint},{status:'en cours'})
                }
               
                console.log(intervention);
         
                res.json({intervention :'MAJ Etat Successfully '})
              
         
         
         
         
         
         
            })
              
     
   
                       
        // }  
        // catch(error){
        //     res.json({intervention :error})
        // }
    },
    
    add: function(req, res){
        res.json(intervention);            
    
    },
  

    UpdateEtat: async(req, res) => {
        const etat='initiale';
      console.log( req.body.etat )
            try{
          var  intervention = await Intervention.update({id:req.body.id},{etat: req.body.etat} )
               
               if(req.body.etat=="suspendue"){
                      res.json({action:"suspendue",data:intervention,intervention :'MAJ Etat Successfully'} )
                      console.log(req.body.etat) 
                    } 
            }
                    catch(error){
                        res.send({intervention:error})
                       
                    }
            },







/***************************** count par date ********************/




   
getAllIntervention:function(req, res){
    console.log(req.param('idTech'))
    Intervention.find().where({technicien:req.param('idTech')}).populateAll().exec(function(err, intervention){
        if(err){
            res.send(500, {error:'Database Error'});
        }
        res.json(intervention)
        console.log(intervention)

    });

},
/************History  des derineres taches ***********/

getAllHistoryIntervention:function(req, res){
    
    Intervention.find().where({or:[{etat :['en cours','en attente des pieces']}]}).populateAll().exec(function(error,intervention){
         console.log(intervention)
        if(error) {
            res.json(500, {error:error});
         }
        
        for (let i = 0; i < intervention.length; i++) {
                const el = intervention[i];
                Technicien.findOne({id:el.ordreintervention.technicien}).exec(function(err, tech){
                   if(err){
                       res.send(500, {error:'Database Error'});
                   }
                   el.ordreintervention.technicien=tech;
                   if(i ===intervention.length-1){
                       res.json(intervention )
                       console.log("intervention")
                       console.log(intervention)
                   }
               });
                
            } 
      
        });
           
},
/*********** get all with details **************** */

  
getAllInterventionWithDetails:function(req, res){
    let listfinal=[]

    Ordreintervention.find({etat: ['en cours','cloturer','suspenduTech','suspenduAdmin']}).populateAll().exec(function(error, ordreintervention){
        if(error) {
                res.json(500, {error:error});
             }
             if(ordreintervention.length != 0)
             for (let i = 0; i < ordreintervention.length; i++) {
                 const el = ordreintervention[i];
                    Intervention.findOne({ordreintervention:el.id}).populateAll().exec(function(err, intr){
                    if(err){
                        res.send(500, {error:'Database Error'});
                    }
                        Demandeintervention.findOne({id:intr.ordreintervention.demandeintervention}).exec(function(err, de){
                            intr.ordreintervention.demandeintervention=de
                            listfinal.push(intr)
                            if(i ===ordreintervention.length-1){
                                res.json(listfinal ) }
                        })

                       
                });

               
       

             }  
             else res.json({etat:"vide"})
          
            });
},

/*********** get all by technicien with details **************** */

  
getAllInterventionByTechWithDetails:function(req, res){
    console.log(req.param('idTech'))
    let listfinal=[]
    Ordreintervention.find({technicien:req.param('idTech') , etat:  ['en cours','cloturer','suspenduTech','suspenduAdmin']
}) .populateAll().exec(function(error, ordreintervention){
        if(error) {
                res.json(500, {error:error});
             }
             if(ordreintervention.length != 0)
             for (let i = 0; i < ordreintervention.length; i++) {
                 const el = ordreintervention[i];
                    Intervention.findOne({ordreintervention:el.id}).populateAll().exec(function(err, intr){
                    if(err){
                        res.send(500, {error:'Database Error'});
                    }
                        Demandeintervention.findOne({id:intr.ordreintervention.demandeintervention}).exec(function(err, de){
                            intr.ordreintervention.demandeintervention=de
                            listfinal.push(intr)
                            if(i ===ordreintervention.length-1){
                                res.json(listfinal )
                                }
                        })

                        
                });
             }          
             else res.json({etat:"vide"})
          
            });
},

      /*****************get all Intervention **************************/ 
    
       
      getAll:function(req, res){
        Intervention.find({}).populate('ordreintervention').exec(function(err, intervention){
            if(err){
                res.send(500, {error:'Database Error'});
            }
            res.send({
                success: true,
                status: 200,
                message: 'Successfully getall row in database'
            });
            console.log(intervention)

        });
    },

       
/***************** get list des intervention when etat=en cours et valider ***************/

 getInterventionByTechnicienFromDay: (req, res) => {

    if (req.method == 'GET' && req.param('id', null) != null) {
        let today=new Date();
        today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
        Intervention.findOne({id:req.param('id')}).populate('ordreintervention').exec((error, intervention) => {
         Technicien.findOne({id:intervention.ordreintervention.technicien}).populateAll().exec((error, technicien) => {
                console.log("technicien")
                console.log(technicien)
                intervention["tech"]=technicien 
                
            Ordreintervention.find ({or:[{etat :'valider'},{date:today}]}).populateAll().exec(function (err, ordreintervention) {
                console.log(ordreintervention)
                    console.log(today)
                    
             console.log(intervention)
              res.json(intervention)
          });
       });
    });
         }
},
            /*****************get by id ith details Intervention**************************/ 


getInterventionWithDetails:(req,res) => { 

    if (req.method == 'GET' && req.param('id', null) != null) {
        Intervention.findOne({id: req.param('id')}).populateAll().exec((error, intervention) => {
            
            Technicien.findOne({id:intervention.ordreintervention.technicien}).populateAll().exec((error, technicien) => {
                console.log("technicien")

                console.log(technicien)
                intervention["tech"]=technicien 
            
                Equipement.findOne({id:intervention.ordreintervention.demandeintervention.equipement}).populateAll().exec((error, equipement) => {
            
                    intervention["eq"]=equipement
                
                
                    // Tache.findOne({id:tache.}).populateAll().exec((error, tache) => {
            
                    //     tache["taches"]=tache
                    
                    Demandeintervention.findOne({id:intervention.ordreintervention.demandeintervention}).populateAll().exec((error, demandeintervention) => {

                        intervention["dem"]=demandeintervention


                        res.json(intervention)
               
                });

           }); 
            
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
            /*****************get by id Intervention**************************/ 

getInterventionById: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Intervention.findOne({id: req.param('id')}).populateAll().exec((error, intervention) => {
            res.send(intervention);
            console.log(intervention)
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

            /*****************update Intervention **************************/ 

updateIntervention: async(req, res) => {
  
    //var demandepieces=req.body.demandepieces;
    let etat=req.body.etat
    console.log(req.body)
     var listTache = req.body.tachesx;
     var listDemande = req.body.listDemandePiece;

    var listpiece=req.body.listp
    var equipement=req.body.equipement;
     var ordreintervention=req.body.ordreintervention;
    let demandeint=req.body.demandein;
    let today=new Date();
    let idintervention=req.body.id;
    today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
    try{
        console.log(req.body.id)
        intervention = await Intervention.update({ id: idintervention }, 
                                      {            etat:req.body.etat,
                                                    observation:req.body.observation,
                                     }) ;
    
        let updatedRow=Etatequipement.find({equipement:equipement}).exec( async (err,list)=> {

            Tache.destroy({intervention: req.body.id }).exec((error) => {
                listTache.forEach( async  (element)   => {
             
                    let   tache = await Tache.create({date:element.date,description:element.taches,intervention:idintervention})
                                                   });
            });
            Pieceintervention.destroy({intervention: req.body.id }).exec((error) => {
                listpiece.forEach( async  (element)   => {
             
                    let   peiece = await Pieceintervention.create({piece:element.item_id,intervention:idintervention})
                                                   });
            });

         list.forEach( async  (element)   => {
                let   etateq = await Etatequipement.update({id:element.id},{status:'ancien'}) 
            
            });
        
         if(etat=="en attente des pieces") {

            
            Demandepiece.destroy({intervention: idintervention }).exec((error) => {
                listDemande.forEach( async  (element)   => {
                                                      
       let   demandepiece = await Demandepiece.create({piece:element.piece,quantite:element.quantite,
         intervention:idintervention})
     
     });
         //    res.json({status:"ok"} )
        //     console.log(intervention);
                                                                                      
         })  


         }
            

            if (etat=="terminer") {
                        
                etatequipement = await Etatequipement.create({nometat:"en marche",dateetat:today,equipement:equipement,status:'actuelle'})
                        let   oi = await Ordreintervention.update({id:ordreintervention},{etat:'cloturer'})
                        let di = await Demandeintervention.update({id:demandeint},{status:'cloturer'})
               
                               }
            else if (etat=="arreter") {
               
               etatequipement = await Etatequipement.create({nometat:"en panne",dateetat:today,equipement:equipement,status:'actuelle'})  
                   let   oi = await Ordreintervention.update({id:ordreintervention},{etat:'suspenduTech'})
                   let di = await Demandeintervention.update({id:demandeint},{status:'reinitialiser'})
                              
                               } 
           else if (etat=="en cours"){
               etatequipement = await Etatequipement.create ({nometat:"sous maintien",dateetat:today,equipement:equipement,status:'actuelle'})
                   let   oi = await Ordreintervention.update({id:ordreintervention},{etat:'en cours'}) 
                   let di = await Demandeintervention.update({id:demandeint},{status:'en cours'})
                               }




            

                         res.json(intervention )
                         console.log(intervention);
                                 
                        

                        


                        })
                                    
        }  
        catch(error){
            res.json({intervention :error})
        }
      
     
},



updateDemandepiece:async (req, res)=>{
    var listdemadePiece=req.body.quantite;
    try{
        console.log(listdemadePiece);
       // intervention = await Intervention.update({ id: req.body.id },{demandepieces:req.body.quantite});
       Demandepiece.destroy({interventions: req.body.intervention }).exec((error) => {
        listdemadePiece.forEach( async  (element)   => {
                                              
let   demandepiece = await Demandepiece.create({piece:element.piece,quantite:element.quantite,
 interventions:req.body.intervention})

});
     res.json({status:"ok"} )
//     console.log(intervention);
                                                                              
 }) 
        
     }      
                   
catch(error){
 res.json({status :error})
}


    },


/*******************change etat Suspendu par Admin ***********************/

ChangeEtatSuspenduAdmin: async(req, res) => {
    const etat='initiale';
  console.log( req.body.etat )
  let today=new Date();
  var equipement=req.body.equipement;
  console.log( "*************************"+req.body.equipement )

  today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
       // try{
            let updatedRow=Etatequipement.find({equipement:equipement}).exec( async (err,list)=> {
           
                list.forEach( async  (element)   => {
                 let   demandeintervention = await Etatequipement.update({id:element.id},{status:'ancien'})
                });
           
           if(req.body.etat=="suspenduAdmin"){
            etatequipement = await Etatequipement.create ({nometat:"en panne",dateetat:today,equipement:equipement,status:'actuelle'})
            let i = await Intervention.update({id:req.body.idIn},{etat:'suspenduAdmin'})
            let ordre = await Ordreintervention.update({id:req.body.id},{etat:'suspenduAdmin'})
            let dem = await Demandeintervention.update({id:req.body.idDem},{status:'reinitialiser'})
                  res.json({action:"suspenduAdmin",intervention :'MAJ Etat Successfully'} )
                  console.log(req.body.etat) 
                } 
           })
        },
/*****************delete  Intervention by id **************************/ 

deleteIntervention: function(req, res) {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Intervention.destroy({id: req.param('id')}).exec((error) => {
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

/*************get nbre des ordre intervention selon le technicien ******** */
CountOrdreIntervention:async (req,res)=>{
    if (req.method == 'GET' ) {
        // id:intervention.ordreintervention.technicien
        Ordreintervention.find().where({technicien:req.param('id'), ordreintervention: { '!=' :  [] }}).exec(function (err, ordreintervention) {
            if(err){
                res.json(500, {error:err});
            }
            res.json({totalOrdre:ordreintervention.length});
            });
        console.log('totalOrdre')
    } else {
        res.send({
            success: false,
            status: 500,
            message: 'Error in request'
        });
        return;
    }
},

/************* get nbre des intervention selon le technicien ************/
CountIntervention:async (req,res)=>{
    if (req.method == 'GET' ) {

        Intervention.find().where({technicien:req.param('id')},{ etat:'terminer' }).exec(function (err, intervention) {
            if(err){
                res.json(500, {error:err});
            }
            res.json({InterventionTraite:intervention.length});
            });
        console.log('totaInt')
    } 
},

       /*******************change etat en attente des pieces ***********************/
       UpdatestatusEnattente : async(req, res) => {
        const etat='initiale';
      console.log(etat )
      let today=new Date();
        let list= req.body.quantite
      today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
      console.log("ddddddddddd" )

          var  intervention = await Intervention.update({id: req.body.interventions }, 
                                                        {etat: 'en attente des pieces'  },)
             
                                                        console.log("eeeeeeeeeeee" )

                    for (let i = 0; i <list.length; i++) {
                        const el = list[i];
                        console.log(el )

                    let  demandepiece = await  Demandepiece.create(
                            {quantite:el.quantite, interventions:req.body.interventions,piece:el.piece})
                        
                          
                          
                          
                            if(i == list.length - 1) {
                                res.send( {
                                    success: true,
                                    status: 200,
                                    message: 'Successfully created 1 row in database'
                                }); 
                            }
                          
                     

                        
                    }

                    
                    
                    
                

                  

            },
            getlistStat:(req,res)=>{

                let m=[];

                Intervention.find({etat:['en cours']}).populateAll().exec(function (err, ec) {
                  
                    m.push(ec.length)
                        Intervention.find({etat:['terminer']}).exec(function (err,tr){
                            m.push(tr.length)

            
                            Intervention.find({etat:['en attente des pieces']}).exec(function (err,enp){
                                m.push(enp.length)

            
                                Intervention.find({etat:['arreter']}).exec(function (err,arr){
                                    m.push(arr.length)

            
                                    Intervention.find({etat:['suspenduAdmin']}).exec(function (err,sus){
                                        m.push(sus.length)

            
                                        res.json(m)
                    
                    
                                    })                
                
                                })            
            
                            })
            
            
            
                        })
            
            
            
            
            
            
            
            
            
        
            
                });
            },
            
};


