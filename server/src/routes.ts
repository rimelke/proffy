import { Router } from 'express'

import userController from './controllers/users'

const router = Router()

router.post('/users', userController.create)

export default router