const express = require("express");
const router = express.Router();


let user = {username: "imani.oliver@gmail.com", password: "wordpass"};
// let token = "a123456798765z";

function authenticate(req, res, next) {
    if (req.session.token) {
        res.redirect('/');
    } else {
        console.log('no token');
        next();
    }
};

router.get('/', authenticate, function(req,res) {
    if (req.session.token){
            next();
            // res.render('results', {user:user})
        } else {
            res.redirect("/login")
    }
     res.render('results', {user:user})
});

//
router.post('/', function(req, res){
    if (req.session.token){
        res.render('results')
    } else {
        res.redirect("")
    }
});
//
router.get('/login', function(req, res){
    res.render('login');
});

                                                        //
                                                        // router.post('/login' function(req, res){
                                                        //     res.render(login)
                                                        //
                                                        // })

                                                        // router.post('/login', function(req) )



router.post('/login', function(req, res){
    if (user.username==user.username && user.password==user.password) {
        req.session.user = user;
        req.session.token = "a123456798765z";



      req.checkBody("email", "Email cannot be empty.").notEmpty();
      req.checkBody("email", "Must be an email.").isEmail();
      req.checkBody("name", "Name cannot be empty.").notEmpty();
      req.checkBody("name", "must be fewer than 100 characters").isLength({max: 100});
      req.checkBody("year", "must be a year between 1900 and 2017").isLength({min:1900}, {max:2017});
      req.checkBody("position", "Must select from one of the positions provided").notEmpty();
      req.checkBody("password", "Password must contain at least 8 characters").notEmpty().isLength({min:8});




      let errors = req.getValidationResult();
      let messages = [];

      errors.then(function(result) {
        result.array().forEach(function(error) {
          messages.push(error.msg);
        });

        let obj = {
          errors: messages,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        };

        res.render('results', obj);
    } else {
        res.redirect("/dupecheck")
    }
      });

});
//
//
module.exports = router;
