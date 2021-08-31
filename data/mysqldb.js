require("dotenv").config();
const mysql = require("mysql");
const Postgrator = require("postgrator");

const postgrator = new Postgrator({
  migrationDirectory: "./migrations",
  driver: "mysql",
  host: process.env.DB_HOST_DEPLOY,
  port: 3306,
  database: process.env.DB_USER_DEPLOY,
  username: process.env.DB_USER_DEPLOY,
  password: process.env.DB_PASS_DEPLOY,
  schemaTable: "migrations",
});

const pool = mysql.createPool({
  host: process.env.DB_HOST_DEPLOY,
  user: process.env.DB_USER_DEPLOY,
  password: process.env.DB_PASS_DEPLOY,
  database: process.env.DB_USER_DEPLOY,
});

exports.pool = pool;
exports.postgrator = postgrator;
