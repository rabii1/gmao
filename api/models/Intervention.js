/**
 * Intervention.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    date_debut: {
      type: 'ref',
      columnType:'datetime',
      required: true
    },

    // explication:{
    //   type: 'string',
    // },
    etat:{
      type: 'string',
      //required: true
    },
    observation:{
      type: 'string',
      //required: true
    },

    taches: {
      collection: 'tache',
      via: 'intervention'
    },
     ordreintervention:{
       model:'ordreintervention',
     },
     demandepieces: {
      collection: 'demandepiece',
      via: 'interventions'
    },
    pieceinterventions: {
      collection: 'pieceintervention',
      via: 'intervention'
    },
  },
  datastores:'sails-mongo',

};

