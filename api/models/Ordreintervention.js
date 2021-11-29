/**
 * Ordreintervention.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  
  

    degre_urgence:{
      type: 'string',
      required: true
    },
    
    debutprevu:{
      type: 'string',
      required: true
    },
    dateestimation:{
      type: 'string',
      required: true
    },
    nature_de_travaux:{
      type: 'string',
      required: true
    },
    etat:{
      type: 'string',
      //required: true
    },
    description:{
      type: 'string',
      //required: true
    },

    technicien: {
      model: 'technicien',
    },
    demandeintervention:{
       model:'demandeintervention',
   },
    // equipement:{
    //   model:'equipement',
    // },
    intervention:{
      model:'intervention'
    },

  },
  datastores:'sails-mongo',

};

