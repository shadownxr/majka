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

const Account = function(account) {
  this.login = account.login;
  this.password = account.password;
  this.name = account.name;
  this.email = account.email;
};

Account.createAccount = ( newAccount, result) => {
    connection.query("INSERT INTO accounts SET ?", newAccount ,(err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, false);
            return;
        }

        console.log("New Account created: ");
        result(null,true);
    });
};

Account.checkLogPass = ( login, password, result) => {
    connection.query(`SELECT * FROM accounts WHERE login = '${login}' AND password = '${password}'`, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Correct login and password");
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    })
}

Account.checkIfExist = ( login, email, result ) => {
    connection.query(`SELECT * FROM accounts WHERE login = ${login} OR email = ${email}`, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, false);
            return;
        }

        if (res.length) {
            console.log("User exist");
            result(null, true);
            return;
        }

        result({kind: "not_found"}, false);
    })
}

Account.updatePassword = ( id, password, result) => {
    connection.query("UPDATE accounts SET password = ? WHERE id = ?", [password,id] ,(err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, false);
            return;
        }

        if (res.addectedRows) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated account: ", { id: id, password: password });
        result(null, { id: id, password: password });
    })
}

Account.getAll = result => {
    connection.query("SELECT * FROM accounts ", (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("accounts: ", res);
        result(null, res);
    })
}

module.exports = Account;