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
            database: config.db.database || "personal_finance",
        },
        migrations: {
            directory: "./db/migrations",
        },
    },
};

module.exports = knexConfig; // For CLI

//docker-compose exec finance-backend npm run migrate

// docker-compose exec backend npx knex migrate:latest --knexfile src/knexfile.ts --env development --- To run the migration
// docker-compose up -d -- Start the containers

// docker-compose down
// docker-compose up --build

//docker-compose exec backend npm run build -- compiles your TypeScript files
