/**
 * Etablissement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nomEtab: {
      type: 'string',
      required: true
    },
    numtelephone: {
      type: 'string',
      unique: true,
      required: true,
    },
    activite: {
      type: 'string',
      required: true
    },
    Admins: {
      collection: 'admin',
      via: 'etablissement'
    },
    superAdmins: {
      collection: 'superadmin',
      via: 'etablissement'
    },
    techniciens: {
      collection: 'technicien',
      via: 'etablissement'
    },
    employees: {
      collection: 'employee',
      via: 'etablissement'
    },

  },
  datastores:'sails-mongo',



};

