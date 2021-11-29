/**
 * TacheController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    createTache: async (req, res) => {
        let date = req.body.date;
        let description=req.body.description;
        let intervention = req.body.intervention;
       
        try{
             tache = await Tache.create(
                {date:date,description:description, intervention:intervention})
                res.json({intervention :'Successfully created 1 row in database '})

                // res.send( {
                //     success: true,
                //     status: 200,
                //     message: 'Successfully created 1 row in database'
                // });
                console.log(tache);
    
                
        }  
        catch(error){
            console.log(error);
            res.json({intervention :error})

            // res.send(500, {error:'Database error'});
            // res.status(status).send(body)
        }
    },
    
    add: function(req, res){
        res.json(tache);            
    
    },
    
                /*****************get all **************************/ 
    
       
        getAllTache:function(req, res){
           
            Tache.find({}).exec(function(err, tache){
                if(err){
                    res.send(500, {error:'Database Error'});
                }
                res.send({
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(tache)
    
            });
        },
                /*****************get by id **************************/ 
    
    getTacheById: (req, res) => {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Tache.findOne({id: req.param('id')}).populate('intervention').exec((error, tache) => {
                res.send(tache);
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
    
    
    
    
    
                /*****************update tache by id **************************/ 
    
    updateTache: async(req, res) => {
      
        const date = req.body.date;
        const description=req.body.description;
        const intervention=req.body.intervention;
        
        // const interventions=req.body.interventions;
    
        try{
            console.log(req.body)
            tache = await Tache.update(   { id: req.body.id }, 
                                                    {date: req.body.date,
                                                     description:req.body.description,
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
                 /*****************delete  Tache by id **************************/ 
    
    deleteTache: function(req, res) {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Tache.destroy({id: req.param('id')}).exec((error) => {
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

