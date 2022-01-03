import knex, { Knex } from 'knex';

export const up = async (knex: Knex) =>  {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
}

export const down = async (knex: Knex) => {
    return knex.schema.dropTable('classes')
}