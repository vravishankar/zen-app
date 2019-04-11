const Country = require('../models').Country;
const Product = require('../models').Product;
const logger = require('../utils/logger');

const validateCountryInput = require('../validation/country');

module.exports =  {
    async list(req,res) {
        logger.info('Country:GetAll - Called...')
        let countries = await Country.findAll()
        logger.info('Country:GetAll - Status 200')
        return res.json(countries)
    },
    async listCountriesWithProducts(req,res) {
        logger.info('Country:GetCountryForProducts - Called...')
        let countries = await Country.findAll(
            {
                include: [
                    {
                        model: Product,
                        as: 'products',
                        required: true,
                        attributes: ['id'],
                        where: { isActive: true } 
                    }
                ],
                order: ['name']
            },
        )
        let newCountries = countries.map(c => ({code: c.code, name: c.name}))
        logger.info('Country:GetCountryForProducts - Status 200')
        return res.json({data: {results: newCountries}})
    },
    
    async getByCode(req,res) {
        logger.info('Country:GetByCode - Called...')
        logger.debug('Country:GetByCode - Request Params: ' + JSON.stringify(req.params));
        let code = req.params.code.toUpperCase();
        let country = await Country.findOne({ where: { code } });
        if(!country) {
            logger.info('Country:GetByCode - Status 404')
            logger.debug(`Country:GetByCode - Country for code ${code} not found`);
            return res.status(404).json({ error: "Country Not Found" })
        }
        logger.info('Country:GetByCode - Status 200')
        return res.json(country)
    },

    async add(req,res) {
        logger.info('Country:Add - Called...')
        logger.debug('Country:Add - Request Body: ' + JSON.stringify(req.body));
        const { errors, isValid } = validateCountryInput(req.body);

        // Check Validation
        if(!isValid) {
            logger.info('Country:Add - Status 400 - Validation Errors')
            logger.debug('Country:Add - Validation Errors: ' + JSON.stringify(errors))
            return res.status(400).json(errors)
        }
        
        const { code: c, name } = req.body

        let code = c.toUpperCase(); // store as uppercase

        try {
            let country = await Country.create({ code, name }).catch(error => { throw error })
            logger.info('Country:GetByCode - Status 200')
            return res.json(country);
        } catch(error) {
            logger.error('Country:Add - Error: ' + JSON.stringify(error));
            if (error.name == "SequelizeUniqueConstraintError") {
                errors.code = "Country code already exists"
                logger.info('Country:Add - Status 400')
                return res.status(400).json( errors )
            } else {
                logger.info('Country:Add - Status 404')
                return res.status(404).json({ error: "Country creation failed" })
            }
        }
    },

    async update(req, res) {

        logger.info('Country:Update - Called...')
        logger.debug('Country:Update - Request Body: ' + JSON.stringify(req.body))
        const { errors, isValid } = validateCountryInput(req.body);

        // Check Validation
        if(!isValid) {
            logger.info('Country:Update - Status 400 - Validation Errors')
            logger.debug('Country:Update - Validation Errors: ' + JSON.stringify(errors))
            return res.status(400).json(errors)
        }

        const { code: c, name } = req.body
        let code = c.toUpperCase()
        let country = await Country.findOne( { where: { code } })
        if(!country) {
            logger.info('Country:Update - Status 404')
            return res.status(404).json({"error": "Country Not Found."})
        } else {
            try {
                logger.debug('Country:Update - Found Country - ' + JSON.stringify(country))
                let updatedCountry = await country.update({
                    name: name || country.name
                }).catch(error => { throw error })
                logger.debug('Country:Update - Updated Country - ' + JSON.stringify(updatedCountry))
                logger.info('Country:Update - Status 200')
                return res.json(updatedCountry)
            } catch(error) {
                logger.info('Country:Update - Status 400')
                logger.error('Country:Update - Errors Found' + JSON.stringify(error));
                return res.status(400).json( {"error": 'Country Update Failed.'} )
            }
        }
    },

    async delete(req, res) {

        logger.info('Country:Delete - Called...')
        logger.debug('Country:Delete - Request Params: ' + JSON.stringify(req.params))

        let code = req.params.code.toUpperCase()
        let country = await Country.findOne( { where: { code } })

        if(!country) {
            logger.info('Country:Delete - Status 404')
            return res.status(404).json({ "error": "Country Not Found." })
        }
        try {
            let deletedCountry = await Country.destroy( { where: {code} }).catch(error => { throw error })
            logger.info('Country:Delete - Status 204')
            logger.debug('Country:Delete - Deleted Country - ' + JSON.stringify(deletedCountry))
            return res.sendStatus(204)
        } catch(error) {
            logger.info('Country:Delete - Status 400')
            logger.error('Country:Delete - Errors Found' + JSON.stringify(error));
            return res.status(400).json({ "error" : 'Delete Failed!' })
        }
    }
}