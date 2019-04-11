module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define('country', {
        code: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false,
        tableName: 'zen_countries'
    });
    Country.removeAttribute('id');
    Country.associate = function(models) {
        Country.hasMany(models.Product, {
            foreignKey: 'country_code',
            targetKey: 'code',
            as: 'products'
        })
    }
    return Country;
}