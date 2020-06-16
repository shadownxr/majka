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

const Services = function(services) {
  this.date = services.date;
  this.title = services.title;
};

Services.getServicesById = ( userId, carId, result) => {
    connection.query("SELECT * FROM accountsservice JOIN services ON accountsservice.serviceId = services.serviceId WHERE userId = ? AND carId = ?", [userId,carId] ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        if (res.length) {
            console.log("Services:",res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, false);
    });
};

Services.addService = (newService, result) => {
    connection.query("INSERT INTO service SET ?", newService ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        console.log("Service created ");
        result(null,true);
    });
}

Services.getLastId = result => {
    connection.query("SELECT LAST_INSERT_ID() AS id",(err,res) => {
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
}

Services.addServiceInAS = (userId,carId,serviceId,result) => {
    connection.query("INSERT INTO accountsservice SET userId = ?, carId = ?, serviceId = ?", [userId,carId,serviceId] ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        console.log("Service added to AS ");
        result(null,true);
    });
}

Services.deleteService = (serviceId,result) => {
    connection.query("DELETE FROM services WHERE serviceId = ?", [serviceId], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, false);
          return;
        }
    
        console.log("deleted service with id: ", serviceId);
        result(null, res);
      });
}

Services.deleteServiceInAS = (serviceId,userId,carId,result) => {
    connection.query("DELETE FROM accountservice WHERE userId = ? AND carId = ? AND serviceId = ?", [userId,carId,serviceId], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, false);
          return;
        }
    
        console.log("deleted accountservice with serviceId: ", serviceId);
        result(null, res);
      });
}

Services.updateService = (serviceId,newTitle,newDate,result) => {
    connection.query("UPDATE services SET title = ?, date = ? WHERE serviceId = ?", [newTitle,newDate,serviceId] ,(err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, false);
            return;
        }

        if (res.addectedRows) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated services: ", { serviceId: serviceId, title: newTitle, date: newDate });
        result(null, { serviceId: serviceId, title: newTitle, date: newDate });
    })
}

module.exports = Services;