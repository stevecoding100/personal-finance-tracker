const dotenv = require("dotenv");
import type { Knex } from "knex";
dotenv.config();

export const config = {
    app: {
        port: process.env.PORT,
        nodeEnv: process.env.NODE_ENV,
    },
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dev_url: process.env.DEV_DATABASE_URL,
        prod_url: process.env.PROD_DATABASE_URL,
    },
};

export const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: "pg",
        connection: config.db.dev_url,

        migrations: {
            directory: "./src/db/migrations",
            extension: "ts",
        },
    },
    production: {
        client: "pg",
        connection: config.db.prod_url,
        version: "15.3",
        migrations: {
            directory: "./src/db/migrations",
        },
    },
    // development: {
    //     client: "pg",
    //     connection: {
    //         host: config.db.host,
    //         port: config.db.port,
    //         user: config.db.user,
    //         password: config.db.password,
    //         database: config.db.database,
    //     },
    //     migrations: {
    //         directory: "./src/db/migrations",
    //         extension: "ts",
    //     },
    // },
    // production: {
    //     client: "pg",
    //     connection: config.db.prod_url,
    //     version: "15.3",
    //     migrations: {
    //         directory: "./src/db/migrations",
    //     },
    // },
};
