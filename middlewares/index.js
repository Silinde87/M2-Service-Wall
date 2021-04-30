//Used to check if user is logged in or logged out. Allows navigations to private views
module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        req.app.locals.login = true;
        req.app.locals.img = req.user.image;
        next();
      } else {
        req.app.locals.login = false;
        res.redirect("/auth/login");
      }
    },
    isLoggedOut: (req, res, next) => {
      if(req.isAuthenticated()){
        req.app.locals.login = true;
        req.app.locals.img = req.user.image;
        res.redirect('/profile');
      } else {
        req.app.locals.login = false;
        next();
      }
    }
    
  }