
module.exports = (sequelize, Sequelize) => {
    var Function = sequelize.define('function', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(50)
        }
    },{
        timestamps: false,
        tableName: 'zen_functions'
    });

    Function.associate = function(models) {
        Function.hasMany(models.Product, {
            foreignKey: 'function_id',
            as: 'products'
        })
    }

    return Function
}