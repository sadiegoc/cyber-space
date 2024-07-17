module.exports = app => {
    const messages = require('../controllers/messages.controller.js');

    var router = require("express").Router();

    // create a new user
    router.post("/", messages.create);

    // retrieve all users
    router.get("/", messages.get);

    // // update a user with id
    // router.put("/:id", messages.update);

    // // delete a user by id
    // router.delete("/:id", messages.delete);

    app.use('/messages', router);
};