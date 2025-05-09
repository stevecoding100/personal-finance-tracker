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
            database: config_1.config.db.database,
        },
        migrations: {
            directory: "./db/migrations",
        },
    },
};
exports.default = knexConfig;
module.exports = knexConfig; // For CLI
// DB_NAME=personal_finance npx knex migrate:latest --knexfile src/knexfile.ts
// npx knex migrate:rollback --all --knexfile ./src/knexfile.ts
// npx knex migrate:latest --knexfile ./src/knexfile.ts
