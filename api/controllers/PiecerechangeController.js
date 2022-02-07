/**
 * PiecerechangeController
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
        
       
        
          
    /* upload: async (req, res) => {
     

        var fileName;
        try{
            fileName=req.file('file')._files[0].stream.headers['content-disposition'].split('"').reverse()[1];
        }
        catch(e){
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


      
    }); 
    }, */
    
    add:async function(req, res){
       // try{
        console.log('debut ajout')
        console.log("****Piece***",piecerechange);

            var piecerechange = await Piecerechange.create(
                 {
                 nom_piece:req.body.nom_piece,quantite:req.body.quantite, image:req.body.image,
                 ref_piece:req.body.ref_piece,marque_piece:req.body.marque_piece,
                //  code_PR_utilisee:req.body.code_PR_utilisee,
                 fournisseur:req.body.fournisseur,equipements:req.body.equipements
                 })
                 console.log(piecerechange);

                 res.send(piecerechange); 
                //res.json({piecerechange :piecerechange})
                 console.log(piecerechange);
                 //console.log(piecerechange);
                 
         //}  
        // catch(error){
             //res.json({error :error})
             //console.log(Piecerechange);
            //   res.send(500, {error:'Database error'});
            //  res.status(status).send(body) 
        // }
       // res.json(piecerechange);            
    
    },
     /*****************get all **************************/ 
    
       
     getAllPiecerechange:function(req, res){
        //res.view('list');
        Piecerechange.find({}).populate('fournisseur').exec(function(err, piecerechange){
            if(err){
                res.send(500, {error:'Database Error'});
            }
            res.send({
                success: true,
                status: 200,
                message: 'Successfully getall row in database'
            });
            console.log(piecerechange)

        });
    },
            /*****************get Piecerechange  by id **************************/ 

getPiecerechangeById: (req, res) => {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Piecerechange.findOne({id: req.param('id')}).exec((error, piecerechange) => {
            res.send(piecerechange);
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

            /*****************update Piecerechange **************************/ 

updatePiecerechange: async(req, res) => {

    // const code_PR_utilisee=req.body.code_PR_utilisee;
    const nom_piece=req.body.nom_piece;
    const quantite =req.body.quantite;
    const ref_piece =req.body.ref_piece;
    const marque_piece =req.body.marque_piece;
    const fournisseur=req.body.fournisseur;
    const  equipements=req.body.equipements;
    const image=req.body.image;
   
    try{
        console.log(req.body)
        piecerechange = await Piecerechange.update(   { id: req.body.id }, 
                                      {
                                        //   code_PR_utilise: req.body.code_PR_utilise ,
                                        nom_piece:req.body.nom_piece,
                                        quantite: req.body.quantite,
                                        ref_piece: req.body.ref_piece,
                                        marque_piece: req.body.marque_piece,
                                        fournisseur:req.body.fournisseur,
                                        equipements:req.body.equipements,
                                        image:req.body.image,

                                      //etablissement:req.body.etablissement
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
             /*****************delete Piecerechange by id **************************/ 

deletePiecerechange: function(req, res) {
    if (req.method == 'GET' && req.param('id', null) != null) {
        Piecerechange.destroy({id: req.param('id')}).exec((error) => {
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
deletePiecerechangeWithFournisseurNoPermitted: function(req, res) {
console.log(req.param('id'))
if (req.method == 'GET' && req.param('id', null) != null) {
    Fournisseur.find({piecerechange:req.param('id')}).exec((error, piecerechange) => {
        console.log(piecerechange);
       
       
         if (piecerechange.length == 0) {

            console.log('This piece rechange  has no associated Fournisseur');
            Piecerechange.destroy({id:req.param('id')}).exec(function(piecerechange) {

                res.json({action:"deleted"})

            });
            return true;   

       }
       else {
 
            console.log('This piecerechange  has  associated Fournisseur');
             res.json({action:"non",data:piecerechange})
              return true;        
            

        }  
    } )
 }
       
},  
// if (req.method == 'GET' && req.param('id', null) != null) {
//     Piecerechange.find({fournisseur:req.param('id')}).exec(function(error, fournisseur) {
      
//         if (fournisseur.piecerechange.length==0) {
//             console.log('This piece rechange has no associated fournisseur')
//             return true;        
//         }
//         if(fournisseur.length>0){
//             return false;        

//             }

           
//         if(error) {
//             res.json(500, {error:error});
//          }
//             res.json({fournisseur :fournisseur})
//             console.log("NoPermitted to delete piece ");
//         });
//     }
       
// },  

};

