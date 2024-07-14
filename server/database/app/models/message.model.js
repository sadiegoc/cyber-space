module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        owner: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        dateTime: {
            type: Sequelize.DATE
        }
    });

    return Message;
};