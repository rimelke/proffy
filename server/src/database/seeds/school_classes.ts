import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('classes').insert([
        {id: 0, subject: "All"},
        {subject: "Math"},
        {subject: "Chemistry"},
        {subject: "Music"},
        {subject: "Art"},
        {subject: "English"},
    ])
}