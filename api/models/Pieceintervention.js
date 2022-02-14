/**
 * Pieceintervention.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


    piece: {
      model:'piecerechange',
      //required: true
    },
  
      
      intervention:{
       model:'intervention',
     } 
},
datastores:'sails-mongo',


  

};

