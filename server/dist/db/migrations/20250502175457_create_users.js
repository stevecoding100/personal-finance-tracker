"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists("users");
}
