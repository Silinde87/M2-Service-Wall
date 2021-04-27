module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        console.log(req.app.locals.login)
        req.app.locals.login = true;
        req.app.locals.img = "https://res.cloudinary.com/dkevcmz3i/image/upload/v1619367396/Service-Wall/m1v2ozbprq1ndyl7teow.png"
        next();
      } else {
        req.app.locals.login = false;

        res.redirect("/auth/login");
      }
    },
    isLoggedOut: (req, res, next) => {
      if(req.isAuthenticated()){
        req.app.locals.login = true;
        req.app.locals.img = "https://res.cloudinary.com/dkevcmz3i/image/upload/v1619367396/Service-Wall/m1v2ozbprq1ndyl7teow.png"
        res.redirect('/profile');
      } else {
        req.app.locals.login = false;
        next();
      }
    }
    
  }