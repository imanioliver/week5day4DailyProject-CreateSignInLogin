const express = require("express");
const router = express.Router();


let user = {username: "imani.oliver@gmail.com", password: "password"};
let messages = [];
let obj;
// let token = "a123456798765z";

function authenticate(req, res, next) {
    if (!req.session.token) {
        console.log("no token");
        res.redirect('/login');
    } else {
        console.log('there is a token');
        next();
    }
};

router.get('/login', function(req, res){
    if(req.session.token){
        res.redirect('/')
    } else {
        res.render('login', {errors:obj});
    }
});

router.get('/', authenticate, function(req,res) {
    res.render('results', {user:user});
    });

router.post('/', function(req, res){

    messages = [];
    
        req.checkBody("email", "must be a valid email").isEmail();
        req.checkBody("email", "can't be empty").notEmpty();
        req.checkBody("password", "Password must contain at least 8 characters").notEmpty().isLength({min:8});
        req.checkBody("username", "Username must be at least 8 characters and no more than 25 characters, and may only use numbers and letters.").notEmpty().isLength({min:8}).isLength({max:25}).isWhitelisted('', 'abcd');

        let errors = req.getValidationResult();


        errors.then(function(result){
            result.array().forEach(function(error){
                messages.push(error.msg);
            });

            obj = {
              errors: messages,
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
            };
            console.log("the errors" + errors);
            console.log("the obj" + obj);
            console.log("these are the messages" + messages );

//above are the errors. where do I render?

// res.render('/', )


    let object = {
        username: req.body.username,
        password: req.body.password
    }

    console.log(object);
    console.log(user);




    if (user.username==object.username && user.password==object.password) {
        console.log("matching login");
        req.session.user = user;
        req.session.token = "a123456798765z";
        res.redirect('/');
    } else {
        console.log("redirected");
        res.redirect("/login")
    }

 });
});



router.get("/logout", function(req, res) {
  // req.session.destroy(); is good too
  req.session.destroy(function(err) {
    console.log(err);
  });

  res.redirect("/login");
});


module.exports = router;
