import knex from 'knex'
import path from 'path'

const conn = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..', 'database', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    useNullAsDefault: true
})

export default conn