import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('user_classes', tbl => {
        tbl.integer('user_id')
            .references('users.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()

        tbl.integer('class_id')
            .references('classes.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user_classes')
}