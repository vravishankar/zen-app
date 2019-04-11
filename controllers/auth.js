const User = require('../models').User;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../utils/logger');

const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

module.exports = {
    async login(req,res) {
        logger.info('Calling Authentication:Login...')
        logger.debug('Authentication:Login - Request Body: '+ JSON.stringify(req.body));
        const { errors, isValid } = validateLoginInput(req.body);

        // Check Validation
        if(!isValid) {
            logger.info('Authentication:Login Failed: Validation Errors');
            logger.debug('Authentication:Login Failed with Validation Errors: ' + JSON.stringify(errors));
            return res.status(400).json(errors)
        }

        const { bankId, password } = req.body
        logger.debug(`Authentication:Login - BankId: ${bankId}`)

        const user = await User.findByPk(bankId);
        if(!user) {
            logger.info('Authentication:Login Failed: User not found')
            errors.bankId = "User not found."
            return res.status(404).json(errors)
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            logger.info('Authentication:Login Failed: Password Incorrect')
            errors.password = "Invalid Bankid / Password"
            return res.status(400).json(errors)
        }

        const payload = { id: user.bankId, email: user.email, name: user.name }

        //Generate Token
        jwt.sign(
            payload,
            config.get('keys.jwt_secret'),
            { expiresIn: 3600 },
            ( err, token ) => {
                if (!err) {
                    logger.info('Authentication:Login Success: Token Generated.')
                    return res.json({ success: true, token: 'Bearer ' + token});
                } else {
                    logger.info('Authentication:Login Failed: Errors Found during JWT SignIn. Check Error Log!')
                    logger.error('Authentication:Login Failed with Errors: ' + JSON.stringify(err))
                    return res.send(400).json({ "error":"Unable to create token"})
                }
            }
        )
    },

    async register(req,res) {

        logger.info('Calling Authentication:Register...')
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check Validation
        if (!isValid) {
            logger.info('Authentication:Register Failed: Validation Errors')
            logger.debug(JSON.stringify(errors));
            return res.status(400).json(errors);
        }

        const { bankId, password, email, name } = req.body
        logger.debug(`Authentication:Register - BankId: ${bankId}`)

        const user = await User.findByPk(bankId);

        if(user) {
            logger.info('Authentication:Register Failed - User already Exists')
            logger.debug('Authentication:Register - User already exists: ' + JSON.stringify(user))
            errors.bankId = 'User already exists'
            return res.status(400).json(errors)
        } else {
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                const newUser = await User.create({ bankId, email, name, password: hash});
                logger.info('Authentication:Register - Status 200')
                return res.json(newUser);
            } catch (error) {
                logger.error('Authentication:Register : Error while creating user' + JSON.stringify(error));
                return res.status(400).json( {"error": "User creation failed"} )
            }

        }

    },

    async current(req,res,next) {
        passport.authenticate('jwt',{ session: false }),(req, res, next) => {
            return res.json({
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            })
        }
    }
}