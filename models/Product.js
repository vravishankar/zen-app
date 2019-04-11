const Country = require('../models').Country;

module.exports = (sequelize, Sequelize) => {
    var Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        productName: {
            type: Sequelize.STRING(50),
            allowNull: false,
            field: 'product_name'
        },
        subproductName: {
            type: Sequelize.STRING(150),
            allowNull: false,
            field: 'subproduct_name'
        },
        countryCode: {
            type: Sequelize.STRING(2),
            field: 'country_code'
        },
        functionId: {
            type: Sequelize.INTEGER,
            field: 'function_id'
        },
        region: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        locationName: {
            type: Sequelize.STRING(50),
            allowNull: false,
            field: 'location_name'
        },
        primaryBankId: {
            type: Sequelize.STRING(10),
            allowNull: false,
            field: 'primary_bankid'
        },
        primarySupportName: {
            type: Sequelize.STRING(50),
            allowNull: false,
            field: 'primary_support_name'
        },
        primaryDeskno: {
            type: Sequelize.STRING(25),
            allowNull: false,
            field: 'primary_deskno'
        },
        primaryMobileno: {
            type: Sequelize.STRING(25),
            allowNull: false,
            field: 'primary_mobileno'
        },
        primaryFonenet: {
            type: Sequelize.STRING(25),
            field: 'primary_fonenet',
            defaultValue: ''
        },
        primaryEmailaddress: {
            type: Sequelize.STRING(150),
            allowNull: false,
            field: 'primary_email_address'
        },
        secondaryBankId: {
            type: Sequelize.STRING(10),
            field: 'secondary_bankid',
            defaultValue: ''
        },
        secondarySupportName: {
            type: Sequelize.STRING(50),
            field: 'secondary_support_name',
            defaultValue: ''
        },
        secondaryDeskno: {
            type: Sequelize.STRING(25),
            field: 'secondary_deskno',
            defaultValue: ''
        },
        secondaryMobileno: {
            type: Sequelize.STRING(25),
            field: 'secondary_mobileno',
            defaultValue: ''
        },
        secondaryFonenet: {
            type: Sequelize.STRING(25),
            field: 'secondary_fonenet',
            defaultValue: ''
        },
        secondaryEmailaddress: {
            type: Sequelize.STRING(150),
            field: 'secondary_email_address',
            defaultValue: ''
        },
        managerBankId: {
            type: Sequelize.STRING(10),
            field: 'manager_bankid',
            defaultValue: ''
        },
        managerSupportName: {
            type: Sequelize.STRING(50),
            field: 'manager_support_name',
            defaultValue: ''
        },
        managerDeskno: {
            type: Sequelize.STRING(25),
            field: 'manager_deskno',
            defaultValue: ''
        },
        managerMobileno: {
            type: Sequelize.STRING(25),
            field: 'manager_mobileno',
            defaultValue: ''
        },
        managerFonenet: {
            type: Sequelize.STRING(25),
            field: 'manager_fonenet',
            defaultValue: ''
        },
        managerEmailaddress: {
            type: Sequelize.STRING(150),
            field: 'manager_email_address',
            defaultValue: ''
        },
        headBankId: {
            type: Sequelize.STRING(10),
            field: 'head_bankid',
            defaultValue: ''
        },
        headSupportName: {
            type: Sequelize.STRING(50),
            field: 'head_support_name',
            defaultValue: ''
        },
        headDeskno: {
            type: Sequelize.STRING(25),
            field: 'head_deskno',
            defaultValue: ''
        },
        headMobileno: {
            type: Sequelize.STRING(25),
            field: 'head_mobileno',
            defaultValue: ''
        },
        headFonenet: {
            type: Sequelize.STRING(25),
            field: 'head_fonenet',
            defaultValue: '',
        },
        headEmailaddress: {
            type: Sequelize.STRING(150),
            field: 'head_email_address',
            defaultValue: ''
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'is_active',
            defaultValue: true
        }
    },{
        timestamps: false,
        tableName: 'zen_products'
    });

    Product.associate = function(models) {
        Product.belongsTo(models.Function)
        Product.belongsTo(models.Country)
    }
    
    return Product
}