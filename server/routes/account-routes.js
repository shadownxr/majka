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

router.get('/cars/ac',CarCtrl.getAC);
router.post('/cars/list',CarCtrl.getCars);
router.post('/cars', CarCtrl.addCar);
router.delete('/cars',CarCtrl.deleteCar);

router.post('/services', ServiceCtrl.getServices);
router.post('/services/add', ServiceCtrl.postServices);
router.delete('/services', ServiceCtrl.deleteServices);
router.post('/services/update',ServiceCtrl.updateServices);
router.post('/services/search',ServiceCtrl.searchServices);

router.post('/mileage', MileageCtrl.getMileage);
router.post('/mileage/search', MileageCtrl.searchMileage);
router.post('/mileage/add', MileageCtrl.postMileage);
router.delete('/mileage', MileageCtrl.deleteMileage);
router.post('/mileage/update', MileageCtrl.updateMileage);

module.exports = router;