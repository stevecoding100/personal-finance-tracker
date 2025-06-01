"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("budgets", (table) => {
        table.increments("id").primary();
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.string("title").notNullable();
        table.decimal("budget_limit", 10, 2).notNullable().defaultTo(0);
        table.decimal("amount_spent", 10, 2).notNullable().defaultTo(0);
        table.string("category").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists("budgets");
}
