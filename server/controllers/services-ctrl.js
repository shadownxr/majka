const Services = require("../models/services-model.js");

exports.getServices = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Services.getServicesById( req.body.userId, req.body.carId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving services."
        });
      else res.send(data);
    });
}

exports.postServices = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    const service = new Services({
        date : req.body.date,
        title : req.body.title
    });

    Services.addService( service, (err, data) => {
        if (err)
              res.status(500).send({
                message:
                  err.message || "Error during adding Service to AS."
            }); else
        Services.addServiceInAS( req.body.userId, req.body.carId, req.body.serviceId, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Error during adding Service to AS."
              });
            else res.send(data);
        });
    });
}

exports.deleteServices = (req, res) => {
    Services.deleteServiceInAS(req.body.serviceId, req.body.userId, req.body.carId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.body.userId} and Service with id ${req.body.serviceId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.body.userId + "and Service with id" + req.body.serviceId
            });
          }
        } else Services.deleteService(req.body.serviceId, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Service with id ${req.body.serviceId}.`
                });
              } else {
                res.status(500).send({
                  message: "Could not delete Service with id" + req.body.serviceId
                });
              }
            } else res.send({ message: `Service was deleted successfully!` });
      });
    }); 
}

exports.updateServices = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Services.updateService(req.body.serviceId,req.body.newTitle,req.body.newDate, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Service with id ${req.body.serviceId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating service for id " + req.body.serviceId
              });
            }
          } else res.send(data);
        }
      );
}

exports.getLastInsertedId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Services.getLastId((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      else res.send(data);
    });
}