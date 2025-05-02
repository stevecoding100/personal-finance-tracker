export async function up(knex: any) {
    return knex.schema.createTable("transactions", (table: any) => {
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

export async function down(knex: any) {
    return knex.schema.dropTableIfExists("transactions");
}
