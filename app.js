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

//==================== USE STATEMENTS ===============
//===================================================
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================== ROUTES =======================
//===================================================
app.get("/", function (req, res) {
    res.render("home");
    }
);

app.get('/main', function(req, res){
    res.render('main');

});

app.listen(process.env.PORT || SEVERPORT, function () {
    console.log("The server has started on port: " + process.env.PORT || SEVERPORT);
});