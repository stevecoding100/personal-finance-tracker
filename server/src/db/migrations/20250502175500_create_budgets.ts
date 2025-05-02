export async function up(knex: any) {
    return knex.schema.createTable("budgets", (table: any) => {
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

export async function down(knex: any) {
    return knex.schema.dropTableIfExists("budgets");
}
