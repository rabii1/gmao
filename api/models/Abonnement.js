/**
 * Abonnement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  duree: {
      type: 'ref',
      columnType:'datetime',
      required: true
    },
    prix: {
      type: 'string',
      required: true

    },
    nom_abonnee: {
      type: 'string',
      required: true,
    },

  },
  datastores:'sails-mongo',

};

