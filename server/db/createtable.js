var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "majka"
});

var accounts = "CREATE TABLE accounts ( id INT AUTO_INCREMENT PRIMARY KEY, login VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)";
var cars = "CREATE TABLE cars ( id INT AUTO_INCREMENT PRIMARY KEY, brand VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, engineType VARCHAR(255) NOT NULL,enginePower VARCHAR(255) NOT NULL,sizeWidth INT NOT NULL,sizeLength INT NOT NULL, caricon VARCHAR(255) NOT NULL)";
var services = "CREATE TABLE services ( serviceId INT AUTO_INCREMENT PRIMARY KEY, date DATETIME NOT NULL, title VARCHAR(255) NOT NULL)";
var mileage = "CREATE TABLE mileage ( mileageId INT PRIMARY KEY AUTO_INCREMENT, date DATETIME NOT NULL, value INT NOT NULL, distance INT NOT NULL)";
var accounts_cars = "CREATE TABLE accountsCars ( id INT AUTO_INCREMENT PRIMARY KEY, userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES accounts(id), carId INT NOT NULL, FOREIGN KEY (carId) REFERENCES cars(id))";
var accounts_mileage = "CREATE TABLE accountsMileage ( id INT AUTO_INCREMENT PRIMARY KEY, userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES accounts(id), carId INT NOT NULL, FOREIGN KEY (carId) REFERENCES cars(id), mileageId INT NOT NULL, FOREIGN KEY (mileageId) REFERENCES mileage(mileageId))";
var accounts_services = "CREATE TABLE accountsService ( id INT AUTO_INCREMENT PRIMARY KEY, userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES accounts(id), carId INT NOT NULL, FOREIGN KEY (carId) REFERENCES cars(id), serviceId INT NOT NULL, FOREIGN KEY (serviceId) REFERENCES services(serviceId))";

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(accounts, function (err, result) {
      if (err) throw err;
      console.log("Accounts created");
    });
    con.query(cars, function (err, result) {
      if (err) throw err;
      console.log("Cars created");
    });
    con.query(services, function (err, result) {
      if (err) throw err;
      console.log("Services created");
    });
    con.query(mileage, function (err, result) {
      if (err) throw err;
      console.log("mileage created");
    });
    con.query(accounts_cars, function (err, result) {
      if (err) throw err;
      console.log("AccountsCars created");
    });
    con.query(accounts_mileage, function (err, result) {
      if (err) throw err;
      console.log("AccountsMileage created");
    });
    con.query(accounts_services, function (err, result) {
      if (err) throw err;
      console.log("AccountsServices created");
    });
  });