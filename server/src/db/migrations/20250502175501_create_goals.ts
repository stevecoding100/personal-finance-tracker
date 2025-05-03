export async function up(knex: any) {
    return knex.schema.createTable("goals", (table: any) => {
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
        table.timestamps(true, true);
    });
}

export async function down(knex: any) {
    return knex.schema.dropTableIfExists("goals");
}
