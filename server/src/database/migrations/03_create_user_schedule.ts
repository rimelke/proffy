import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('user_schedule', tbl => {
        tbl.increments('id').primary()

        tbl.integer('user_id')
            .references('users.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.integer('week_day').notNullable()
        tbl.integer('from').notNullable()
        tbl.integer('to').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user_schedule')
}