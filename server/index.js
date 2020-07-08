const express = require("express");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();

const authController = require("./controllers/authController");

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

// create app
const app = express();

// middleware
app.use(express.json());
app.use(session({ resave: true, saveUninitialized: false, secret: SESSION_SECRET }));

// endpoints
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/logout", authController.logout);

// connect to database
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then((db) => {
  app.set("db", db);
  console.log("Database connection established");
});

// init server
app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`));
