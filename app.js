var express                 = require('express'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    bodyParser              = require('body-parser'),
    User                    = require('./models/user');
    LocalStategy            = require('passport-local'),
    passportLocalMongoose   = require('passport-local')


mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();


const SEVERPORT = 3000;

app.set('view engine', 'ejs');
//for express session.
app.use(require('express-session')({
        secret: "The dog is great",
        resave: false,
        saveUnitialize:false
    }
));

//====================
// USE STATEMENTS
//====================
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//====================
// ROUTES
// ===================
app.get("/", function (req, res) {
    res.render("home");
    }
);

app.get('/main', function(req, res){
    res.render('main');
});

app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret');
});

//====================
// AUTH ROUTES
// ===================
//show sign up form
app.get('/register', function(req, res){
    res.render('register');

});

app.post('/register', function(req, res){
    //console.log( req.body.username);
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
         passport.authenticate("local")(req, res, function() {
         res.redirect('/secret');
         });
    });

});

//Login route
//Render login form
app.get('/login', function(req, res)
    {
        res.render('login');
    }

);

//Login logic - middleware
app.post('/login', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"

}),function(req, res){

});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

app.listen(process.env.PORT || SEVERPORT, function () {
    console.log("The server has started on port: " + process.env.PORT || SEVERPORT);
});