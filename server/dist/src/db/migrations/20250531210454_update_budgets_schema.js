"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.alterTable("budgets", (table) => {
        table.renameColumn("amount", "amount_spent");
        table.decimal("limit", 10, 2).notNullable().defaultTo(0);
    });
}
async function down(knex) {
    return knex.schema.alterTable("budgets", (table) => {
        table.renameColumn("amount_spent", "amount");
        table.dropColumn("limit");
    });
}
