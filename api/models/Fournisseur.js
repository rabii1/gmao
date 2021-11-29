/**
 * Fournisseur.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // code_fournisseur: {
    //   type: 'string',
    //   required: true

    // },
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
      //contains: '@'
    },
    tel: {
      type: 'string',
      minLength: 8,
      required: true
    },
    adresse: {
      type: 'string',
      required: true
    },
    
    Piecerechanges: {
      collection: 'Piecerechange',
      via: 'fournisseur'
    }
    // nom_fabricant: {
    //   type: 'string',
    //   required: true
    // }
    },
  
    datastores:'sails-mongo',



};

