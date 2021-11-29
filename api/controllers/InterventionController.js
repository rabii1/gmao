/**
 * InterventionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const moment= require('moment') 

 module.exports = {

    createIntervention: async (req, res) => {
        let demandepieces=req.body.demandepieces;
        let date_debut = req.body.date_debut;
        let observation= req.body.observation;
        let ordreintervention=req.body.ordreintervention;
        let taches=req.body.taches;
        let etat=req.body.etat;
        var equipement=req.body.equipement;
        let listTache = req.body.description;
        let demandeint=req.body.demandein;
        console.log("**************"+ordreintervention)
        let today=new Date();
        today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
        // try{


            intervention = await Intervention.create(
             {demandepieces:demandepieces,date_debut:date_debut,observation:observation,taches:taches,etat:etat,ordreintervention:ordreintervention}).fetch()

            let updatedRow=Etatequipement.find({equipement:equipement}).exec( async (err,list)=> {
              

                listTache.forEach( async  (element)   => {
                    let   tache = await Tache.create({date:element.date,description:element.tache,intervention:intervention.id})
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
               
         
         
                res.json({intervention :'MAJ Etat Successfully '})
                console.log(intervention);
         
         
         
         
         
         
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
count:function(req ,res){
    Intervention.find({}).populate('ordreintervention').exec(function(err, intervention){
        console.log(Intervention)
        console.log('ttttttttttttttttrs')

        var map = {};
     console.log(intervention)
    intervention.forEach(function(val){
        map[val.date_debut] = map[val.date_debut] || {};
        map[val.date_debut][val.etat] = map[val.date_debut][val.etat] || 0;
        map[val.date_debut][val.etat]++;
      });
    
       var output = Object.keys(map).map(function(key){
        var tmpArr = [];
        for(var etat in map[key])
        {
           tmpArr.push( [ etat, map[key][etat] ] )
        }
        return { date : key, etat: tmpArr  };
      })
  
    //   console.log(document.body.innerHTML)
    });
},


// getinterventionwithetatattenddespieces: (req, res) => {
 
//     Intervention.find().where({etat:'en attente des pieces' }).populateAll().exec(function (err, intervention) {
       
//         res.json(intervention)
//         console.log(intervention)
//         if(err){
//             res.send(500, {error:'Database Error'});
//         }
//     });

// },
   
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

/*********** get all with details **************** */

  
getAllInterventionWithDetails:function(req, res){
    let listfinal=[]
    Ordreintervention.find({etat: ['en cours','cloturer','suspenduTech','suspenduAdmin']}).populateAll().exec(function(error, ordreintervention){
       //.find().where({or:[{status :  'cloturer' }]})
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

        // var start = moment().subtract(24, 'hours').toDate();
        //Intervention.find().where( {"date_debut":{">":start} },{id: req.param('id')}).exec((error, intervention) => {
        // Ordreintervention.findOne({id:intervention.ordreintervention}).populateAll().exec((error, ordreintervention) => {


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
        Intervention.findOne({id: req.param('id')}).populate('ordreintervention').populate('taches').exec((error, intervention) => {
            
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
  
    let demandepieces=req.body.demandepieces;

    const date_debut = req.body.date_debut;
    const etat=req.body.etat;
    const observation=req.body.observation;
    const taches=req.body.taches;
    const listTache = req.body.description;

    var equipement=req.body.equipement;

    let demandeint=req.body.demandein;

    try{
        console.log(req.body)
        intervention = await Intervention.update({ id: req.body.id }, 
                                      {date_debut: req.body.date_debut ,
                                        demandepieces:req.body.demandepieces,
                                        etat:req.body.etat,
                                        taches:req.body.taches,
                                        observation:req.body.observation,
                                     }).fetch()
       
        let updatedRow=Etatequipement.find({equipement:equipement}).exec( async (err,list)=> {
         listTache.forEach( async  (element)   => {
         let   tache = await Tache.create({date:element.date,description:element.tache,intervention:intervention.id})
                                        });
      
            list.forEach( async  (element)   => {
                let   demandeintervention = await Etatequipement.update({id:element.id},{status:'ancien'}) });
        
                     if (etat=="terminer") {
                        
                         etatequipement = await Etatequipement.create({nometat:"en marche",dateetat:today,equipement:equipement,status:'actuelle'})
                                 let   oi = await Ordreintervention.update({id:ordreintervention},{etat:'cloturer'})
                                 let di = await Demandeintervention.update({id:demandeint},{status:'cloturer'})
                        
                                        }
                     else if (etat=="arreter") {
                        
                        etatequipement = await Etatequipement.create({nometat:"en panne",dateetat:today,equipement:equipement,status:'actuelle'})  
                            let   oi = await Ordreintervention.update({id:ordreintervention},{etat:'suspenduTech'})
                            let di = await Demandeintervention.update({id:demandeint},{status:'reinitialiser'})
                                            // var  demandeintervention = await Demandeintervention.update({id:req.body.id},{status: req.body.status} )
                                       
                                        } 
                    else if (etat=="en cours"){
                        etatequipement = await Etatequipement.create ({nometat:"sous maintien",dateetat:today,equipement:equipement,status:'actuelle'})
                            let   oi = await Ordreintervention.update({id:ordreintervention},{etat:'en cours'}) 
                            let di = await Demandeintervention.update({id:demandeint},{status:'en cours'})
                                        }
                         res.json(intervention )
                         console.log(intervention);
                                 
                                    })
                                    
                                                                    
        // res.send({
        //     success: true,
        //     status: 200,
        //     message: 'Successfully updated 1 row in database'
        // });
    }
    catch(error){
        res.send({
            success: false,
            status: 500,
            message: 'Wrong data'
        });
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

};


