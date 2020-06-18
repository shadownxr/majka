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

const Mileage = function(mileage) {
    this.date = mileage.date;
    this.value = mileage.value;
    this.distance = mileage.distance;
};
  
Mileage.getMileage = ( userId, carId, result) => {
    connection.query("SELECT * FROM accountsmileage JOIN mileage ON accountsmileage.mileageId = mileage.mileageId WHERE userId = ? AND acId = ?", [userId,carId] ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        if (res.length) {
            console.log("Mileage found:",res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, false);
    });
}

Mileage.addMileage = (newMileage, carId, userId, result) => {
    pool.getConnection((err, con) => {
        if(err){
            console.log("error: ", err);
            con.release();
            result(err, false);
            return;
        }
            con.query("INSERT INTO mileage SET ?", newMileage ,(err,res) => {
                if(err){
                    console.log("error: ", err);
                    result(err, false);
                    return;
                } else {
                con.query(`INSERT INTO accountsmileage (userId,acId,mileageId) VALUES (${userId},${carId},LAST_INSERT_ID())`, (err,res) => {
                    con.release();
                    if(err){
                        console.log("error: ", err);
                        result(err, false);
                        return;
                    }
                    console.log("Mileage created ");
                    result(null,true);
                    return;
                });
            }
        });
    });
}

Mileage.addMileageInAM = (userId,carId,serviceId,result) => {
    connection.query("INSERT INTO accountsmileage SET userId = ?, carId = ?, serviceId = ?", [userId,carId,serviceId] ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        console.log("Mileage added to AM ");
        result(null,true);
    });
}

Mileage.deleteMileage = (mileageId,result) => {
    connection.query("DELETE FROM mileage WHERE mileageId = ?", [mileageId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, false);
            return;
        }
    
        console.log("deleted mileage with id: ", mileageId);
        result(null, res);
    });
}
  
Mileage.delMileageInAM = (mileageId,userId,carId,result) => {
    connection.query("DELETE FROM accountsmileage WHERE userId = ? AND carId = ? AND mileageId = ?", [userId,carId,mileageId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, false);
            return;
        }
    
        console.log("deleted accountsmileage with mileageId: ", mileageId);
        result(null, res);
    });
}
  
Mileage.upMileage = (mileageId,newDate,newValue,newDistance,result) => {
    connection.query("UPDATE mileage SET  date = ?, value = ?, distance = ?, WHERE mileageId = ?", [newDate,newValue,newDistance,serviceId] ,(err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, false);
            return;
        }

        if (res.addectedRows) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated services: ", { mileageId: mileageId, value: newValue, distance: newDistance, date: newDate });
        result(null, { mileageId: mileageId, value: newValue, distance: newDistance, date: newDate });
    })
}

Mileage.searchMileageFromTo = ( userId, carId, dateFrom, dateTo, result) => {
    connection.query("SELECT * FROM accountsmileage a JOIN mileage m ON a.mileageId = m.mileageId WHERE a.userId = ? AND a.acId = ? AND m.date >= ? AND m.date <= ?", [userId,carId,dateFrom,dateTo] ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        if (res.length) {
            console.log("Mileage:",res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, false);
    });
};
  
module.exports = Mileage;