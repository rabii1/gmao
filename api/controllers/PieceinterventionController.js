/**
 * PieceinterventionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    

    createPieceintervention: async (req, res) => {
        let piece = req.body.piece;
        let intervention= req.body.intervention;
        
        try{
            pieceintervention = await  Pieceintervention.create(
                { intervention:intervention,piece:piece})
            
                res.send( {
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(pieceintervention);
                
        }  
        catch(error){
            //console.log(demandepiece);
            console.log(error);
            res.json({error:error})

        }
    },
    
    add: function(req, res){
        res.json(pieceintervention);            
    
    },

 /*****************get all **************************/ 
    
       
 getAllpieceintervention:function(req, res){
    //res.view('list');
    Pieceintervention.find({}).exec(function(err, pieceintervention){
        if(err){
            res.send(500, {error:'Database Error'});
        }
        res.send({
            success: true,
            status: 200,
            message: 'Successfully getall row in database'
        });
        console.log(pieceintervention)

    });
},
        /*****************get by id pieceintervention **************************/ 

getPieceinterventioneById: (req, res) => {
if (req.method == 'GET' && req.param('id', null) != null) {
    Pieceintervention.findOne({id: req.param('id')}).exec((error, pieceintervention) => {
        res.send(pieceintervention);
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

        /*****************update pieceintervention **************************/ 

updatePieceintervention: async(req, res) => {

    const piece = req.body.piece;
    const intervention =req.body.intervention;

try{
    console.log(req.body)
    demandepiece = await Demandepiece.update(  
                                  { id: req.body.id }, 
                                  {piece: req.body.piece,
                                   intervention: req.body.intervention,
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
         /*****************delete  pieceintervention by id **************************/ 

deletepieceintervention: function(req, res) {
if (req.method == 'GET' && req.param('id', null) != null) {
    Pieceintervention.destroy({id: req.param('id')}).exec((error) => {
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

