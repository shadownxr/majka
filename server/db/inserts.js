var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "majka"
});

var insertCars = "INSERT INTO cars (brand,model,engineType,enginePower,sizeWidth,sizeLength,caricon) VALUES ?";
var valuesCars = [
    ['Porsche','911 (992)','benzynowy','385KM',1852,4519,'./caricons/porsche-3-logo-svg-vector.svg'],
    ['Porsche','Carrera GT','benzynowy','612KM',1921,4613,'./caricons/porsche-3-logo-svg-vector.svg'],
    ['Ford','Mustang VI','benzynowy','450KM',1916,4784,'./caricons/ford-icon.svg']
];

var insertAccounts = "INSERT INTO accounts (login,password,name,email) VALUES ?";
var valuesAccounts =[['admin','asdf','Admin','AAdminowsky@gmail.com']];

var insertServices = "INSERT INTO services (date,title) VALUES ?";
var valuesServices = [
    ['2020-04-23','Wymiana oleju'],
    ['2020-04-27','Wymiana lamp'],
    ['2020-04-23','Wymiana paska'],
    ['2020-05-22','Wymiana lamp'],
    ['2020-01-27','Przegląd'],
    ['2020-05-01','Wymiana oleju']
];

var insertMileage = "INSERT INTO mileage (date,value,distance) VALUES ?";
var valuesMileage = [
    ['2020-04-21','100','300'],
    ['2020-04-23','50','100'],
    ['2020-04-27','70','200'],
    ['2020-04-23','100','300'],
    ['2020-04-24','50','100'],
    ['2020-04-27','70','200'],
    ['2020-04-23','100','300'],
    ['2020-04-27','100','300'],
    ['2020-04-30','50','100']
];

var accountsCars = "INSERT INTO accountscars (userId,carId) VALUES ?";
var valuesAccountsCars = [
    [1,1],
    [1,2],
    [1,3]
];

var accountsMileage = "INSERT INTO accountsmileage (userId,acId,mileageId) VALUES ?";
var valuesAccountsMileage = [
    [1,1,1],
    [1,1,2],
    [1,1,3],
    [1,2,4],
    [1,2,5],
    [1,2,6],
    [1,3,7],
    [1,3,8],
    [1,3,9]
];

var accountsService = "INSERT INTO accountsservice (userId,acId,serviceId) VALUES ?";
var valuesAccountsService = [
    [1,1,1],
    [1,1,2],
    [1,2,3],
    [1,2,4],
    [1,3,5],
    [1,3,6]
];

var trigger1 = "create trigger add_dummy_car AFTER INSERT ON accounts FOR EACH ROW INSERT INTO accountscars SET userId = New.id, carId = 1";
var trigger2 = "CREATE TRIGGER del_on_serv_del BEFORE DELETE ON services FOR EACH ROW DELETE FROM accountsservice WHERE serviceId = old.serviceId;";
var trigger3 = "CREATE TRIGGER del_on_mile_del BEFORE DELETE ON mileage FOR EACH ROW DELETE FROM accountsmileage WHERE mileageId = old.mileageId;";

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(insertCars, [valuesCars], function (err, result) {
        if (err) throw err;
        console.log("Number of records Cars inserted: " + result.affectedRows);
    });
    con.query(insertAccounts, [valuesAccounts], function (err, result) {
        if (err) throw err;
        console.log("Number of records Accounts inserted: " + result.affectedRows);
    });
    con.query(insertMileage, [valuesMileage], function (err, result) {
        if (err) throw err;
        console.log("Number of records Mileage inserted: " + result.affectedRows);
    });
    con.query(insertServices, [valuesServices], function (err, result) {
        if (err) throw err;
        console.log("Number of records Services inserted: " + result.affectedRows);
    });
    con.query(accountsCars, [valuesAccountsCars], function (err, result) {
        if (err) throw err;
        console.log("Number of records AccountsCars inserted: " + result.affectedRows);
    });
    con.query(accountsMileage, [valuesAccountsMileage], function (err, result) {
        if (err) throw err;
        console.log("Number of records AccountsMileage inserted: " + result.affectedRows);
    });
    con.query(accountsService, [valuesAccountsService], function (err, result) {
        if (err) throw err;
        console.log("Number of records AccountsService inserted: " + result.affectedRows);
    });
    con.query(trigger1, function (err, result) {
        if (err) throw err;
        console.log("Trigger 1 created");
    });
    con.query(trigger2, function (err, result) {
        if (err) throw err;
        console.log("Trigger 2 created");
    });
    con.query(trigger3, function (err, result) {
        if (err) throw err;
        console.log("Trigger 3 created");
    });
});