/**
 * Demandepiece.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

attributes: {

    // nom_piece: {
    //     type: 'string',
    //   },
    piece: {
      type: 'string',
      //required: true
    },
    quantite: {
        type: 'string',
        //required: true
      },
      
      interventions:{
       model:'intervention',
     } 
},
datastores:'sails-mongo',

};

