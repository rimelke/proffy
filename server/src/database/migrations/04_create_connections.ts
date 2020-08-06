import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', tbl => {
        tbl.increments('id').primary()

        tbl.integer('user_id')
            .references('users.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.dateTime('created_at')
            .defaultTo(knex.fn.now())
            .notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections')
}