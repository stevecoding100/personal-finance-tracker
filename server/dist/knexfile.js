"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
            directory: "./src/db/migrations",
            extension: "ts",
        },
    },
};
exports.default = knexConfig;
module.exports = knexConfig; // Needed for CLI
