const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "majka"
});

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '12345',
    database : 'majka'
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
    connection.query("SELECT * FROM accountsservice JOIN services ON accountsservice.serviceId = services.serviceId WHERE userId = ? AND acId = ?", [userId,carId] ,(err,res) => {
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

Services.addService = (newService,carId,userId, result) => {
    pool.getConnection((err, con) => {
    if(err){
        console.log("error: ", err);
        con.release();
        result(err, false);
        return;
    }
        con.query(`INSERT INTO services SET ?`, newService ,(err,res) => {
            if(err){
                console.log("error: ", err);
                con.release();
                result(err, false);
                return;
            } else {
                con.query(`INSERT INTO accountsservice (userId,acId,serviceId) VALUES (${userId},${carId},LAST_INSERT_ID())`, (err,res) => {
                    con.release();
                    if(err){
                        console.log("error: ", err);
                        result(err, false);
                        return;
                    }
                    console.log("Service created ");
                    result(null,true);
                    return;
                });
            }
        });
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
    connection.query("INSERT INTO accountsservice SET userId = ?, acId = ?, serviceId = ?", [userId,carId,serviceId] ,(err,res) => {
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

Services.searchServicesFromTo = ( userId, carId, dateFrom, dateTo,result) => {
    connection.query("SELECT * FROM accountsservice a JOIN services s ON a.serviceId = s.serviceId WHERE a.userId = ? AND a.acId = ? AND s.date >= ? AND s.date <= ?", [userId,carId,dateFrom,dateTo] ,(err,res) => {
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

Services.searchServicesTitle = ( userId, carId, title, result) => {
    connection.query("SELECT * FROM accountsservice a JOIN services s ON a.serviceId = s.serviceId WHERE a.userId = ? AND a.acId = ? AND s.title = ?", [userId,carId,title] ,(err,res) => {
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

Services.searchServicesFromToTitle = ( userId, carId, dateFrom, dateTo,title,result) => {
    connection.query("SELECT * FROM accountsservice a JOIN services s ON a.serviceId = s.serviceId WHERE a.userId = ? AND a.acId = ? AND s.date >= ? AND s.date <= ? AND title = ?", [userId,carId,dateFrom,dateTo,title] ,(err,res) => {
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

module.exports = Services;