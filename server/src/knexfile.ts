import dotenv from "dotenv";
dotenv.config();

import type { Knex } from "knex";
import { config } from "./config/config";

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
            directory: "./db/migrations",
        },
    },
};

export default knexConfig;
module.exports = knexConfig; // For CLI

// DB_NAME=personal_finance npx knex migrate:latest --knexfile src/knexfile.ts
// npx knex migrate:rollback --all --knexfile ./src/knexfile.ts
// npx knex migrate:latest --knexfile ./src/knexfile.ts
