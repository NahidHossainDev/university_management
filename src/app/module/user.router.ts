import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()
router.post('/create-user', UserController.createUser)
router.get('/get-users', UserController.getAllUser)

export { router as UserRouter }
