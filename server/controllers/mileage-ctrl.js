const Mileage = require("../models/mileage-model.js");

exports.getMileage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Mileage.getMileage( req.body.userId, req.body.carId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving car mileage."
        });
      else res.send(data);
    });
}

exports.postMileage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    const mileage = new Mileage({
        date : req.body.date,
        value : req.body.value,
        distance : req.body.distance
    });

    Mileage.addMileage( mileage, req.body.carId, req.body.userId, (err, data) => {
      if (err)
            res.status(500).send({
              message:
                err.message || "Error during adding Mileage."
          }); else res.send(data);
      });
}

exports.deleteMileage = (req, res) => {
    Mileage.deleteMileage(req.body.mileageId, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Mileage with id ${req.body.mileageId}.`
                });
              } else {
                res.status(500).send({
                  message: "Could not delete Mileage with id" + req.body.mileageId
                });
              }
            } else res.send({ message: `Mileage was deleted successfully!` });
      });
}; 


exports.updateMileage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Mileage.upMileage(req.body.mileageId,req.body.newDate,req.body.newValue,req.body.newDistance, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Mileage with id ${req.body.mileageId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Mileage for id " + req.body.mileageId
              });
            }
          } else res.send(data);
        }
      );
}

exports.searchMileage = (req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
  }

  Mileage.searchMileageFromTo( req.body.userId, req.body.carId, req.body.dateFrom, req.body.dateTo,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving car mileage."
      });
    else res.send(data);
  });
}