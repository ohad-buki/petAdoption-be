require("dotenv").config();
const mysql = require("mysql");
const Postgrator = require("postgrator");

const postgrator = new Postgrator({
  migrationDirectory: "./migrations",
  driver: "mysql",
  host: process.env.DB_HOST_DEPLOY,
  port: 3306,
  database: process.env.DB_USER,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  schemaTable: "migrations",
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_USER,
});

exports.pool = pool;
exports.postgrator = postgrator;
