var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "majka"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    sql = "DROP TABLE IF EXISTS accountsmileage";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("AM droped");
      });
    sql = "DROP TABLE IF EXISTS accountsservice";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("AS droped");
      });
      sql = "DROP TABLE IF EXISTS accountscars";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("AC droped");
      });
      var sql = "DROP TABLE IF EXISTS accounts";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Accounts droped");
      });
      sql = "DROP TABLE IF EXISTS cars";
      con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Cars droped");
        });
      sql = "DROP TABLE IF EXISTS services";
      con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Services droped");
        });
      sql = "DROP TABLE IF EXISTS mileage";
      con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Mileage droped");
        });  
  });