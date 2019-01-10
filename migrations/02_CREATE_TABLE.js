var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "tic-tac-tu"
});

var sql_create_users_table = "CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(60), email VARCHAR(60), password TEXT);"

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql_create_users_table, function (err, result) {
    if (err) throw err;
    console.log("Table USERS created");
  });
});
