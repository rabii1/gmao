/**
 * Technicien.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nom: {
      type: 'string',
      required: true

    },
    prenom: {
      type: 'string',
      required: true

    },
    email: {
      type: 'string',
      unique: true,
      required: true,
    
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true
    },
    grade: {
      type: 'string',
      //required: true
    },
    tel: {
      type: 'string',
      minLength: 8,
      required: true
    },
    etablissement:{
      model:'etablissement'
    },
    service:{
       model:'service'},



  ordreinterventions: {
     collection: 'ordreintervention',
     via: 'technicien'
   },
},
  datastores:'sails-mongo',


};

