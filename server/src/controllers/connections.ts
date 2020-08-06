import { Request, Response } from 'express'
import db from '../config/knex'

export default {
    async index(req: Request, res: Response) {
        const connections = await db('connections').count('* as total').first()

        res.json(connections)
    },

    async create(req: Request, res: Response) {
        const { user_id } = req.body

        try {
            await db('connections').insert({user_id})

            res.status(201).send()    
        } catch (e) {
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}