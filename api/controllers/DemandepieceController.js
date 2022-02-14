/**
 * DemandepieceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const async = require('async');

module.exports = {
  

    createDemandedePiece: async (req, res) => {
        let piece = req.body.piece;
        let quantite=req.body.quantite;
        let interventions =req.body.interventions;
        
        try{
            demandepiece = await  Demandepiece.create(
                {quantite:quantite, interventions:interventions,piece:piece})
            
                res.send( {
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(demandepiece);
                
        }  
        catch(error){
            //console.log(demandepiece);
            console.log(error);
            res.json({error:error})

        }
    },
    
    add: function(req, res){
        res.json(demandepiece);            
    
    },

 /*****************get all **************************/ 
    
       
 getAlldemandepiece:function(req, res){
    //res.view('list');
    Demandepiece.find({}).exec(function(err, demandepiece){
        if(err){
            res.send(500, {error:'Database Error'});
        }
        res.send({
            success: true,
            status: 200,
            message: 'Successfully getall row in database'
        });
        console.log(demandepiece)

    });
},
        /*****************get by id demandepiece **************************/ 

getdemandepieceById: (req, res) => {
if (req.method == 'GET' && req.param('id', null) != null) {
    Demandepiece.findOne({id: req.param('id')}).exec((error, demandepiece) => {
        res.send(demandepiece);
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

        /*****************update demandepiece **************************/ 

updatedemandepiece: async(req, res) => {

    const piece = req.body.piece;
    const quantite=req.body.quantite;
    const interventions =req.body.interventions;

try{
    console.log(req.body)
    demandepiece = await Demandepiece.update(  
                                  { id: req.body.id }, 
                                  {quantite:req.body.quantite,
                                    piece: req.body.piece,
                                    interventions: req.body.interventions,
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
         /*****************delete  demandepiece by id **************************/ 

deleteDemandepiece: function(req, res) {
if (req.method == 'GET' && req.param('id', null) != null) {
    Demandepiece.destroy({id: req.param('id')}).exec((error) => {
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


getDemandeGroupbyIn:  (req, res) => {
    
  console.log('starting ************************* \n')

// Send it to the database.

const aggregateArray = [
  {$group:  {
        _id: "$intervention",
        list: {
    $push: {piece: "$piece", quantite: "$quantite" }
  }
    }}
  ];

var db = Demandepiece.getDatastore().manager;

var rawMongoCollection = db.collection("demandepiece").aggregate(aggregateArray)
.toArray((err, results) => {
 if(err)  console.error(err)
    
   async.each(results,function(el,callback) {


    const id= el._id
    console.log('******* ordre intervention ********** \n')
    console.log(el)
    Intervention.findOne({id:id.toString()}).populate('taches').
    populate('ordreintervention').exec((err,resq)=> {

    if(err)   console.log(err)
     console.log('******* ordre intervention ********** \n')
        console.log(resq)
      Technicien.findOne({id:resq.ordreintervention.technicien}).exec((err,technicien)=> {
        resq.ordreintervention.technicien=technicien;
        el.intervention=resq;

        async.each(el.list,function(elem,callback1){


            Piecerechange.findOne({id:elem.piece.toString()}).exec((err,piece)=>{
                    console.log(elem.piece)
                    elem.ObjectPiece=piece;
                    callback1()
                })


        },function(err){

          callback()  

        })
     
     })
   

    })


   },function(err){
    res.send(results)

   })

   


 


});

  
//}
},



getlistdemandebyintervention:(req,res) => { 

    if (req.method == 'GET' && req.param('id', null) != null) {
        Demandepiece.findOne({id:req.param('id')}).populateAll().exec((error, demandepiece) => {
            
            Ordreintervention.findOne({id:demandepiece.interventions.ordreintervention}).populateAll().exec((error, ordreintervention) => {
                console.log("ordreintervention")

                console.log(ordreintervention)
                demandepiece["ordreintervention"]=ordreintervention 
 
                res.json(demandepiece)

           }); 
        });   
     
            
    } else {
        res.json({error:error});
        return;
    }

},

};

