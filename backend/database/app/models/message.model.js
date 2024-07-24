module.exports = (sequelize, Sequelize, name) => {

    const Message = sequelize.define(name, {
        sender: {
            type: Sequelize.STRING
        },
        receiver: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        }
    }, {
        freezeTableName: true
    });

    return Message;
};