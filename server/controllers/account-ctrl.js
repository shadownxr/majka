const Account = require("../models/account-model.js");

exports.signUp = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const account = new Account({
    login: req.body.login,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email
  });

  Account.createAccount( account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error during creating Account."
      });
    else res.send(data);
  });  
};

exports.getAccounts = (req, res) => {
  Account.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });  
};

exports.signIn = (req, res) => {
  console.log(req.body);
  Account.checkLogPass(req.body.login, req.body.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Wrong login or Password.",
          found: false
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Login or Password.",
          found: false
        });
      }
    } else res.send({data, found: true});
  });
};

exports.changePassword = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Account.updatePassword(req.body.userId, req.body.password, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.body.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating password for id " + req.body.userId
          });
        }
      } else res.send(data);
    }
  ); 
};
