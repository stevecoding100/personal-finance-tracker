import knex from "knex";

const environment = process.env.NODE_ENV || "development";

const knexConfig = require("../knexfile");

const config = knexConfig[environment];

if (!config) {
    throw new Error(`Knex config for environment ${environment} not found`);
}

export const db = knex(config);
