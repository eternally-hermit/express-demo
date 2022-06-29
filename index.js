const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

// Change Env Variables from code itself
//process.env["NODE_ENV"] = "production";

const PORT = process.env.PORT || 5000;

app.set("view engine", "pug");

app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(logger);
app.use(auth);
app.use("/api/courses", courses);
app.use("/", home);

// Configuration
console.log(`Application Name: ${config.get("name")}`);
console.log(`Email Server: ${config.get("mail.host")}`);
//console.log(`Email Password: ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan Enabled!");
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
