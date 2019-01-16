const express = require('express');
const app = express();
const session  = require('express-session');
const port = 8080;
const bodyParser = require('body-parser');
const auth = require('./routes/sql');

app.use(session({
  secret: 'password',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'ejs');
app.get('/playername', function (req, res) {
  if (req.session.userID == null) {
    res.redirect('/login');
  }
  else {
    res.render('playervsplayer.ejs')
  }
})
var sess;
app.get('/register', (req, res) => res.sendFile(__dirname + '/views/register.html'));
app.get('/login',(req, res) => res.sendFile(__dirname + '/views/login.html'));
app.get('/playername',(req, res) => res.sendFile(__dirname + '/views/playername.html'));
app.get('/logout', (req, res) => {
  req.session.userID = null;
  res.sendFile(__dirname + '/views/logout.html');
});

app.post('/login', auth.login);
app.post('/register', auth.register);
app.listen(port, () => console.log(`The app is running on port: ${port}! Make sure to open it in your browser!`));
