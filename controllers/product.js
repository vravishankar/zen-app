const Product = require('../models').Product;
const Fn = require('../models').Function;
const Country = require('../models').Country;
const logger = require('../utils/logger');

const validateProductInput = require('../validation/product');

module.exports =  {
    async list(req,res) {
        logger.info('Products:GetAll - Called')
        let products = await Product.findAll({
            order: [
                ['id','ASC']
            ]
        })
        logger.info('Products:GetAll - Status 200')
        return res.json(products)
    },
    async listByCountryAndFunction(req,res) {
        logger.info('Products:GetProductsForCountryAndFunction - Called')
        logger.debug('Products:GetProductsForCountryAndFunction - Request Params: ' + JSON.stringify(req.params))
        let function_id = req.params.function_id
        let country_code = req.params.country_code.toUpperCase()
        let products = await Product.findAll({
            include: [
                { 
                    model: Fn,
                    as: 'function'
                },
                {
                    model: Country,
                    as: 'country'
                }
            ],
            where: { 
                function_id,
                country_code
            }
        })
        logger.info('Products:GetProductsForCountryAndFunction - Status 200')
        return res.json({data: {results: products}})
    },
    async getProductDetailById(req, res) {
        logger.info('Products:GetProductDetailById - Called')
        logger.debug('Products:GetProductDetailById - Request Params: ' + JSON.stringify(req.params))
        const id = req.params.id;
        let results = await Product.findOne({
            where: { id },
            include: [
                { 
                    model: Fn,
                    as: 'function',
                },
                {
                    model: Country
                }
            ],
        });
        if(!results) {
            logger.info('Products:GetProductDetailById - Status 404')
            return res.status(404).json({ "error": "Product Not Found" })
        }
        logger.info('Products:GetProductDetailById - Status 200')
        return res.json({data: {results}})
    },
    async getById(req,res) {
        logger.info('Products:GetProductById - Called')
        logger.debug('Products:GetProductById - Request Params: ' + JSON.stringify(req.params))
        const id = req.params.id;
        let product = await Product.findByPk(id);
        if(!product) {
            logger.info('Products:GetProductById - Status 400')
            return res.status(404).json({ message: "Product Not Found" })
        }
        logger.debug('Products:GetProductById - Product: ' + JSON.stringify(product))
        logger.info('Products:GetProductById - Status 200')
        return res.json(product)
    },
    async add(req,res) {

        logger.info('Products:Add - Called')
        logger.debug('Products:Add - Request Body: ' + JSON.stringify(req.body))
      
        let product = req.body;
        const { errors, isValid } = validateProductInput(product);

        // Check Validation
        if(!isValid) {
            logger.info('Products:Add - Status 400 - Validation Error')
            logger.debug('Products:Add - Validation Errors: ' + JSON.stringify(errors))
            return res.status(400).json(errors)
        }

        let country = await Country.findByPk(product.countryCode)
        if(!country) {
            logger.info('Products:Add - Status 404 - Country Not Found!')
            return res.status(404).json({"errors.countryCode": 'Country not found!'})
        }

        let func = await Fn.findByPk(product.functionId)
        if(!func) {
            logger.info('Products:Add - Status 404 - Function Not Found!')
            return res.status(404).json({"errors.functionId": 'Function not found!'})
        }

        logger.debug('Products:Add - Country - ' + JSON.stringify(country))
        logger.debug('Products:Add - Function - ' + JSON.stringify(func))

        try {
            let createdProduct = await Product.create(product).catch(error => { throw error })
            logger.info('Products:Add - Status 200 - Product Created')
            logger.debug('Products:Add - Created Product - ' + JSON.stringify(createdProduct))
            res.json(createdProduct);
        } catch(error) {
            logger.info('Products:Add - Status 400 - Product Creation Failed!')
            logger.error('Products:Add - Error: ' + JSON.stringify(error));
            res.status(400).json({ "error": 'Product creation failed!'});
        }
    },

    async update(req, res) {

        logger.info('Products:Update - Called')
        logger.debug('Products:Update - Request Body: ' + JSON.stringify(req.body))

        const productId = req.body.id;
        const product = await Product.findByPk(productId,{raw:true})

        if(!product) {
            logger.info('Products:Update - Status 400 - Product Not Found!')
            return res.status(404).json({"errors.id":"Product not found"});
        }
        
        const updatableProduct = Object.assign({},product, req.body);

        const { errors, isValid } = validateProductInput(updatableProduct);

        // Check Validation
        if(!isValid) {
            logger.info('Products:Update - Status 400 - Validation Error')
            logger.debug('Products:Update - Validation Errors: ' + JSON.stringify(errors))
            return res.status(400).json(errors)
        }
        let country = await Country.findByPk(updatableProduct.countryCode)
        if(!country) {
            logger.info('Products:Update - Status 404 - Country Not Found!')
            return res.status(404).json({"errors.countryCode": 'Country not found!'})
        }

        let func = await Fn.findByPk(updatableProduct.functionId)
        if(!func) {
            logger.info('Products:Update - Status 404 - Function Not Found!')
            return res.status(404).json({"errors.functionId": 'Function not found!'})
        }

        logger.debug('Products:Update - Country - ' + JSON.stringify(country))
        logger.debug('Products:Update - Function - ' + JSON.stringify(func))

        try {
            let updatedProduct = await Product.update(updatableProduct,{ 
                                                        where: { id: productId }, 
                                                        returning: true, 
                                                        plain: true
                                                    }).catch(error => { throw error })
            logger.info('Products:Update - Status 200 - Product Updated')
            logger.debug('Products:Update - Updated Product - ' + JSON.stringify(updatedProduct))
                                         
            res.json(updatedProduct[1]);
        } catch(error) {
            logger.info('Products:Update - Status 400 - Product Creation Failed!')
            logger.error('Products:Update - Error: ' + JSON.stringify(error));
            res.status(400).json({ "error": 'Product updation failed!'});
        }
    },

    async delete(req, res) {
        logger.info('Products:Delete - Called')
        logger.debug('Products:Delete - Request Params: ' + JSON.stringify(req.params))
        const id = req.params.id
        let product = await Product.findByPk(id)
        if(!product) {
            logger.info('Products:Delete - Status 404')
            return res.status(404).json({ "error": "Product Not Found." })
        }
        try {
            logger.debug('Products:Delete - Product: ' + JSON.stringify(product))
            let deletedProduct = await Product.destroy( { where: { id } }).catch( error => { throw error })
            logger.info('Products:Delete - Status 204')
            return res.sendStatus(204)
        } catch(error) {
            logger.error('Products:Delete - Error while deleting' + JSON.stringify(error));
            logger.info('Products:Delete - Status 400')
            return res.status(400).json({ "error": 'Product deletion failed!'});
        }
    }
}