"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("./config/config");
const knexConfig = {
    development: {
        client: "pg",
        connection: {
            host: config_1.config.db.host,
            port: config_1.config.db.port,
            user: config_1.config.db.user,
            password: config_1.config.db.password,
            database: config_1.config.db.database || "personal_finance",
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
