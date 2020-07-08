const express = require("express");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();

// controllers
const authCtrl = require("./controllers/authController");
const treasureCtrl = require("./controllers/treasureController");

// middleware
const auth = require("./middleware/authMiddleware");

// environment variables
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

// create app
const app = express();

// set up middleware
app.use(express.json());
app.use(session({ resave: true, saveUninitialized: false, secret: SESSION_SECRET }));

// create endpoints
app.get("/auth/logout", authCtrl.logout);
app.post("/auth/login", authCtrl.login);
app.post("/auth/register", authCtrl.register);

app.get("/api/treasure/all", auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);
app.get("/api/treasure/dragon", treasureCtrl.dragonTreasure);
app.get("/api/treasure/user", auth.usersOnly, treasureCtrl.getUserTreasure);
app.post("/api/treasure/user", auth.usersOnly, treasureCtrl.addUserTreasure);

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
