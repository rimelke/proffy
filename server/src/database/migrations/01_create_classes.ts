import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', tbl => {
        tbl.increments('id').primary()
        tbl.string('subject').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes')
}