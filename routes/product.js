const express = require('express');
const router = express.Router();
const passport = require('passport');

// const asyncRoute = require('../middlewares/async-handler')
require('express-async-errors');

const productController = require('../controllers').product;

router.get('/', productController.list);
router.get('/country/:country_code/function/:function_id', productController.listByCountryAndFunction);
router.get('/detail/:id', productController.getProductDetailById);
router.get('/:id', productController.getById);
router.post('/', passport.authenticate('jwt',{ session: false }), productController.add);
router.put('/', passport.authenticate('jwt',{ session: false }), productController.update);
router.delete('/:id', passport.authenticate('jwt',{ session: false }), productController.delete);

module.exports = router;