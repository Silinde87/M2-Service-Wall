module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        console.log(req.app.locals.login)
        req.app.locals.login = true;
        next();
      } else {
        req.app.locals.login = false;

        res.redirect("/auth/login");
      }
    },
    isLoggedOut: (req, res, next) => {
      if(req.isAuthenticated()){
        req.app.locals.login = true;
        res.redirect('/profile');
      } else {
        req.app.locals.login = false;
        next();
      }
    }
    
  }