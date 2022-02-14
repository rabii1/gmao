/**
 * Piecerechange.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  //  code_PR_utilisee:{
  //   type: 'string',
  //   required: true
  //  },
   
  nom_piece:{
    type: 'string',
    required: true
   },
   
   quantite:{
    type: 'string',
    required: true
   },
   
   ref_piece:{
    type: 'string',
    required: true
   },
   marque_piece:{
    type: 'string',
    required: true
   },
  image:{
    type: 'string',
    //required: true
   },
   fournisseur:
   {
     model:'fournisseur'
   },
   equipements:{
    collection: 'equipement',
    via: 'piecerechanges',
},
 
  },
  datastores:'sails-mongo',

};

