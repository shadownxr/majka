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
    Services.addService(service, req.body.carId, req.body.userId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Error during adding Service to AS."
          });
      else res.send(data);
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

exports.searchServices = (req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
  }

  console.log(req.body);
  if(((((req.body.title !== '' )||(req.body.title !==  null)))&&((req.body.dateFrom === '' )||(req.body.dateFrom ===  null)))&&(( req.body.dateTo === '' )||(req.body.dateTo ===  null))){
    Services.searchServicesTitle( req.body.userId, req.body.carId, req.body.title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving services. 1"
        });
      else res.send(data);
  })
} else if(((((req.body.dateFrom !== '') || (req.body.dateFrom !== null)))&&(( req.body.dateTo !== '' )||(req.body.dateTo !==  null)))&&((req.body.title === '' )||(req.body.title ===  null))){
    Services.searchServicesFromTo( req.body.userId, req.body.carId, req.body.dateFrom, req.body.dateTo, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving services. 2"
        });
      else res.send(data);
  })
} else if(((((req.body.dateFrom !== '' )||(req.body.dateFrom !==  null)))&&(( req.body.dateTo !== '' )||(req.body.dateTo !==  null)))&&((req.body.title !== '' )||(req.body.title !== null))){
  Services.searchServicesFromToTitle( req.body.userId, req.body.carId, req.body.dateFrom, req.body.dateTo, req.body.title,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services. 3"
      });
    else res.send(data);
})
}
}