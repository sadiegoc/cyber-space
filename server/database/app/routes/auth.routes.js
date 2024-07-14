module.exports = app => {
    const auths = require('../controllers/auth.controller.js');

    var router = require("express").Router();

    // create a new user
    router.post("/", auths.create);

    // retrieve all users
    router.get("/", auths.getAll);

    // retrieve one user by id
    router.get("/:id", auths.get);

    // update a user with id
    router.put("/:id", auths.update);

    // delete a user by id
    router.delete("/:id", auths.delete);

    app.use('/auth', router);
};