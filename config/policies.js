/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
   //'*': 'isAuthenticated',
 // SuperAdminController:{'*':['isAuthenticated']}, 
 // AdminController:{'*':['isAuthenticated']},// access to the  SuperAdminController
 // EmployeeController:{'*':['isAuthenticated']},// access to the  EmployeeController
 // EtablissementController:{'*':['isAuthenticated']},// access to the  EtablissementController
 // TechnicienController:{'*':['isAuthenticated']},// access to the  TechnicienController
 
};
