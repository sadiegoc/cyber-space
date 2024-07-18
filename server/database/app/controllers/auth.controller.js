const db = require('../models');
const Auth = db.auth;
const Op = db.Sequelize.Op;

// create and save a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body.email || !req.body.username || !req.body.password || !req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // create a user object
    const auth = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    // save user in the database
    Auth.create(auth)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            if (err.name == "SequelizeUniqueConstraintError") {
                res.status(200).send({
                    status: "error",
                    message: err.fields
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
    const e = req.query.email;
    const p = req.query.password;

    const opt = (e && p) ? { where: { [Op.and] : [{ email: e }, { password: p }] } } : { attributes: ['name', 'username'] };

    Auth.findAll(opt)
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Auth.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "User was updated successfully." });
            else res.send({ message: "Cannot update user with id = " + id + ". Maybe user was not found or req.body is empty!"})
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
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
            res.status(500).send({ message: err.message });
        });
};