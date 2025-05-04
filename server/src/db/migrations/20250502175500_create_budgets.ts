export async function up(knex: any) {
    return knex.schema.createTable("budgets", (table: any) => {
        table.increments("id").primary();
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.decimal("amount").notNullable();
        table.string("category").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: any) {
    return knex.schema.dropTableIfExists("budgets");
}
