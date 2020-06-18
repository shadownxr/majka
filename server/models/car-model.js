const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "majka"
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const Car = function(car) {
  this.brand = car.brand;
  this.model = car.model;
};

Car.getCarsByUserId = ( id, result) => {
    connection.query("SELECT * FROM accountscars a INNER JOIN cars c ON a.carId = c.carId WHERE userId = ?", [id] ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        if (res.length) {
            console.log("Cars found:",res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, false);
    });
};

Car.getAC = result => {
  connection.query("SELECT * FROM accountscars",(err,res) => {
      if(err){
          console.log("error: ", err);
          result(err, false);
          return;
      }

      if (res.length) {
          console.log("Cars found:",res);
          result(null, res);
          return;
      }

      result({ kind: "not_found" }, false);
  });
};

Car.addCarToUser = ( userId, carId, result) => {
    connection.query("INSERT INTO accountscars SET ?", {userId: userId,carId: carId} ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        console.log("Car added to user.");
        result(null,true);
    });
}

Car.deleteUserCar = (userId, carId, result) => {
    connection.query("DELETE FROM accountcars WHERE userId = ? AND carId = ?", [userId,carId], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, false);
          return;
        }
    
        console.log("deleted customer with id: ", id);
        result(null, res);
      });
}

module.exports = Car;