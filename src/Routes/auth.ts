import express from 'express'
import authController from '../Controllers/authController'

const router = express.Router()

router.get('/', authController.getAuth)
router.post('/', authController.getTokens)
router.post('/refresh', authController.refreshToken)

export default router
