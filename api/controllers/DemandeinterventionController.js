
/**
 * DemandeinterventionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

    createDemande: async (req, res) => {
        let panne = req.body.panne;
        let date=req.body.date;
        let description = req.body.description;
        let dureearretmachine=req.body.dureearretmachine;
        
        let employee=req.body.employee;
        let admin=req.body.admin;
        let ordreinterventions=req.body.ordreinterventions;
        let equipement=req.body.equipement;
        let priorite=req.body.priorite;

        let status='initiale';
        let today=new Date();
        today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
        // try{
            demandeintervention = await Demandeintervention.create(
                    { priorite:priorite,panne:panne,date:date, description:description,dureearretmachine:dureearretmachine,
                      employee:employee,admin:admin,status:status,equipement:equipement,
                        ordreinterventions:ordreinterventions
                    })

            let updatedRow=Etatequipement.find({equipement:equipement}).exec( async (err,list)=> {

                    list.forEach( async  (element)   => {
                     let   demandeintervention = await Etatequipement.update({id:element.id},{status:'ancien'})
                    });
                    etatequipement = await Etatequipement.create
                    ({nometat:"en panne",dateetat:today,equipement:equipement,status:'actuelle'})
                    res.send( {
                        success: true,
                        status: 200,
                        message: 'Successfully created 1 row in database'
                    });
            })
                  

            
                //console.log(demandeintervention);       
        // }  
    //  catch(error){
    //          res.json({error:error});            

    //     }
    },
    
    add: function(req, res){
        res.json(demandeintervention);            
    
    },



/*************** demande intervention affecté par nom employee préciser selon le user connecté ****************/

getDemandeSelonEmployeeConnected:function(req,res) { 
   // .find().where({technicien:req.param('idTech'),etat:'cloturer'})
    console.log(req.param('id'))
    Demandeintervention.find().where({employee:req.param('id'),status:'cloturer'}).exec(function(error, demandeintervention){
    
                    if(error) {
                    res.json(500, {error:error});
                 }
                 for (let i = 0; i < demandeintervention.length; i++) {
                    const el = demandeintervention[i];


        Equipement.findOne({id:el.equipement}).exec(function(err, equi){
   
           if(err){
               res.send(500, {error:'Database Error'});
           }
           el.equipement=equi;
           
           if(i ===demandeintervention.length-1){
               res.json(demandeintervention )
               console.log("demandeintervention")

               console.log(demandeintervention)
           }
       });
        
    }
       

                });
               
    
    
    },
