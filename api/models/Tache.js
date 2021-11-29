/**
 * Tache.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    date:{
      type: 'string',
      //required: true
    },
    description:{
      type: 'string' ,
      //type: 'array',
      //type: 'string',
     //required: true
    },
    intervention:{
      model:'intervention'
    },
  },
  datastores:'sails-mongo',
};

