import {Request, Response} from 'express'
import db from '../config/knex'

interface ScheduleItem {
    week_day: number
    from: string
    to: string
}

function convertTime(time: string) {
    const [hour, minutes] = time.split(':').map(Number)
    return 60 * hour + minutes
}

export default {
    async index(req: Request, res: Response) {
        const {
            class_id,
            time,
            week_day
        } = req.query

        const timeInMinutes = convertTime(time as string)

        const users = await db('user_classes')
            .whereExists(function() {
                this.select('user_schedule.*')
                    .from('user_schedule')
                    .whereRaw('`user_schedule`.`user_id` = `users`.`id`')
                    .whereRaw('`user_schedule`.`week_day` = ??', [Number(week_day as string)])
                    .whereRaw('`user_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`user_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('user_classes.class_id', Number(class_id as string))
            .join('users', 'user_classes.user_id', '=', 'users.id')
            .select(['user_classes.*', 'users.*'])

        res.json(users)
    },

    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            bio,
            whatsapp,
            email,
            cost,
            classes,
            schedule
        } = req.body

        const trx = await db.transaction()

        try {
            const [user_id] = await trx('users').insert({
                name,
                avatar,
                bio,
                cost,
                whatsapp,
                email
            })

            await trx('user_classes').insert(classes.map((class_id: number) => ({
                user_id,
                class_id
            })))

            await trx('user_schedule').insert(schedule.map((scheduleItem: ScheduleItem) => ({
                user_id,
                week_day: scheduleItem.week_day,
                from: convertTime(scheduleItem.from),
                to: convertTime(scheduleItem.to)    
            })))

            await trx.commit()

            res.status(201).send()
        } catch (e) {
            await trx.rollback(e)
            console.log(e)
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}