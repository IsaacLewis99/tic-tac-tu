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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var sess;
app.get('/play', (req, res) => res.sendFile(__dirname + '/views/play.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/views/register.html'));
app.get('/login',(req, res) => res.sendFile(__dirname + '/views/login.html'));

app.get('/logout', (req, res) => {
  req.session.userID = null;
  res.sendFile(__dirname + '/views/logout.html');
});

app.post('/login', auth.login);
app.post('/register', auth.register);
app.listen(port, () => console.log(`The app is running on port: ${port}! Make sure to open it in your browser!`));
