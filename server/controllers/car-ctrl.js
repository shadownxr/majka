const Car = require("../models/car-model.js");

exports.getCars = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Car.getCarsByUserId( req.body.userId, (err, data) => {
      console.log(req.body.userId);
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      else res.send(data);
    });  
};

exports.addCar = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Car.addCarToUser( req.body.userId, req.body.carId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Error during creating Account."
          });
        else res.send(data);
    });  
};

exports.getAC = (req, res) => {
  Car.getAC((err, data) => {
    console.log(req.body.userId);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    else res.send(data);
  });  
};

exports.deleteCar = (req, res) => {
    Car.deleteUserCar(req.body.userId, req.body.carId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.body.userId} and Car with id ${req.body.carId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.body.userId + "and Car with id" + req.body.carId
            });
          }
        } else res.send({ message: `Car was deleted successfully!` });
      }); 
};