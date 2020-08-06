import db from '../config/knex'
import {Request, Response} from 'express'

export default {
    async index(req: Request, res: Response) {
        const classes = await db('classes')

        res.json(classes)
    }
}