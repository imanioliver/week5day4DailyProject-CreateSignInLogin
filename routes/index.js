const express = require("express");
const router = express.Router();


let user = {username: "imanirocks", password: "wordpass"};
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
    res.render('results',  {user: user});
});


router.post('/', function(req, res){
    if (req.session.token){
        res.render('results')
    } else {
        res.redirect("/login")
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

router.get("/dupecheck", function (req, res) {
    res.send('this is where this goes')
})


router.post('/login', function(req, res){
    if (user.username==user.username && user.password==user.password) {
        req.session.user = user;
        req.session.token = "a123456798765z";
    } else {
        res.redirect("/dupecheck")
    }

});


module.exports = router;
