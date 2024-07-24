module.exports = (sequelize, Sequelize) => {
    const Auth = sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
            notNull: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            notNull: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            notNull: true
        },
        password: {
            type: Sequelize.STRING,
            notNull: true
        }
    });

    return Auth;
};