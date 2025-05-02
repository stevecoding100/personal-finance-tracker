import knex from "knex";
const knexConfig = require("../knexfile");

const environment = process.env.NODE_ENV || "development";
export const db = knex(knexConfig[environment]);
