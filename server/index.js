const express = require("express");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(session({ resave: true, saveUninitialized: false, secret: SESSION_SECRET }));

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then((db) => {
  app.set("db", db);
  console.log("Database connection established");
});

app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`));
