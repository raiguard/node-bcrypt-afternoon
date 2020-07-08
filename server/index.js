const express = require("express");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.use(express.json());

const SERVER_PORT = 4000;

app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`));
