import dotenv from "dotenv";
dotenv.config();

import type { Knex } from "knex";
import { config } from "./src/config/config";

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: "pg",
        connection: {
            host: config.db.host,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
        },
        migrations: {
            directory: "./src/db/migrations",
        },
    },
};

module.exports = knexConfig; // For CLI

//docker-compose exec finance-backend npm run migrate
