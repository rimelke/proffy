import {Request, Response} from 'express'
import db from '../config/knex'

interface Class {
    user_id?: number
    subject: string
}

interface ScheduleItem {
    subject: string
    week_day: number
    from: string
    to: string
}

function convertTime(time: string) {
    const [hour, minutes] = time.split(':').map(Number)
    return 60 * hour + minutes
}

export default {
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

            const insertedClassesIds = await trx('classes').insert(classes.map((subject: string) => ({
                user_id,
                subject
            })))

            await trx('class_schedule').insert(schedule.map((scheduleItem: ScheduleItem) => {
                const subject_index = classes.indexOf(scheduleItem.subject)
                const class_id = insertedClassesIds[subject_index]
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertTime(scheduleItem.from),
                    to: convertTime(scheduleItem.to)    
                }
            }))

            await trx.commit()

            res.status(201).send()
        } catch (e) {
            await trx.rollback(e)
            res.status(400).json({message: 'An error occured, try again'})
        }
    }
}