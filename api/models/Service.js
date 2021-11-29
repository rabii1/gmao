/**
 * Service.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  
    nom_service: {
      type: 'string',
      required: true
    },
    techniciens:{
      collection: 'technicien',
      via: 'service'
  },
   equipements:{
     collection: 'equipement',
     via: 'service'
 }
    },
    

  datastores:'sails-mongo',


};

