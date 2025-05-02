"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("budgets", (table) => {
        table.increments("id").primary();
        table
            .integer("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.decimal("amount").notNullable();
        table.string("category").notNullable();
        table.string("month").notNullable(); // e.g., '2025-05'
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists("budgets");
}
