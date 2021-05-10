import express from 'express'
import getRecomController from '../Controllers/getRecomController'

const router = express.Router()

router.get('/', getRecomController.getRecommendedItems)

export default router