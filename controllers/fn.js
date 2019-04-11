
const Fn = require('../models').Function;
const Product = require('../models').Product;
const logger = require('../utils/logger');

const validateFunctionInput = require('../validation/fn');

module.exports =  {

    async list(req,res) {
        logger.info('Functions:List - Called')
        let functions = await Fn.findAll()
        logger.info('Functions:List - Status 200')
        return res.json(functions)
    },

    async listByCountry(req,res) {
        logger.info('Functions:ListByCountry - Called')
        logger.debug('Functions:ListByCountry - Request Params: ' + JSON.stringify(req.params))
        let code = req.params.code.toUpperCase()
        let functions = await Fn.findAll({
            include: [{
                model: Product,
                as: 'products',
                required: true,
                attributes: ['id','country_code'],
                where: { country_code: code }
            }]
        })
        let newFunctions = functions.map(f => ({id: f.id, name: f.name, country: code}))
        logger.info('Functions:ListByCountry - Status 200')
        return res.json({data:{results: newFunctions}})
    },

    async getById(req,res) {
        logger.info('Functions:GetById - Called')
        logger.debug('Functions:GetById - Request Params: ' + JSON.stringify(req.params))

        let id = req.params.id;
        let fn = await Fn.findByPk(id)
        if(!fn) {
            logger.info('Functions:GetById - Status 404 - Function Not Found')
            return res.status(404).json({ "error": "Function Not Found" })
        }
        logger.info('Functions:GetById - Status 200')
        return res.json(fn)
    },

    async add(req,res) {

        logger.info('Functions:Add - Called')
        logger.debug('Functions:Add - Request Body: ' + JSON.stringify(req.body))

        const { errors, isValid } = validateFunctionInput(req.body);

        // Check Validation
        if(!isValid) {
            logger.info('Functions:Add - Status 400 - Validation Errors')
            logger.debug('Functions:Add - ValidationError: ' + JSON.stringify(errors))
            return res.status(400).json(errors)
        }

        let name = req.body.name;
        try {
            let fn = await Fn.create({ name }).catch(error => { throw error })
            logger.info('Functions:Add - Status 200')
            logger.debug('Functions:Add - Created Function - ' + JSON.stringify(fn))
            return res.json(fn);
        } catch(error) {
            logger.error('Functions:Add - Error: ' + JSON.stringify(error));
            logger.info('Functions:Add - Status 400')
            return res.status(400).json( {"error": 'Function creation failed! '} );
        }
    },

    async update(req, res) {

        logger.info('Functions:Update - Called')
        logger.debug('Functions:Update - Request Body: ' + JSON.stringify(req.body))
        const { errors, isValid } = validateFunctionInput(req.body);

        // Check Validation
        if(!isValid) {
            logger.info('Functions:Update - Status 400 - Validation Errors')
            logger.debug('Functions:Update - ValidationError: ' + JSON.stringify(errors))
            return res.status(400).json(errors)
        }

        let id = req.body.id
        let fn = await Fn.findByPk(id)
        if(!fn) {
            logger.info('Functions:Update - Status 404 - Function Not Found')
            return res.status(404).json({message: "Function Not Found."})
        } else {
            logger.debug('Functions:Update - Function - ' + JSON.stringify(fn))
            try {
                let updatedFunction = await fn.update({
                    name: req.body.name || fn.name
                }).catch(error => { throw error })
                logger.info('Functions:Update - Status 200')
                logger.debug('Functions:Update - Updated Function - ' + JSON.stringify(updatedFunction))
                return res.json(updatedFunction)
            } catch(error) {
                logger.error('Functions:Update - Error: ' + JSON.stringify(error));
                logger.info('Functions:Update - Status 400')
                return res.status(400).json({ message: "Function Update Failed!"})
            }
        }
    },

    async delete(req, res) {
        logger.info('Functions:Delete - Called')
        logger.debug('Functions:Delete - Request Params: ' + JSON.stringify(req.params))
        const id = req.params.id
        let fn = await Fn.findByPk(id)
        if(!fn) {
            logger.info('Functions:Delete - Status 404 - Function Not Found.')
            return res.status(404).json({ "error": "Function Not Found." })
        }
        try {
            let deletedFunction = await Fn.destroy( { where: { id } }).catch(error => { throw error })
            logger.debug('Functions:Delete - Deleted Function - ' + JSON.stringify(deletedFunction))
            logger.info('Functions:Delete - Status 204')
            return res.sendStatus(204)
        } catch (error) {
            logger.error('Functions:Delete - Error: ' + JSON.stringify(error));
            logger.info('Functions:Delete - Status 400')
            return res.status(400).json({ "error": "Function Delete Failed!"});
        }
    }
}