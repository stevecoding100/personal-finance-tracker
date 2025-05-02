export async function up(knex: any) {
    return knex.schema.createTable("users", (table: any) => {
        table.increments("id").primary();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: any) {
    return knex.schema.dropTableIfExists("users");
}
