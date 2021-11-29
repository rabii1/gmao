/**
 * NotificationsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    subscribe: function(req, res) {
        // Get userId of user by your method
        var roomName = 'admin' 
        sails.sockets.join(req.socket, roomName);
        res.json({
          room: roomName
        });
      },
      unsubscribe: function(req, res) {
        console.log(req.param('id'))
        console.log(req.param('idclient'))
        sails.sockets.leaveAll(req.param('idclient') , function(err) {
          if (err) {return res.json({
            response: false
          });}
          return res.json({
            response: true
          });
        });
      },
      send: function(req, res) {
        // Get userId of user by your method
        var roomName = 'admin'  
        console.log(roomName)
        sails.sockets.blast(roomName, 'currentChanged');
        res.json({
          msg: roomName+" : Notif sended"
        });
      },
      sendLogout: function(req, res) {
        // Get userId of user by your method
        var roomName = 'admin' ;
        console.log(roomName)
        sails.sockets.blast(roomName, 'reload');
        res.json({
          msg: roomName+" : Notif sended"
        });
      },
};

