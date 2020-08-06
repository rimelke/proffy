import { Router } from 'express'
import {celebrate, Joi} from 'celebrate'

import usersController from './controllers/users'
import classesController from './controllers/classes'
import connectionsController from './controllers/connections'

const router = Router()

router.get('/classes', classesController.index)

router.get('/users', celebrate({
    query: Joi.object().keys({
        class_id: Joi.number().integer().positive().required(),
        time: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
        week_day: Joi.number().integer().min(0).max(6).required()
    })
}, {abortEarly: false}), usersController.index)
router.post('/users', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        bio: Joi.string().required(),
        whatsapp: Joi.string().regex(/^[0-9]*$/).required(),
        email: Joi.string().email().required(),
        cost: Joi.number().positive().required(),
        classes: Joi.array().items(Joi.number().positive().integer()).min(1).required(),
        schedule: Joi.array().items(Joi.object().keys({
            week_day: Joi.number().integer().min(0).max(6).required(),
            from: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
            to: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required()
        })).min(1).required()
    }).required()
}, {abortEarly: false}), usersController.create)

router.get('/connections', connectionsController.index)
router.post('/connections', celebrate({
    body: Joi.object().keys({
        user_id: Joi.number().integer().positive()
    }).required()
}), connectionsController.create)

export default router