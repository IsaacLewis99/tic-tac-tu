const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:password@127.0.0.1:3306/tic-tac-tu');

sequelize.authenticate().then(() => {
  console.log('Connection established');
}).catch (err => {
  console.error('Unable to connect: ', err);
});
const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});
exports.register = function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  Users.create({
    name: name,
    email: email,
    password: password
  });
  res.redirect('/login');
};
exports.login = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  Users.findOne({
    where: {email: email}
  }).then(users => {
    if (users == null) {

      res.send({
        "code":204,
        "fail":"Email address not found"
      });
    }
    else if (password == users.password){

      req.session.email = users.email;
      req.session.name = users.name;
      req.session.userID = users.id;
      console.log('User ' + req.session.email + ' logged in, id: ' + req.session.userID);
      res.redirect('/play');
    }
    else {
      res.send({
        "code":204,
        "fail":"Email and password does not match"
      });
    }
  });
};
