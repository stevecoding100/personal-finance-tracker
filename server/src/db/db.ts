import knex from "knex";
import { knexConfig } from "../config/config";
import dotenv from "dotenv";
dotenv.config();

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];

if (!config) {
    throw new Error(`Knex config for environment ${environment} not found`);
}

export const db = knex(config);
