var express = require('express');
var router = express.Router();

const AccountCtrl = require('../controllers/account-ctrl');
const CarCtrl = require('../controllers/car-ctrl');
const ServiceCtrl = require('../controllers/services-ctrl');
const MileageCtrl = require('../controllers/mileage-ctrl');

router.get('/accounts', AccountCtrl.getAccounts);
router.post('/accounts/signup', AccountCtrl.signUp);
router.post('/accounts/signin', AccountCtrl.signIn);
router.post('/accounts/user', AccountCtrl.changePassword);

router.post('/cars/list',CarCtrl.getCars);
router.post('/cars/:userId/:carId', CarCtrl.addCar);
router.delete('/cars/:userId/:carId',CarCtrl.deleteCar);

router.post('/services/:userId/:carId', ServiceCtrl.getServices);
router.post('/services/:userId/:carId/:date/:title', ServiceCtrl.postServices);
router.delete('/services/:userId/:carId/:serviceId', ServiceCtrl.deleteServices);
router.post('/services/:serviceId/:newDate/:newTitle',ServiceCtrl.updateServices);
router.get('/lastId',ServiceCtrl.getLastInsertedId);

router.post('/mileage/:userId/:carId', MileageCtrl.getMileage);
router.post('/mileage/:userId/:carId/:date/:value/:distance', MileageCtrl.postMileage);
router.delete('/mileage/:userId/:carId/:mileageId', MileageCtrl.deleteMileage);
router.post('/mileage/:mileageId/:newDate/:newValue/:newDistance', MileageCtrl.updateMileage);

module.exports = router;