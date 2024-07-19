const express = require('express');
const cors = require('cors');

const PORT = 8088;

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const db = require('./app/models');
// db.sequelize.sync({ force: true })
// .then(() => {
//     console.log("drop and re-sync db");
// })
// .catch((err) => {
//     console.log("failed to sync db: " + err)
// });

app.get("/", (req, res) => {
    res.json({ message: "database server running" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/messages.routes")(app);

app.listen(PORT, () => {
    console.log(`database server is running on http://localhost:${PORT}`);
});