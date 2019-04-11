const express = require('express');
const router = express.Router();
const passport = require('passport');

// const asyncRoute = require('../middlewares/async-handler')
require('express-async-errors');

const countryController = require('../controllers').country;

// router.get('/', asyncRoute(countryController.list));
// router.get('/list', asyncRoute(countryController.listCountriesWithProducts))
// router.get('/:code', asyncRoute(countryController.getByCode))

router.get('/', countryController.list);
router.get('/list', countryController.listCountriesWithProducts)
router.get('/:code', countryController.getByCode)
router.post('/', passport.authenticate('jwt',{ session: false }), countryController.add);
router.put('/', passport.authenticate('jwt',{ session: false }), countryController.update);
router.delete('/:code', passport.authenticate('jwt',{ session: false }), countryController.delete);

module.exports = router;