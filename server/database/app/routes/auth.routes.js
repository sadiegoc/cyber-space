module.exports = app => {
    const auth = require('../controllers/auth.controller');

    var router = require("express").Router();

    // create a new user
    router.post("/", auth.create);

    // retrieve all users
    router.get("/", auth.get);

    // update a user with id
    router.put("/:id", auth.update);

    // delete a user by id
    router.delete("/:id", auth.delete);

    app.use('/auth', router);
};