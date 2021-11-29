module.exports = function isAuthenticated(req, res, next){
    console.log("check before acces ---------");
    console.log(req.sessionID);
    console.log(req.session.authenticated);
    if (req.session.authenticated){
      console.log("------ session existe : oui ");
      return next();
    }
    else {
        console.log("------ session existe : non ");
      return res.forbidden("----Session inexistant : You are not permitted to perform this action.", 403);
    }
  }