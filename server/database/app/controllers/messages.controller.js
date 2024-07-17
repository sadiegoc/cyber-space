const db = require('../models');
const Message = db.message;

// save a new message in the table messages
exports.create = (req, res) => {
    // validate request
    if (!req.body.owner || !req.body.content) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // create a message object
    const message = {
        owner: req.body.owner,
        content: req.body.content,
    }

    console.log(message)

    // save message in the table
    Message.create(message)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// get all messages
exports.get = (req, res) => {
    Message.findAll()
        .then(data => res.status(200).send(data))
        .catch(err => {
            res.status(200).send({ message: err.message });
        });
};

// exports.update = (req, res) => {
//     const id = req.params.id;

//     Message.update(req.body, { where: { id: id } })
//         .then(num => {
//             if (num == 1) res.send({ message: "Message was updated successfully." });
//             else res.send({ message: "Cannot update message with id = " + id + ". Maybe message was not found or req.body is empty!"});
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.mesage });
//         });
// };

// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Message.destroy({ where: { id: id } })
//         .then(num => {
//             if (num == 1) res.send({ message: "Message was deleted successfully!" });
//             else res.send({ message: "Cannot delete message with id = " + id + ". Maybe user was not found."});
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message });
//         });
// };