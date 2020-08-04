import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('id').primary()
        tbl.string('name').notNullable()
        tbl.string('avatar').notNullable()
        tbl.text('bio').notNullable()
        tbl.decimal('cost').notNullable()
        tbl.string('whatsapp').notNullable()
        tbl.string('email').unique().notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users')
}