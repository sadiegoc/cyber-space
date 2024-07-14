const db = require('../models');
const Auth = db.auths;
const Op = db.Sequelize.Op;

// create and save a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body.username || !req.body.password || !req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // create a user object
    const auth = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }

    // save user in the database
    console.log(auth);
    Auth.create(auth)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            if (err.name == "SequelizeUniqueConstraintError") {
                res.status(200).send({
                    status: "error",
                    message: "username"
                });
            } else {
                res.status(500).send({
                    status: "error",
                    message: err.message || "Some error occurred while creating the user."
                });
            }
        });
};

exports.get = (req, res) => {
    const u = req.query.username;
    const p = req.query.password;

    if (u && p) {
        Auth.findAll({ where: { [Op.and] : [{ username: u }, { password: p }] } })
            .then(data => res.status(200).send(data))
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error ocurred while login user."
                });
            });
    } else res.status(404).send({ status: "error" });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Auth.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "User was updated successfully." });
            else res.send({ message: "Cannot update user with id = " + id + ". Maybe user was not found or req.body is empty!"})
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating user with id = " + id + "."});
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Auth.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "User was deleted successfully!" });
            else res.send({ message: "Cannot delete user with id = " + id + ". Maybe user was not found."});
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete user with id = " + id + "."});
        });
};