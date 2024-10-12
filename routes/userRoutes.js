import express from 'express'
import { registerUser,loginUser, getCurrentUser } from '../controllers/userControllers.js'
import validateToken from '../middlewares/validateTokenHandler.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', validateToken, getCurrentUser)

export default router