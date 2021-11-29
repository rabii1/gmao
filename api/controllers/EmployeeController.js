/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    createEmployee: async (req, res) => {
        let nom = req.body.nom;
        let prenom=req.body.prenom;
        let email = req.body.email;
        let password=req.body.password;
        let adresse=req.body.adresse;
        let tel=req.body.tel;
        let etablissement=req.body.etablissement;

        try{
             employee = await Employee.create(
                    { nom:nom,prenom:prenom, email:email,password:password,
                      adresse:adresse,tel:tel,etablissement:etablissement
                    })
            
                res.send( {
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(employee);
                
        }  
        catch(error){
            console.log(employee);
            res.send(500, {error:'Database error'});
            res.status(status).send(body)
        }
    },
    
    add: function(req, res){
        res.json(employee);            
    
    },
    
                /*****************get all **************************/ 
    
       
        getAllEmployee:function(req, res){
            //res.view('list');
            Employee.find({}).exec(function(err, employee){
                if(err){
                    res.send(500, {error:'Database Error'});
                }
                res.send({
                    success: true,
                    status: 200,
                    message: 'Successfully created 1 row in database'
                });
                console.log(employee)
    
            });
        },
                /*****************get by id **************************/ 
    
    getEmployeeById: (req, res) => {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Employee.findOne({id: req.param('id')}).exec((error, employee) => {
                res.send(employee);
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
    
                /*****************update Employee by id **************************/ 
    
    updateEmployee: async(req, res) => {
      
        const nom = req.body.nom;
        const prenom=req.body.prenom;
        const email = req.body.email;
        const password=req.body.password;
        const adresse=req.body.adresse;
        const tel=req.body.tel;
        const etablissement=req.body.etablissement;
        try{
            console.log(req.body)
            employee = await Employee.update({   id: req.body.id }, 
                                                {nom: req.body.nom ,
                                                prenom:req.body.prenom,
                                                email: req.body.email,
                                                password:req.body.password,
                                                adresse:req.body.adresse,
                                                tel:req.body.tel,
                                                etablissement:req.body.etablissement
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
                 /*****************delete  Employee by id **************************/ 
    
    deleteEmployee: function(req, res) {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Employee.destroy({id: req.param('id')}).exec((error) => {
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
   
    
    deleteEmployeeWithDemandeInterventionNoPermitted: function(req, res) {
        console.log(req.param('id'))
        if (req.method == 'GET' && req.param('id', null) != null) {
            Demandeintervention.find({employee:req.param('id')}).exec((error, employee) => {
                console.log(employee);
               
                 if (employee.length == 0) {
        
                    console.log('This employee  has no associated demande intervention');
                    Employee.destroy({id:req.param('id')}).exec(function(employee) {
        
                        res.json({action:"deleted"})
        
                    });
                    return true;   
        
               }
               else {
         
                    console.log('This employee  has  associated Demande intervention');
                     res.json({action:"non",data:employee})
                      return true;        
                    
        
                }  
            } )
         }
               
        },     
};

