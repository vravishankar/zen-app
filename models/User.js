module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        bankId: {
            type: Sequelize.STRING(7),
            field: 'bank_id',
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
            field: 'username'
        },
        email: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    },{
        timestamps: false,
        tableName: 'zen_users'
    });

    User.removeAttribute('id');

    return User;
}