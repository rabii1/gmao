/**
 * Equipement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    libelle: {
      type: 'string',
      required: true
    },
    numero_model: {
      type: 'string',
      required: true
    },
    numero_serie: {
      type: 'string',
      required: true

    },
    marque: {
      type: 'string',
     required: true,
    },
    duree_en_service: {
      type: 'string',
      //required: true,
    },
    date_en_service: {
      type: 'string',
      required: true,
    },
    date_hors_service: {
     type: 'string',
      /*required: true, */ 
    },
    image: {
      type: 'string',
     // required: true,
    },
    service:{
      model:'service'
    },

    // demandeintervention:{
    //    model: 'demandeintervention',
    //   },
      demandeinterventions:{
        collection: 'demandeintervention',
        via: 'equipement',
    },


    etatequipements:{
        collection: 'etatequipement',
        via: 'equipement',
    },
    
    // ordreintervention: {
    //   model: 'ordreintervention',
    // },
  
    piecerechanges:{
      collection: 'piecerechange',
      via: 'equipements',
  },

  },
  datastores:'sails-mongo',
};

