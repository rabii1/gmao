/**
 * Etatequipement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nometat: {
      type: 'string',
      required: true
    },
    dateetat: {
      type: 'string',
     // columnType:'datetime',
      //required: true,

    },
    status: {
      type: 'string',
     // columnType:'datetime',
      //required: true,

    },
  //   equipement:{
  //     model:'equipement',
  // },
  equipement:{
    model: 'equipement',
    //dominant:true,


},
  },
  datastores:'sails-mongo',
};

