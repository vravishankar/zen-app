const express = require('express');
const router = express.Router();
const passport = require('passport');

// const asyncRoute = require('../middlewares/async-handler')
require('express-async-errors');

const functionController = require('../controllers').fn;

// router.get('/', asyncRoute(functionController.list));
// router.get('/country/:code',asyncRoute(functionController.listByCountry))
// router.get('/:id', asyncRoute(functionController.getById));

router.get('/', functionController.list);
router.get('/country/:code', functionController.listByCountry);
router.get('/:id', functionController.getById);
router.post('/',passport.authenticate('jwt',{ session: false }), functionController.add);
router.put('/',passport.authenticate('jwt',{ session: false }), functionController.update);
router.delete('/:id', passport.authenticate('jwt',{ session: false }), functionController.delete);

module.exports = router;