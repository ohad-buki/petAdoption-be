require("dotenv").config();
const mysql = require("mysql");
const Postgrator = require("postgrator");

const postgrator = new Postgrator({
  migrationDirectory: "./migrations",
  driver: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  database: "petadoption",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  schemaTable: "migrations",
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "petadoption",
});

// const mysqlDB = { pool: pool, postgrator: postgrator };

exports.pool = pool;
exports.postgrator = postgrator;