getDemandeNontraiteSelonEmployeeConnected:function(req,res) { 
        // .find().where({technicien:req.param('idTech'),etat:'cloturer'})
         console.log(req.param('id'))
         Demandeintervention.find().where({employee:req.param('id'),status:{'!=':'cloturer'} }).exec(function(error, demandeintervention){
         
                         if(error) {
                         res.json(500, {error:error});
                      }

                       for (let i = 0; i < demandeintervention.length; i++) {
                            const el = demandeintervention[i];


                Equipement.findOne({id:el.equipement}).exec(function(err, equi){
           
                   if(err){
                       res.send(500, {error:'Database Error'});
                   }
                   el.equipement=equi;
                   
                   if(i ===demandeintervention.length-1){
                       res.json(demandeintervention )
                       console.log("demandeintervention")
       
                       console.log(demandeintervention)
                   }
               });
                
            }
                       
     
                     });
                    
         
         
         },


    /**************** get liste demande non affected when Ordre intervention =[] null ***********/

    getListDemandeInterventionNonTraiter:function (req,res) {
        Demandeintervention.find({or:[{status :  'initiale' },{status :  'valider' },{status :  'en cours' },{status :  'reinitialiser' }]}).populateAll().exec(function (err, demandeintervention) {
            if(err){
                res.json(500, {error:err});
            }
            // for (let i = 0; i < demandeintervention.length; i++) {
            //     const el = demandeintervention[i];


            //     Equipement.findOne({id:el.demandeintervention.equipement}).exec(function(err, equi){
           
            //        if(err){
            //            res.send(500, {error:'Database Error'});
            //        }
            //        el.demandeintervention.equipement=equi;
                   
            //        if(i ===demandeintervention.length-1){
            //            res.json(demandeintervention )
            //            console.log("demandeintervention")
       
            //            console.log(demandeintervention)
            //        }
            //    });
                
            // } 
            res.json({demandeintervention :demandeintervention});
            console.log(demandeintervention);
            return;
        });
        },
      /*******GET ALL DEMANDE  AFFACTED *****************/
 /*    getListDemandeInterventionAffected:function (req,res) {
        Demandeintervention.find(  {intervention: { '!=' :  null }}).populate('intervention').populate('employee').populate('ordreinterventions').exec(function (err, demandeintervention) {
            if(err){
                res.json(500, {error:err});
            }
            res.json({demandeintervention :demandeintervention})
            console.log(demandeintervention)
    
            });
        
    }, */

    /**************get list demande intervention affacted when ordre intervention !=null*/
    getListDemandeInterventionTraiter:function (req,res) {
        Demandeintervention.find().where({or:[{status :  'cloturer' }]}).populate('ordreinterventions').populate('employee').populate('equipement').exec(function (err, demandeintervention) {
            if(err){
                res.json(500, {error:err});
            }
            res.json({demandeintervention :demandeintervention});
            console.log(demandeintervention);
            return;
        });
          
     
    
            
        
    },

   /*******GET BY ID DEMANDE  AFFACTED *****************/
    getByIdDemandeInterventionAffected: (req, res) =>  {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Demandeintervention.findOne({id: req.param('id')},{ordreinterventions: { '!=' :  null }}).exec((error, demandeintervention) => {
                res.send(demandeintervention);
                console.log(demandeintervention)
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
    /*******GET BY ID DEMANDE Non AFFACTED *****************/
    
    getByIdDemandeInterventionNonAffected: (req, res) =>  {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Demandeintervention.findOne({id: req.param('id')},{ordreinterventions: { '=' :  null }} ).populate('ordreinterventions').exec((error, demandeintervention) => {
                res.send(demandeintervention);
                console.log(demandeintervention)
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
    CountDemande:async (req,res)=>{


        if (req.method == 'GET' ) {
         
            var total = await Demandeintervention.count();
            var total1 = await Ordreintervention.count();
          
            Demandeintervention.find().where({ status:'cloturer'}).exec(function (err, demandeintervention) {

           // Demandeintervention.find(  {ordreintervention: { '!=' :  null }}).exec(function (err, demandeintervention) {
                if(err){
                    res.json(500, {error:err});
                }
            
                res.json({totalD:total,totalIn:total1,totalTraite:demandeintervention.length,demTraite:demandeintervention.length});
            });
        
              //  });
          
          
            console.log(total)
            console.log('total')
            
          
         
         
        } else {
            res.send({
                success: false,
                status: 500,
                message: 'Error in request'
            });
            return;
        }


    },
  /*   CountDemande:async (req,res)=>{


        if (req.method == 'GET' ) {
         
            var total = await Demandeintervention.count();
            var total1 = await Intervention.count();
          
            
            Demandeintervention.find(  {intervention: { '!=' :  null }}).exec(function (err, demandeintervention) {
                if(err){
                    res.json(500, {error:err});
                }
            
                res.json({totalD:total,totalIn:total1,totalTraite:demandeintervention.length});

        
                });
          
          
            console.log(total)
            console.log('total')
            
          
         
         
        } else {
            res.send({
                success: false,
                status: 500,
                message: 'Error in request'
            });
            return;
        }


    }, */
    
    
    
    
    
    
    /*****************get all **************************/ 

        getAllDemande:function(req, res){
           // Demandeintervention.find({}).exec(function(err, demandeintervention){
                Demandeintervention.find({}).populateAll().exec(function (err, demandeintervention) {
                if(err){
                    console.log(err)
                    res.json(500, {error:err});
                }
             res.json({demandeintervention :demandeintervention})

           
                console.log(demandeintervention)
    
            });
        },
                /*****************get by id **************************/ 
    
    getDemandeById: (req, res) => {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Demandeintervention.findOne({id: req.param('id')}).populate('employee').populate('equipement').populate('admin').populate('ordreinterventions').exec((error, demandeintervention) => {
                res.send(demandeintervention);
                console.log(demandeintervention)
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
    
                /*****************update Demande by id **************************/ 
    
   UpdateStatus: async(req, res) => {
        const status='initiale';
      console.log( req.body.status )
        try{
            console.log(req.body.etat)
            demandeintervention = await Demandeintervention.update({   id: req.body.id }, 
                                                                  {   status: req.body.status })
                
                 res.json({demandeintervention :'MAJ etat Successfully '})
                 console.log(demandeintervention);
            }
                catch(error){
                    res.json({demandeintervention :'Database err'})

                }
            },

 
            
    
    updateDemande: async(req, res) => {
      
        const panne = req.body.panne;
        const date=req.body.date;
        const description = req.body.description;
        const dureearretmachine=req.body.dureearretmachine;
        //const tempstravail=req.body.tempstravail;
        const employee=req.body.employee;
        const admin=req.body.admin;
        const ordreinterventions=req.body.ordreinterventions;
        const equipement=req.body.equipement;
        const status=req.body.status;
        const priorite=req.body.priorite;

        try{
            console.log(req.body)
            demandeintervention = await Demandeintervention.update({   id: req.body.id }, 
                                                {   panne: req.body.panne ,
                                                    date:req.body.date,
                                                    description: req.body.description,
                                                    dureearretmachine:req.body.dureearretmachine,
                                                    //tempstravail:req.body.tempstravail,
                                                    employee:req.body.employee,
                                                    admin:req.body.admin,
                                                    ordreinterventions:req.body.ordreinterventions,
                                                    status:req.body.status,
                                                    equipement:req.body.equipement,
                                                    priorite:req.body.priorite,
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
                 /*****************delete demande intervention by id **************************/ 
    
    deleteDemande: function(req, res) {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Demandeintervention.destroy({id: req.param('id')}).exec((error) => {
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
   
    UpdateEtat: async(req, res) => {
        
      console.log( req.body.status )
            try{
          var  demandeintervention = await Demandeintervention.update({id:req.body.id},{status: req.body.status} )
               
               if(req.body.status=="reinialiser"){
                      res.json({action:"reinialiser",data:demandeintervention,demandeintervention :'MAJ Etat Successfully'} )
                      console.log(req.body.etat) 
                    } 
            }
                    catch(error){
                        res.send({demandeintervention:error})
                       
                    }
            },
/******** probleme de etat equipemt resolu ********/
UpdateEtatResolu: async(req, res) => {
    let equipement=req.body.equipement;
    let  demandeintervention=req.body.demandeintervention;
    let ordreIn=req.body.ordreIn;

    let today=new Date();
  
    today = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()
                let updatedRow=Etatequipement.find({equipement:equipement}).exec( async (err,list)=> {
                   
                    list.forEach( async  (element)   => {
                         let demandeintervention = await Etatequipement.update({id:element.id},{status:'ancien'})
                       });
                       console.log( "status1",req.body.status )

                if (req.body.status=="cloturer") {
                  console.log("status2",req.body.status)
                etatequipement = await Etatequipement.create({nometat:"en marche",dateetat:today,equipement:equipement,status:'actuelle'})
                let   oi = await Ordreintervention.update({id:req.body.id},{etat:'cloturer'})
                let di = await Demandeintervention.update({id:req.body.idDem},{status:'cloturer'})
                res.json({action:"cloturer",intervention :'MAJ Etat Successfully'} )
                console.log(req.body.status) 
                }
         
            });
      
            },
};

