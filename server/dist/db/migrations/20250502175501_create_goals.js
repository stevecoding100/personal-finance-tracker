"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("goals", (table) => {
        table.increments("id").primary();
        table
            .integer("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.string("title").notNullable();
        table.decimal("target_amount").notNullable();
        table.decimal("current_amount").defaultTo(0);
        table.date("target_date");
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists("goals");
}
