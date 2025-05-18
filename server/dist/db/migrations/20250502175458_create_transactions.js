"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("transactions", (table) => {
        table.increments("id").primary();
        table
            .integer("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.decimal("amount").notNullable();
        table.string("type").notNullable(); // 'income' or 'expense'
        table.string("category").notNullable(); // e.g., food, rent, etc.
        table.timestamp("date").defaultTo(knex.fn.now());
        table.string("description");
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists("transactions");
}
