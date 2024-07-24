const db = require('../models');
// const Message = db.message;

function createBothTables (toSave, sender, receiver) {
    if (toSave == sender) {
        db.createTable(`${receiver}_${toSave}`);
        db.createTable(`${toSave}_${receiver}`);
        console.log(`table receiver: ${receiver}_${toSave}`);
        console.log(`table me: ${toSave}_${receiver}`);
    } else {
        db.createTable(`${sender}_${toSave}`);
        db.createTable(`${toSave}_${sender}`);
    }
}

// save a new message in the table messages
exports.create = (req, res) => {
    // validate request
    if (!req.body.toSave || !req.body.sender || !req.body.receiver || !req.body.content) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // where to save message
    const toSave = req.body.toSave;

    // create a message object
    const message = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        content: req.body.content,
    }

    // create both tables if not exists
    createBothTables(toSave, message.sender, message.receiver);

    // get my table
    const myTable = db.table;

    // save message in the table
    myTable.create(message)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// get all messages
exports.get = (req, res) => {
    const toSave = req.query.toSave;
    const sender = req.query.sender;
    const receiver = req.query.receiver;

    createBothTables(toSave, sender, receiver);
    const table = db.table;
    
    table.findAll()
        .then(data => {
            res.status(200).send(data)
        })
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