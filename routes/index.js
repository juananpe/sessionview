var express = require('express');
var router = express.Router();
var session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

// Use the session middleware
router.use(session({
  secret: 'clavesecretaparaexpresss',
  saveUninitialized: true, // create session even if there is nothing stored
  resave: true, // save session even if unmodified
  cookie: { maxAge: 60 * 60 * 1000 },
 // store: new MongoStore({ url: 'mongodb://127.0.0.1:27017/test-app'})
}));


router.get('/',(req,res) => {
  if(req.session.email) {
    return res.redirect('/admin');
  }
  res.render('index', { title : 'title'});
});

router.post('/login',(req,res) => {
  req.session.email = req.body.email;
  res.end('done');
});

router.get('/admin',(req,res) => {
  if(req.session.email) {
    res.write(`<h1>Hello ${req.session.email} </h1><br>`);
    res.end('<a href='+'/logout'+'>Logout</a>');
  }
  else {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href='+'/'+'>Login</a>');
  }
});

router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });

});


// // Access the session as req.session
// router.get('/', function(req, res, next) {
//   if (req.session.views) {
//     req.session.views++;
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<p>views: ' + req.session.views + '</p>');
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
//     res.end()
//   } else {
//     req.session.views = 1;
//     res.end('welcome to the session demo. refresh!')
//   }
// });
module.exports = router;
