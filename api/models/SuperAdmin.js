/**
 * SuperAdmin.js
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
      //contains: '@'
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true
    },
    fax: {
      type: 'string',
      minLength: 8,
      required: true
    },
    tel: {
      type: 'string',
      minLength: 8,
      required: true
    },

    etablissement:
    {
      model:'etablissement'
    }
  },
  datastores:'sails-mongo',
};

