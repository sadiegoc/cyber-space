module.exports = app => {
    const messages = require('../controllers/messages.controller.js');

    var router = require("express").Router();

    // create a new message
    router.post("/", messages.create);

    // get all messages
    router.get("/", messages.get);

    // // update a user with id
    // router.put("/:id", messages.update);

    // // delete a user by id
    // router.delete("/:id", messages.delete);

    app.use('/messages', router);
};