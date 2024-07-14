const db = require('../models');
const Message = db.messages;

// create and save a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body.owner || !req.body.content || !req.body.dateTime) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // create a user object
    const message = {
        owner: req.body.owner,
        conent: req.body.content,
        dateTime: req.body.dateTime
    }

    // save user in the database
    Message.create(message)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while creating the message."
            });
        });
};

exports.getAll = (req, res) => {
    Message.getAll().then(data => res.send(data)).catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while retrieving messages."
        });
    });
};

exports.get = (req, res) => {
    const id = req.params.id;

    Message.findByPk(id)
        .then(data => {
            if (data) res.send(data)
            else res.status(404).send({ message: `Cannot find message with id = ${id}.` });
        })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving message with id = ${id}.` });
        })
};

exports.update = (req, res) => {
    const id = req.params.id;

    Message.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Message was updated successfully." });
            else res.send({ message: "Cannot update message with id = " + id + ". Maybe message was not found or req.body is empty!"});
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating message with id = " + id + "."});
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Message.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Message was deleted successfully!" });
            else res.send({ message: "Cannot delete message with id = " + id + ". Maybe user was not found."});
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete message with id = " + id + "."});
        });
};