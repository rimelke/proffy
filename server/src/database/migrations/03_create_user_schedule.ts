import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', tbl => {
        tbl.increments('id').primary()

        tbl.integer('user_id')
            .references('users.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.integer('class_id')
            .references('classes.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

        tbl.integer('week_day').notNullable()
        tbl.integer('from').notNullable()
        tbl.integer('to').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule')
}